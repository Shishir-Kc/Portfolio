import { motion, useReducedMotion } from "motion/react";

/** The second beat of the hero: rises out of the dark ground under the hills. */
export function Intro() {
  const reduce = useReducedMotion() ?? false;
  const rise = (delay: number) =>
    reduce
      ? {}
      : {
          initial: { opacity: 0, y: 36 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true, amount: 0.6 },
          transition: { duration: 0.9, delay, ease: [0.22, 1, 0.36, 1] as const },
        };

  return (
    <section className="relative flex min-h-svh items-start justify-center bg-night px-6 pb-32 pt-16 text-center sm:pt-20">
      <div className="mx-auto max-w-3xl">
        <motion.p
          {...rise(0)}
          className="text-xs font-medium uppercase tracking-[0.35em] text-amber-200/80"
        >
          Itahari, Nepal
        </motion.p>
        <motion.h2 {...rise(0.08)} className="mt-4 font-display text-[min(13vw,5.5rem)] leading-[0.92] text-white">
          Building the quiet parts of the internet
        </motion.h2>
        <motion.p {...rise(0.16)} className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-white/70 sm:text-lg">
          Backend engineer and co-founder of Arcademia. I design APIs, servers and the occasional database, mostly in
          Python with FastAPI and Django.
        </motion.p>
        <motion.div {...rise(0.24)} className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <a
            href="https://blog.shishirkhatri.com.np/"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white px-6 py-3 text-[13px] font-semibold uppercase tracking-[0.18em] text-night transition-colors hover:bg-amber-100"
          >
            Read the blog
          </a>
          <a
            href="https://github.com/Shishir-Kc"
            target="_blank"
            rel="noopener noreferrer"
            className="border border-white/70 px-6 py-3 text-[13px] font-semibold uppercase tracking-[0.18em] text-white transition-colors hover:bg-white hover:text-night"
          >
            See my code
          </a>
        </motion.div>
      </div>
    </section>
  );
}
