import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

function SpacedLabel({
  text,
  color,
}: {
  text: string;
  color: string;
}) {
  return (
    <div
      className="
        uppercase font-extrabold 
        font-display leading-[1]
        whitespace-nowrap
        flex justify-between
        text-[clamp(18px,6cqw,32px)] md:text-[clamp(22px,7cqw,40px)] lg:text-[clamp(28px,8cqw,56px)]
        [container-type:inline-size]
      "
      style={{ color }}
    >
      {text.split("").map((ch, i) => (
        <span
          key={i}
          className="inline-block"
        >
          {ch === " " ? "\u00A0" : ch}
        </span>
      ))}
    </div>
  );
}

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const lastScrollY = useRef<number>(0);
  const [ratio, setRatio] = useState(0);
  const [dir, setDir] = useState<"down" | "up">("down");

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const onScroll = () => {
      const y = window.scrollY || 0;
      setDir(y > lastScrollY.current ? "down" : "up");
      lastScrollY.current = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });

    const thresholds = Array.from({ length: 21 }, (_, i) => i / 20);
    const io = new IntersectionObserver(
      ([entry]) => {
        setRatio(entry.intersectionRatio);
      },
      {
        root: null,
        rootMargin: "0px 0px -10% 0px",
        threshold: thresholds,
      }
    );
    io.observe(el);

    return () => {
      window.removeEventListener("scroll", onScroll);
      io.disconnect();
    };
  }, []);

  const fadeIn = (r: number) => Math.min(1, Math.max(0, (r - 0.1) / 0.5));
  const fadeOut = (r: number) => Math.min(1, Math.max(0, (r - 0.1) / 0.2));

  const opacity =
    dir === "up" && ratio < 0.3 ? fadeOut(ratio) : fadeIn(ratio);

  const translateY = (1 - opacity) * 12;

  return (
    <>
      {/* --- 3 Tiles Section --- */}
      <section
        ref={sectionRef}
        className="mx-auto max-w-6xl px-4 mt-10 md:mt-14 py-10 md:py-14"
        style={{
          opacity,
          transform: `translateY(${translateY}px)`,
          transition: "opacity 300ms ease-out, transform 300ms ease-out",
          willChange: "opacity, transform",
        }}
      >
        {/* 🔑 Responsive grid:
             - grid-cols-1 on mobile
             - grid-cols-3 on medium screens and up */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Tile 1 */}
          <figure className="flex flex-col">
            <div className="group relative aspect-square w-full overflow-hidden rounded-xl bg-surface shadow-media">
              <img
                src="/img/researcher.webp"
                alt="Researcher"
                className="w-full h-full object-cover transition-transform duration-500"
                loading="lazy"
              />
            </div>
            <figcaption className="mt-4 font-display leading-[1] [container-type:inline-size]">
              <SpacedLabel text="RESEARCHER" color="var(--label-researcher)" />
            </figcaption>
          </figure>

          {/* Tile 2 */}
          <figure className="flex flex-col">
            <div className="group relative aspect-square w-full overflow-hidden rounded-xl bg-surface shadow-media">
              <img
                src="/img/software-engineer.webp"
                alt="Software Engineer"
                className="w-full h-full object-cover transition-transform duration-500"
                loading="lazy"
              />
            </div>
            <figcaption className="mt-4 font-display leading-[1] [container-type:inline-size]">
              <SpacedLabel text="SOFTWARE ENGINEER" color="var(--label-engineer)" />
            </figcaption>
          </figure>

          {/* Tile 3 */}
          <figure className="flex flex-col">
            <div className="group relative aspect-square w-full overflow-hidden rounded-xl bg-surface shadow-media">
              <img
                src="/img/web-designer.webp"
                alt="Web Design"
                className="w-full h-full object-cover transition-transform duration-500"
                loading="lazy"
              />
            </div>
            <figcaption className="mt-4 font-display leading-[1] [container-type:inline-size]">
              <SpacedLabel text="WEB DESIGN" color="var(--label-designer)" />
            </figcaption>
          </figure>



        </div>
      </section>

      {/* --- About Me Section --- */}
      <section id="about" className="scroll-mt-20 mx-auto max-w-6xl px-4 py-12 md:py-20">
        <div className="relative overflow-hidden rounded-3xl border border-accent/10 bg-card-warm p-6 sm:p-10 md:p-12">
          {/* Soft warm glows, using the tile label colors */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -top-32 -right-24 h-80 w-80 rounded-full bg-gold/10 blur-3xl"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -bottom-40 -left-24 h-96 w-96 rounded-full bg-[#838fa4]/10 blur-3xl"
          />

          <div className="relative grid gap-10 md:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] md:items-center">
            {/* Portrait */}
            <div className="mx-auto w-full max-w-xs md:max-w-none">
              <div className="overflow-hidden rounded-2xl border border-accent/15 shadow-2xl shadow-black/40">
                <img
                  src="/img/portrait.webp"
                  alt="Amanda Elvarsdóttir"
                  className="aspect-[4/5] w-full object-cover"
                  loading="lazy"
                />
              </div>
            </div>

            {/* Text */}
            <div>
              <p className="text-sm uppercase tracking-[0.25em] text-gold">About me</p>
              <h2 className="mt-3 font-display text-2xl leading-snug md:text-3xl text-accent">
                From Akureyri to Minneapolis
              </h2>

              <p className="mt-6 text-lg leading-relaxed text-body">
                I'm an Icelandic software engineer with a Master of Science in
                Computer Science from the University of Minnesota. I'm a natural
                problem solver with a strong foundation in computer science,
                physics and math.
              </p>

              {/* Quick facts */}
              <dl className="mt-8 grid grid-cols-1 gap-x-8 gap-y-5 sm:grid-cols-2">
                {[
                  { label: "Master's", value: "M.S. Computer Science, University of Minnesota, 2026" },
                  { label: "Bachelor's", value: "B.S. Computer Science, minor in Math, Northern Michigan University, 2021" },
                  { label: "From", value: "Akureyri, Iceland" },
                  { label: "Languages", value: "English and Icelandic" },
                ].map((f) => (
                  <div key={f.label} className="border-l-2 border-accent/20 pl-4">
                    <dt className="text-xs uppercase tracking-widest text-faint">{f.label}</dt>
                    <dd className="mt-1 text-ink-2">{f.value}</dd>
                  </div>
                ))}
              </dl>

              {/* Hobbies */}
              <div className="mt-8">
                <p className="text-sm text-muted">When I'm not coding, you can find me</p>
                <ul className="mt-3 flex flex-wrap gap-2">
                  {["Reading", "Stargazing", "Playing on my Switch", "Drawing", "Running"].map((h) => (
                    <li
                      key={h}
                      className="rounded-full border border-accent/15 bg-ink/[0.03] px-3 py-1 text-sm text-ink-2"
                    >
                      {h}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Calls to action */}
              <div className="mt-10 flex flex-wrap gap-3">
                <Link
                  to="/portfolio"
                  className="rounded-md bg-accent px-5 py-2.5 font-semibold text-on-accent transition hover:bg-accent-hover"
                >
                  See my work
                </Link>
                <Link
                  to="/resume"
                  className="rounded-md border border-accent/30 px-5 py-2.5 font-semibold text-accent transition hover:border-accent"
                >
                  Resume
                </Link>
                <Link
                  to="/contact"
                  className="rounded-md px-5 py-2.5 font-semibold text-body transition hover:text-accent"
                >
                  Get in touch →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
