"use client";

import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { Emoji } from "@/components/art";
import { Icon } from "@/components/icon";
import { press, Reveal } from "@/components/motion";
import { SectionHead } from "@/components/stage";
import { site, vnd } from "@/lib/site";
import { cn } from "@/lib/u";

type Plan = "monthly" | "yearly";

const { monthly, yearly } = site.pro;
const saving = Math.round((1 - yearly / (monthly * 12)) * 100);

const free = [
  "Ghi thu chi, tài khoản, hũ tiết kiệm, vay nợ",
  "Báo cáo, hạn mức, giao dịch định kỳ, đồng bộ iCloud",
  `${site.ai.weeklyFree} lượt hỏi Milu AI mỗi tuần`,
  `+${site.ai.stepBonus} lượt thưởng cho mỗi bước Làm quen với Milu`,
];

const pro: { text: string; soon?: boolean }[] = [
  { text: "Mọi thứ của bản miễn phí" },
  { text: `${site.ai.weeklyPro} lượt hỏi Milu AI mỗi tuần` },
  { text: "Khoá app bằng Face ID" },
  { text: "Xuất báo cáo PDF và Excel", soon: true },
];

/** Miễn phí and Milu Pro, as the app's paywall offers them. */
export function Pricing() {
  const [plan, setPlan] = useState<Plan>("yearly");
  const price = plan === "yearly" ? yearly : monthly;

  return (
    <section id="pro" className="py-24 sm:py-32">
      <div className="mx-auto max-w-5xl px-5 sm:px-8">
        <Reveal>
          <SectionHead label="Milu Pro" title="Dùng miễn phí, lên Pro khi cần">
            Ghi chép thì miễn phí. Milu Pro dành cho ai muốn trò chuyện với Milu AI nhiều hơn.
          </SectionHead>
        </Reveal>

        <div className="mt-14 grid gap-5 md:grid-cols-2">
          <Reveal className="flex">
            <div className="flex flex-1 flex-col rounded-[32px] border border-line bg-surface p-7 sm:p-8">
              <h3 className="text-[22px] font-black">Miễn phí</h3>
              <p className="mt-1 text-[15px] text-ink-2">Đủ để giữ sổ sách gọn gàng mỗi ngày.</p>
              <p className="mt-7 text-[44px] leading-none font-black tracking-[-0.02em]">{vnd(0)}</p>
              <p className="mt-2 text-[14px] font-semibold text-ink-2">Không cần tạo tài khoản</p>
              <List className="mt-8" items={free.map((text) => ({ text }))} />
            </div>
          </Reveal>

          <Reveal delay={0.1} className="flex">
            <div className="relative flex flex-1 flex-col overflow-hidden rounded-[32px] border border-action bg-surface p-7 sm:p-8">
              <div aria-hidden="true" className="absolute -top-24 -right-24 size-64 rounded-full bg-honey blur-2xl" />
              <div className="relative flex items-center justify-between gap-4">
                <h3 className="flex items-center gap-2 text-[22px] font-black">
                  <Emoji code="1f451" size={28} />
                  Milu Pro
                </h3>
                <div role="group" aria-label="Kỳ thanh toán" className="flex rounded-full bg-ink/6 p-1 text-[13px] font-extrabold">
                  {(["monthly", "yearly"] as const).map((option) => (
                    <button
                      key={option}
                      type="button"
                      aria-pressed={plan === option}
                      onClick={() => setPlan(option)}
                      className={cn(
                        "relative cursor-pointer rounded-full px-3.5 py-1.5 transition-colors",
                        plan === option ? "text-on-action" : "text-ink-2 hover:text-ink",
                      )}
                    >
                      {plan === option && (
                        <motion.span layoutId="plan" transition={press} className="absolute inset-0 rounded-full bg-action" />
                      )}
                      <span className="relative">{option === "monthly" ? "Tháng" : "Năm"}</span>
                    </button>
                  ))}
                </div>
              </div>
              <p className="relative mt-1 text-[15px] text-ink-2">Một câu nói là xong, Milu lo phần còn lại.</p>

              <div className="relative mt-7 flex items-end gap-2">
                <AnimatePresence mode="popLayout" initial={false}>
                  <motion.p
                    key={plan}
                    className="text-[44px] leading-none font-black tracking-[-0.02em]"
                    initial={{ opacity: 0, y: 18 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -18 }}
                    transition={{ duration: 0.25 }}
                  >
                    {vnd(price)}
                  </motion.p>
                </AnimatePresence>
                <p className="pb-1 text-[16px] font-bold text-ink-2">/{plan === "yearly" ? "năm" : "tháng"}</p>
              </div>
              <p className="relative mt-2 h-5 text-[14px] font-semibold text-ink-2">
                {plan === "yearly" ? (
                  <>
                    Khoảng {vnd(Math.round(yearly / 12 / 50) * 50)}/tháng ·{" "}
                    <span className="font-extrabold text-income">Tiết kiệm {saving}%</span>
                  </>
                ) : (
                  "Huỷ bất cứ lúc nào"
                )}
              </p>
              <List className="relative mt-8" items={pro} />
            </div>
          </Reveal>
        </div>

        <p className="mx-auto mt-8 max-w-2xl text-center text-[13px] leading-[1.6] font-semibold text-ink-3">
          Milu Pro mua qua App Store, tự gia hạn đến khi bạn huỷ; huỷ bất cứ lúc nào trong Cài đặt › Apple ID. Giá là giá
          dự kiến và có thể thay đổi khi Milu lên App Store.
        </p>
      </div>
    </section>
  );
}

function List({ items, className }: { items: { text: string; soon?: boolean }[]; className?: string }) {
  return (
    <ul className={cn("space-y-3.5", className)}>
      {items.map((item) => (
        <li key={item.text} className="flex items-start gap-3 text-[16px] leading-snug font-semibold">
          <Icon name="checkmark-circle-02" size={22} className="mt-px shrink-0 text-income" />
          <span>
            {item.text}
            {item.soon && (
              <span className="ml-2 rounded-full bg-ink/6 px-2 py-0.5 text-[12px] font-extrabold text-ink-2">Sắp có</span>
            )}
          </span>
        </li>
      ))}
    </ul>
  );
}
