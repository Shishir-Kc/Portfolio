import { useEffect, useRef, type CSSProperties, type ReactNode } from "react";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from "motion/react";

import photo from "@/assets/hero/mountain-photo.webp";
import peaks from "@/assets/hero/mountain-peaks.webp";
import hills from "@/assets/hero/foothills.webp";
import summit from "@/assets/hero/summit.webp";

/** Multiples of the stage width (see .hero-stage in index.css). */
const w = (n: number) => `calc(var(--stage-w) * ${n})`;

/** Absolutely position a box of `width` (stage widths), centred horizontally
 *  (plus `dx`), with its bottom edge `bottom` stage widths above the hero's bottom. */
const place = (width: number, bottom: number, dx = 0): CSSProperties => ({
  position: "absolute",
  width: w(width),
  maxWidth: "none", // layers are wider than the viewport on purpose
  height: "auto",
  left: `calc(50% + var(--stage-w) * ${dx - width / 2})`,
  bottom: w(bottom),
});

/*
 * AI-generated layers (ChatGPT image generation), all in one blue-hour grade:
 * - mountain-photo / mountain-peaks: a Himalayan peak with alpenglow on the
 *   summit, saved twice on the same 1536×1024 canvas so the two line up exactly:
 *     photo: sky + mountain
 *     peaks: mountain only (sky cut away), drawn over the name so the name sits behind it
 * - foothills: the near forested ridges, generated on a transparent background.
 */
const SCENE_ASPECT = 1536 / 1024;
// The summit is 65.3% of the way up the canvas; it sits this many stage widths
// above the hero's bottom, so the peak lands just above the name.
const SUMMIT = 0.343;
const SCENE = { width: 1.04, aspect: SCENE_ASPECT, bottom: SUMMIT - (0.653 * 1.04) / SCENE_ASPECT };
// The name's baseline sits --name-cut below the summit (see index.css), so the
// peak cuts into the letters without hiding one.
const NAME_BOTTOM = `calc(${w(SUMMIT)} - var(--name-cut))`;
// The hills hide the bottom of the mountain photo, leaving the range above them.
// Their ridges dip to a V just left of centre (64.6% down the 3:2 image), which
// lands about 0.09 stage widths above the hero's bottom, behind the summit rock.
const HILLS = { width: 1.1, bottom: -0.17 };
// Colour at the top of the photo's sky; fills any sky above it on tall screens.
const SKY = "#001945";
// Colour of the hills' bottom edge; fills below it when the hills drift up.
const HILLS_BASE = "#021329";

/**
 * Parallax speeds. While the hero scrolls out of view each layer is shifted by
 * `lag` × the distance scrolled: 1 = stays put on screen, 0 = scrolls with the
 * page. Far things lag the most; the summit scrolls with the page, so you rise
 * past your name as the scene leaves. Every layer lags (none moves faster than
 * the page), so nothing ever rises into view from below.
 */
const LAG = { name: 0.9, scene: 0.7, hills: 0.45, summit: 0 } as const;

type Mouse = { x: MotionValue<number>; y: MotionValue<number> };

