"use client";

import { useEffect, useRef, useState, type MouseEvent } from "react";
import ExerciseStatus from "./ExerciseStatus";
import { randomInt } from "@/lib/mysak/random";
import { formatTime, useStopwatch } from "@/lib/mysak/useStopwatch";

const SIZE = 10;
const HALF = SIZE / 2;
// 45 % of one quarter, mirrored into all four quarters
const POINTS = Math.floor((45 * HALF * HALF) / 100);
const TARGETS = POINTS * 4;

// 0 = grey (do not click), 1 = purple (click), 2 = yellow (double-click)
type Kind = 0 | 1 | 2;

const KIND_NAMES = ["šedé", "fialové", "žluté"];

// phones don't fire dblclick reliably, so two taps on the same cell within this time count as a double-click
const DOUBLE_TAP = 400;

const createPattern = () => {
  const kinds: Kind[] = Array(SIZE * SIZE).fill(0);
  let placed = 0;
  while (placed < POINTS) {
    const x = randomInt(HALF);
    const y = randomInt(HALF);
    if (kinds[y * SIZE + x]) continue;
    const kind: Kind = randomInt(2) ? 2 : 1;
    for (const [mx, my] of [
      [x, y],
      [SIZE - 1 - x, y],
      [x, SIZE - 1 - y],
      [SIZE - 1 - x, SIZE - 1 - y],
    ]) {
      kinds[my * SIZE + mx] = kind;
    }
    placed++;
  }
  return kinds;
};

const KlikADvojklik = () => {
  const [kinds, setKinds] = useState<Kind[] | null>(null);
  const [lit, setLit] = useState<boolean[]>(() => Array(SIZE * SIZE).fill(false));
  const [clicks, setClicks] = useState(0);
  const stopwatch = useStopwatch();
  const lastTap = useRef({ index: -1, time: 0 });

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- random pattern must not run during SSR
    setKinds(createPattern());
  }, []);

  const score = kinds ? lit.filter((on, i) => on && kinds[i]).length : 0;
  const done = score === TARGETS;

  const newPattern = () => {
    setKinds(createPattern());
    setLit(Array(SIZE * SIZE).fill(false));
  };

  const restart = () => {
    newPattern();
    setClicks(0);
    stopwatch.reset();
  };

  const setCell = (index: number, on: boolean) => {
    const next = [...lit];
    next[index] = on;
    setLit(next);
    if (kinds && next.filter((v, i) => v && kinds[i]).length === TARGETS) stopwatch.stop();
  };

  // a double-click is two clicks first, just like in the original exercise: the second one (detail 2) lights a yellow cell
  const handleClick = (index: number, e: MouseEvent) => {
    if (!kinds || done) return;
    stopwatch.start();
    setClicks((c) => c + 1);
    const tap = lastTap.current;
    const double = e.detail === 2 || (tap.index === index && e.timeStamp - tap.time < DOUBLE_TAP);
    lastTap.current = double ? { index: -1, time: 0 } : { index, time: e.timeStamp };
    // a click lights purple, a double-click yellow; the other colour goes dark
    if (kinds[index] === 0) newPattern();
    else setCell(index, kinds[index] === (double ? 2 : 1));
  };

  return (
    <div className="klik">
      <ExerciseStatus
        stats={[
          { label: "Čas", value: formatTime(stopwatch.seconds) },
          { label: "Rozsvíceno", value: score },
          { label: "Zbývá", value: TARGETS - score },
          { label: "Kliknutí", value: clicks },
        ]}
        done={done}
        doneText={`Splněno za ${formatTime(stopwatch.seconds)}, počet kliknutí: ${clicks}.`}
        onRestart={restart}
      />

      <div role="group" aria-label="Pole ke kliknutí" className="klik__board">
        {kinds?.map((kind, i) => (
          <button
            key={i}
            type="button"
            className={`klik__cell klik__cell--${kind}${lit[i] && kind ? " is-lit" : ""}`}
            aria-label={`Řádek ${Math.floor(i / SIZE) + 1}, sloupec ${(i % SIZE) + 1}: ${KIND_NAMES[kind]}${lit[i] && kind ? ", rozsvícené" : ""}`}
            onClick={(e) => handleClick(i, e)}
          />
        ))}
      </div>

      <button type="button" className="btn btn-outline-primary" onClick={restart}>
        Zamíchat
      </button>
    </div>
  );
};

export default KlikADvojklik;
