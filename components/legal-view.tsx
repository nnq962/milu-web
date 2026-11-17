import Link from "next/link";
import { Icon } from "@/components/icon";
import { SiteFooter } from "@/components/site-footer";
import { SiteNav } from "@/components/site-nav";
import type { LegalDoc } from "@/lib/legal";

/** Chính sách quyền riêng tư or Điều khoản sử dụng, the words the app shows under Cài đặt → Về Milu. */
export function LegalView({ document }: { document: LegalDoc }) {
  return (
    <>
      <SiteNav />
      <main className="flex-1 pt-32 pb-24 sm:pt-40">
        <article className="mx-auto max-w-3xl px-5 sm:px-8">
          <Link href="/" className="group inline-flex items-center gap-1.5 text-[15px] font-extrabold text-action">
            <Icon
              name="arrow-right-01"
              size={18}
              className="rotate-180 transition-transform duration-200 group-hover:-translate-x-1"
            />
            Về trang chủ
          </Link>
          <h1 className="mt-6 text-[clamp(2.1rem,5vw,3.25rem)] leading-[1.12] font-black tracking-[-0.02em]">
            {document.title}
          </h1>
          <p className="mt-4 text-[15px] font-semibold text-ink-2">Cập nhật ngày {document.updated}</p>

          <div className="mt-10 overflow-hidden rounded-[28px] border border-line bg-surface">
            {document.entries.map((entry, index) => (
              <section key={entry.heading} className={index > 0 ? "border-t border-line p-6 sm:p-8" : "p-6 sm:p-8"}>
                <h2 className="text-[20px] leading-snug font-extrabold">{entry.heading}</h2>
                {entry.paragraphs.map((paragraph) => (
                  <p key={paragraph} className="mt-3 text-[16px] leading-[1.75] text-ink-2">
                    {paragraph}
                  </p>
                ))}
              </section>
            ))}
          </div>
        </article>
      </main>
      <SiteFooter />
    </>
  );
}
