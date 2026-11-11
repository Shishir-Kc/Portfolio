import { Fragment, useEffect } from "react";

import "@/scrollcraft/scrollcraft.js";
import { LatestWriting } from "@/components/LatestWriting";
import BlurText from "@/components/bits/BlurText";
import CountUp from "@/components/bits/CountUp";
import Magnet from "@/components/bits/Magnet";
import ScrollReveal from "@/components/bits/ScrollReveal";
import ScrollVelocity from "@/components/bits/ScrollVelocity";
import { WorkStack, type Work } from "@/components/WorkStack";
import github from "@/lib/data/github.json";
import arcademiaShot from "@/assets/work/arcademia.webp";
import ariaShot from "@/assets/work/aria.webp";
import arisMark from "@/assets/work/aris.webp";
import heliosShot from "@/assets/work/helios.webp";
import kritrimMark from "@/assets/work/kritrim.webp";

const GITHUB = "https://github.com/Shishir-Kc";
const BLOG = "https://blog.shishirkhatri.com.np/";
const LINKEDIN = "https://www.linkedin.com/in/shishir-khatri-3bb3b1376/";

const fmt = (iso: string) =>
  new Date(iso + "T00:00:00Z").toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric", timeZone: "UTC" });

const ABOUT =
  "I build backends: APIs, servers, databases and the tools around them. Mostly Python with FastAPI and Django, with more Rust and TypeScript every month. I co-founded Arcademia, where I lead vision and strategy, and I work from Itahari, Nepal.";

const LANGUAGES = ["Python", "TypeScript", "Rust", "C++", "Kotlin", "Lua"];
const FRAMEWORKS = ["FastAPI", "Django"];

/** Language and last public push for a repo card, from github.json. */
const repoFacts = (name: keyof typeof github.featured): [string, string][] => [
  ["Language", github.featured[name].language],
  ["Last push", fmt(github.featured[name].pushed)],
];
const repoLink = (name: keyof typeof github.featured) => ({ label: "View on GitHub", href: github.featured[name].url });

// A real excerpt of IndexDB's ORM (src/orm/object.py), docstrings trimmed.
const INDEXDB_CODE = `class Objects:
    def __init__(self) -> None:
        self.root_path = ROOT_PATH

    def _checkpath(self, path):
        return os.path.isdir(f"{Path.home()}/{path}")

    async def _create_dir(self, path: str = "", abpath: str = ""):
        if abpath:
            os.makedirs(abpath, exist_ok=True)

        if not self._checkpath(f"{self.root_path}/{path}"):
            os.makedirs(f"{Path.home()}/{self.root_path}/{path}")`;

