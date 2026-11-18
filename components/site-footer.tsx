import Link from "next/link";
import { AppIcon } from "@/components/art";
import { nav, site } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className="border-t border-line bg-surface">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-14 sm:px-8 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
        <div>
          <Link href="/" className="inline-flex items-center gap-2.5" aria-label="Milu, về đầu trang">
            <AppIcon size={40} />
            <span className="text-[24px] font-black tracking-[-0.01em] text-deep">Milu</span>
          </Link>
          <p className="mt-4 max-w-[18rem] text-[15px] leading-[1.6] text-ink-2">{site.tagline}</p>
        </div>

        <Column title="Milu">
          {nav.map((item) => (
            <FooterLink key={item.href} href={item.href}>
              {item.label}
            </FooterLink>
          ))}
        </Column>

        <Column title="Pháp lý">
          <FooterLink href="/quyen-rieng-tu">Chính sách quyền riêng tư</FooterLink>
          <FooterLink href="/dieu-khoan">Điều khoản sử dụng</FooterLink>
        </Column>

        <Column title="Liên hệ">
          <li>
            <a
              href={`mailto:${site.supportEmail}`}
              className="text-[15px] font-semibold break-all text-ink-2 transition-colors hover:text-action"
            >
              {site.supportEmail}
            </a>
          </li>
          <FooterLink href="/ho-tro">Hỗ trợ</FooterLink>
          <FooterLink href="/#tai-ve">Tải Milu</FooterLink>
        </Column>
      </div>

      <div className="border-t border-line">
        <div className="mx-auto max-w-6xl space-y-2 px-5 py-6 text-[13px] leading-[1.6] font-semibold text-ink-3 sm:px-8">
          <p>© 2026 Milu.</p>
          <p>
            Phông chữ Nunito (OFL). Hình emoji Fluent Emoji của Microsoft (MIT). Biểu tượng Hugeicons. Milu chuyển động
            bằng Rive. Apple, iPhone, iCloud, Face ID và App Store là nhãn hiệu của Apple Inc.
          </p>
        </div>
      </div>
    </footer>
  );
}

function Column({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <p className="text-[12px] font-extrabold tracking-[0.14em] text-ink uppercase">{title}</p>
      <ul className="mt-4 space-y-2.5">{children}</ul>
    </div>
  );
}

function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <li>
      <Link href={href} className="text-[15px] font-semibold text-ink-2 transition-colors hover:text-action">
        {children}
      </Link>
    </li>
  );
}
