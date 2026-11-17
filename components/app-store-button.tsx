import { AppleMark } from "@/components/icon";
import { site } from "@/lib/site";
import { cn } from "@/lib/u";

/**
 * The download button. While `site.appStoreUrl` is empty it says "Sắp có trên App Store" and
 * leads to the download section; with a link it opens the App Store.
 */
export function AppStoreButton({ className, href }: { className?: string; href?: string }) {
  const live = site.appStoreUrl !== null;
  const target = site.appStoreUrl ?? href;
  const body = (
    <>
      <AppleMark size={30} className="-mt-0.5 shrink-0" />
      <span className="text-left">
        <span className="block text-[11px] leading-none font-semibold opacity-80">
          {live ? "Tải về trên" : "Sắp có trên"}
        </span>
        <span className="mt-0.5 block text-[21px] leading-none font-extrabold tracking-[-0.01em]">App Store</span>
      </span>
    </>
  );
  const look = cn(
    "inline-flex h-14 items-center gap-2.5 rounded-2xl bg-ink px-5 text-canvas shadow-float",
    target && "transition-transform duration-200 ease-out hover:-translate-y-0.5 active:scale-[0.97]",
    className,
  );

  if (!target) {
    return (
      <span className={look} role="img" aria-label="Sắp có trên App Store">
        {body}
      </span>
    );
  }
  return (
    <a
      href={target}
      className={look}
      aria-label={live ? "Tải Milu trên App Store" : "Milu sắp có trên App Store"}
      {...(live ? { target: "_blank", rel: "noopener noreferrer" } : {})}
    >
      {body}
    </a>
  );
}
