"use client";

import { AnimatePresence, motion, useInView } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { SkyArt } from "@/components/art";
import { MiluRive, type MiluRiveHandle } from "@/components/milu-rive";
import { Count } from "@/components/motion";
import { Stage } from "@/components/stage";
import { vnd } from "@/lib/site";
import { u } from "@/lib/u";

const jars = [
  { name: "Hũ tiết kiệm", emoji: "1f4b0", goal: 40_000_000, saved: 28_000_000, water: "var(--jar-mint)", tilt: -5, drop: 16 },
  { name: "Mua xe", emoji: "1f697", goal: 50_000_000, saved: 15_000_000, water: "var(--jar-sky)", tilt: 0, drop: 0 },
  { name: "Du lịch Đà Nẵng", emoji: "1f9f3", goal: 20_000_000, saved: 8_000_000, water: "var(--jar-honey)", tilt: 5, drop: 16 },
];

/** What is put in, one jar at a time; after the last the jars go back to how they began. */
const deposits = [
  { jar: 1, amount: 5_000_000 },
  { jar: 2, amount: 4_000_000 },
  { jar: 0, amount: 6_000_000 },
  { jar: 1, amount: 5_000_000 },
  { jar: 2, amount: 4_000_000 },
  { jar: 0, amount: 6_000_000 },
];

/**
 * Sổ ví on its lake: three glass jars, the water in each as high as what is saved. Every few
 * seconds a deposit goes into one: its water rises, its numbers roll and Milu cheers.
 */
export function JarsDemo() {
  const stage = useRef<HTMLDivElement>(null);
  const milu = useRef<MiluRiveHandle>(null);
  const inView = useInView(stage, { amount: 0.5 });
  const seen = useInView(stage, { amount: 0.35, once: true });
  const [done, setDone] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const timer = setTimeout(
      () => setDone((count) => (count >= deposits.length ? 0 : count + 1)),
      done >= deposits.length ? 3600 : 2800,
    );
    return () => clearTimeout(timer);
  }, [inView, done]);

  useEffect(() => {
    if (done > 0) milu.current?.fire("previewDeposit");
  }, [done]);

  const latest = done > 0 ? deposits[done - 1] : null;

  return (
    <Stage sky="pond" ref={stage}>
      <SkyArt scene="tai-khoan" className="absolute inset-x-0 bottom-0 block h-auto w-full" />

      {/* Milu has a head and no body: it stands on the stage's lower edge, by the lake, as on the
          app's Sổ ví, so its flat foot is the edge and never shows. */}
      <div className="absolute bottom-0" style={{ right: u(10), width: u(256) }}>
        <MiluRive ref={milu} scene="accounts" face="cuoi-banh-noc" className="w-full" />
      </div>

      <div className="absolute inset-x-0 flex items-start justify-center" style={{ top: u(40), gap: u(8) }}>
        {jars.map((jar, index) => {
          const saved =
            jar.saved +
            deposits.slice(0, done).reduce((sum, deposit) => sum + (deposit.jar === index ? deposit.amount : 0), 0);
          const share = saved / jar.goal;
          const full = share >= 1;
          return (
            <motion.div
              key={jar.name}
              className="relative border border-line bg-surface text-center shadow-float"
              style={{
                width: u(116),
                padding: `${u(10)} ${u(8)} ${u(12)}`,
                borderRadius: u(22),
                marginTop: u(jar.drop),
                rotate: jar.tilt,
              }}
              animate={latest?.jar === index ? { scale: [1, 1.06, 1] } : { scale: 1 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            >
              <GlassJar id={`jar-${index}`} level={seen ? share : 0} water={jar.water} emoji={jar.emoji} />
              <p
                className="flex items-center justify-center font-extrabold text-ink"
                style={{ fontSize: u(13), lineHeight: 1.25, minHeight: u(34), marginTop: u(4) }}
              >
                {jar.name}
              </p>
              <Count
                value={seen ? Math.min(Math.round(share * 100), 100) : 0}
                suffix="%"
                className={full ? "block font-black text-income" : "block font-black text-deep"}
                style={{ fontSize: u(21), lineHeight: 1.2 }}
              />
              <p className="font-bold text-ink" style={{ fontSize: u(11.5), marginTop: u(2) }}>
                {vnd(saved)}
              </p>
              <p className="font-semibold text-ink-3" style={{ fontSize: u(10.5) }}>
                / {vnd(jar.goal)}
              </p>

              <AnimatePresence>
                {latest?.jar === index && (
                  <motion.p
                    key={done}
                    className="absolute left-1/2 bg-income-soft font-extrabold whitespace-nowrap text-income shadow-float"
                    style={{
                      fontSize: u(12.5),
                      padding: `${u(4)} ${u(10)}`,
                      borderRadius: u(999),
                      top: u(-12),
                      x: "-50%",
                    }}
                    initial={{ opacity: 0, y: 14, scale: 0.7 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -14 }}
                    transition={{ type: "spring", duration: 0.5, bounce: 0.4 }}
                  >
                    {vnd(latest.amount, { sign: true })}
                  </motion.p>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>
    </Stage>
  );
}

/** The jar's glass on its 94 × 70 frame, the path the app draws (LedgerParts.swift). */
const glass =
  "M28 10L66 10L66 15C66 18 68 19 71 21C75 24 77 28 77 33L77 56C77 62 73 66 67 66L27 66C21 66 17 62 17 56L17 33C17 28 19 24 23 21C26 19 28 18 28 15Z";

/**
 * Milu's glass jar: the water from the foot (65) up by 48 for a whole, and on up the neck to the
 * lid once the goal is reached, with the jar's picture in it.
 */
function GlassJar({ id, level, water, emoji }: { id: string; level: number; water: string; emoji: string }) {
  const fill = level >= 1 ? 1.15 : Math.max(level, 0);
  const top = 65 - 48 * fill;
  return (
    <svg viewBox="0 0 94 70" className="block w-full" aria-hidden="true">
      <defs>
        <clipPath id={id}>
          <path d={glass} />
        </clipPath>
      </defs>
      <path d={glass} fill="var(--canvas)" />
      <g clipPath={`url(#${id})`}>
        <motion.g initial={{ y: 65 }} animate={{ y: top }} transition={{ type: "spring", duration: 1.2, bounce: 0.22 }}>
          <path
            className="animate-wave"
            d="M0 1.5Q11.75 -0.7 23.5 1.5T47 1.5T70.5 1.5T94 1.5T117.5 1.5T141 1.5V80H0Z"
            fill={water}
          />
        </motion.g>
      </g>
      <image href={`/milu/emoji/${emoji}.svg`} x="32" y="25" width="30" height="30" />
      <path d={glass} fill="none" stroke="var(--ink-2)" strokeWidth="1.35" strokeLinejoin="round" />
      <rect x="25.5" y="4" width="43" height="7" rx="3.5" fill="var(--line)" stroke="var(--ink-2)" strokeWidth="1.3" />
    </svg>
  );
}
