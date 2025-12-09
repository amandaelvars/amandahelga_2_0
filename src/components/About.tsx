import React, { useEffect, useRef, useState } from "react";

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
        id="about"
        ref={sectionRef}
        className="mx-auto max-w-6xl px-4 mt-[12vh] md:mt-[16vh] py-16 md:py-20"
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
            <div className="group relative aspect-square w-full overflow-hidden bg-neutral-900">
              <img
                src="/img/researcher.png"
                alt="Researcher"
                className="w-full h-full object-cover transition-transform duration-500"
                loading="lazy"
              />
            </div>
            <figcaption className="mt-4 font-display leading-[1] [container-type:inline-size]">
              <SpacedLabel text="RESEARCHER" color="#614f41" />
            </figcaption>
          </figure>

          {/* Tile 2 */}
          <figure className="flex flex-col">
            <div className="group relative aspect-square w-full overflow-hidden bg-neutral-900">
              <img
                src="/img/software-engineer.png"
                alt="Software Engineer"
                className="w-full h-full object-cover transition-transform duration-500"
                loading="lazy"
              />
            </div>
            <figcaption className="mt-4 font-display leading-[1] [container-type:inline-size]">
              <SpacedLabel text="SOFTWARE ENGINEER" color="#838fa4" />
            </figcaption>
          </figure>

          {/* Tile 3 */}
          <figure className="flex flex-col">
            <div className="group relative aspect-square w-full overflow-hidden bg-neutral-900">
              <img
                src="/img/web-designer.png"
                alt="Web Design"
                className="w-full h-full object-cover transition-transform duration-500"
                loading="lazy"
              />
            </div>
            <figcaption className="mt-4 font-display leading-[1] [container-type:inline-size]">
              <SpacedLabel text="WEB DESIGN" color="#e8d157" />
            </figcaption>
          </figure>



        </div>
      </section>

      {/* --- About Box Section --- */}
      <section className="mx-auto max-w-3xl px-4 py-12 md:py-16 text-center">
        <h2 className="font-display text-3xl md:text-4xl font-bold text-[#e5dbcb] mb-4">
          ABOUT ME
        </h2>
        <p className="text-gray-300 text-lg leading-relaxed mb-4">
          I'm an Icelandic Graduate Student at the University of Minnesota,
          pursuing a Master of Science in Computer Science. I hold a Bachelor of
          Science with a major in Computer Science and a minor in Math from
          Northern Michigan University. I am a natural problem solver with a
          strong foundation in computer science, physics, and math. I fluently
          speak both English and Icelandic.
        </p>
        <p className="text-gray-300 text-lg leading-relaxed">
          If I'm not coding you can find me reading, stargazing, playing on my
          Switch, drawing or running.
        </p>
      </section>
    </>
  );
}
