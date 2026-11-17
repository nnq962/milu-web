"use client";

import { useSyncExternalStore } from "react";
import { cn } from "@/lib/u";

export type Theme = "light" | "dark";

/**
 * Runs in <head> before the first paint (app/layout.tsx): the look the visitor chose here, or
 * their system's. The server always renders "light".
 */
export const themeScript = `(function(){try{var t=localStorage.getItem("theme");if(t!=="light"&&t!=="dark"){t=matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light"}document.documentElement.setAttribute("data-theme",t)}catch(e){}})()`;

function subscribe(onChange: () => void) {
  const observer = new MutationObserver(onChange);
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
  return () => observer.disconnect();
}

function current(): Theme {
  return document.documentElement.getAttribute("data-theme") === "dark" ? "dark" : "light";
}

/** The page's look right now, for the things CSS cannot tell (the Rive characters). */
export function useTheme(): Theme {
  return useSyncExternalStore(subscribe, current, () => "light");
}

/** Day to night and back; where the browser can, the new sky opens out from `origin`. */
export function toggleTheme(origin?: { x: number; y: number }) {
  const root = document.documentElement;
  const next: Theme = current() === "dark" ? "light" : "dark";
  const apply = () => {
    root.setAttribute("data-theme", next);
    try {
      localStorage.setItem("theme", next);
    } catch {}
  };
  const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (!document.startViewTransition || reduced) return apply();
  if (origin) {
    root.style.setProperty("--vt-x", `${origin.x}px`);
    root.style.setProperty("--vt-y", `${origin.y}px`);
  }
  document.startViewTransition(apply);
}

/** The sun by day, the moon at night. Both are drawn; CSS shows the one that fits. */
export function ThemeToggle({ className }: { className?: string }) {
  return (
    <button
      type="button"
      aria-label="Đổi giao diện sáng hoặc tối"
      title="Đổi giao diện sáng hoặc tối"
      onClick={(event) => {
        const box = event.currentTarget.getBoundingClientRect();
        toggleTheme({ x: box.left + box.width / 2, y: box.top + box.height / 2 });
      }}
      className={cn(
        "grid size-10 cursor-pointer place-items-center rounded-full text-glyph transition-[background-color,transform] duration-200 hover:bg-ink/6 active:scale-90",
        className,
      )}
    >
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <g className="dark:hidden">
          <circle cx="12" cy="12" r="4.25" />
          <path d="M12 2.5v2M12 19.5v2M2.5 12h2M19.5 12h2M5.3 5.3l1.4 1.4M17.3 17.3l1.4 1.4M5.3 18.7l1.4-1.4M17.3 6.7l1.4-1.4" />
        </g>
        <path
          className="hidden dark:block"
          d="M20.5 14.2A8.5 8.5 0 0 1 9.8 3.5a8.5 8.5 0 1 0 10.7 10.7Z"
        />
      </svg>
    </button>
  );
}
