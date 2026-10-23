"use client";

import { useEffect, useRef, useState, type ChangeEvent } from "react";
import ExerciseStatus from "./ExerciseStatus";
import { randomChars } from "@/lib/mysak/random";

const LEVELS = [
  { label: "Jenom čísla", sets: [5] },
  { label: "Malá písmena bez diakritiky", sets: [6] },
  { label: "Malá a velká písmena bez diakritiky", sets: [7, 6] },
  { label: "Pouze písmena s diakritikou", sets: [1] },
  { label: "Písmena a čísla", sets: [0, 1] },
  { label: "Pouze speciální znaky", sets: [3] },
  { label: "Pouze přehlásky", sets: [2] },
  { label: "Všechny znaky klávesnice", sets: [0, 1, 2, 3] },
];

const SPEEDS = [
  { label: "nejpomaleji", ms: 3600 },
  { label: "pomalu", ms: 2800 },
  { label: "normálně", ms: 2000 },
  { label: "rychle", ms: 1400 },
  { label: "velmi rychle", ms: 1000 },
  { label: "SUPERMAN", ms: 700 },
];

const START_DELAY = 1000;

type Answer = { char: string; ok: boolean } | null;

const JakRychlePises = () => {
  const [level, setLevel] = useState(5);
  const [speed, setSpeed] = useState(3);
  const [running, setRunning] = useState(false);
  const [char, setChar] = useState("");
  const [answer, setAnswer] = useState<Answer>(null);
  const [shown, setShown] = useState(0);
  const [right, setRight] = useState(0);
  const [wrong, setWrong] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!running) return;
    const { sets } = LEVELS[level - 1];
    const next = () => {
      setChar(randomChars(1, sets));
      setAnswer(null);
      setShown((n) => n + 1);
    };
    let interval: ReturnType<typeof setInterval> | undefined;
    const timeout = setTimeout(() => {
      next();
      interval = setInterval(next, SPEEDS[speed - 1].ms);
    }, START_DELAY);
    return () => {
      clearTimeout(timeout);
      clearInterval(interval);
    };
  }, [running, level, speed]);

  const reset = () => {
    setRunning(false);
    setChar("");
    setAnswer(null);
    setShown(0);
    setRight(0);
    setWrong(0);
  };

  const start = () => {
    reset();
    setRunning(true);
  };

  useEffect(() => {
    if (running) inputRef.current?.focus();
  }, [running]);

  // only the first key pressed for each character counts
  const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
    // wait until a dead key (e.g. for ö) has been combined into the final character
    if ((e.nativeEvent as InputEvent).isComposing) return;
    const typed = Array.from(e.target.value).pop();
    e.target.value = "";
    if (!typed || !running || !char || answer) return;
    const ok = typed === char;
    setAnswer({ char: typed, ok });
    if (ok) setRight((r) => r + 1);
    else setWrong((w) => w + 1);
  };

  const percent = shown ? Math.round((right / shown) * 100) : 0;

  return (
    <div className="rychlost">
      <ExerciseStatus
        stats={[
          { label: "Znaků", value: shown },
          { label: "Správně", value: right },
          { label: "Chyby", value: wrong },
          { label: "Úspěšnost", value: `${percent} %` },
        ]}
      />

      <div className="rychlost__settings">
        <div className="mysak-range">
          <label htmlFor="rychlost-level" className="form-label">
            Obtížnost: <strong>{level}</strong> – {LEVELS[level - 1].label}
          </label>
          <input
            id="rychlost-level"
            type="range"
            className="form-range"
            min={1}
            max={LEVELS.length}
            value={level}
            onChange={(e) => {
              setLevel(Number(e.target.value));
              reset();
            }}
          />
        </div>
        <div className="mysak-range">
          <label htmlFor="rychlost-speed" className="form-label">
            Rychlost: <strong>{speed}</strong> – {SPEEDS[speed - 1].label}
          </label>
          <input
            id="rychlost-speed"
            type="range"
            className="form-range"
            min={1}
            max={SPEEDS.length}
            value={speed}
            onChange={(e) => {
              setSpeed(Number(e.target.value));
              reset();
            }}
          />
        </div>
      </div>

      <div className="mysak-toolbar">
        {running ? (
          <button type="button" className="btn btn-danger btn-lg" onClick={() => setRunning(false)}>
            Stop
          </button>
        ) : (
          <button type="button" className="btn btn-success btn-lg" onClick={start}>
            Start
          </button>
        )}
      </div>
      <div className="rychlost__board">
        <div className="rychlost__cell">
          <span className="visually-hidden">Napiš znak: </span>
          <span key={shown} className="rychlost__char">
            {char || "?"}
          </span>
        </div>
        <div className={`rychlost__cell${answer ? (answer.ok ? " is-right" : " is-wrong") : ""}`} aria-hidden="true">
          {answer?.char ?? ""}
        </div>
      </div>

      <label htmlFor="rychlost-input" className="form-label">
        Sem piš
      </label>
      <input
        id="rychlost-input"
        ref={inputRef}
        className="form-control form-control-lg rychlost__input"
        onChange={handleInput}
        autoComplete="off"
        autoCorrect="off"
        autoCapitalize="off"
        spellCheck={false}
        disabled={!running}
      />
    </div>
  );
};

export default JakRychlePises;
