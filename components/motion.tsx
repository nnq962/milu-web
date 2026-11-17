"use client";

import { animate, motion, MotionConfig, useInView, useMotionValue, useTransform } from "motion/react";
import { useEffect, useRef } from "react";
import { vnd } from "@/lib/site";

/** The page's easing: quick out of the gate, a long soft landing. */
export const ease = [0.21, 0.47, 0.32, 0.98] as const;

/** The app's "lively press": a quick spring back with a little bounce. */
export const press = { type: "spring", duration: 0.28, bounce: 0.35 } as const;

/** Motion follows the visitor's Reduce Motion setting, as the app does. */
export function MotionProvider({ children }: { children: React.ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}

/** Rises into place the first time it scrolls into view. */
export function Reveal({
  children,
  className,
  delay = 0,
  y = 28,
  scale = 1,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  scale?: number;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y, scale }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "0px 0px -12% 0px" }}
      transition={{ duration: 0.8, ease, delay }}
    >
      {children}
    </motion.div>
  );
}

/** A sum that rolls to its new value, written as Milu writes money. */
export function Money({
  value,
  sign = false,
  className,
  style,
}: {
  value: number;
  sign?: boolean;
  className?: string;
  style?: React.CSSProperties;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const seen = useInView(ref, { once: true });
  const rolling = useMotionValue(0);
  const text = useTransform(rolling, (v) => vnd(v, { sign }));

  useEffect(() => {
    if (!seen) return;
    const controls = animate(rolling, value, { duration: 0.9, ease: "easeOut" });
    return () => controls.stop();
  }, [seen, value, rolling]);

  return (
    <motion.span ref={ref} className={className} style={{ fontVariantNumeric: "tabular-nums", ...style }}>
      {text}
    </motion.span>
  );
}

/** A whole number that rolls up, for percentages and counts. */
export function Count({
  value,
  suffix = "",
  className,
  style,
}: {
  value: number;
  suffix?: string;
  className?: string;
  style?: React.CSSProperties;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const seen = useInView(ref, { once: true });
  const rolling = useMotionValue(0);
  const text = useTransform(rolling, (v) => `${Math.round(v)}${suffix}`);

  useEffect(() => {
    if (!seen) return;
    const controls = animate(rolling, value, { duration: 0.9, ease: "easeOut" });
    return () => controls.stop();
  }, [seen, value, rolling]);

  return (
    <motion.span ref={ref} className={className} style={{ fontVariantNumeric: "tabular-nums", ...style }}>
      {text}
    </motion.span>
  );
}
