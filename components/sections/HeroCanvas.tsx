"use client";

import { useEffect, useRef } from "react";

/**
 * Flowing particle streams, drawn on a canvas.
 *
 * Stands in for the full-viewport background video the reference site uses — same effect
 * (streams of light converging toward a bright point), but generated rather than shipped,
 * so it costs a few KB instead of a few MB and never pixelates.
 *
 * Particles ride quadratic curves that all terminate near one convergence point, getting
 * brighter and tighter as they approach it. That convergence is what reads as depth.
 */

const LANES = 26;
const PER_LANE = 16;
const CONVERGE = { x: 0.72, y: 0.04 }; // fraction of canvas

type P = { lane: number; t: number; speed: number; size: number; seed: number };

export function HeroCanvas({ className }: { className?: string }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let w = 0;
    let h = 0;
    let dpr = 1;
    const particles: P[] = [];

    for (let lane = 0; lane < LANES; lane++) {
      for (let i = 0; i < PER_LANE; i++) {
        particles.push({
          lane,
          t: Math.random(),
          speed: 0.00035 + Math.random() * 0.00075,
          size: 0.6 + Math.random() * 1.7,
          seed: Math.random() * 1000,
        });
      }
    }

    function resize() {
      if (!canvas) return;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      const rect = canvas.getBoundingClientRect();
      w = rect.width;
      h = rect.height;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    /** Quadratic bezier from a fanned-out start to the shared convergence point. */
    function pointOn(lane: number, t: number) {
      const f = lane / (LANES - 1); // 0..1 across the fan
      // Starts sweep along the bottom-left edge and down the left side.
      const sx = -0.15 * w + f * 0.55 * w;
      const sy = h * (0.55 + f * 0.85);
      const cx = w * (0.15 + f * 0.35);
      const cy = h * (0.95 - f * 0.15);
      const ex = w * CONVERGE.x + (f - 0.5) * w * 0.30;
      const ey = h * CONVERGE.y;
      const mt = 1 - t;
      return {
        x: mt * mt * sx + 2 * mt * t * cx + t * t * ex,
        y: mt * mt * sy + 2 * mt * t * cy + t * t * ey,
      };
    }

    function frame(time: number) {
      if (!ctx) return;
      // Deep navy base with a lift toward the convergence point.
      const g = ctx.createLinearGradient(0, h, w * CONVERGE.x, 0);
      g.addColorStop(0, "#050b1c");
      g.addColorStop(0.55, "#071433");
      g.addColorStop(1, "#123a7a");
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, w, h);

      // Glow behind the convergence point.
      const halo = ctx.createRadialGradient(
        w * CONVERGE.x, h * CONVERGE.y, 0,
        w * CONVERGE.x, h * CONVERGE.y, Math.max(w, h) * 0.42,
      );
      halo.addColorStop(0, "rgba(92,194,237,0.34)");
      halo.addColorStop(0.5, "rgba(33,133,248,0.10)");
      halo.addColorStop(1, "rgba(0,0,0,0)");
      ctx.fillStyle = halo;
      ctx.fillRect(0, 0, w, h);

      ctx.globalCompositeOperation = "lighter";
      for (const p of particles) {
        if (!reduced) p.t += p.speed;
        if (p.t > 1) p.t -= 1;

        const { x, y } = pointOn(p.lane, p.t);
        // Gentle lateral shimmer so lanes don't look like rails.
        const wob = Math.sin(time * 0.0006 + p.seed) * 3.5 * (1 - p.t);
        // Brighter and tighter as it converges.
        const near = Math.pow(p.t, 1.8);
        const alpha = 0.10 + near * 0.75;
        const r = p.size * (0.5 + near * 1.15);

        ctx.beginPath();
        ctx.arc(x + wob, y, r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${140 + near * 90}, ${205 + near * 40}, 255, ${alpha})`;
        ctx.fill();

        // A soft halo on the brightest few keeps it from looking like confetti.
        if (near > 0.62) {
          ctx.beginPath();
          ctx.arc(x + wob, y, r * 3.6, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(92,194,237,${(near - 0.62) * 0.09})`;
          ctx.fill();
        }
      }
      ctx.globalCompositeOperation = "source-over";
    }

    let raf = 0;
    let running = true;
    function loop(t: number) {
      if (!running) return;
      frame(t);
      raf = requestAnimationFrame(loop);
    }

    resize();
    if (reduced) {
      frame(0); // one static composition
    } else {
      raf = requestAnimationFrame(loop);
    }

    const onResize = () => resize();
    window.addEventListener("resize", onResize);

    // Stop burning frames when the hero is off-screen or the tab is hidden.
    const io = new IntersectionObserver(
      ([entry]) => {
        const shouldRun = entry.isIntersecting && !document.hidden && !reduced;
        if (shouldRun && !running) {
          running = true;
          raf = requestAnimationFrame(loop);
        } else if (!shouldRun) {
          running = false;
          cancelAnimationFrame(raf);
        }
      },
      { threshold: 0 },
    );
    io.observe(canvas);

    const onVisibility = () => {
      if (document.hidden) {
        running = false;
        cancelAnimationFrame(raf);
      } else if (!reduced) {
        running = true;
        raf = requestAnimationFrame(loop);
      }
    };
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      running = false;
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
      document.removeEventListener("visibilitychange", onVisibility);
      io.disconnect();
    };
  }, []);

  return <canvas ref={ref} aria-hidden="true" className={className} />;
}
