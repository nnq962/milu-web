import type { Metadata } from "next";
import Link from "next/link";
import { FaqList } from "@/components/faq";
import { Icon } from "@/components/icon";
import { SiteFooter } from "@/components/site-footer";
import { SiteNav } from "@/components/site-nav";
import type { HugeiconName } from "@/lib/hugeicons";
import { openGraph, site } from "@/lib/site";

const path = "/ho-tro";
const title = "Hỗ trợ";
const description =
  "Câu hỏi thường gặp về Milu, cách quản lý gói Milu Pro, xoá dữ liệu, và địa chỉ để viết thư cho Milu.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: path },
  openGraph: { ...openGraph, title: `${title} · ${site.name}`, description, url: path },
};

/** How to do the things people write in about, as the app's own pages describe them. */
const guides: { icon: HugeiconName; title: string; text: string }[] = [
  {
    icon: "crown",
    title: "Quản lý hoặc huỷ Milu Pro",
    text: "Trên iPhone, mở Cài đặt › Apple ID › Đăng ký. Huỷ rồi bạn vẫn dùng Milu Pro tới hết kỳ đã trả.",
  },
  {
    icon: "history",
    title: "Khôi phục gói đã mua",
    text: "Mở màn Milu Pro trong app rồi chọn Khôi phục.",
  },
  {
    icon: "cloud",
    title: "Đổi máy hoặc cài lại app",
    text: "Đăng nhập iCloud bằng cùng Apple ID, dữ liệu tự về. Milu không cần tài khoản riêng.",
  },
  {
    icon: "delete-02",
    title: "Xoá toàn bộ dữ liệu",
    text: "Chọn “Xoá toàn bộ dữ liệu” ở cuối Cài đặt của Milu: mọi số liệu và cài đặt được xoá, cả trong iCloud và trên các thiết bị khác của bạn.",
  },
];

/** Hỗ trợ: where to write, how to do the usual things, and the questions people ask. */
export default function SupportPage() {
  return (
    <>
      <SiteNav />
      <main className="flex-1 pt-32 pb-24 sm:pt-40">
        <div className="mx-auto max-w-3xl px-5 sm:px-8">
          <p className="text-[12px] font-extrabold tracking-[0.14em] text-action uppercase">Hỗ trợ</p>
          <h1 className="mt-4 text-[clamp(2.1rem,5vw,3.25rem)] leading-[1.12] font-black tracking-[-0.02em]">
            Milu giúp gì được bạn?
          </h1>
          <p className="mt-5 max-w-xl text-[18px] leading-[1.65] text-ink-2">
            Xem cách làm những việc hay gặp và các câu hỏi thường gặp ở dưới. Chưa thấy điều bạn cần thì viết thư cho
            Milu.
          </p>

          <a
            href={`mailto:${site.supportEmail}`}
            className="group mt-10 flex items-center gap-4 rounded-[28px] border border-line bg-surface p-6 transition-shadow duration-300 hover:shadow-float"
          >
            <span className="grid size-12 shrink-0 place-items-center rounded-2xl bg-mist text-glyph">
              <Icon name="mail-01" size={26} />
            </span>
            <span className="min-w-0 flex-1">
              <span className="block text-[19px] leading-snug font-extrabold">Viết cho Milu</span>
              <span className="mt-0.5 block text-[16px] font-bold break-all text-action">{site.supportEmail}</span>
            </span>
            <Icon
              name="arrow-right-01"
              size={22}
              className="shrink-0 text-ink-3 transition-transform duration-200 group-hover:translate-x-1"
            />
          </a>

          <h2 className="mt-16 text-[24px] leading-snug font-black">Những việc hay gặp</h2>
          <ul className="mt-5 grid gap-4 sm:grid-cols-2">
            {guides.map((guide) => (
              <li key={guide.title} className="rounded-[28px] border border-line bg-surface p-6">
                <span className="grid size-11 place-items-center rounded-2xl bg-mist text-glyph">
                  <Icon name={guide.icon} size={24} />
                </span>
                <h3 className="mt-4 text-[18px] leading-snug font-extrabold">{guide.title}</h3>
                <p className="mt-2 text-[15px] leading-[1.6] text-ink-2">{guide.text}</p>
              </li>
            ))}
          </ul>

          <h2 className="mt-16 text-[24px] leading-snug font-black">Câu hỏi thường gặp</h2>
          <div className="mt-5">
            <FaqList firstOpen={false} />
          </div>

          <p className="mt-10 text-[15px] leading-[1.7] font-semibold text-ink-2">
            Cách Milu lưu và xử lý dữ liệu nằm trong{" "}
            <Link href="/quyen-rieng-tu" className="font-extrabold text-action underline-offset-4 hover:underline">
              Chính sách quyền riêng tư
            </Link>
            ; quy định về Milu AI và Milu Pro nằm trong{" "}
            <Link href="/dieu-khoan" className="font-extrabold text-action underline-offset-4 hover:underline">
              Điều khoản sử dụng
            </Link>
            .
          </p>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
