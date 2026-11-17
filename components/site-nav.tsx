"use client";

import { motion, useMotionValueEvent, useScroll } from "motion/react";
import Link from "next/link";
import { useState } from "react";
import { AppIcon } from "@/components/art";
import { ease } from "@/components/motion";
import { ThemeToggle } from "@/components/theme";
import { nav } from "@/lib/site";
import { cn } from "@/lib/u";

/** The bar on top: a pane of glass over the page, as the app's bars are over its content. */
export function SiteNav() {
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);
  useMotionValueEvent(scrollY, "change", (y) => setScrolled(y > 24));

  return (
    <motion.header
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
          scrolled ? "border-line shadow-float" : "border-transparent",
        )}
      >
        <Link href="/" className="flex items-center gap-2.5 rounded-full pr-2" aria-label="Milu, về đầu trang">
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
          <Link
            href="/#tai-ve"
            className="inline-flex h-10 items-center rounded-full bg-action px-4 text-[15px] font-extrabold text-on-action transition-[background-color,transform] duration-200 hover:bg-action-pressed active:scale-95"
          >
            Tải app
          </Link>
        </div>
      </nav>
    </motion.header>
  );
}
