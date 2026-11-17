import { AppStoreButton } from "@/components/app-store-button";
import { AppIcon, Face, SkyArt } from "@/components/art";
import { Reveal } from "@/components/motion";
import { site } from "@/lib/site";

/** The last word: Milu on Thu chi's sky, and the way to the App Store. */
export function Download() {
  const live = site.appStoreUrl !== null;

  return (
    <section id="tai-ve" className="px-3 py-24 sm:px-5 sm:py-32">
      <Reveal y={40} scale={0.97} className="mx-auto max-w-6xl">
        <div className="sky-plane relative isolate overflow-hidden rounded-[40px] shadow-float sm:rounded-[56px]">
          {/* The sky of Thu chi, turned so its paper plane flies on the side the words leave free. */}
          <SkyArt scene="thu-chi" className="absolute inset-x-0 bottom-0 -z-10 block h-auto w-full -scale-x-100" />

          <div className="px-6 pt-14 pb-64 max-lg:text-center sm:px-12 sm:pt-20 lg:w-[56%] lg:pb-24 lg:pl-16">
            <AppIcon size={84} className="shadow-float" />
            <h2 className="mt-7 text-[clamp(2.1rem,5vw,3.5rem)] leading-[1.1] font-black tracking-[-0.02em]">
              Sẵn sàng vi vu
              <br />
              cùng Milu?
            </h2>
            <p className="mt-5 max-w-[30rem] text-[18px] leading-[1.65] text-ink-2 max-lg:mx-auto">
              {live
                ? "Milu đã có trên App Store. Tải về, ghi khoản đầu tiên, phần còn lại để Milu lo."
                : "Milu đang hoàn thiện những nét cuối và sẽ sớm có trên App Store."}
            </p>

            <div className="mt-9 flex max-lg:justify-center">
              <AppStoreButton />
            </div>
            <p className="mt-5 text-[14px] leading-[1.6] font-bold text-ink-2">
              Cho iPhone, iOS {site.minIOS} trở lên · Tiếng Việt · Không cần tạo tài khoản
            </p>
          </div>

          <Reveal
            y={60}
            delay={0.3}
            className="absolute bottom-0 w-[min(24rem,74%)] max-lg:inset-x-0 max-lg:mx-auto lg:right-[9%] lg:w-[34%]"
          >
            <Face name="vui" className="block h-auto w-full" />
          </Reveal>
        </div>
      </Reveal>
    </section>
  );
}
