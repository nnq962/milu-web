"use client";

import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { Cloud, Face } from "@/components/art";
import { Reveal } from "@/components/motion";
import { SectionHead } from "@/components/stage";
import { faces } from "@/lib/site";
import { cn } from "@/lib/u";

const first = faces.slice(0, 10);
const second = faces.slice(10);

/** Milu's twenty faces: two rows that drift past, and the one you pick, large, on its sky. */
export function MeetMilu() {
  const [picked, setPicked] = useState(3);
  const face = faces[picked];

  return (
    <section id="milu" className="overflow-hidden py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <Reveal>
          <SectionHead
            label="Gặp Milu"
            title={
              <>
                Hai mươi nét mặt,
                <br />
                một chú cún
              </>
            }
          >
            Milu mừng khi bạn ghi một khoản, ngủ gật nếu bị bỏ quên lâu quá, và tỉnh ngay khi bạn chạm vào. Chọn một
            nét mặt xem thử.
          </SectionHead>
        </Reveal>

        <Reveal y={40} scale={0.96} className="mt-12">
          <div className="sky-brand relative mx-auto aspect-[16/10] w-full max-w-[34rem] overflow-hidden rounded-[40px] shadow-float sm:rounded-[46px]">
            <Cloud className="absolute top-[14%] left-[8%] w-[18%] animate-floaty" />
            <Cloud className="absolute top-[30%] right-[9%] w-[13%] animate-floaty opacity-80 [animation-delay:-2s]" />
            {/* The face changes at once and Milu bobs: squashed, then tall, then itself, pinned at the
                foot, as in the app. It is a head with no body, so nothing may lift it off the edge
                (a spring that rose from below overshot and showed the flat cut). */}
            <AnimatePresence initial={false}>
              <motion.div
                key={face.file}
                className="absolute inset-x-[7%] bottom-0"
                style={{ originY: 1 }}
                initial={{ scaleY: 0.8, scaleX: 1.07 }}
                animate={{ scaleY: 1, scaleX: 1 }}
                transition={{ type: "spring", duration: 0.6, bounce: 0.55 }}
              >
                <Face name={face.file} alt={`Milu ${face.name.toLowerCase()}`} className="block h-auto w-full" />
              </motion.div>
            </AnimatePresence>
            <p
              aria-live="polite"
              className="absolute top-5 left-1/2 -translate-x-1/2 rounded-full bg-surface px-4 py-1.5 text-[15px] font-extrabold whitespace-nowrap shadow-float"
            >
              {face.name}
            </p>
          </div>
        </Reveal>
      </div>

      <div className="mt-10">
        <Row items={first} offset={0} picked={picked} onPick={setPicked} />
        <Row items={second} offset={10} picked={picked} onPick={setPicked} reverse />
      </div>
    </section>
  );
}

function Row({
  items,
  offset,
  picked,
  onPick,
  reverse = false,
}: {
  items: readonly { file: string; name: string }[];
  offset: number;
  picked: number;
  onPick: (index: number) => void;
  reverse?: boolean;
}) {
  return (
    // Room above and below the cards: one lifts as the pointer comes over it, and the row clips.
    <div className="marquee overflow-hidden py-2">
      <ul className={cn("marquee-track flex w-max gap-4 pr-4", reverse && "reverse")} style={{ "--marquee-time": "70s" } as React.CSSProperties}>
        {/* Twice over, so the row can loop without a seam; the second copy is for the eye only. */}
        {[0, 1].map((copy) =>
          items.map((item, index) => {
            const chosen = picked === offset + index;
            return (
              <li key={`${copy}-${item.file}`} aria-hidden={copy === 1 ? "true" : undefined}>
                <button
                  type="button"
                  tabIndex={copy === 1 ? -1 : 0}
                  aria-pressed={chosen}
                  aria-label={`Milu ${item.name.toLowerCase()}`}
                  onClick={() => onPick(offset + index)}
                  className={cn(
                    "group block w-44 cursor-pointer overflow-hidden rounded-[26px] border bg-surface pt-3 transition-[border-color,transform] duration-200 hover:-translate-y-1 active:scale-[0.97] sm:w-52",
                    chosen ? "border-action" : "border-line",
                  )}
                >
                  <span className="block text-[13px] font-extrabold text-ink-2">{item.name}</span>
                  <Face
                    name={item.file}
                    className="mt-1 block h-auto w-full translate-y-2 transition-transform duration-300 ease-out group-hover:translate-y-0"
                  />
                </button>
              </li>
            );
          }),
        )}
      </ul>
    </div>
  );
}
