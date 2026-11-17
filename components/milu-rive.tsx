"use client";

import type { Rive } from "@rive-app/webgl2";
import { useInView, useReducedMotion } from "motion/react";
import { useEffect, useImperativeHandle, useRef, useState } from "react";
import { Face } from "@/components/art";
import { useTheme } from "@/components/theme";
import { cn } from "@/lib/u";

/**
 * Milu in Rive: the three characters the app shows on its tabs (Milu/Resources/Rive), each with
 * its own lifecycle script inside the file. As in the app (MiluRive.swift), the page only tells
 * the file what is true (on screen, dark, Reduce Motion, there is data) and what just happened
 * (a tap, something saved); the motion, the faces and the timing are the file's.
 */
export type MiluScene = "overview" | "accounts" | "transactions";

export type MiluRiveHandle = {
  /** Fires one of the file's triggers ("pet", "previewSave", "previewDeposit"…). */
  fire: (trigger: string) => void;
};

const artboards: Record<MiluScene, string> = {
  overview: "MiluOverview",
  accounts: "MiluAccounts",
  transactions: "MiluTransactions",
};
const stateMachine = "Than · Bound lifecycle";

/** Sets one of the file's booleans ("visible", "dark", "reduced", "hasData"). */
function set(character: Rive | null, name: string, value: boolean) {
  const property = character?.viewModelInstance?.boolean(name);
  if (property) property.value = value;
}

function fire(character: Rive | null, name: string) {
  character?.viewModelInstance?.trigger(name)?.trigger();
}

export function MiluRive({
  scene,
  face = "nguyen-ban",
  className,
  onPet,
  ref,
}: {
  scene: MiluScene;
  /** The still face shown until the file has loaded, and if it cannot. */
  face?: string;
  className?: string;
  onPet?: () => void;
  ref?: React.Ref<MiluRiveHandle>;
}) {
  const frame = useRef<HTMLButtonElement>(null);
  const canvas = useRef<HTMLCanvasElement>(null);
  const rive = useRef<Rive | null>(null);
  const [ready, setReady] = useState(false);
  const theme = useTheme();
  const reduced = useReducedMotion() ?? false;
  // Loaded a little before it scrolls into view, and drawn only while it is near the screen.
  const near = useInView(frame, { margin: "300px 0px" });
  const [wanted, setWanted] = useState(false);
  if (near && !wanted) setWanted(true);

  useImperativeHandle(ref, () => ({ fire: (name) => fire(rive.current, name) }), []);

  useEffect(() => {
    if (!wanted) return;
    let cancelled = false;
    let instance: Rive | null = null;
    let resize: ResizeObserver | null = null;

    (async () => {
      const { Rive, Layout, Fit, Alignment, RuntimeLoader } = await import("@rive-app/webgl2");
      if (cancelled || !canvas.current) return;
      RuntimeLoader.setWasmUrl("/rive/rive.wasm");
      RuntimeLoader.setWasmFallbackUrl("/rive/rive_fallback.wasm");
      instance = new Rive({
        src: `/milu/rive/milu-${scene}.riv`,
        canvas: canvas.current,
        artboard: artboards[scene],
        stateMachine,
        autoplay: true,
        autoBind: true,
        // The tap is the frame's own (a button, so the keyboard can pet Milu too).
        shouldDisableRiveListeners: true,
        layout: new Layout({ fit: Fit.Contain, alignment: Alignment.BottomCenter }),
        onLoad: () => {
          if (cancelled || !instance) return;
          instance.resizeDrawingSurfaceToCanvas();
          rive.current = instance;
          // What is true as it first shows, read from the page itself.
          set(instance, "visible", true);
          set(instance, "dark", document.documentElement.getAttribute("data-theme") === "dark");
          set(instance, "reduced", matchMedia("(prefers-reduced-motion: reduce)").matches);
          // A page that already has things on it, as the app starts a character.
          if (scene === "overview") set(instance, "hasData", true);
          else fire(instance, "seed");
          setReady(true);
        },
      });
      resize = new ResizeObserver(() => instance?.resizeDrawingSurfaceToCanvas());
      resize.observe(canvas.current);
    })();

    return () => {
      cancelled = true;
      resize?.disconnect();
      rive.current = null;
      setReady(false);
      instance?.cleanup();
    };
  }, [scene, wanted]);

  useEffect(() => {
    if (ready) set(rive.current, "dark", theme === "dark");
  }, [ready, theme]);

  useEffect(() => {
    if (ready) set(rive.current, "reduced", reduced);
  }, [ready, reduced]);

  // Off screen it stops drawing; back on screen it wakes, as on coming back to a tab.
  useEffect(() => {
    const character = rive.current;
    if (!ready || !character) return;
    set(character, "visible", near);
    if (near) {
      character.startRendering();
      fire(character, scene === "overview" ? "activity" : "reopen");
    } else {
      character.stopRendering();
    }
  }, [ready, near, scene]);

  return (
    <button
      ref={frame}
      type="button"
      aria-label="Milu. Chạm để vuốt ve"
      onClick={() => {
        fire(rive.current, "pet");
        onPet?.();
      }}
      className={cn(
        "relative block aspect-[786.928/400] cursor-pointer touch-manipulation select-none [-webkit-tap-highlight-color:transparent] focus-visible:rounded-3xl",
        className,
      )}
    >
      {/* The still face, where the app has it against the character's frame (SkyHeader.swift). */}
      <Face
        name={face}
        className={cn(
          "absolute bottom-[-3.1%] left-[-2.1%] h-auto w-[102.9%] max-w-none transition-opacity duration-300",
          ready ? "opacity-0" : "opacity-100",
        )}
      />
      <canvas
        ref={canvas}
        className={cn(
          "absolute inset-0 size-full transition-opacity duration-300",
          ready ? "opacity-100" : "opacity-0",
        )}
      />
    </button>
  );
}
