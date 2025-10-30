import React, { useEffect, useRef } from "react";
import About from "../components/About";

export default function Home() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLImageElement>(null);
  const boatWrapRef = useRef<HTMLDivElement>(null);
  const cloudsRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    const bg = bgRef.current;
    const boatWrap = boatWrapRef.current;
    const clouds = cloudsRef.current;
    if (!wrap || !bg || !boatWrap || !clouds) return;

    // ----- TUNABLES -----
    const PAN_SCALE = 2.0;                          // sky height vs wrapper
    const PROGRESS_RANGE = wrap.offsetHeight * 0.6; // page scroll px for full pan
    const BOAT_TRAVEL_FRAC = 0.40;                  // fraction of wrapper width
    const BOAT_BASE_OFFSET_PX = 0;                  // nudge boat final position
    const CLOUD_TRAVEL_X = 460;                     // px clouds move right
    const CLOUD_TRAVEL_Y = -170;                     // px clouds move up (negative = up)

    // background taller space for panning
    bg.style.height = `${PAN_SCALE * 100}%`;

    let raf = 0;
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        const scroll = window.scrollY || 0;

        // progress 0 → 1 over PROGRESS_RANGE
        let progress = scroll / PROGRESS_RANGE;
        if (progress < 0) progress = 0;
        if (progress > 1) progress = 1;

        // 1) Pan the sky
        const extra = bg.offsetHeight - wrap.offsetHeight;
        bg.style.transform = `translateY(${-progress * extra}px)`;

        // 2) Sail the boat to the left
        const maxBoatTravel = wrap.clientWidth * BOAT_TRAVEL_FRAC + BOAT_BASE_OFFSET_PX;
        boatWrap.style.transform = `translateX(${-progress * maxBoatTravel}px)`;

        // 3) Move the clouds up-right
        const cx = progress * CLOUD_TRAVEL_X;   // right
        const cy = progress * CLOUD_TRAVEL_Y;   // up (negative)
        clouds.style.transform = `translate(${cx}px, ${cy}px)`;

        raf = 0;
      });
    };

    const onResize = () => {
      bg.style.height = `${PAN_SCALE * 100}%`;
      onScroll();
    };

    // listeners
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <main className="bg-neutral-950 text-gray-100">
      {/* spacer for sticky navbar */}
      <div className="h-14" />

      {/* Match navbar width */}
      <section className="mx-auto max-w-6xl px-4">
        <div
          ref={wrapRef}
          className="relative w-full h-[40vh] md:h-[60vh] overflow-hidden rounded-xl mt-16"
          aria-label="Hero"
        >
          {/* LAYER 1: BACKGROUND SKY (panning) */}
          <img
            ref={bgRef}
            src="/img/hero-background.png"
            alt="Sky gradient"
            className="absolute inset-0 w-full object-cover will-change-transform z-0"
            style={{ transform: "translateY(0)" }}
            fetchPriority="high"
          />

          {/* LAYER 2: CLOUDS (behind town, moves up-right) */}
          <img
            ref={cloudsRef}
            src="/img/clouds.png"
            alt="Clouds"
            className="absolute top-15 left-0 sm:left-15 md:left-35 md:top-15 lg:top-[-35px] w-[58%] md:w-[38%] max-w-none object-contain pointer-events-none select-none z-10"
            style={{ transform: "translate(0px, 0px)" }}
          />

          {/* LAYER 3: TOWN (static) */}
          <img
            src="/img/akureyri-town.png"
            alt="Akureyri town"
            className="absolute inset-x-0 bottom-10 w-full object-contain pointer-events-none select-none z-20"
          />
          {/* Title Overlay */}
          <div className="absolute inset-x-0 flex justify-center lg:justify-end z-30 pointer-events-none select-none 
                top-24 md:top-auto md:bottom-32 lg:bottom-46 lg:top-auto">
            <div className="px-6 md:px-4 w-auto text-center md:text-left lg:pr-34">
              <h1 className="font-display font-extrabold tracking-tight 
                   text-[clamp(1.2rem,4vw,1.8rem)] text-[#e5dbcb] 
                   [text-shadow:0_2px_14px_rgba(0,0,0,0.5)]">
                HI, MY NAME IS AMANDA
              </h1>
              <p className="mt-2 text-sm md:text-lg text-[#e5dbcb] 
                  [text-shadow:0_1px_10px_rgba(0,0,0,0.45)]">
                Passionate software engineer and full stack developer from Iceland.
              </p>
            </div>
          </div>


          {/* LAYER 4: BOAT (moves left on scroll) */}
          <div
            ref={boatWrapRef}
            className="absolute right-4 bottom-[-2px] md:bottom-[-2px] will-change-transform pointer-events-none select-none z-30"
            style={{ transform: "translateX(0)" }}
          >
            <img
              src="/img/boat.png"
              alt="Boat"
              className="h-16 md:h-20 object-contain"
              style={{ transform: "scaleX(-1)" }} // mirroring the boat
            />
          </div>
        </div>
      </section>
      <About />
    </main>
  );
}
