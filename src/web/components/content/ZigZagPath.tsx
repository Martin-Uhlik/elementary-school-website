"use client";

import { useEffect, useRef, useState } from "react";

// A dashed line behind a .zig-zag that leads from each photo in a wavy curve down into the next one
const ZigZagPath = () => {
  const svg = useRef<SVGSVGElement>(null);
  const [path, setPath] = useState("");

  useEffect(() => {
    const box = svg.current?.parentElement;
    if (!box) return;
    const update = () => {
      const origin = box.getBoundingClientRect();
      const photos = [...box.querySelectorAll<HTMLElement>(".zig-zag__photo")].map((photo) => {
        const rect = photo.getBoundingClientRect();
        return {
          x: rect.left + rect.width / 2 - origin.left,
          top: rect.top - origin.top,
          bottom: rect.bottom - origin.top,
        };
      });
      // from the bottom of one photo a wide turn into a wavy line across the gap, then a wide turn down into the next photo
      setPath(
        photos
          .slice(1)
          .map((to, i) => {
            const from = photos[i];
            const mid = (from.bottom + to.top) / 2;
            const dir = Math.sign(to.x - from.x);
            const turn = Math.min(280, Math.abs(to.x - from.x) * 0.4);
            // the turns start inside the photos (hidden behind them) so they can be twice as tall as half the gap
            const rise = mid - from.bottom;
            const out = from.bottom - rise;
            const into = to.top + rise;
            const start = from.x + dir * turn;
            const end = to.x - dir * turn;
            const waves = Math.max(1, Math.round(Math.abs(end - start) / 90));
            const step = (end - start) / waves;
            const wave = Array.from({ length: waves }, (_, w) => {
              const x = start + w * step;
              const y = mid + (w % 2 ? -7 : 7);
              return `C ${x + step / 3} ${y} ${x + (2 * step) / 3} ${y} ${x + step} ${mid}`;
            });
            return [
              `M ${from.x} ${out}`,
              `C ${from.x} ${mid} ${from.x + (dir * turn) / 2} ${mid} ${start} ${mid}`,
              ...wave,
              `C ${to.x - (dir * turn) / 2} ${mid} ${to.x} ${mid} ${to.x} ${into}`,
            ].join(" ");
          })
          .join(" "),
      );
    };
    const observer = new ResizeObserver(update);
    observer.observe(box);
    box.querySelectorAll("img").forEach((img) => img.addEventListener("load", update));
    return () => observer.disconnect();
  }, []);

  return (
    <svg ref={svg} className="zig-zag__path" aria-hidden="true" focusable="false">
      <path className="zig-zag__line" d={path} />
    </svg>
  );
};

export default ZigZagPath;
