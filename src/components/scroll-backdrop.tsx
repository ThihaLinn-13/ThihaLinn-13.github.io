"use client";

import { animate, createTimeline, stagger } from "animejs";
import { useEffect, useRef } from "react";

/** Deterministic star field — identical on server and client (no hydration mismatch). */
function mulberry32(seed: number) {
  return () => {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const STARS = (() => {
  const rand = mulberry32(20240713);
  return Array.from({ length: 90 }, () => ({
    top: rand() * 100,
    left: rand() * 100,
    size: 1 + rand() * 2.4,
    opacity: 0.25 + rand() * 0.5,
  }));
})();

/**
 * Cloud shapes: `shade` + `body` blobs (offset copies give volume) and
 * `light` blobs (bright crests). Overlapping soft radial gradients make them
 * read as one puffy mass instead of a stack of discs.
 */
type Ellipse = [number, number, number, number]; // cx, cy, rx, ry

const CLOUD_SHAPES: Array<{ shade: Ellipse[]; body: Ellipse[]; light: Ellipse[] }> = [
  {
    body: [
      [0, 20, 92, 36],
      [-62, 12, 54, 32],
      [60, 10, 58, 34],
      [-20, -14, 58, 38],
      [24, -22, 46, 32],
    ],
    shade: [
      [0, 20, 92, 36],
      [-62, 12, 54, 32],
      [60, 10, 58, 34],
      [-20, -14, 58, 38],
      [24, -22, 46, 32],
    ],
    light: [
      [-34, -26, 26, 16],
      [12, -34, 20, 12],
      [-70, 4, 16, 10],
    ],
  },
  {
    body: [
      [0, 14, 72, 28],
      [-46, 8, 44, 26],
      [44, 6, 48, 28],
      [-14, -10, 42, 28],
    ],
    shade: [
      [0, 14, 72, 28],
      [-46, 8, 44, 26],
      [44, 6, 48, 28],
      [-14, -10, 42, 28],
    ],
    light: [
      [-26, -18, 20, 12],
      [8, -24, 16, 10],
    ],
  },
  {
    body: [
      [0, 22, 98, 38],
      [-66, 14, 56, 32],
      [64, 12, 60, 34],
      [-26, -18, 56, 40],
      [22, -28, 44, 32],
      [0, -36, 32, 24],
    ],
    shade: [
      [0, 22, 98, 38],
      [-66, 14, 56, 32],
      [64, 12, 60, 34],
      [-26, -18, 56, 40],
      [22, -28, 44, 32],
      [0, -36, 32, 24],
    ],
    light: [
      [-40, -30, 24, 14],
      [10, -42, 18, 11],
    ],
  },
  {
    body: [
      [0, 10, 54, 22],
      [-32, 6, 32, 18],
      [34, 4, 34, 20],
      [-6, -8, 30, 20],
    ],
    shade: [
      [0, 10, 54, 22],
      [-32, 6, 32, 18],
      [34, 4, 34, 20],
      [-6, -8, 30, 20],
    ],
    light: [[-18, -14, 14, 9]],
  },
  {
    body: [
      [0, 16, 108, 30],
      [-72, 10, 50, 26],
      [70, 8, 54, 28],
      [-20, -8, 46, 28],
      [28, -12, 40, 24],
    ],
    shade: [
      [0, 16, 108, 30],
      [-72, 10, 50, 26],
      [70, 8, 54, 28],
      [-20, -8, 46, 28],
      [28, -12, 40, 24],
    ],
    light: [
      [-30, -14, 20, 11],
      [6, -18, 14, 9],
    ],
  },
];

const CLOUDS = [
  { x: 140, y: 110, s: 1.25, shape: 0 },
  { x: 700, y: 55, s: 0.95, shape: 1 },
  { x: 390, y: 285, s: 0.8, shape: 3 },
  { x: 1020, y: 370, s: 1.35, shape: 2 },
  { x: 250, y: 590, s: 1.05, shape: 4 },
  { x: 630, y: 495, s: 0.75, shape: 1 },
  { x: 1140, y: 165, s: 0.9, shape: 3 },
];

/** How fast the backdrop catches up to the real scroll position (lower = silkier). */
const SMOOTHING = 0.085;

/**
 * Fixed backdrop driven by anime.js.
 *
 * Dark mode  → night sky: twinkling stars, moon, Earth.
 * Light mode → day sky: soft sky gradient, sun, drifting clouds.
 *
 * IMPORTANT: every scroll-driven translation sits on a WRAPPER element while the
 * infinite ambient loops run on the INNER element. anime.js writes `transform` to
 * whatever it targets, so sharing one element would make the ambient loop overwrite
 * the scroll position every frame (and nothing would ever appear to move).
 */
export function ScrollBackdrop() {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const get = <T extends HTMLElement>(selector: string) =>
      root.querySelector<T>(selector);
    const all = <T extends Element>(selector: string) =>
      root.querySelectorAll<T>(selector);

    const starField = get("[data-stars]");
    const stars = all<HTMLElement>("[data-star]");
    const moonScroll = get("[data-moon-scroll]");
    const moonSpin = get("[data-moon-spin]");
    const earthScroll = get("[data-earth-scroll]");
    const earthSpin = get("[data-earth-spin]");
    const sunScroll = get("[data-sun-scroll]");
    const sunAmbient = get("[data-sun-ambient]");
    const cloudScroll = all<SVGGElement>("[data-cloud-scroll]");
    const clouds = all<SVGGElement>("[data-cloud]");
    const nebulaA = get("[data-orb='a']");
    const nebulaB = get("[data-orb='b']");

    const loops: Array<{ pause: () => void }> = [];

    // twinkling stars — opacity only, never fights the scroll transform
    if (stars.length > 0) {
      loops.push(
        animate(stars, {
          opacity: [{ to: 0.12 }, { to: 1 }, { to: 0.12 }],
          duration: 2800,
          delay: stagger(100),
          loop: true,
          ease: "inOutSine",
        })
      );
    }

    if (moonSpin) {
      loops.push(
        animate(moonSpin, {
          rotate: 360,
          duration: 150000,
          loop: true,
          ease: "linear",
        })
      );
    }

    if (earthSpin) {
      loops.push(
        animate(earthSpin, {
          rotate: 360,
          duration: 90000,
          loop: true,
          ease: "linear",
        })
      );
    }

    // sun: slow ray rotation + warm breathing pulse
    // NOTE: both properties must live in ONE animate() call — two separate calls on
    // the same target overwrite each other's transform every frame.
    if (sunAmbient) {
      loops.push(
        animate(sunAmbient, {
          rotate: 360,
          scale: [1, 1.05, 1],
          duration: 120000,
          loop: true,
          ease: "linear",
        })
      );
    }

    // clouds drift
    clouds.forEach((cloud, index) => {
      loops.push(
        animate(cloud, {
          x: [0, index % 2 === 0 ? 70 : -70],
          y: [0, index % 2 === 0 ? -16 : 14],
          duration: 24000 + index * 5000,
          loop: true,
          alternate: true,
          ease: "inOutSine",
        })
      );
    });

    // soft colour wash
    const nebulae = [nebulaA, nebulaB].filter(Boolean) as HTMLElement[];
    nebulae.forEach((el, index) => {
      loops.push(
        animate(el, {
          scale: [1, 1.2, 1],
          duration: 15000 + index * 3000,
          loop: true,
          ease: "inOutSine",
        })
      );
    });

    // ---- scroll-driven timeline, seeked by an EASED scroll value ----
    const timeline = createTimeline({
      autoplay: false,
      defaults: { ease: "linear" },
    });

    if (starField) {
      timeline.add(starField, { y: -420, rotate: -6, opacity: 0.35 }, 0);
    }
    if (moonScroll) {
      timeline.add(moonScroll, { y: -900, x: -90 }, 0);
    }
    if (earthScroll) {
      timeline.add(earthScroll, { y: -820, x: 120 }, 0);
    }
    if (sunScroll) {
      timeline.add(sunScroll, { y: -900, x: -90 }, 0);
    }
    if (cloudScroll.length > 0) {
      timeline.add(cloudScroll, { y: -820, x: -140 }, 0);
    }
    if (nebulaA) {
      timeline.add(nebulaA, { y: -720, x: 280 }, 0);
    }
    if (nebulaB) {
      timeline.add(nebulaB, { y: -1250, x: -240 }, 0);
    }

    const total = timeline.duration;

    let targetProgress = 0;
    let easedProgress = 0;
    let frame = 0;

    const readScroll = () => {
      const doc = document.documentElement;
      const scrollable = doc.scrollHeight - window.innerHeight;
      targetProgress =
        scrollable > 0
          ? Math.min(1, Math.max(0, window.scrollY / scrollable))
          : 0;
    };

    const render = () => {
      easedProgress += (targetProgress - easedProgress) * SMOOTHING;
      timeline.seek(total * easedProgress);
      frame = requestAnimationFrame(render);
    };

    window.addEventListener("scroll", readScroll, { passive: true });
    window.addEventListener("resize", readScroll);
    readScroll();
    easedProgress = targetProgress;
    timeline.seek(total * easedProgress);
    frame = requestAnimationFrame(render);

    return () => {
      window.removeEventListener("scroll", readScroll);
      window.removeEventListener("resize", readScroll);
      cancelAnimationFrame(frame);
      for (const loop of loops) loop.pause();
      timeline.pause();
    };
  }, []);

  return (
    <div
      ref={rootRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
    >
      {/* ================= NIGHT (dark mode) ================= */}
      <div data-stars className="absolute inset-0 hidden dark:block">
        {STARS.map((star, index) => (
          <span
            key={index}
            data-star=""
            style={{
              top: `${star.top}%`,
              left: `${star.left}%`,
              width: `${star.size}px`,
              height: `${star.size}px`,
              opacity: star.opacity,
            }}
            className="absolute rounded-full bg-white"
          />
        ))}
      </div>

      <div
        data-moon-scroll=""
        className="absolute top-16 right-[6%] hidden size-[240px] sm:size-[300px] dark:block"
      >
        <div data-moon-spin="" className="size-full">
          <img
            src="/assets/moon.svg"
            alt=""
            width={200}
            height={200}
            className="size-full opacity-90 drop-shadow-[0_0_40px_rgba(140,150,170,0.25)]"
          />
        </div>
      </div>

      <div
        data-earth-scroll=""
        className="absolute top-[26%] -left-28 hidden size-[260px] sm:size-[340px] dark:block"
      >
        <div data-earth-spin="" className="size-full">
          <img
            src="/assets/earth.svg"
            alt=""
            width={200}
            height={200}
            className="size-full opacity-95 drop-shadow-[0_0_50px_rgba(60,130,255,0.35)]"
          />
        </div>
      </div>

      {/* ================= DAY (light mode) ================= */}
      <div
        className="absolute inset-0 dark:hidden"
        style={{
          background:
            "linear-gradient(to bottom, #E1EEFC 0%, #EFF6FE 42%, #FAFCFF 78%, transparent 100%)",
        }}
      />

      <div
        data-sun-scroll=""
        className="absolute top-10 right-[4%] size-[190px] sm:size-[240px] dark:hidden"
      >
        <div data-sun-ambient="" className="size-full">
          <img src="/assets/sun.svg" alt="" width={260} height={260} className="size-full" />
        </div>
      </div>

      <svg
        className="absolute inset-0 h-full w-full dark:hidden"
        viewBox="0 0 1200 800"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <radialGradient id="sky-cloud" cx="42%" cy="34%" r="62%">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="55%" stopColor="#FBFDFF" />
            <stop offset="100%" stopColor="#D9E7F7" stopOpacity="0.75" />
          </radialGradient>
          <radialGradient id="sky-cloud-shade" cx="50%" cy="30%" r="65%">
            <stop offset="0%" stopColor="#C4DAF4" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#C4DAF4" stopOpacity="0" />
          </radialGradient>
        </defs>

        {CLOUDS.map((cloud, index) => {
          const shape = CLOUD_SHAPES[cloud.shape];
          return (
            <g
              key={index}
              transform={`translate(${cloud.x} ${cloud.y}) scale(${cloud.s})`}
            >
              <g data-cloud-scroll="">
                <g data-cloud="">
                  {/* shaded underside gives the cloud volume */}
                  <g fill="url(#sky-cloud-shade)" transform="translate(0 14)">
                    {shape.shade.map(([cx, cy, rx, ry], blob) => (
                      <ellipse key={blob} cx={cx} cy={cy} rx={rx} ry={ry} />
                    ))}
                  </g>
                  {/* body */}
                  {shape.body.map(([cx, cy, rx, ry], blob) => (
                    <ellipse
                      key={blob}
                      cx={cx}
                      cy={cy}
                      rx={rx}
                      ry={ry}
                      fill="url(#sky-cloud)"
                    />
                  ))}
                  {/* bright crests */}
                  <g fill="#FFFFFF" opacity="0.9">
                    {shape.light.map(([cx, cy, rx, ry], blob) => (
                      <ellipse key={blob} cx={cx} cy={cy} rx={rx} ry={ry} />
                    ))}
                  </g>
                </g>
              </g>
            </g>
          );
        })}
      </svg>

      {/* soft colour wash (both themes) */}
      <div
        data-orb="a"
        className="absolute -top-48 -left-32 size-[460px] rounded-full bg-brand/10 blur-[140px] dark:bg-chart-3/20"
      />
      <div
        data-orb="b"
        className="absolute top-1/3 -right-40 size-[420px] rounded-full bg-chart-2/15 blur-[140px]"
      />
    </div>
  );
}
