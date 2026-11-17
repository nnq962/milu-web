import { cn, u } from "@/lib/u";

export type Sky = "garden" | "pond" | "plane" | "brand";

/**
 * A piece of sky with a little app screen on it, as the app's welcome pages have. Everything
 * inside is laid out on the app's 402-point width and scales with the stage (`u`).
 */
export function Stage({
  sky,
  className,
  children,
  ref,
}: {
  sky: Sky;
  className?: string;
  children: React.ReactNode;
  ref?: React.Ref<HTMLDivElement>;
}) {
  return (
    <div ref={ref} className={cn("stage relative mx-auto w-full max-w-[31rem]", className)}>
      <div
        className={cn("ui relative aspect-[402/520] overflow-hidden shadow-float", `sky-${sky}`)}
        style={{ borderRadius: u(46) }}
      >
        {children}
      </div>
    </div>
  );
}

/** The heading of a section: a small label, a big line, a sentence under it. */
export function SectionHead({
  label,
  title,
  children,
  className,
}: {
  label: string;
  title: React.ReactNode;
  children?: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("mx-auto max-w-2xl text-center", className)}>
      <p className="text-[12px] font-extrabold tracking-[0.14em] text-action uppercase">{label}</p>
      <h2 className="mt-4 text-[clamp(2rem,4.6vw,3.25rem)] leading-[1.12] font-black tracking-[-0.02em] text-balance">
        {title}
      </h2>
      {children && <p className="mt-5 text-[18px] leading-[1.65] text-pretty text-ink-2">{children}</p>}
    </div>
  );
}
