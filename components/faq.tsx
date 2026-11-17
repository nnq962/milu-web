"use client";

import { AnimatePresence, motion } from "motion/react";
import { useId, useState } from "react";
import { Icon } from "@/components/icon";
import { ease, Reveal } from "@/components/motion";
import { SectionHead } from "@/components/stage";
import { faq, site } from "@/lib/site";
import { cn } from "@/lib/u";

/** Câu hỏi thường gặp: one card, a question opens its answer. */
export function Faq() {
  const [open, setOpen] = useState<number | null>(0);
  const id = useId();

  return (
    <section id="hoi-dap" className="bg-mist py-24 sm:py-32">
      <div className="mx-auto max-w-3xl px-5 sm:px-8">
        <Reveal>
          <SectionHead label="Hỏi đáp" title="Câu hỏi thường gặp" />
        </Reveal>

        <Reveal className="mt-12">
          <div className="overflow-hidden rounded-[28px] border border-line bg-surface">
            {faq.map((entry, index) => {
              const isOpen = open === index;
              return (
                <div key={entry.question} className={cn(index > 0 && "border-t border-line")}>
                  <h3>
                    <button
                      type="button"
                      aria-expanded={isOpen}
                      aria-controls={`${id}-${index}`}
                      onClick={() => setOpen(isOpen ? null : index)}
                      className="flex w-full cursor-pointer items-center gap-4 px-6 py-5 text-left text-[17px] font-extrabold transition-colors hover:bg-action/5 sm:text-[18px]"
                    >
                      <span className="flex-1">{entry.question}</span>
                      <motion.span
                        animate={{ rotate: isOpen ? 45 : 0 }}
                        transition={{ type: "spring", duration: 0.35, bounce: 0.3 }}
                        className="grid size-8 shrink-0 place-items-center rounded-full bg-mist text-glyph"
                      >
                        <Icon name="add-01" size={18} />
                      </motion.span>
                    </button>
                  </h3>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        id={`${id}-${index}`}
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.35, ease }}
                        className="overflow-hidden"
                      >
                        <p className="px-6 pb-6 text-[16px] leading-[1.7] text-ink-2">{entry.answer}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </Reveal>

        <p className="mt-8 text-center text-[15px] font-semibold text-ink-2">
          Còn thắc mắc? Viết cho Milu:{" "}
          <a href={`mailto:${site.supportEmail}`} className="font-extrabold text-action underline-offset-4 hover:underline">
            {site.supportEmail}
          </a>
        </p>
      </div>
    </section>
  );
}