function Layer({
  progress,
  lag,
  depth,
  mouse,
  reduce,
  children,
}: {
  progress: MotionValue<number>;
  lag: number;
  /** Mouse-parallax strength; nearer layers move more. */
  depth: number;
  mouse: Mouse;
  reduce: boolean;
  children: ReactNode;
}) {
  const y = useTransform(progress, [0, 1], ["0%", `${lag * 100}%`]);
  const mx = useTransform(mouse.x, (v) => v * depth * -14);
  const my = useTransform(mouse.y, (v) => v * depth * -8);
  return (
    <motion.div
      className="pointer-events-none absolute inset-0 will-change-transform"
      style={{ y: reduce ? 0 : y }}
    >
      <motion.div className="absolute inset-0" style={reduce ? undefined : { x: mx, y: my }}>
        {children}
      </motion.div>
    </motion.div>
  );
}

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion() ?? false;
  const { scrollYProgress: p } = useScroll({ target: ref, offset: ["start start", "end start"] });

  // Mouse parallax (fine pointers only), smoothed with a spring.
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const mouse = {
    x: useSpring(rawX, { stiffness: 50, damping: 18, mass: 0.8 }),
    y: useSpring(rawY, { stiffness: 50, damping: 18, mass: 0.8 }),
  };
  useEffect(() => {
    if (reduce || !window.matchMedia("(pointer: fine)").matches) return;
    const onMove = (e: PointerEvent) => {
      rawX.set((e.clientX / window.innerWidth) * 2 - 1);
      rawY.set((e.clientY / window.innerHeight) * 2 - 1);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, [reduce, rawX, rawY]);

  // The name lags behind the page, so fade it before the hero's bottom edge reaches it.
  const nameOpacity = useTransform(p, [0.3, 0.6], [1, 0]);
  const layer = { progress: p, mouse, reduce };

  return (
    <section
      ref={ref}
      id="top"
      className="hero-stage relative h-svh min-h-[560px] overflow-hidden"
      aria-label="Introduction"
    >
      <motion.div
        className="absolute inset-0"
        initial={reduce ? false : { opacity: 0, scale: 1.04 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1] }}
      >
        {/* Sky above the photo (only visible on tall screens) */}
        <div className="absolute inset-0" style={{ background: SKY }} />

        {/* Far: the photo, sky and mountains */}
        <Layer {...layer} lag={LAG.scene} depth={0.25}>
          <img src={photo} alt="" style={place(SCENE.width, SCENE.bottom)} decoding="async" />
        </Layer>

        {/* Name: behind the peaks. It's pinned to the peaks (in stage widths, not
            screen height) so the peak always cuts into the letters, and it lags
            more than the peaks, so they rise further over it as you scroll. */}
        <Layer {...layer} lag={LAG.name} depth={0.4}>
          <motion.div className="absolute inset-0" style={{ opacity: nameOpacity }}>
            <motion.div
              className="absolute inset-x-0 px-4 text-center"
              style={{ bottom: NAME_BOTTOM }}
              initial={reduce ? false : { opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.4, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
            >
              <p className="text-outline font-display text-[min(7.6vw,3.5rem)] leading-none tracking-[0.12em] sm:text-[min(4.6vw,4.75rem)]">
                AI &amp; Backend Engineer
              </p>
              <h1 className="mt-[0.06em] font-display text-[min(24vw,9rem)] leading-[0.86] tracking-[0.01em] text-white [text-shadow:0_8px_40px_rgb(8_18_40_/_0.35)] sm:text-[min(14vw,13.5rem)]">
                <span className="block sm:inline">Shishir</span> <span className="block sm:inline">Khatri</span>
              </h1>
            </motion.div>
          </motion.div>
        </Layer>

        {/* The mountain again, cut from the same photo and moving exactly with it */}
        <Layer {...layer} lag={LAG.scene} depth={0.25}>
          <img src={peaks} alt="" style={place(SCENE.width, SCENE.bottom)} decoding="async" />
        </Layer>

        {/* Mid: forested foothills in front of the mountain */}
        <Layer {...layer} lag={LAG.hills} depth={0.7}>
          <div style={place(HILLS.width, HILLS.bottom)}>
            <img src={hills} alt="" className="block w-full" decoding="async" />
            <div className="absolute inset-x-0 top-[calc(100%-2px)] h-[60svh]" style={{ background: HILLS_BASE }} />
          </div>
        </Layer>

        {/* Foreground: the summit. Scrolls with the page so the rock stays planted
            on the dark mass under it. */}
        <Layer {...layer} lag={LAG.summit} depth={1.4}>
          <div
            style={{
              ...place(0.75, -0.09),
              aspectRatio: "4 / 1",
              background: "radial-gradient(50% 50% at 50% 50%, var(--color-night) 0%, rgb(7 11 15 / .85) 35%, rgb(7 11 15 / .4) 62%, transparent 100%)",
            }}
          />
          <img
            src={summit}
            alt=""
            style={{
              ...place(0.278, -0.012),
              maskImage: "linear-gradient(180deg, #000 93%, transparent 100%)",
            }}
            decoding="async"
          />
        </Layer>
      </motion.div>

      {/* Ground the scene into the page below */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[6%] bg-gradient-to-b from-transparent to-night" />
    </section>
  );
}
