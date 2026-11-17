import Image from "next/image";
import { cn } from "@/lib/u";

/** A Fluent Emoji 2D picture, the set the app draws its categories, jars and wallets with. */
export function Emoji({
  code,
  size = 32,
  className,
  style,
}: {
  code: string;
  size?: number;
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <Image
      src={`/milu/emoji/${code}.svg`}
      width={size}
      height={size}
      alt=""
      aria-hidden="true"
      draggable={false}
      className={cn("select-none", className)}
      style={style}
    />
  );
}

export type SkyScene = "tong-quan" | "tai-khoan" | "thu-chi";

/** One of the three tab skies (402 × 352), the day one or the night one with the page's look. */
export function SkyArt({
  scene,
  className,
  priority = false,
}: {
  scene: SkyScene;
  className?: string;
  priority?: boolean;
}) {
  return (
    <>
      <Image
        src={`/milu/sky/${scene}-light.svg`}
        width={402}
        height={352}
        alt=""
        aria-hidden="true"
        draggable={false}
        priority={priority}
        className={cn("select-none dark:hidden", className)}
      />
      <Image
        src={`/milu/sky/${scene}-dark.svg`}
        width={402}
        height={352}
        alt=""
        aria-hidden="true"
        draggable={false}
        className={cn("hidden select-none dark:block", className)}
      />
    </>
  );
}

/** One of Milu's 20 still faces (320 × 140, cut flat at the foot). */
export function Face({
  name,
  className,
  style,
  alt = "",
}: {
  name: string;
  className?: string;
  style?: React.CSSProperties;
  alt?: string;
}) {
  return (
    <Image
      src={`/milu/faces/${name}.svg`}
      width={320}
      height={140}
      alt={alt}
      aria-hidden={alt === "" ? "true" : undefined}
      draggable={false}
      className={cn("select-none", className)}
      style={style}
    />
  );
}

/** The app's icon, with iOS's corner. */
export function AppIcon({ size = 40, className }: { size?: number; className?: string }) {
  return (
    <span
      className={cn("relative inline-block shrink-0 overflow-hidden", className)}
      style={{ width: size, height: size, borderRadius: size * 0.2237 }}
    >
      <Image
        src="/milu/app-icon-light.png"
        width={size}
        height={size}
        alt=""
        className="absolute inset-0 size-full dark:hidden"
      />
      <Image
        src="/milu/app-icon-dark.png"
        width={size}
        height={size}
        alt=""
        className="absolute inset-0 hidden size-full dark:block"
      />
    </span>
  );
}

/** A cloud from Tổng quan's sky, in the cloud colour of the day or the night. */
export function Cloud({ className, style }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg
      viewBox="-17 98 67 25"
      aria-hidden="true"
      className={className}
      style={style}
      fill="var(--cloud)"
    >
      <path d="M-17 119.26C-17 112.62 -11.19 108.47 -3.72 109.3C-1.23 101 10.39 98.51 16.2 105.98C23.67 102.66 31.14 107.64 31.14 113.45C38.61 110.96 46.91 114.28 49.4 120.09C29.48 122.58 1.26 122.58 -17 120.92V119.26Z" />
    </svg>
  );
}
