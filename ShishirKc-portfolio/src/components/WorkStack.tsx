import { useEffect, useState } from "react";

import ScrollStack, { ScrollStackItem } from "@/components/bits/ScrollStack";

/*
 * The work, as a deck of cards (React Bits' ScrollStack, on the window's
 * scroll). Each card is text on the left (number and status, the name, a
 * subtitle, a short paragraph, two facts, a link) and a picture of the thing on
 * the right. Each card stops one top-row lower than the one before, so the
 * numbers stay readable like tabs while the cards behind shrink and dim.
 */

export type Media =
  | { type: "image"; src: string; alt: string; /** object-position, when the subject isn't top-left */ position?: string }
  /** For work with nothing to look at yet: a real excerpt of its code. */
  | { type: "code"; file: string; code: string };

export type Work = {
  name: string;
  status: string;
  line: string;
  about: string;
  facts: [label: string, value: string][];
  link: { label: string; href: string };
  media: Media;
};

const SMALL = "(max-width: 760px)";

function useSmall() {
  const [small, setSmall] = useState(() => matchMedia(SMALL).matches);
  useEffect(() => {
    const mq = matchMedia(SMALL);
    const on = () => setSmall(mq.matches);
    mq.addEventListener("change", on);
    return () => mq.removeEventListener("change", on);
  }, []);
  return small;
}

const Arrow = () => (
  <svg className="p-arrow" viewBox="0 0 16 16" aria-hidden="true">
    <path d="M4 12 12 4M6 4h6v6" />
  </svg>
);

function Picture({ media }: { media: Media }) {
  if (media.type === "image") {
    return (
      <img
        className="p-card__img"
        src={media.src}
        alt={media.alt}
        loading="lazy"
        decoding="async"
        style={media.position ? { objectPosition: media.position } : undefined}
      />
    );
  }
  return (
    <figure className="p-card__code">
      <figcaption>{media.file}</figcaption>
      <pre>
        <code>{media.code}</code>
      </pre>
    </figure>
  );
}

export function WorkStack({ items }: { items: Work[] }) {
  const small = useSmall();
  return (
    <ScrollStack
      className="p-stack"
      useWindowScroll
      smoothScroll={false}
      stackPosition={small ? 12 : 16}
      itemStackDistance={small ? 40 : 52}
      itemDistance={small ? 24 : 40}
      itemScale={0.025}
      baseScale={0.9}
      dimAmount={0.35}
      holdDistance={small ? 80 : 160}
    >
      {items.map((w, i) => (
        <ScrollStackItem key={w.name} itemClassName="p-card">
          <article className="p-card__grid" aria-labelledby={`work-${i}`}>
            <div className="p-card__text">
              <div className="p-card__top">
                <span className="p-card__num">{String(i + 1).padStart(2, "0")}</span>
                <span className="p-card__status">{w.status}</span>
              </div>

              <div className="p-card__main">
                <h3 id={`work-${i}`} className="p-card__name">
                  {w.name}
                </h3>
                <p className="p-card__line">{w.line}</p>
                <p className="p-card__about">{w.about}</p>

                <dl className="p-card__facts">
                  {w.facts.map(([label, value]) => (
                    <div key={label}>
                      <dt>{label}</dt>
                      <dd>{value}</dd>
                    </div>
                  ))}
                </dl>

                <a className="p-card__link" href={w.link.href} target="_blank" rel="noopener noreferrer">
                  {w.link.label} <Arrow />
                </a>
              </div>
            </div>

            <div className="p-card__media">
              <Picture media={w.media} />
            </div>
          </article>
        </ScrollStackItem>
      ))}
    </ScrollStack>
  );
}
