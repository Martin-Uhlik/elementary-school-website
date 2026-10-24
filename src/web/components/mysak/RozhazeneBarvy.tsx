"use client";

import { useEffect, useState } from "react";
import ExerciseStatus from "./ExerciseStatus";
import { randomColor, shuffle } from "@/lib/mysak/random";
import { formatTime, useStopwatch } from "@/lib/mysak/useStopwatch";

type Tile = { color: string; found: boolean };

const createTiles = (count: number): Tile[] => {
  const colors = Array.from({ length: count / 2 }, () => randomColor());
  return shuffle([...colors, ...colors]).map((color) => ({ color, found: false }));
};

const NARROW = "(max-width: 575.98px)";

const RozhazeneBarvy = () => {
  // the number of columns stays even, so every colour has its pair
  const [cols, setCols] = useState(22);
  const [rows, setRows] = useState(2);
  const [tiles, setTiles] = useState<Tile[] | null>(null);
  const [selected, setSelected] = useState<number | null>(null);
  const [right, setRight] = useState(0);
  const [wrong, setWrong] = useState(0);
  const stopwatch = useStopwatch();

  useEffect(() => {
    // phones start with fewer, bigger tiles that can be tapped
    const [startCols, startRows] = matchMedia(NARROW).matches ? [8, 4] : [22, 2];
    /* eslint-disable react-hooks/set-state-in-effect -- random colours must not run during SSR */
    setCols(startCols);
    setRows(startRows);
    setTiles(createTiles(startCols * startRows));
    /* eslint-enable react-hooks/set-state-in-effect */
  }, []);

  const remaining = tiles ? tiles.filter((t) => !t.found).length / 2 : 0;
  const done = tiles !== null && remaining === 0;

  const restart = (nextCols = cols, nextRows = rows) => {
    setCols(nextCols);
    setRows(nextRows);
    setTiles(createTiles(nextCols * nextRows));
    setSelected(null);
    setRight(0);
    setWrong(0);
    stopwatch.reset();
  };

  const handleClick = (index: number) => {
    if (!tiles) return;
    stopwatch.start();
    if (selected === null) return setSelected(index);
    if (selected === index) return setSelected(null);
    setSelected(null);
    if (tiles[selected].color !== tiles[index].color) return setWrong((w) => w + 1);
    const next = tiles.map((t, i) => (i === selected || i === index ? { ...t, found: true } : t));
    setTiles(next);
    setRight((r) => r + 1);
    if (next.every((t) => t.found)) stopwatch.stop();
  };

  return (
    <div className="barvy">
      <ExerciseStatus
        stats={[
          { label: "Čas", value: formatTime(stopwatch.seconds) },
          { label: "Správně", value: right },
          { label: "Špatně", value: wrong },
          { label: "Zbývá párů", value: remaining },
        ]}
        done={done}
        doneText={`Všech ${right} párů nalezeno za ${formatTime(stopwatch.seconds)}, chybných pokusů: ${wrong}.`}
        onRestart={() => restart()}
      />

      <div className="mysak-toolbar">
        <span className="mysak-toolbar__size">
          {cols} × {rows}
        </span>
        <div className="mysak-toolbar__group" role="group" aria-label="Počet sloupců">
          <span className="mysak-toolbar__label">Sloupce</span>
          <button
            type="button"
            className="btn btn-outline-primary"
            aria-label="Přidat sloupce"
            disabled={cols >= 24}
            onClick={() => restart(cols + 2, rows)}
          >
            +
          </button>
          <button
            type="button"
            className="btn btn-outline-primary"
            aria-label="Ubrat sloupce"
            disabled={cols <= 2}
            onClick={() => restart(cols - 2, rows)}
          >
            −
          </button>
        </div>
        <div className="mysak-toolbar__group" role="group" aria-label="Počet řad">
          <span className="mysak-toolbar__label">Řady</span>
          <button
            type="button"
            className="btn btn-outline-primary"
            aria-label="Přidat řadu"
            disabled={rows >= 35}
            onClick={() => restart(cols, rows + 1)}
          >
            +
          </button>
          <button
            type="button"
            className="btn btn-outline-primary"
            aria-label="Ubrat řadu"
            disabled={rows <= 1}
            onClick={() => restart(cols, rows - 1)}
          >
            −
          </button>
        </div>
        <button type="button" className="btn btn-outline-primary" onClick={() => restart()}>
          Zamíchat
        </button>
      </div>

      <div
        role="group"
        aria-label="Barevná pole"
        className="barvy__board"
        style={{ gridTemplateColumns: `repeat(${cols}, 1fr)` }}
      >
        {tiles?.map((tile, i) => (
          <button
            key={i}
            type="button"
            className={`barvy__tile${selected === i ? " is-selected" : ""}`}
            style={{ backgroundColor: tile.color, visibility: tile.found ? "hidden" : undefined }}
            disabled={tile.found}
            aria-label={`Barva ${i + 1}`}
            aria-pressed={selected === i}
            onClick={() => handleClick(i)}
          />
        ))}
      </div>
    </div>
  );
};

export default RozhazeneBarvy;
