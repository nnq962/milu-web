"use client";

import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "motion/react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { AppIcon } from "@/components/art";
import { ease } from "@/components/motion";
import { ThemeToggle } from "@/components/theme";
import { nav } from "@/lib/site";
import { cn } from "@/lib/u";

/** What the phone's menu lists: the bar's own links, and the page a phone has no room to name. */
const menu = [...nav, { href: "/ho-tro", label: "Hỗ trợ" }] as const;

/** The bar on top: a pane of glass over the page, as the app's bars are over its content. */
export function SiteNav() {
  const header = useRef<HTMLElement>(null);
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useMotionValueEvent(scrollY, "change", (y) => setScrolled(y > 24));

  // The phone's menu closes on Escape and on a touch anywhere outside the bar.
  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    const onPointer = (event: PointerEvent) => {
      if (!header.current?.contains(event.target as Node)) setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    window.addEventListener("pointerdown", onPointer);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("pointerdown", onPointer);
    };
  }, [open]);

  return (
    <motion.header
      ref={header}
      // It slides in without a fade: glass under a fade has no blur until the fade ends.
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease, delay: 0.1 }}
      className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-5"
    >
      <nav
        aria-label="Điều hướng chính"
        className={cn(
          "glass mx-auto flex h-14 max-w-5xl items-center gap-2 rounded-full border pr-2 pl-3 transition-[border-color,box-shadow] duration-300",
          scrolled || open ? "border-line shadow-float" : "border-transparent",
        )}
      >
        <Link
          href="/"
          onClick={() => setOpen(false)}
          className="flex items-center gap-2.5 rounded-full pr-2"
          aria-label="Milu, về đầu trang"
        >
          <AppIcon size={34} />
          <span className="text-[21px] font-black tracking-[-0.01em] text-deep">Milu</span>
        </Link>

        <ul className="mx-auto hidden items-center gap-1 md:flex">
          {nav.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className="rounded-full px-3.5 py-2 text-[15px] font-bold text-ink-2 transition-colors hover:bg-ink/6 hover:text-ink"
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="ml-auto flex items-center gap-1 md:ml-0">
          <ThemeToggle />
          <button
            type="button"
            aria-label={open ? "Đóng menu" : "Mở menu"}
            aria-expanded={open}
            aria-controls="site-menu"
            onClick={() => setOpen((value) => !value)}
            className="grid size-10 cursor-pointer place-items-center rounded-full text-glyph transition-[background-color,transform] duration-200 hover:bg-ink/6 active:scale-90 md:hidden"
          >
            {/* Two lines that cross into an ✕ when the menu is open */}
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              aria-hidden="true"
            >
              <path
                d="M4 8.5h16"
                className="origin-center transition-transform duration-300 ease-out"
                style={{ transform: open ? "rotate(45deg) translateY(3.5px)" : "none" }}
              />
              <path
                d="M4 15.5h16"
                className="origin-center transition-transform duration-300 ease-out"
                style={{ transform: open ? "rotate(-45deg) translateY(-3.5px)" : "none" }}
              />
            </svg>
          </button>
          <Link
            href="/#tai-ve"
            onClick={() => setOpen(false)}
            className="inline-flex h-10 items-center rounded-full bg-action px-4 text-[15px] font-extrabold text-on-action transition-[background-color,transform] duration-200 hover:bg-action-pressed active:scale-95"
          >
            Tải app
          </Link>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          // A solid card, not glass: it fades in, and glass under a fade has no blur until the end.
          <motion.div
            id="site-menu"
            initial={{ opacity: 0, y: -10, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.97 }}
            transition={{ duration: 0.22, ease }}
            className="mx-auto mt-2 max-w-5xl origin-top rounded-[28px] border border-line bg-surface p-2 shadow-float md:hidden"
          >
            <ul>
              {menu.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="flex h-12 items-center rounded-2xl px-4 text-[17px] font-extrabold text-ink transition-colors hover:bg-ink/6 active:bg-ink/6"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
