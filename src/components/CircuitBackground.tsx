import React, { useEffect, useRef } from 'react';

/**
 * CircuitBackground – a subtle, animated motherboard/circuit-board pattern
 * rendered on a <canvas>.  It draws:
 *   • A static grid of faint traces (horizontal + vertical lines)
 *   • Circuit "nodes" (small dots at intersections)
 *   • IC-chip pads (small rectangles)
 *   • Glowing pulses that travel along random traces
 *
 * Everything uses the site's emerald/teal palette so it blends with the dark
 * background.  The animation is GPU-friendly (requestAnimationFrame + canvas).
 */

// ── helpers ──────────────────────────────────────────────────────────────────

interface Pulse {
  /** horizontal path or vertical path */
  axis: 'h' | 'v';
  /** fixed coordinate (y for horizontal, x for vertical) */
  fixed: number;
  /** start of the path segment */
  start: number;
  /** end of the path segment */
  end: number;
  /** current position along the path (0 → 1) */
  t: number;
  /** speed (fraction of path per frame) */
  speed: number;
  /** trail length in pixels */
  trail: number;
  /** colour */
  hue: number;
}

function randomBetween(a: number, b: number) {
  return a + Math.random() * (b - a);
}

// ── component ────────────────────────────────────────────────────────────────

