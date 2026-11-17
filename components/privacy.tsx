import Link from "next/link";
import { Icon } from "@/components/icon";
import { Reveal } from "@/components/motion";
import type { HugeiconName } from "@/lib/hugeicons";

/** What the app's privacy policy says, in four cards. */
const promises: { icon: HugeiconName; title: string; text: string }[] = [
  {
    icon: "smart-phone-01",
    title: "Lưu trên iPhone và iCloud của bạn",
    text: "Milu không có máy chủ lưu dữ liệu và không xem được iCloud của bạn. Đổi máy cùng Apple ID, dữ liệu tự về.",
  },
  {
    icon: "security-check",
    title: "Không quảng cáo, không theo dõi",
    text: "Không công cụ phân tích, không bán hay chia sẻ dữ liệu của bạn cho ai.",
  },
  {
    icon: "ai-magic",
    title: "AI chạy trên máy chủ riêng của Milu",
    text: "Không qua dịch vụ AI bên ngoài. Xử lý xong là bỏ: không lưu, không ghi nhật ký, không dùng để huấn luyện AI.",
  },
  {
    icon: "user",
    title: "Không cần tạo tài khoản",
    text: "Mở app là dùng. Milu không xin quyền vị trí, ảnh hay danh bạ của iPhone.",
  },
];

export function Privacy() {
  return (
    <section id="rieng-tu" className="bg-mist py-24 sm:py-32">
      <div className="mx-auto grid max-w-6xl gap-12 px-5 sm:px-8 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
        <Reveal className="lg:sticky lg:top-32 lg:self-start">
          <p className="text-[12px] font-extrabold tracking-[0.14em] text-action uppercase">Riêng tư</p>
          <h2 className="mt-4 text-[clamp(2rem,4.6vw,3.25rem)] leading-[1.12] font-black tracking-[-0.02em]">
            Sổ sách của bạn,
            <br />
            chỉ bạn xem.
          </h2>
          <p className="mt-5 max-w-[28rem] text-[18px] leading-[1.65] text-ink-2">
            Chuyện tiền nong là chuyện riêng. Số liệu ở lại với bạn; chỉ phần cần thiết mới được gửi đi khi bạn hỏi
            Milu AI hoặc nói bằng giọng.
          </p>
          <Link
            href="/quyen-rieng-tu"
            className="group mt-7 inline-flex items-center gap-1.5 text-[16px] font-extrabold text-action"
          >
            Đọc Chính sách quyền riêng tư
            <Icon name="arrow-right-01" size={18} className="transition-transform duration-200 group-hover:translate-x-1" />
          </Link>
        </Reveal>

        <ul className="grid gap-4 sm:grid-cols-2">
          {promises.map((promise, index) => (
            <li key={promise.title} className="flex">
              <Reveal delay={index * 0.08} className="flex flex-1">
                <div className="flex-1 rounded-[28px] border border-line bg-surface p-6">
                  <span className="grid size-12 place-items-center rounded-2xl bg-mist text-glyph">
                    <Icon name={promise.icon} size={26} />
                  </span>
                  <h3 className="mt-5 text-[19px] leading-snug font-extrabold">{promise.title}</h3>
                  <p className="mt-2 text-[15px] leading-[1.6] text-ink-2">{promise.text}</p>
                </div>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
