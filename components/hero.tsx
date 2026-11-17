"use client";

import {
  AnimatePresence,
  motion,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from "motion/react";
import { useRef, useState } from "react";
import { AppStoreButton } from "@/components/app-store-button";
import { Cloud, Emoji, SkyArt } from "@/components/art";
import { Icon } from "@/components/icon";
import { MiluRive } from "@/components/milu-rive";
import { ease } from "@/components/motion";
import { site, vnd } from "@/lib/site";
import { cn, u } from "@/lib/u";

const headline = [
  ["Bạn", "cứ", "vi", "vu,"],
  ["chi", "thu", "có"],
];

/** What Milu says: its hello first, then one of these for every pat. */
const barks = ["Gâu! Chào bạn nha", "Gâu gâu!", "Nhột quá à!", "Hì, thấy rồi nha", "Milu thương bạn!", "Ơ, gì thế?"];

const clouds = [
  { top: "13%", width: 150, time: "110s", delay: "-20s", opacity: 0.9 },
  { top: "30%", width: 96, time: "150s", delay: "-95s", opacity: 0.7 },
  { top: "52%", width: 190, time: "130s", delay: "-60s", opacity: 0.8 },
  { top: "70%", width: 120, time: "170s", delay: "-140s", opacity: 0.6 },
];

const stars = [
  [8, 14], [17, 32], [26, 9], [39, 22], [47, 12], [58, 30], [66, 8], [74, 20], [83, 11], [92, 27], [12, 48], [88, 44],
];

const petals = [
  { left: "22%", top: "44%", time: "9s", delay: "0s" },
  { left: "30%", top: "40%", time: "11s", delay: "-4s" },
  { left: "36%", top: "47%", time: "10s", delay: "-7s" },
  { left: "18%", top: "50%", time: "12s", delay: "-2s" },
];

export function Hero() {
  const section = useRef<HTMLElement>(null);
  const [bark, setBark] = useState(0);

  // The page scrolls: the words leave a little faster than the garden.
  const { scrollYProgress } = useScroll({ target: section, offset: ["start start", "end start"] });
  const wordsY = useTransform(scrollYProgress, [0, 1], [0, -60]);
  const wordsOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const stageY = useTransform(scrollYProgress, [0, 1], [0, 70]);

  // The pointer moves over the garden: the cards float at their own depths.
  const px = useSpring(useMotionValue(0), { stiffness: 90, damping: 18 });
  const py = useSpring(useMotionValue(0), { stiffness: 90, damping: 18 });

  return (
    <section ref={section} className="relative isolate overflow-hidden pt-28 pb-14 sm:pt-36 lg:pb-24">
      <HeroSky />

      <div className="mx-auto grid max-w-6xl items-center gap-14 px-5 sm:px-8 lg:grid-cols-[1.2fr_1fr] lg:gap-8">
        <motion.div style={{ y: wordsY, opacity: wordsOpacity }} className="max-lg:text-center">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease }}
            className="inline-flex items-center gap-1.5 text-[12px] font-extrabold tracking-[0.14em] text-ink-2 uppercase"
          >
            <Icon name="paw-print" size={15} />
            Milu đồng hành
          </motion.p>

          <h1 className="mt-5 text-[clamp(2.6rem,6.2vw,4.4rem)] leading-[1.08] font-black tracking-[-0.025em]">
            {headline.map((line, row) => (
              <span key={row} className="block">
                {line.map((word, index) => (
                  <Word key={word} order={row * 4 + index}>
                    {word}
                  </Word>
                ))}
                {row === 1 && (
                  <Word order={7}>
                    <span className="relative whitespace-nowrap">
                      Milu.
                      <svg
                        viewBox="0 0 200 18"
                        aria-hidden="true"
                        preserveAspectRatio="none"
                        className="absolute -bottom-[0.14em] left-0 h-[0.2em] w-[92%] overflow-visible"
                      >
                        <motion.path
                          d="M4 12 C 40 2, 70 16, 104 8 S 168 4, 196 10"
                          fill="none"
                          stroke="var(--apricot)"
                          strokeWidth="7"
                          strokeLinecap="round"
                          initial={{ pathLength: 0 }}
                          animate={{ pathLength: 1 }}
                          transition={{ duration: 0.7, ease: "easeOut", delay: 1.1 }}
                        />
                      </svg>
                    </span>
                  </Word>
                )}
              </span>
            ))}
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease, delay: 0.75 }}
            className="mt-6 max-w-[34rem] text-[18px] leading-[1.65] text-ink-2 max-lg:mx-auto sm:text-[19px]"
          >
            Milu là app quản lý tài chính cá nhân cho iPhone. Ghi thu chi một chạm, hoặc chỉ cần nói: số dư, hạng
            mục và báo cáo, Milu tự lo.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease, delay: 0.9 }}
            className="mt-9 flex flex-wrap items-center gap-3 max-lg:justify-center"
          >
            <AppStoreButton href="#tai-ve" />
            <a
              href="#tinh-nang"
              className="inline-flex h-14 items-center gap-2 rounded-2xl border border-line bg-surface px-5 text-[16px] font-extrabold text-action transition-transform duration-200 ease-out hover:-translate-y-0.5 active:scale-[0.97]"
            >
              Xem Milu làm được gì
              <Icon name="arrow-down-01" size={18} />
            </a>
          </motion.div>

          <motion.ul
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.15 }}
            className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-[14px] font-bold text-ink-2 max-lg:justify-center"
          >
            {["Không cần tạo tài khoản", "Không quảng cáo", "Tiếng Việt, tiền VND"].map((fact) => (
              <li key={fact} className="inline-flex items-center gap-1.5">
                <Icon name="tick-02" size={17} className="text-income" />
                {fact}
              </li>
            ))}
          </motion.ul>
        </motion.div>

        {/* The garden of Tổng quan, with Milu on it */}
        <motion.div
          style={{ y: stageY }}
          className="stage relative mx-auto w-full max-w-[30rem] lg:mr-0 lg:max-w-[33rem]"
          onPointerMove={(event) => {
            if (event.pointerType !== "mouse") return;
            const box = event.currentTarget.getBoundingClientRect();
            px.set((event.clientX - box.left) / box.width - 0.5);
            py.set((event.clientY - box.top) / box.height - 0.5);
          }}
          onPointerLeave={() => {
            px.set(0);
            py.set(0);
          }}
        >
          <div className="ui relative">
            <motion.div
              initial={{ opacity: 0, scale: 0.94, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.9, ease, delay: 0.25 }}
              className="sky-garden relative aspect-[402/470] overflow-hidden shadow-float"
              style={{ borderRadius: u(46) }}
            >
              <Drift x={px} y={py} depth={-10} className="absolute inset-x-[-4%] bottom-[-2%]">
                <SkyArt scene="tong-quan" priority className="block h-auto w-full" />
              </Drift>

              {petals.map((petal, index) => (
                <span
                  key={index}
                  aria-hidden="true"
                  className="petal absolute rounded-[50%_50%_50%_0]"
                  style={
                    {
                      left: petal.left,
                      top: petal.top,
                      width: u(7),
                      height: u(10),
                      background: "var(--petal)",
                      "--petal-time": petal.time,
                      "--petal-delay": petal.delay,
                    } as React.CSSProperties
                  }
                />
              ))}

              {/* Milu comes up from under the edge and stops on it, with no bounce in the rise: it is
                  a head with no body, and an overshoot would lift its flat foot into view. The
                  stretch that follows is pinned at the foot. */}
              <motion.div
                initial={{ y: "70%" }}
                animate={{ y: 0 }}
                transition={{ type: "spring", duration: 0.8, bounce: 0, delay: 0.7 }}
                className="absolute right-[3%] bottom-0 w-[72%]"
              >
                <motion.div
                  style={{ originY: 1 }}
                  initial={{ scaleY: 0.9, scaleX: 1.04 }}
                  animate={{ scaleY: 1, scaleX: 1 }}
                  transition={{ type: "spring", duration: 0.7, bounce: 0.55, delay: 1.25 }}
                >
                  <MiluRive
                    scene="overview"
                    className="w-full"
                    onPet={() => setBark((n) => (n % (barks.length - 1)) + 1)}
                  />
                </motion.div>
              </motion.div>

              <div className="absolute" style={{ right: u(18), top: u(258) }} aria-live="polite">
                <AnimatePresence mode="wait">
                  <motion.p
                    key={bark}
                    initial={{ opacity: 0, scale: 0.6, y: 10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.85 }}
                    transition={{ type: "spring", duration: 0.45, bounce: 0.4, delay: bark === 0 ? 1.5 : 0 }}
                    className="origin-bottom-left bg-surface font-extrabold text-ink shadow-float"
                    style={{
                      fontSize: u(15),
                      padding: `${u(9)} ${u(15)}`,
                      borderRadius: `${u(18)} ${u(18)} ${u(18)} ${u(5)}`,
                    }}
                  >
                    {barks[bark]}
                  </motion.p>
                </AnimatePresence>
              </div>
            </motion.div>

            {/* What floats around the garden */}
            <Float x={px} y={py} depth={26} delay={1.25} className="top-[8%] left-[-7%] max-lg:left-[2%]">
              <div
                className="flex items-center bg-surface shadow-float"
                style={{ gap: u(10), padding: `${u(10)} ${u(14)} ${u(10)} ${u(10)}`, borderRadius: u(20) }}
              >
                <Emoji code="2615" size={64} style={{ width: u(34), height: u(34) }} />
                <div>
                  <p className="font-extrabold text-ink" style={{ fontSize: u(15) }}>
                    Cà phê
                  </p>
                  <p className="font-semibold text-ink-2" style={{ fontSize: u(12) }}>
                    Vừa ghi bằng giọng nói
                  </p>
                </div>
                <p className="font-extrabold text-ink" style={{ fontSize: u(15), marginLeft: u(6) }}>
                  {vnd(-35000)}
                </p>
              </div>
            </Float>

            <Float x={px} y={py} depth={-18} delay={1.4} className="top-[24%] right-[-8%] max-lg:right-[2%]">
              <div className="bg-surface shadow-float" style={{ padding: u(12), borderRadius: u(20), width: u(184) }} >
                <div className="flex items-center" style={{ gap: u(8) }}>
                  <Emoji code="1f697" size={56} style={{ width: u(28), height: u(28) }} />
                  <div>
                    <p className="font-extrabold text-ink" style={{ fontSize: u(14) }}>
                      Mua xe
                    </p>
                    <p className="font-semibold text-ink-2" style={{ fontSize: u(11.5) }}>
                      Hũ tiết kiệm
                    </p>
                  </div>
                  <p className="ml-auto font-black text-deep" style={{ fontSize: u(15) }}>
                    30%
                  </p>
                </div>
                <div className="overflow-hidden rounded-full bg-line" style={{ height: u(7), marginTop: u(9) }}>
                  <motion.div
                    className="h-full rounded-full bg-deep"
                    initial={{ width: 0 }}
                    animate={{ width: "30%" }}
                    transition={{ duration: 1, ease: "easeOut", delay: 1.9 }}
                  />
                </div>
              </div>
            </Float>

            <Float x={px} y={py} depth={34} delay={1.55} className="bottom-[7%] left-[-6%] max-lg:left-[2%]">
              {/* A solid card like the other two: glass under the pop-in's fade shows no blur until the
                  fade ends, so the pill looked see-through and then jumped to solid. */}
              <div
                className="flex items-center bg-surface font-bold text-ink shadow-float"
                style={{ gap: u(7), padding: `${u(9)} ${u(15)} ${u(9)} ${u(11)}`, borderRadius: u(999), fontSize: u(15) }}
              >
                <Emoji code="2728" size={44} className="animate-sparkle" style={{ width: u(22), height: u(22) }} />
                Hỏi Milu
              </div>
            </Float>
          </div>
        </motion.div>
      </div>

      <p className="sr-only">{site.description}</p>
    </section>
  );
}

