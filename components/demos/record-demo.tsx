"use client";

import { AnimatePresence, motion, useInView } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { Cloud, Emoji, SkyArt } from "@/components/art";
import { MiluRive, type MiluRiveHandle } from "@/components/milu-rive";
import { ease, Money } from "@/components/motion";
import { Stage } from "@/components/stage";
import { vnd } from "@/lib/site";
import { u } from "@/lib/u";

const rows = [
  { id: "parking", emoji: "1f6f5", name: "Gửi xe", note: "Gửi xe cả ngày", amount: 5_000, time: "18:30" },
  { id: "lunch", emoji: "1f35a", name: "Ăn trưa", note: "Cơm trưa văn phòng", amount: 45_000, time: "12:15" },
  { id: "coffee", emoji: "2615", name: "Cà phê", note: "Cà phê sáng", amount: 55_000, time: "08:15" },
];

/** The six days before today, in đồng, and the days' names (08/11 to 14/11/2026). */
const week = [80_000, 30_000, 45_000, 120_000, 60_000, 35_000];
const days = ["CN", "T2", "T3", "T4", "T5", "T6", "T7"];
const tallest = 120_000;

/**
 * Thu chi on its sky: a day's spending and the week's bars. Every few seconds one more expense is
 * recorded: the row slides in, the sums roll, today's bar grows and Milu is glad of it.
 */
export function RecordDemo() {
  const stage = useRef<HTMLDivElement>(null);
  const milu = useRef<MiluRiveHandle>(null);
  const inView = useInView(stage, { amount: 0.5 });
  const seen = useInView(stage, { amount: 0.35, once: true });
  const [recorded, setRecorded] = useState(false);

  useEffect(() => {
    if (!inView) return;
    const timer = setInterval(() => setRecorded((value) => !value), 4200);
    return () => clearInterval(timer);
  }, [inView]);

  useEffect(() => {
    if (recorded) milu.current?.fire("previewSave");
  }, [recorded]);

  const shown = recorded ? rows : rows.slice(1);
  const today = shown.reduce((sum, row) => sum + row.amount, 0);
  const bars = [...week, today];
  const weekTotal = bars.reduce((sum, value) => sum + value, 0);

  return (
    <Stage sky="plane" ref={stage}>
      <SkyArt scene="thu-chi" className="absolute inset-x-0 bottom-0 block h-auto w-full" />
      <Cloud className="absolute animate-floaty" style={{ left: u(22), top: u(44), width: u(76) }} />
      <Cloud
        className="absolute animate-floaty opacity-80"
        style={{ right: u(24), top: u(92), width: u(54), animationDelay: "-2.5s" }}
      />

      <div className="absolute left-1/2 -translate-x-1/2" style={{ top: u(30), width: u(250) }}>
        <MiluRive ref={milu} scene="transactions" face="vui" className="w-full" />
      </div>

      <div
        className="absolute border border-line bg-surface shadow-float"
        style={{ left: u(18), right: u(18), top: u(150), borderRadius: u(28) }}
      >
        <div style={{ padding: `${u(16)} ${u(18)} ${u(12)}` }}>
          <div className="flex items-baseline justify-between">
            <p className="font-extrabold text-ink" style={{ fontSize: u(16) }}>
              Chi theo ngày
            </p>
            <p className="font-semibold text-ink-2" style={{ fontSize: u(12) }}>
              08/11 – 14/11
            </p>
          </div>
          <Money value={weekTotal} className="block font-black text-ink" style={{ fontSize: u(22), marginTop: u(2) }} />

          <div className="flex items-end" style={{ gap: u(10), height: u(58), marginTop: u(10) }}>
            {bars.map((value, index) => (
              <motion.div
                key={index}
                className="flex-1 bg-deep"
                style={{
                  borderRadius: `${u(5)} ${u(5)} ${u(2)} ${u(2)}`,
                  opacity: index === bars.length - 1 ? 1 : 0.32,
                }}
                initial={{ height: "0%" }}
                animate={{ height: seen ? `${(value / tallest) * 100}%` : "0%" }}
                transition={{ duration: 0.8, ease, delay: seen && !recorded ? index * 0.06 : 0 }}
              />
            ))}
          </div>
          <div className="flex" style={{ gap: u(10), marginTop: u(5) }}>
            {days.map((day, index) => (
              <p
                key={day}
                className={index === days.length - 1 ? "flex-1 text-center font-extrabold text-ink" : "flex-1 text-center font-semibold text-ink-3"}
                style={{ fontSize: u(10.5) }}
              >
                {day}
              </p>
            ))}
          </div>
        </div>

        <div className="border-t border-line">
          <div className="flex items-baseline justify-between" style={{ padding: `${u(12)} ${u(18)} ${u(4)}` }}>
            <p className="font-extrabold text-ink" style={{ fontSize: u(15) }}>
              Hôm nay, 14/11
            </p>
            <Money value={-today} className="font-extrabold text-ink" style={{ fontSize: u(15) }} />
          </div>
          <ul style={{ paddingBottom: u(8) }}>
            <AnimatePresence initial={false}>
              {shown.map((row) => (
                <motion.li
                  key={row.id}
                  layout
                  initial={{ opacity: 0, height: 0, x: -24 }}
                  animate={{ opacity: 1, height: "auto", x: 0 }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ type: "spring", duration: 0.55, bounce: 0.2 }}
                  className="overflow-hidden"
                >
                  <div className="flex items-center" style={{ gap: u(12), padding: `${u(8)} ${u(18)}` }}>
                    <Emoji code={row.emoji} size={64} style={{ width: u(32), height: u(32) }} />
                    <div className="min-w-0 flex-1">
                      <p className="truncate font-extrabold text-ink" style={{ fontSize: u(15.5) }}>
                        {row.name}
                      </p>
                      <p className="truncate font-semibold text-ink-2" style={{ fontSize: u(12.5) }}>
                        {row.note}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-extrabold text-ink" style={{ fontSize: u(15.5) }}>
                        {vnd(-row.amount)}
                      </p>
                      <p className="font-semibold text-ink-3" style={{ fontSize: u(12.5) }}>
                        {row.time}
                      </p>
                    </div>
                  </div>
                </motion.li>
              ))}
            </AnimatePresence>
          </ul>
        </div>
      </div>
    </Stage>
  );
}