const WORK: Work[] = [
  {
    name: "Arcademia",
    status: "Launching soon",
    line: "Class 12 learning, the fun way.",
    about:
      "A smarter way to study for Class 12. I co-founded it and lead its vision and strategy, and the team is putting the finishing touches on the first release.",
    facts: [["Role", "Co-founder, CEO"], ["Since", "2026"]],
    link: { label: "Visit arcademia.app", href: "https://arcademia.app/" },
    media: { type: "image", src: arcademiaShot, alt: "The Arcademia site, announcing that it will be ready soon" },
  },
  {
    name: "Kritrim Lab",
    status: "Building Swar",
    line: "An AI lab focused on every part of the local community.",
    about:
      "Kritrim is Nepali for artificial. The lab builds AI for the people and places around it, starting from what our own communities need. Its first project is Swar.",
    facts: [["Focus", "Local community"], ["First project", "Swar"]],
    link: { label: "View on GitHub", href: "https://github.com/kritrim-lab" },
    media: { type: "image", src: kritrimMark, alt: "The Kritrim logo: कृतम्, in bold woodcut Devanagari", position: "50% 50%" },
  },
  {
    name: "Helios",
    status: "In development",
    line: "Small language models that run on edge devices.",
    about:
      "Local intelligence, specialised for your device. Helios fine-tunes small language models for privacy and speed at the edge, trained on home-server hardware instead of a datacenter, with its own tokenizer and models built from scratch.",
    facts: [["Tokenizer", "Ember, 40K vocab"], ["Model", "Spark"]],
    link: { label: "Visit helios.shishirkhatri.com.np", href: "https://helios.shishirkhatri.com.np/" },
    media: { type: "image", src: heliosShot, alt: "The Helios site: Local Intelligence. Specialized for Your Device.", position: "50% 30%" },
  },
  {
    name: "Aris",
    status: "In development",
    line: "An Arch Linux distribution built around Hyprland.",
    about:
      "It boots into a live Hyprland desktop and installs itself with a guided terminal installer. Underneath it stays plain Arch: official repositories, pacman and rolling releases.",
    facts: repoFacts("Aris"),
    link: repoLink("Aris"),
    media: { type: "image", src: arisMark, alt: "The Aris logo, an open A with a star in its apex" },
  },
  {
    name: "IndexDB",
    status: "Early build",
    line: "A JSON database with its own ORM, written from scratch.",
    about:
      "It keeps text and objects as JSON on disk, behind an async ORM and a FastAPI server. I am building it as the storage layer for A.R.I.A.",
    facts: repoFacts("IndexDB"),
    link: repoLink("IndexDB"),
    media: { type: "code", file: "src/orm/object.py", code: INDEXDB_CODE },
  },
  {
    name: "A.R.I.A",
    status: "Live · v0.0.8",
    line: "A home server that thinks, written in Rust.",
    about:
      "A modular home-server harness: agents that reason, API keys kept encrypted, live system telemetry, and a binary that updates itself.",
    facts: repoFacts("A.R.I.A"),
    link: { label: "Visit aria.shishirkhatri.com.np", href: "https://aria.shishirkhatri.com.np/" },
    media: { type: "image", src: ariaShot, alt: "The A.R.I.A site: The harness that keeps your home intelligent" },
  },
];

const BUILT = [
  { what: "An operating system.", where: "Aris" },
  { what: "A database.", where: "IndexDB" },
  { what: "A tokenizer.", where: "Ember, on Helios" },
  { what: "A language model.", where: "Spark, on Helios" },
];

const Arrow = () => (
  <svg className="p-arrow" viewBox="0 0 16 16" aria-hidden="true">
    <path d="M4 12 12 4M6 4h6v6" />
  </svg>
);

/** The languages strip: drifts on its own and speeds up with the scroll (React Bits' ScrollVelocity). */
function Marquee() {
  return (
    <div className="p-marquee">
      <ScrollVelocity
        texts={[
          [...LANGUAGES, ...FRAMEWORKS].map((l, i) => (
            <Fragment key={l}>
              {i > 0 && <i className="p-dot" aria-hidden="true" />}
              {l}
            </Fragment>
          )),
        ]}
        velocity={40}
        numCopies={4}
        separator={<i className="p-dot" />}
        damping={50}
        stiffness={400}
        parallaxClassName="p-marquee__lane"
        scrollerClassName="p-marquee__track"
      />
    </div>
  );
}

let mounted = false;

