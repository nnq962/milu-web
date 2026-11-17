"use client";

import { motion } from "motion/react";
import { AppIcon, Emoji, Face, SkyArt } from "@/components/art";
import { Icon } from "@/components/icon";
import { ease, Money, Reveal } from "@/components/motion";
import { SectionHead } from "@/components/stage";
import { toggleTheme } from "@/components/theme";
import { vnd } from "@/lib/site";
import { cn } from "@/lib/u";

const inView = { once: true, margin: "0px 0px -15% 0px" } as const;

/** What a report's bar is made of: the chart's five shades, largest first. */
const spending = [
  { name: "Ăn uống", share: 38, color: "var(--chart-1)" },
  { name: "Nhà cửa", share: 24, color: "var(--chart-2)" },
  { name: "Đi lại", share: 16, color: "var(--chart-3)" },
  { name: "Mua sắm", share: 13, color: "var(--chart-4)" },
  { name: "Giải trí", share: 9, color: "var(--chart-5)" },
];

/** The rest of the app, a tile each, with a small piece of the real thing in it. */
export function Bento() {
  return (
    <section className="pb-24 sm:pb-32">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <Reveal>
          <SectionHead label="Và còn nữa" title="Đủ đồ nghề cho một cuốn sổ tử tế">
            Những thứ nhỏ làm việc ghi chép bớt mệt, có sẵn từ lúc mở app.
          </SectionHead>
        </Reveal>

        <div className="mt-14 grid gap-4 md:grid-cols-6">
          <Tile className="md:col-span-3" emoji="1f91d" title="Vay nợ rõ ràng" text="Ai đang nợ bạn, bạn đang nợ ai. Tới hạn là Milu nhắc giúp.">
            <div className="rounded-[20px] border border-line p-4">
              <div className="flex items-center gap-3">
                <span className="grid size-10 place-items-center rounded-full bg-action/10 text-[16px] font-extrabold text-deep">
                  T
                </span>
                <div className="flex-1">
                  <p className="text-[16px] font-extrabold">Tuấn</p>
                  <p className="text-[13px] font-semibold text-ink-2">Cho vay · hạn 30/11</p>
                </div>
                <p className="text-[16px] font-extrabold">{vnd(5_000_000)}</p>
              </div>
              <Bar value={60} className="mt-4" color="var(--deep)" />
              <div className="mt-3 flex items-center justify-between text-[13px] font-semibold text-ink-2">
                <span>Đã thu {vnd(3_000_000)}</span>
                <span className="rounded-full bg-caution-soft px-2.5 py-1 font-extrabold text-caution">Còn 16 ngày</span>
              </div>
            </div>
          </Tile>

          <Tile
            className="md:col-span-3"
            emoji="1f3af"
            title="Hạn mức chi tiêu"
            text="Đặt hạn mức cho tháng. Milu báo khi bạn sắp chạm ngưỡng, và khi đã chạm."
          >
            <div className="rounded-[20px] border border-line p-4">
              <div className="flex items-baseline justify-between">
                <p className="text-[16px] font-extrabold">Ăn uống</p>
                <p className="text-[13px] font-semibold text-ink-2">Tháng 11</p>
              </div>
              <Bar value={86} className="mt-3" color="var(--caution)" />
              <div className="mt-3 flex items-center justify-between text-[13px] font-semibold text-ink-2">
                <span>
                  Đã chi <Money value={4_300_000} className="font-extrabold text-ink" /> / {vnd(5_000_000)}
                </span>
                <span className="font-extrabold text-caution">Còn {vnd(700_000)}</span>
              </div>
            </div>
          </Tile>

          <Tile className="md:col-span-2" emoji="1f4ca" title="Báo cáo dễ đọc" text="Tiền đi đâu, theo tuần hay theo tháng.">
            <div className="flex h-2.5 gap-0.5 overflow-hidden rounded-full">
              {spending.map((part, index) => (
                <motion.span
                  key={part.name}
                  className="h-full rounded-[2px]"
                  style={{ background: part.color }}
                  initial={{ width: 0 }}
                  whileInView={{ width: `${part.share}%` }}
                  viewport={inView}
                  transition={{ duration: 0.7, ease, delay: 0.15 + index * 0.08 }}
                />
              ))}
            </div>
            <ul className="mt-4 space-y-1.5">
              {spending.slice(0, 3).map((part) => (
                <li key={part.name} className="flex items-center gap-2 text-[14px] font-semibold text-ink-2">
                  <span className="size-2 rounded-full" style={{ background: part.color }} />
                  {part.name}
                  <span className="ml-auto font-extrabold text-ink">{part.share}%</span>
                </li>
              ))}
            </ul>
          </Tile>

          <Tile className="md:col-span-2" emoji="1f4c5" title="Giao dịch định kỳ" text="Khoản nào lặp lại, đặt một lần là xong.">
            <ul className="divide-y divide-line">
              {[
                { emoji: "1f3e0", name: "Tiền nhà", when: "Ngày 5 hàng tháng", amount: -4_500_000 },
                { emoji: "1f4bc", name: "Lương", when: "Ngày 28 hàng tháng", amount: 18_000_000 },
              ].map((rule) => (
                <li key={rule.name} className="flex items-center gap-3 py-2.5">
                  <Emoji code={rule.emoji} size={32} />
                  <div className="min-w-0 flex-1">
                    <p className="text-[15px] font-extrabold">{rule.name}</p>
                    <p className="truncate text-[13px] font-semibold text-ink-2">{rule.when}</p>
                  </div>
                  <p className={cn("text-[15px] font-extrabold", rule.amount > 0 && "text-income")}>
                    {vnd(rule.amount, { sign: true })}
                  </p>
                </li>
              ))}
            </ul>
          </Tile>

          <Tile className="md:col-span-2" icon="notification-01" title="Nhắc ghi mỗi ngày" text="Mỗi tối một câu, giọng hơi lầy.">
            <motion.div
              className="flex gap-3 rounded-[20px] bg-mist p-3.5"
              initial={{ opacity: 0, y: 14, scale: 0.94 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={inView}
              transition={{ type: "spring", duration: 0.6, bounce: 0.35, delay: 0.3 }}
            >
              <AppIcon size={38} />
              <div className="min-w-0">
                <div className="flex items-center gap-1.5">
                  <p className="text-[14px] font-extrabold">Ví ơi ví à</p>
                  <Emoji code="1f4b8" size={16} />
                  <p className="ml-auto text-[12px] font-semibold text-ink-3">21:00</p>
                </div>
                <p className="mt-0.5 text-[13px] leading-[1.45] font-semibold text-ink-2">
                  Tiêu như không có ngày mai mà không ghi là toang đó nha.
                </p>
              </div>
            </motion.div>
          </Tile>

          <Tile className="md:col-span-2" icon="cloud" title="Đồng bộ iCloud" text="Đổi máy hay cài lại app, dữ liệu tự về.">
            <div className="flex items-center justify-center gap-3 py-2 text-glyph">
              <Icon name="smart-phone-01" size={34} />
              <Dots />
              <span className="grid size-14 place-items-center rounded-full bg-mist">
                <Icon name="cloud" size={30} />
              </span>
              <Dots />
              <Icon name="smart-phone-01" size={34} />
            </div>
          </Tile>

          <Tile
            className="md:col-span-2"
            emoji="1f512"
            title="Khoá bằng Face ID"
            text="Chỉ bạn mở được Milu."
            badge="Pro"
          >
            <Face name="nhay-mat" className="mx-auto -mb-6 block h-auto w-[78%]" />
          </Tile>

          <Tile className="md:col-span-2" icon="eye" title="Sáng và tối" text="Một bầu trời, hai giao diện. Bấm thử xem.">
            <button
              type="button"
              aria-label="Đổi giao diện sáng hoặc tối"
              onClick={(event) => {
                const box = event.currentTarget.getBoundingClientRect();
                toggleTheme({ x: box.left + box.width / 2, y: box.top + box.height / 2 });
              }}
              className="group relative block h-24 w-full cursor-pointer overflow-hidden rounded-[20px] border border-line transition-transform duration-200 active:scale-[0.97]"
            >
              <SkyArt scene="thu-chi" className="absolute inset-0 size-full object-cover object-[50%_62%]" />
              <span className="glass absolute right-3 bottom-3 rounded-full border border-line px-3 py-1.5 text-[13px] font-extrabold text-ink">
                <span className="dark:hidden">Sang đêm</span>
                <span className="hidden dark:inline">Về ngày</span>
              </span>
            </button>
          </Tile>
        </div>
      </div>
    </section>
  );
}

function Tile({
  className,
  emoji,
  icon,
  title,
  text,
  badge,
  children,
}: {
  className?: string;
  emoji?: string;
  icon?: "notification-01" | "cloud" | "eye";
  title: string;
  text: string;
  badge?: string;
  children?: React.ReactNode;
}) {
  return (
    <motion.article
      className={cn(
        "flex flex-col overflow-hidden rounded-[28px] border border-line bg-surface p-6 transition-shadow duration-300 hover:shadow-float",
        className,
      )}
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -10% 0px" }}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.6, ease }}
    >
      <div className="flex items-start gap-4">
        {emoji ? (
          <Emoji code={emoji} size={44} />
        ) : (
          <span className="grid size-11 shrink-0 place-items-center rounded-2xl bg-mist text-glyph">
            {icon && <Icon name={icon} size={24} />}
          </span>
        )}
        <div className="flex-1">
          <h3 className="flex items-center gap-2 text-[19px] leading-snug font-extrabold">
            {title}
            {badge && (
              <span className="rounded-full bg-honey px-2 py-0.5 text-[11px] font-extrabold tracking-[0.08em] text-caution uppercase">
                {badge}
              </span>
            )}
          </h3>
          <p className="mt-1 text-[15px] leading-[1.55] text-ink-2">{text}</p>
        </div>
      </div>
      {children && <div className="mt-auto pt-5">{children}</div>}
    </motion.article>
  );
}

/** A progress bar as the app draws them: 8 points tall, the track in the quiet border. */
function Bar({ value, color, className }: { value: number; color: string; className?: string }) {
  return (
    <div className={cn("h-2 overflow-hidden rounded-full bg-line", className)}>
      <motion.div
        className="h-full rounded-full"
        style={{ background: color }}
        initial={{ width: 0 }}
        whileInView={{ width: `${value}%` }}
        viewport={inView}
        transition={{ duration: 1, ease, delay: 0.2 }}
      />
    </div>
  );
}

function Dots() {
  return (
    <span className="flex gap-1.5" aria-hidden="true">
      {[0, 1, 2].map((index) => (
        <span
          key={index}
          className="size-1.5 animate-twinkle rounded-full bg-action"
          style={{ animationDelay: `${index * 0.25}s`, animationDuration: "1.4s" }}
        />
      ))}
    </span>
  );
}
