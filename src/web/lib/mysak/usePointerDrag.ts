"use client";

import { useRef, type PointerEvent } from "react";

type Drag = { index: number; x: number; y: number; el: HTMLElement; moved: boolean };

// Drag an item with mouse or finger and drop it on another item marked with data-drop-index
export const usePointerDrag = (onDrop: (from: number, to: number) => void, enabled = true) => {
  const drag = useRef<Drag | null>(null);
  const dragged = useRef(false);

  const end = (e: PointerEvent<HTMLElement>, drop: boolean) => {
    const d = drag.current;
    drag.current = null;
    if (!d?.moved) return;
    dragged.current = true;
    // hide the dragged item for a moment to see what lies under the pointer
    d.el.style.visibility = "hidden";
    const target = drop
      ? document.elementFromPoint(e.clientX, e.clientY)?.closest<HTMLElement>("[data-drop-index]")
      : null;
    d.el.style.visibility = "";
    d.el.style.transform = "";
    d.el.classList.remove("is-dragging");
    if (target) onDrop(d.index, Number(target.dataset.dropIndex));
  };

  const bind = (index: number) => ({
    "data-drop-index": index,
    onPointerDown: (e: PointerEvent<HTMLElement>) => {
      dragged.current = false;
      if (e.button !== 0 || !enabled) return;
      e.currentTarget.setPointerCapture(e.pointerId);
      drag.current = { index, x: e.clientX, y: e.clientY, el: e.currentTarget, moved: false };
    },
    onPointerMove: (e: PointerEvent<HTMLElement>) => {
      const d = drag.current;
      if (!d) return;
      const dx = e.clientX - d.x;
      const dy = e.clientY - d.y;
      if (!d.moved && Math.hypot(dx, dy) < 6) return;
      d.moved = true;
      d.el.classList.add("is-dragging");
      d.el.style.transform = `translate(${dx}px, ${dy}px)`;
    },
    onPointerUp: (e: PointerEvent<HTMLElement>) => end(e, true),
    onPointerCancel: (e: PointerEvent<HTMLElement>) => end(e, false),
  });

  // true when the click that follows a pointerup belongs to a finished drag
  const wasDragged = () => {
    const was = dragged.current;
    dragged.current = false;
    return was;
  };

  return { bind, wasDragged };
};