/** Everything after the hero: about, the work, what I built from scratch, latest writing, and the close. */
export function Journey() {
  useEffect(() => {
    // The engine reads the data-sc-* markup once and drives it from then on. It
    // has no teardown, so mount it exactly once (StrictMode runs effects twice).
    if (mounted) return;
    mounted = true;
    window.ScrollCraft.mount(document);
  }, []);

  const more = github.publicRepos - Object.keys(github.featured).length;

  return (
    <>
      {/* 1 · About */}
      <section data-sc-act="flow" className="p-about" aria-labelledby="about">
        <div className="sc-wrap">
          <h2 id="about" className="p-label">About</h2>
          <ScrollReveal
            containerClassName="p-reveal"
            baseOpacity={0.18}
            blurStrength={5}
            baseRotation={0}
            wordAnimationEnd="bottom 55%"
          >
            {ABOUT}
          </ScrollReveal>

          <dl className="p-stats" data-sc-in data-sc-stagger="90">
            <div>
              <dd><CountUp to={github.totalContributions} separator="," duration={1.8} /></dd>
              <dt>public contributions since January 2025</dt>
            </div>
            <div>
              <dd><CountUp to={github.publicRepos} separator="," duration={1.8} /></dd>
              <dt>public repositories on GitHub</dt>
            </div>
            <div>
              <dd><CountUp to={LANGUAGES.length} separator="," duration={1.8} /></dd>
              <dt>languages I write, {LANGUAGES[0]} first</dt>
            </div>
            <div>
              <dd>2022</dd>
              <dt>the year I started, self-taught</dt>
            </div>
          </dl>
        </div>
      </section>

      <Marquee />

      {/* 2 · Work */}
      <section data-sc-act="flow" className="p-section" aria-labelledby="work">
        <div className="sc-wrap">
          <header className="p-head" data-sc-in>
            <h2 id="work" className="p-h2">Work</h2>
            <p className="p-head__note">What I am building this season: a company, an AI lab, local models, and the tools under them.</p>
          </header>
          <WorkStack items={WORK} />
          <p className="p-more" data-sc-in>
            <span>And {more} more public repositories.</span>
            <a className="p-link" href={GITHUB} target="_blank" rel="noopener noreferrer">
              See the code <Arrow />
            </a>
          </p>
        </div>
      </section>

      {/* 3 · Built from scratch */}
      <section data-sc-act="flow" className="p-section" aria-labelledby="built">
        <div className="sc-wrap">
          <header className="p-head" data-sc-in>
            <h2 id="built" className="p-h2">Built</h2>
            <p className="p-head__note">Self-taught. Nobody handed me any of it. I built it anyway.</p>
          </header>
          {/* Each line rises out of its mask word by word as it scrolls up the
              screen (ScrollReveal); the rules draw and the labels fade on the
              same scroll (CSS scroll-driven animations, .p-list in index.css). */}
          <ol className="p-list">
            {BUILT.map((b, i) => (
              <li key={b.where}>
                <span className="p-list__num">{String(i + 1).padStart(2, "0")}</span>
                <ScrollReveal
                  containerClassName="p-list__what"
                  effect="rise"
                  baseOpacity={0}
                  enableBlur={false}
                  baseRotation={0}
                  stagger={0.12}
                  wordAnimationEnd="bottom 62%"
                >
                  {b.what}
                </ScrollReveal>
                <span className="p-list__where">{b.where}</span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* 4 · Latest writing: the three newest real posts, live from the blog API */}
      <LatestWriting />

      {/* 5 · Close: the page turns over, light on dark becomes dark on light. */}
      <footer data-sc-act="flow" className="p-close" aria-labelledby="still">
        <h2 id="still" className="p-close__title">
          <BlurText text="Still climbing." className="p-close__line" animateBy="words" delay={90} />
          <BlurText text="Give me the hard problem." className="p-close__line p-close__line--soft" animateBy="words" delay={90} />
        </h2>
        <p className="p-close__lede" data-sc-in>
          Whatever the odds, I will find a way up and build it.
        </p>
        <div className="p-close__links" data-sc-in>
          {[
            { label: "GitHub", href: GITHUB, solid: true },
            { label: "Blog", href: BLOG },
            { label: "LinkedIn", href: LINKEDIN },
          ].map((l) => (
            <Magnet key={l.label} padding={48} magnetStrength={4} maxOffset={14}>
              <a className={`p-pill${l.solid ? " p-pill--solid" : ""}`} href={l.href} target="_blank" rel="noopener noreferrer">
                {l.label} <Arrow />
              </a>
            </Magnet>
          ))}
        </div>
      </footer>
    </>
  );
}
