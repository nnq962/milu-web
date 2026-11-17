"use client";

import { AnimatePresence, motion, useInView } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { Emoji } from "@/components/art";
import { Icon } from "@/components/icon";
import { ease } from "@/components/motion";
import { Stage } from "@/components/stage";
import { vnd } from "@/lib/site";
import { cn, u } from "@/lib/u";

/** One round with Milu AI, and how long each part stays. */
const script = [
  { part: "idle", wait: 1200 },
  { part: "listening", wait: 2700 },
  { part: "thinking", wait: 1700 },
  { part: "draft", wait: 2600 },
  { part: "saved", wait: 3400 },
] as const;

const said = ["Sáng", "nay", "cà", "phê", "35k", "nha"];
const voice = [0.35, 0.6, 0.9, 0.5, 1, 0.7, 0.4, 0.85, 0.55, 1, 0.65, 0.4, 0.8, 0.5, 0.95, 0.6, 0.35, 0.75, 0.5, 0.3];

/**
 * Trợ lý AI: the visitor says an expense, Milu thinks, writes the receipt and waits for "Lưu".
 * Nothing is recorded before the tap, as in the app.
 */
export function AssistantDemo() {
  const stage = useRef<HTMLDivElement>(null);
  const inView = useInView(stage, { amount: 0.5 });
  const [step, setStep] = useState(0);
  const part = script[step].part;

  useEffect(() => {
    if (!inView) return;
    const timer = setTimeout(() => setStep((index) => (index + 1) % script.length), script[step].wait);
    return () => clearTimeout(timer);
  }, [inView, step]);

  const asked = part === "thinking" || part === "draft" || part === "saved";
  const answered = part === "draft" || part === "saved";

  return (
    <Stage sky="brand" ref={stage}>
      {/* The bar: close, history, new chat */}
      <div className="absolute inset-x-0 flex items-center justify-between" style={{ top: u(18), padding: `0 ${u(16)}` }}>
        <BarButton icon="cancel-01" />
        <div className="flex" style={{ gap: u(10) }}>
          <BarButton icon="history" />
          <BarButton icon="pencil-edit-02" />
        </div>
      </div>

      <div className="absolute flex flex-col" style={{ top: u(74), left: u(16), right: u(16), gap: u(12) }}>
        <AnimatePresence>
          {asked && (
            <motion.p
              key="question"
              className="self-end bg-action font-semibold text-on-action"
              style={{
                fontSize: u(16),
                padding: `${u(10)} ${u(16)}`,
                borderRadius: `${u(20)} ${u(20)} ${u(6)} ${u(20)}`,
              }}
              initial={{ opacity: 0, y: 120, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, transition: { duration: 0.25 } }}
              transition={{ type: "spring", duration: 0.5, bounce: 0.25 }}
            >
              Sáng nay cà phê 35k nha
            </motion.p>
          )}

          {part === "thinking" && (
            <motion.div
              key="thinking"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, transition: { delay: 0.3 } }}
              exit={{ opacity: 0, transition: { duration: 0.15 } }}
            >
              <p className="thinking animate-shimmer font-bold" style={{ fontSize: u(15) }}>
                Đang nghĩ…
              </p>
              <p className="flex items-center font-semibold text-ink-2" style={{ fontSize: u(13), gap: u(7), marginTop: u(8) }}>
                <span
                  className="inline-block animate-spin rounded-full border-2 border-ink-3 border-t-transparent"
                  style={{ width: u(12), height: u(12) }}
                />
                Đang soạn giao dịch…
              </p>
            </motion.div>
          )}

          {answered && (
            <motion.div
              key="answer"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, transition: { duration: 0.25 } }}
            >
              <p className="font-semibold text-ink-3" style={{ fontSize: u(12.5) }}>
                Đã nghĩ 2 giây · 1 bước ›
              </p>
              <p className="font-medium text-ink" style={{ fontSize: u(16), marginTop: u(6) }}>
                Mình soạn xong rồi, bạn xem lại nha!
              </p>

              <motion.div
                className="border border-line bg-surface shadow-float"
                style={{ marginTop: u(12), padding: u(14), borderRadius: u(22) }}
                initial={{ opacity: 0, scale: 0.96, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ type: "spring", duration: 0.45, bounce: 0.3, delay: 0.25 }}
              >
                <div className="flex items-baseline justify-between">
                  <p className="font-extrabold text-ink" style={{ fontSize: u(15) }}>
                    Milu soạn 1 khoản
                  </p>
                  <p className="font-semibold text-ink-2" style={{ fontSize: u(12.5) }}>
                    Hôm nay, 08:15
                  </p>
                </div>
                <div className="dashed" style={{ margin: `${u(11)} 0` }} />
                <div className="flex items-center" style={{ gap: u(12) }}>
                  <Emoji code="2615" size={64} style={{ width: u(32), height: u(32) }} />
                  <div className="flex-1">
                    <p className="font-extrabold text-ink" style={{ fontSize: u(16) }}>
                      Cà phê
                    </p>
                    <p className="font-semibold text-ink-2" style={{ fontSize: u(13) }}>
                      Cà phê sáng
                    </p>
                  </div>
                  <p className="font-extrabold text-ink" style={{ fontSize: u(16) }}>
                    {vnd(-35_000)}
                  </p>
                </div>
                <div className="dashed" style={{ margin: `${u(11)} 0` }} />
                <p className="font-semibold text-ink-2" style={{ fontSize: u(13) }}>
                  Từ Tiền mặt · Milu tự chọn
                </p>

                <div className="relative" style={{ marginTop: u(12), height: u(42) }}>
                  <AnimatePresence initial={false}>
                    {part === "draft" ? (
                      <motion.div
                        key="buttons"
                        className="absolute inset-0 grid grid-cols-2"
                        style={{ gap: u(8) }}
                        exit={{ opacity: 0, scale: 0.96, transition: { duration: 0.15 } }}
                      >
                        <span
                          className="grid place-items-center bg-ink/6 font-extrabold text-ink"
                          style={{ fontSize: u(15), borderRadius: u(14) }}
                        >
                          Huỷ
                        </span>
                        <motion.span
                          className="grid place-items-center bg-action font-extrabold text-on-action"
                          style={{ fontSize: u(15), borderRadius: u(14) }}
                          animate={{ scale: [1, 1, 0.93, 1] }}
                          transition={{ duration: 2.5, times: [0, 0.82, 0.92, 1] }}
                        >
                          Lưu
                        </motion.span>
                      </motion.div>
                    ) : (
                      <motion.p
                        key="saved"
                        className="absolute inset-0 flex items-center justify-center bg-income-soft font-extrabold text-income"
                        style={{ fontSize: u(15), borderRadius: u(14), gap: u(6) }}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ type: "spring", duration: 0.4, bounce: 0.45 }}
                      >
                        <Icon name="checkmark-circle-02" size="1.2em" />
                        Đã lưu vào Tiền mặt
                      </motion.p>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* The field: a pill to type in, two rows while Milu listens */}
      <motion.div
        layout
        transition={{ type: "spring", duration: 0.45, bounce: 0.2 }}
        className="glass absolute border border-line shadow-float"
        style={{ left: u(16), right: u(16), bottom: u(18), padding: u(8), borderRadius: u(26) }}
      >
        {part === "listening" ? (
          <motion.div layout="position" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <p className="font-medium text-ink" style={{ fontSize: u(16), padding: `${u(4)} ${u(8)} ${u(10)}`, minHeight: u(34) }}>
              {said.map((word, index) => (
                <motion.span
                  key={word}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.2, ease, delay: 0.35 + index * 0.3 }}
                >
                  {word}{" "}
                </motion.span>
              ))}
            </p>
            <div className="flex items-center" style={{ gap: u(8) }}>
              <RoundButton icon="cancel-01" />
              <div className="flex flex-1 items-center justify-center" style={{ gap: u(3), height: u(36) }}>
                {voice.map((height, index) => (
                  <span
                    key={index}
                    className="voice-bar rounded-full bg-deep"
                    style={
                      {
                        width: u(3),
                        height: `${height * 72}%`,
                        "--voice-delay": `${-index * 0.13}s`,
                      } as React.CSSProperties
                    }
                  />
                ))}
              </div>
              <span className="grid place-items-center rounded-full bg-ink/6" style={{ width: u(36), height: u(36) }}>
                <span className="bg-ink" style={{ width: u(11), height: u(11), borderRadius: u(3) }} />
              </span>
              <RoundButton icon="arrow-up-02" filled />
            </div>
          </motion.div>
        ) : (
          <motion.div
            layout="position"
            className="flex items-center"
            style={{ height: u(36), paddingLeft: u(10) }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <p className="flex-1 font-medium text-ink-3" style={{ fontSize: u(16) }}>
              Hỏi Milu
            </p>
            {part === "thinking" ? (
              <span className="grid place-items-center rounded-full bg-action" style={{ width: u(36), height: u(36) }}>
                <span className="bg-on-action" style={{ width: u(11), height: u(11), borderRadius: u(3) }} />
              </span>
            ) : (
              <span className="grid place-items-center text-ink-2" style={{ width: u(36), height: u(36) }}>
                <Icon name="mic-01" size="1.35em" />
              </span>
            )}
          </motion.div>
        )}
      </motion.div>
    </Stage>
  );
}

function BarButton({ icon }: { icon: "cancel-01" | "history" | "pencil-edit-02" }) {
  return (
    <span
      className="glass grid place-items-center rounded-full border border-line text-glyph"
      style={{ width: u(38), height: u(38) }}
    >
      <Icon name={icon} size="1.15em" />
    </span>
  );
}

function RoundButton({ icon, filled = false }: { icon: "cancel-01" | "arrow-up-02"; filled?: boolean }) {
  return (
    <span
      className={cn("grid place-items-center rounded-full", filled ? "bg-action text-on-action" : "bg-ink/6 text-ink")}
      style={{ width: u(36), height: u(36) }}
    >
      <Icon name={icon} size="1.15em" />
    </span>
  );
}
