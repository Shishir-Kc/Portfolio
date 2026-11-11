import { useEffect, useState } from "react";

import { ScrollTrigger } from "gsap/ScrollTrigger";

import ScrollReveal from "@/components/bits/ScrollReveal";
import type { Post } from "@/lib/data/posts";

const POSTS_API = "https://api.blog.shishirkhatri.com.np/api/v1/posts";
const BLOG = "https://blog.shishirkhatri.com.np/";
const SHOW = 3;

const fmt = (iso: string) =>
  new Date(iso).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });

/** Titles come straight from the blog; keep the first line and trim stray whitespace. */
const clean = (t: string) => t.split("\n")[0].replace(/\.{3}$/, "").trim();

/**
 * The three newest real posts, fetched live. The rows exist from the first
 * render (the scroll engine registers fade-ins once, at mount) and fill in when
 * the posts arrive. If the API fails the whole section hides, and the engine
 * re-measures so the acts below stay in the right place.
 */
export function LatestWriting() {
  const [posts, setPosts] = useState<Post[] | null>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const ctl = new AbortController();
    fetch(POSTS_API, { signal: ctl.signal })
      .then((r) => (r.ok ? r.json() : Promise.reject(new Error(String(r.status)))))
      .then((data: Post[]) => {
        if (!Array.isArray(data) || !data.length) throw new Error("no posts");
        setPosts([...data].sort((a, b) => +new Date(b.date) - +new Date(a.date)).slice(0, SHOW));
      })
      .catch((e: unknown) => {
        if ((e as Error).name !== "AbortError") setFailed(true);
      });
    return () => ctl.abort();
  }, []);

  // Height can change when posts land or the section hides: re-measure the acts.
  useEffect(() => {
    if (!posts && !failed) return;
    window.ScrollCraft?.instances.forEach((i) => i.layout());
    // Rows changed height: re-measure where every scroll reveal starts and ends.
    requestAnimationFrame(() => ScrollTrigger.refresh());
  }, [posts, failed]);

  return (
    <section data-sc-act="flow" className="p-section" aria-labelledby="writing" hidden={failed}>
      <div className="sc-wrap">
        <header className="p-head" data-sc-in>
          <h2 id="writing" className="p-h2">Writing</h2>
          <p className="p-head__note">
            The three newest posts from the blog.{" "}
            <a className="p-link" href={BLOG} target="_blank" rel="noopener noreferrer">
              All posts
            </a>
          </p>
        </header>
        {/* Each title rises out of its mask word by word as its row scrolls up
            the screen (ScrollReveal); rules, dates and meta move on the same
            scroll (CSS scroll-driven animations, .j-writing__list in index.css). */}
        <ol className="j-writing__list" aria-busy={!posts}>
          {Array.from({ length: SHOW }, (_, i) => {
            const p = posts?.[i];
            return (
              <li key={i} className="j-post" data-loading={!p || undefined}>
                {p ? (
                  <a href={`${BLOG}blog/${p.slug.trim()}/${p.id}`} target="_blank" rel="noopener noreferrer">
                    <time dateTime={p.date.slice(0, 10)} className="j-post__date">
                      {fmt(p.date)}
                    </time>
                    <ScrollReveal
                      containerClassName="j-post__title"
                      effect="rise"
                      baseOpacity={0}
                      enableBlur={false}
                      baseRotation={0}
                      stagger={0.1}
                      wordAnimationEnd="bottom 62%"
                    >
                      {clean(p.title)}
                    </ScrollReveal>
                    <span className="j-post__meta">
                      {p.category}
                      {p.readingTime ? ` · ${p.readingTime}` : ""}
                      <svg className="j-post__arrow" viewBox="0 0 16 16" aria-hidden="true">
                        <path d="M4 12 12 4M6 4h6v6" />
                      </svg>
                    </span>
                  </a>
                ) : (
                  <span className="j-post__placeholder" aria-hidden="true" />
                )}
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
