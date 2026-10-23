"use client";

import { useEffect, useState } from "react";
import ExerciseStatus from "./ExerciseStatus";
import { schoolPhotos } from "@/lib/photos";
import { shuffleChanged } from "@/lib/mysak/random";
import { usePointerDrag } from "@/lib/mysak/usePointerDrag";
import { formatTime, useStopwatch } from "@/lib/mysak/useStopwatch";

const MIN = 1;
const MAX = 10;

const isSolved = (order: number[]) => order.every((piece, slot) => piece === slot);

// order[slot] = piece that currently sits in that slot
const createOrder = (count: number) => shuffleChanged(Array.from({ length: count }, (_, i) => i));

const Skladanka = () => {
  const [cols, setCols] = useState(3);
  const [rows, setRows] = useState(3);
  const [photo, setPhoto] = useState(0);
  const [order, setOrder] = useState<number[] | null>(null);
  const [moves, setMoves] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const stopwatch = useStopwatch();

  const restart = (nextCols = cols, nextRows = rows) => {
    setOrder(createOrder(nextCols * nextRows));
    setMoves(0);
    setSelected(null);
    stopwatch.reset();
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- random shuffle must not run during SSR
    setOrder(createOrder(3 * 3));
  }, []);

  const done = order !== null && moves > 0 && isSolved(order);

  const swap = (a: number, b: number) => {
    if (!order || a === b || done) return;
    const next = [...order];
    [next[a], next[b]] = [next[b], next[a]];
    setOrder(next);
    setMoves((m) => m + 1);
    setSelected(null);
    stopwatch.start();
    if (isSolved(next)) stopwatch.stop();
  };

  const { bind, wasDragged } = usePointerDrag(swap, !done);

  const handleClick = (slot: number) => {
    if (wasDragged() || done) return;
    if (selected === null) setSelected(slot);
    else if (selected === slot) setSelected(null);
    else swap(selected, slot);
  };

  const changeSize = (nextCols: number, nextRows: number) => {
    setCols(nextCols);
    setRows(nextRows);
    restart(nextCols, nextRows);
  };

  const image = schoolPhotos[photo];

  return (
    <div className="skladanka">
      <ExerciseStatus
        stats={[
          { label: "Čas", value: formatTime(stopwatch.seconds) },
          { label: "Tahy", value: moves },
          { label: "Dílků", value: cols * rows },
        ]}
        done={done}
        doneText={`Splněno za ${formatTime(stopwatch.seconds)}, počet tahů: ${moves}.`}
        onRestart={() => restart()}
      />

      <div className="skladanka__controls">
        <div>
          <label htmlFor="skladanka-cols" className="form-label">
            Sloupce: <strong>{cols}</strong>
          </label>
          <input
            id="skladanka-cols"
            type="range"
            className="form-range"
            min={MIN}
            max={MAX}
            value={cols}
            onChange={(e) => changeSize(Number(e.target.value), rows)}
          />
        </div>
        <div>
          <label htmlFor="skladanka-rows" className="form-label">
            Řádky: <strong>{rows}</strong>
          </label>
          <input
            id="skladanka-rows"
            type="range"
            className="form-range"
            min={MIN}
            max={MAX}
            value={rows}
            onChange={(e) => changeSize(cols, Number(e.target.value))}
          />
        </div>
      </div>

      <div
        role="group"
        aria-label={`Skládanka ${cols} × ${rows}: ${image.alt}`}
        className={`skladanka__board${done ? " is-done" : ""}`}
        style={{ gridTemplateColumns: `repeat(${cols}, 1fr)`, gridTemplateRows: `repeat(${rows}, 1fr)` }}
      >
        {order?.map((piece, slot) => {
          const x = piece % cols;
          const y = Math.floor(piece / cols);
          return (
            <button
              key={piece}
              type="button"
              className={`skladanka__piece${selected === slot ? " is-selected" : ""}`}
              aria-label={`Dílek ${piece + 1}, pozice ${slot + 1}`}
              aria-pressed={selected === slot}
              style={{
                backgroundImage: `url(${image.src})`,
                backgroundSize: `${cols * 100}% ${rows * 100}%`,
                backgroundPosition: `${cols > 1 ? (x / (cols - 1)) * 100 : 0}% ${rows > 1 ? (y / (rows - 1)) * 100 : 0}%`,
              }}
              onClick={() => handleClick(slot)}
              {...bind(slot)}
            />
          );
        })}
      </div>

      <fieldset className="skladanka__photos">
        <legend className="form-label fs-6">Obrázek</legend>
        {schoolPhotos.map((p, i) => (
          <button
            key={p.src}
            type="button"
            aria-pressed={photo === i}
            className={photo === i ? "is-selected" : ""}
            onClick={() => {
              setPhoto(i);
              restart();
            }}
          >
            <img src={p.src} alt={p.alt} width={160} height={90} loading="lazy" />
          </button>
        ))}
      </fieldset>
    </div>
  );
};

export default Skladanka;