export const CircuitBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let pulses: Pulse[] = [];

    // ── sizing ─────────────────────────────────────────────────────────────
    const CELL = 60; // grid cell size in CSS pixels
    let cols = 0;
    let rows = 0;
    let dpr = 1;

    function resize() {
      dpr = window.devicePixelRatio || 1;
      const parent = canvas!.parentElement;
      const w = parent ? parent.offsetWidth : window.innerWidth;
      const h = parent ? parent.offsetHeight : window.innerHeight;

      canvas!.width = w * dpr;
      canvas!.height = h * dpr;
      canvas!.style.width = `${w}px`;
      canvas!.style.height = `${h}px`;

      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);

      cols = Math.ceil(w / CELL);
      rows = Math.ceil(h / CELL);

      // regenerate pulses on resize
      pulses = makePulses(w, h);
    }

    // ── pulses ─────────────────────────────────────────────────────────────
    function makePulses(w: number, h: number): Pulse[] {
      const count = Math.max(8, Math.floor((w * h) / 120_000));
      const arr: Pulse[] = [];

      for (let i = 0; i < count; i++) {
        const isHorizontal = Math.random() > 0.5;
        const hue = randomBetween(150, 175); // emerald-ish

        if (isHorizontal) {
          // full-width horizontal pulses snapped to grid rows
          const row = Math.floor(randomBetween(0, rows)) * CELL;
          arr.push({
            axis: 'h',
            fixed: row,
            start: 0,
            end: w,
            t: Math.random(),
            speed: randomBetween(0.0003, 0.0012),
            trail: randomBetween(80, 180),
            hue,
          });
        } else {
          // full-height vertical pulses snapped to grid columns
          const col = Math.floor(randomBetween(0, cols)) * CELL;
          arr.push({
            axis: 'v',
            fixed: col,
            start: 0,
            end: h,
            t: Math.random(),
            speed: randomBetween(0.0003, 0.0012),
            trail: randomBetween(80, 180),
            hue,
          });
        }
      }
      return arr;
    }

    // ── draw ───────────────────────────────────────────────────────────────
    function draw() {
      const w = canvas!.width / dpr;
      const h = canvas!.height / dpr;
      ctx!.clearRect(0, 0, w, h);

      // 1. Static grid traces ───────────────────────────────────────────────
      ctx!.strokeStyle = 'rgba(16, 185, 129, 0.09)'; // emerald-500
      ctx!.lineWidth = 1;
      ctx!.beginPath();

      // vertical lines
      for (let c = 0; c <= cols; c++) {
        const x = c * CELL;
        ctx!.moveTo(x, 0);
        ctx!.lineTo(x, h);
      }
      // horizontal lines
      for (let r = 0; r <= rows; r++) {
        const y = r * CELL;
        ctx!.moveTo(0, y);
        ctx!.lineTo(w, y);
      }
      ctx!.stroke();

      // 2. Nodes (small dots at intersections) ─────────────────────────────
      ctx!.fillStyle = 'rgba(16, 185, 129, 0.2)';
      for (let c = 0; c <= cols; c++) {
        for (let r = 0; r <= rows; r++) {
          // only draw ~40 % of nodes for a sparser feel
          if ((c * 7 + r * 13) % 5 > 1) continue;
          const x = c * CELL;
          const y = r * CELL;
          ctx!.beginPath();
          ctx!.arc(x, y, 2, 0, Math.PI * 2);
          ctx!.fill();
        }
      }

      // 3. IC pads (small rectangles at some intersections) ────────────────
      ctx!.fillStyle = 'rgba(16, 185, 129, 0.12)';
      for (let c = 1; c < cols; c += 4) {
        for (let r = 1; r < rows; r += 4) {
          const x = c * CELL;
          const y = r * CELL;
          ctx!.fillRect(x - 6, y - 4, 12, 8);
          // tiny pin lines
          ctx!.strokeStyle = 'rgba(16, 185, 129, 0.14)';
          ctx!.lineWidth = 0.5;
          ctx!.beginPath();
          ctx!.moveTo(x - 10, y);
          ctx!.lineTo(x - 6, y);
          ctx!.moveTo(x + 6, y);
          ctx!.lineTo(x + 10, y);
          ctx!.moveTo(x, y - 8);
          ctx!.lineTo(x, y - 4);
          ctx!.moveTo(x, y + 4);
          ctx!.lineTo(x, y + 8);
          ctx!.stroke();
        }
      }

      // 4. Animated pulses ──────────────────────────────────────────────────
      for (const p of pulses) {
        p.t += p.speed;
        if (p.t > 1) p.t -= 1;

        const len = p.end - p.start;
        const pos = p.start + p.t * len;

        const grad =
          p.axis === 'h'
            ? ctx!.createLinearGradient(pos - p.trail, p.fixed, pos, p.fixed)
            : ctx!.createLinearGradient(p.fixed, pos - p.trail, p.fixed, pos);

        grad.addColorStop(0, `hsla(${p.hue}, 80%, 55%, 0)`);
        grad.addColorStop(0.5, `hsla(${p.hue}, 80%, 55%, 0.4)`);
        grad.addColorStop(1, `hsla(${p.hue}, 85%, 65%, 0.75)`);

        ctx!.strokeStyle = grad;
        ctx!.lineWidth = 2;
        ctx!.beginPath();
        if (p.axis === 'h') {
          ctx!.moveTo(Math.max(pos - p.trail, p.start), p.fixed);
          ctx!.lineTo(pos, p.fixed);
        } else {
          ctx!.moveTo(p.fixed, Math.max(pos - p.trail, p.start));
          ctx!.lineTo(p.fixed, pos);
        }
        ctx!.stroke();

        // Glow dot at the head
        // outer glow
        ctx!.beginPath();
        ctx!.arc(p.axis === 'h' ? pos : p.fixed, p.axis === 'h' ? p.fixed : pos, 5, 0, Math.PI * 2);
        ctx!.fillStyle = `hsla(${p.hue}, 85%, 60%, 0.2)`;
        ctx!.fill();

        // bright core dot
        ctx!.beginPath();
        ctx!.arc(p.axis === 'h' ? pos : p.fixed, p.axis === 'h' ? p.fixed : pos, 2.5, 0, Math.PI * 2);
        ctx!.fillStyle = `hsla(${p.hue}, 90%, 70%, 0.85)`;
        ctx!.fill();
      }

      animId = requestAnimationFrame(draw);
    }

    // ── bootstrap ──────────────────────────────────────────────────────────
    resize();
    draw();
    window.addEventListener('resize', resize);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 z-0"
      style={{ opacity: 0.85 }}
    />
  );
};
