import type { Metadata } from "next";
import Link from "next/link";
import { Cloud, Face } from "@/components/art";
import { SiteFooter } from "@/components/site-footer";
import { SiteNav } from "@/components/site-nav";

export const metadata: Metadata = {
  title: "Không tìm thấy trang",
};

/** Any address the site does not have: Milu, puzzled, and the way home. */
export default function NotFound() {
  return (
    <>
      <SiteNav />
      <main className="flex flex-1 items-center px-5 pt-32 pb-24 sm:px-8 sm:pt-40">
        <div className="mx-auto w-full max-w-xl text-center">
          {/* Milu stands on the card's lower edge: a head with no body, its foot never shows. */}
          <div className="sky-brand relative mx-auto aspect-[16/10] w-full max-w-[26rem] overflow-hidden rounded-[40px] shadow-float">
            <Cloud className="absolute top-[16%] left-[9%] w-[20%] animate-floaty" />
            <Cloud className="absolute top-[34%] right-[8%] w-[14%] animate-floaty opacity-80 [animation-delay:-2s]" />
            <p className="absolute top-[12%] right-[10%] rounded-[18px_18px_18px_5px] bg-surface px-4 py-2 text-[15px] font-extrabold shadow-float">
              Ơ, gì thế?
            </p>
            <Face name="ngao-ngo" className="absolute bottom-0 left-[8%] block h-auto w-[84%]" />
          </div>

          <p className="mt-10 text-[12px] font-extrabold tracking-[0.14em] text-action uppercase">Lỗi 404</p>
          <h1 className="mt-4 text-[clamp(2rem,5vw,3rem)] leading-[1.12] font-black tracking-[-0.02em] text-balance">
            Milu tìm không ra trang này
          </h1>
          <p className="mx-auto mt-5 max-w-md text-[18px] leading-[1.65] text-ink-2">
            Có thể đường link đã cũ, hoặc địa chỉ bị gõ nhầm. Về trang chủ là gặp lại Milu ngay.
          </p>

          <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/"
              className="inline-flex h-13 items-center rounded-2xl bg-action px-6 text-[16px] font-extrabold text-on-action transition-[background-color,transform] duration-200 hover:bg-action-pressed active:scale-[0.97]"
            >
              Về trang chủ
            </Link>
            <Link
              href="/ho-tro"
              className="inline-flex h-13 items-center rounded-2xl border border-line bg-surface px-6 text-[16px] font-extrabold text-action transition-transform duration-200 active:scale-[0.97]"
            >
              Cần hỗ trợ
            </Link>
          </div>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