function Word({ children, order }: { children: React.ReactNode; order: number }) {
  return (
    <motion.span
      className="mr-[0.24em] inline-block last:mr-0"
      initial={{ opacity: 0, y: "0.5em", filter: "blur(10px)" }}
      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      transition={{ duration: 0.8, ease, delay: 0.15 + order * 0.07 }}
    >
      {children}
    </motion.span>
  );
}

/** Moves a little with the pointer: `depth` pixels at the stage's edge. */
function Drift({
  x,
  y,
  depth,
  className,
  children,
}: {
  x: MotionValue<number>;
  y: MotionValue<number>;
  depth: number;
  className?: string;
  children: React.ReactNode;
}) {
  const dx = useTransform(x, (v) => v * depth);
  const dy = useTransform(y, (v) => v * depth);
  return (
    <motion.div style={{ x: dx, y: dy }} className={className}>
      {children}
    </motion.div>
  );
}

/** A card beside the garden: pops in, bobs, and drifts with the pointer. */
function Float({
  x,
  y,
  depth,
  delay,
  className,
  children,
}: {
  x: MotionValue<number>;
  y: MotionValue<number>;
  depth: number;
  delay: number;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <Drift x={x} y={y} depth={depth} className={cn("absolute z-10", className)}>
      <motion.div
        initial={{ opacity: 0, scale: 0.7, y: 16 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ type: "spring", duration: 0.7, bounce: 0.4, delay }}
      >
        <div className="animate-floaty" style={{ animationDelay: `${-delay * 2}s` }}>
          {children}
        </div>
      </motion.div>
    </Drift>
  );
}

/** The sky behind the top of the page: Milu's sky blue by day, deep blue with stars at night. */
function HeroSky() {
  return (
    <div
      aria-hidden="true"
      className="absolute inset-0 -z-10 overflow-hidden"
      style={{ background: "linear-gradient(to bottom, var(--sky) 0%, var(--mist) 48%, var(--canvas) 100%)" }}
    >
      {stars.map(([left, top], index) => (
        <span
          key={index}
          className="absolute hidden size-[3px] animate-twinkle rounded-full bg-ink dark:block"
          style={{ left: `${left}%`, top: `${top}%`, animationDelay: `${-index * 0.7}s` }}
        />
      ))}
      {clouds.map((cloud, index) => (
        <Cloud
          key={index}
          className="cloud absolute left-0"
          style={
            {
              top: cloud.top,
              width: cloud.width,
              opacity: cloud.opacity,
              "--drift-time": cloud.time,
              "--drift-delay": cloud.delay,
            } as React.CSSProperties
          }
        />
      ))}
    </div>
  );
}
