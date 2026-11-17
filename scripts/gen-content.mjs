// Generates lib/legal.ts and lib/hugeicons.ts from the Milu iOS project, so the site's legal pages
// say what the app's say. Run it again when LegalDocument.swift changes:
//   node scripts/gen-content.mjs /path/to/Milu .
import fs from "node:fs";
import path from "node:path";

const [src, dst] = process.argv.slice(2);

// ---------- Legal documents ----------
const swift = fs.readFileSync(path.join(src, "Milu/Features/Settings/LegalDocument.swift"), "utf8");
const values = {
  "AppLock.biometryName": "Face ID/Touch ID",
  "AIQuota.weeklyFree": "10",
  "AIQuota.stepBonus": "5",
  "AIQuota.bonusDays": "7",
  "AssistantChats.keptDays": "30",
  supportEmail: "support@milu.nnqlab.dev",
};

function text(literal) {
  const out = literal
    .replace(/\\\(([^)]+)\)/g, (_, name) => {
      if (!(name in values)) throw new Error(`Unknown interpolation: ${name}`);
      return values[name];
    })
    .replace(/\\"/g, '"')
    .replace(/\\u\{([0-9A-Fa-f]+)\}/g, (_, hex) => String.fromCodePoint(parseInt(hex, 16)));
  if (out.includes("\\")) throw new Error(`Unhandled escape in: ${literal}`);
  return out;
}

function parse(name) {
  const start = swift.indexOf(`static let ${name} = LegalDocument(`);
  const end = swift.indexOf("\n    )\n", start);
  if (start < 0 || end < 0) throw new Error(`Cannot find ${name}`);
  const block = swift
    .slice(start, end)
    .split("\n")
    .filter((line) => !line.trim().startsWith("//"))
    .join("\n");
  const title = /title: "([^"]*)"/.exec(block)[1];
  const updated = /updated: "([^"]*)"/.exec(block)[1];
  const entries = block
    .split("ReadingEntry(")
    .slice(1)
    .map((part) => {
      const strings = [...part.matchAll(/"((?:[^"\\]|\\.)*)"/g)].map((m) => text(m[1]));
      return { heading: strings[0], paragraphs: strings.slice(1) };
    });
  return { title, updated, entries };
}

const legal = `// Generated from Milu/Features/Settings/LegalDocument.swift in the iOS project.
// When the app's legal text changes, run "node scripts/gen-content.mjs /path/to/Milu ." again so
// the two never disagree.

export type LegalEntry = { heading: string; paragraphs: string[] };
export type LegalDoc = { title: string; updated: string; entries: LegalEntry[] };

export const privacy: LegalDoc = ${JSON.stringify(parse("privacy"), null, 2)};

export const terms: LegalDoc = ${JSON.stringify(parse("terms"), null, 2)};
`;
fs.mkdirSync(path.join(dst, "lib"), { recursive: true });
fs.writeFileSync(path.join(dst, "lib/legal.ts"), legal);

// ---------- Hugeicons (Stroke Rounded, MIT), the app's line icons ----------
const names = [
  "notification-01", "cloud", "security-check", "square-lock-02", "mic-01", "arrow-up-02",
  "arrow-right-01", "arrow-down-01", "cancel-01", "tick-02", "sparkles", "user", "paw-print",
  "target-02", "pie-chart", "handshake", "calendar-03", "eye", "delete-02", "history",
  "pencil-edit-02", "search-01", "add-01", "smart-phone-01", "crown", "mail-01",
  "checkmark-circle-02", "help-circle", "file-02", "clock-01", "wallet-01", "money-saving-jar",
  "chart-increase", "ai-magic", "bubble-chat",
];
const icons = {};
for (const name of names) {
  const dir = path.join(src, `Milu/Assets.xcassets/hugeicons-${name}.imageset`);
  const file = fs.readdirSync(dir).find((f) => f.endsWith(".svg"));
  const svg = fs.readFileSync(path.join(dir, file), "utf8");
  const inner = /<svg[^>]*>([\s\S]*)<\/svg>/.exec(svg)[1].trim();
  icons[name] = inner.replace(/#000000|#000\b/g, "currentColor");
}
const hugeicons = `// Generated from the iOS project's Assets.xcassets: Hugeicons Stroke Rounded (MIT),
// the line icons Milu uses for functions and labels. 24 × 24, drawn in currentColor.

export const hugeicons = ${JSON.stringify(icons, null, 2)} as const;

export type HugeiconName = keyof typeof hugeicons;
`;
fs.writeFileSync(path.join(dst, "lib/hugeicons.ts"), hugeicons);

console.log("legal entries:", parse("privacy").entries.length, parse("terms").entries.length);
console.log("icons:", Object.keys(icons).length);
