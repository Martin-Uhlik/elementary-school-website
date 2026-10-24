"use client";

import { useEffect, useRef, useState } from "react";

type Point = [number, number];
type Trail = { path: string; rings: Point[]; end: Point | null };

// widest corner, and how far a corner's control points sit from its ends (a quarter circle)
const MAX_RADIUS = 220;
const ARC = 0.448;
// how much the line drifts sideways while going down, and up and down while going across
const SWAY = 20;
const WAVER = 4.5;

// fixed "random" numbers, so the line looks hand-drawn but is the same on every visit
const random = (seed: number) => () => {
  seed = (seed * 9301 + 49297) % 233280;
  return (seed / 233280) * 2 - 1;
};

// a smooth curve through the points (Catmull-Rom), continuing a path that already ends at the first one
const through = (points: Point[]) =>
  points
    .slice(0, -1)
    .map((p1, i) => {
      const p0 = points[i - 1] ?? p1;
      const p2 = points[i + 1];
      const p3 = points[i + 2] ?? p2;
      return `C ${p1[0] + (p2[0] - p0[0]) / 6} ${p1[1] + (p2[1] - p0[1]) / 6} ${p2[0] - (p3[0] - p1[0]) / 6} ${p2[1] - (p3[1] - p1[1]) / 6} ${p2[0]} ${p2[1]}`;
    })
    .join(" ");

// A dashed line from the name bar down the empty side of each .home-row, across the gap below it with
// round corners, to the empty side of the next row, ending with a dot above the video (desktop only)
const HomeTrail = () => {
  const svg = useRef<SVGSVGElement>(null);
  const [trail, setTrail] = useState<Trail>({ path: "", rings: [], end: null });

  useEffect(() => {
    const box = svg.current?.parentElement;
    if (!box) return;
    const update = () => {
      const origin = box.getBoundingClientRect();
      const rect = (element: Element | null) => {
        const r = element?.getBoundingClientRect();
        return (
          r && {
            top: r.top - origin.top,
            bottom: r.bottom - origin.top,
            x: r.left + r.width / 2 - origin.left,
            width: r.width,
          }
        );
      };
      const rows = [...box.querySelectorAll(".home-row")].map((row) => ({
        row: rect(row)!,
        side: rect(row.querySelector(".home-row__side"))!,
      }));
      const title = rect(box.querySelector(".home-title"));
      const video = rect(box.querySelector(".main-tour"));
      // the empty sides are hidden on phones
      if (!title || !video || rows.length === 0 || rows.some(({ side }) => !side || side.width === 0)) {
        setTrail({ path: "", rings: [], end: null });
        return;
      }

      const rnd = random(7);
      const gaps = rows.map(({ row }, i) => (row.bottom + (rows[i + 1]?.row.top ?? video.top)) / 2);
      const rings: Point[] = [];
      let top = title.bottom + 6;
      let path = `M ${rows[0].side.x} ${top}`;
      let end: Point = [video.x, gaps[gaps.length - 1]];
      rows.forEach(({ side }, i) => {
        const x = side.x;
        const gap = gaps[i];
        const last = i === rows.length - 1;
        const next = last ? video.x : rows[i + 1].side.x;
        const dir = Math.sign(next - x);
        const below = last ? Infinity : (gaps[i + 1] - gap) / 2;
        const radius = Math.max(0, Math.min(MAX_RADIUS, Math.abs(next - x) / 2 - 20, (gap - top) / 2, below));

        // down the empty side
        const bottom = gap - radius;
        const steps = Math.max(2, Math.round((bottom - top) / 120));
        const sway = Math.min(SWAY, side.width / 2 - 20);
        const down = Array.from({ length: steps + 1 }, (_, k): Point => [
          k === 0 || k === steps ? x : x + rnd() * sway,
          top + ((bottom - top) * k) / steps,
        ]);
        path += " " + through(down);
        rings.push(down[Math.floor(steps / 2)]);

        // round corner, across the gap, round corner into the next row
        path += ` C ${x} ${gap - ARC * radius} ${x + dir * ARC * radius} ${gap} ${x + dir * radius} ${gap}`;
        const from = x + dir * radius;
        const to = last ? next : next - dir * radius;
        const parts = Math.max(1, Math.round(Math.abs(to - from) / 170));
        const across = Array.from({ length: parts + 1 }, (_, k): Point => [
          from + ((to - from) * k) / parts,
          k === 0 || k === parts ? gap : gap + rnd() * WAVER,
        ]);
        path += " " + through(across);
        if (last) end = [next, gap];
        else path += ` C ${next - dir * ARC * radius} ${gap} ${next} ${gap + ARC * radius} ${next} ${gap + radius}`;
        top = gap + radius;
      });
      setTrail({ path, rings, end });
    };
    update();
    const observer = new ResizeObserver(update);
    observer.observe(box);
    return () => observer.disconnect();
  }, []);

  return (
    <svg ref={svg} className="home-trail" aria-hidden="true" focusable="false">
      <path d={trail.path} />
      {trail.rings.map(([x, y]) => (
        <circle key={`${x} ${y}`} className="home-trail__ring" cx={x} cy={y} r={10} />
      ))}
      {trail.end && <circle className="home-trail__end" cx={trail.end[0]} cy={trail.end[1]} r={7} />}
    </svg>
  );
};

export default HomeTrail;
