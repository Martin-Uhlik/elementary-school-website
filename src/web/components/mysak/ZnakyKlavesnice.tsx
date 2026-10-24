"use client";

import { useEffect, useState, type KeyboardEvent } from "react";
import ExerciseStatus from "./ExerciseStatus";
import { randomChars } from "@/lib/mysak/random";
import { formatTime, useStopwatch } from "@/lib/mysak/useStopwatch";

const SENTENCE = [
  "Slunce je staré",
  "přibližně 4,6 miliardy let,",
  "což je řadí mezi",
  "hvězdy středního věku.",
  "Bude svítit ještě",
  "asi 5 až 7 miliard let.",
  "Teplota na povrchu Slunce",
  "činí asi 5800 K,",
  "proto je lidé",
  "vnímají jako žluté.",
  "Průměr Slunce je",
  "zhruba 1 400 000 km,",
  "což činí asi",
  "109 průměrů Země.",
  "Jeho objem je tedy",
  "asi 1,3 milionkrát větší,",
  "než je objem Země.",
];

// level 2 copies a text about the Sun, the others random characters
const LEVELS = [
  { label: "Písmena bez diakritiky a čísla", length: 8, sets: [0] },
  { label: "Běžný text", length: 0, sets: [] },
  { label: "Písmena a čísla včetně diakritiky", length: 8, sets: [0, 1] },
  { label: "Písmena s diakritikou a přehláskami", length: 8, sets: [1, 2] },
  { label: "Diakritika, přehlásky a speciální znaky", length: 10, sets: [1, 2, 3] },
  { label: "Všechny znaky včetně cizích s diakritikou", length: 10, sets: [2, 3, 4] },
];

const ZnakyKlavesnice = () => {
  const [level, setLevel] = useState(3);
  const [word, setWord] = useState("");
  const [sentenceIndex, setSentenceIndex] = useState(0);
  const [value, setValue] = useState("");
  const [right, setRight] = useState(0);
  const [mistakes, setMistakes] = useState(0);
  const [skipped, setSkipped] = useState(0);
  const stopwatch = useStopwatch();

  const createWord = (lvl: number, index: number) => {
    const { length, sets } = LEVELS[lvl - 1];
    if (length) return randomChars(length, sets);
    setSentenceIndex((index + 1) % SENTENCE.length);
    return SENTENCE[index % SENTENCE.length];
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- random word must not run during SSR
    setWord(randomChars(LEVELS[2].length, LEVELS[2].sets));
  }, []);

  const nextWord = () => {
    setWord(createWord(level, sentenceIndex));
    setValue("");
  };

  const changeLevel = (lvl: number) => {
    setLevel(lvl);
    setSentenceIndex(0);
    setWord(createWord(lvl, 0));
    setValue("");
    setRight(0);
    setMistakes(0);
    setSkipped(0);
    stopwatch.reset();
  };

  const handleChange = (text: string) => {
    stopwatch.start();
    if (text === word) {
      setRight((r) => r + 1);
      nextWord();
    } else {
      setValue(text);
    }
  };

  // Enter checks the word, a wrong one counts as a mistake
  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key !== "Enter") return;
    e.preventDefault();
    if (value !== "" && value !== word) setMistakes((m) => m + 1);
  };

  const skip = () => {
    setSkipped((s) => s + 1);
    nextWord();
  };

  return (
    <div className="znaky mysak__exercise">
      <ExerciseStatus
        stats={[
          { label: "Čas", value: formatTime(stopwatch.seconds) },
          { label: "Opsáno", value: right },
          { label: "Chyby", value: mistakes },
          { label: "Přeskočeno", value: skipped },
        ]}
      />

      <div className="mysak-range">
        <label htmlFor="znaky-level" className="form-label">
          Obtížnost: <strong>{level}</strong> – {LEVELS[level - 1].label}
        </label>
        <input
          id="znaky-level"
          type="range"
          className="form-range"
          min={1}
          max={LEVELS.length}
          value={level}
          onChange={(e) => changeLevel(Number(e.target.value))}
        />
      </div>

      <div className="mysak-board">
        <p className="mysak-board__label">Opiš:</p>
        <p className="mysak-board__word" id="znaky-word">
          {word}
        </p>
        <label htmlFor="znaky-input" className="visually-hidden">
          Tvůj opis
        </label>
        <input
          id="znaky-input"
          className="form-control form-control-lg mysak-board__input"
          value={value}
          onChange={(e) => handleChange(e.target.value)}
          onKeyDown={handleKeyDown}
          autoComplete="off"
          autoCorrect="off"
          autoCapitalize="off"
          spellCheck={false}
          aria-describedby="znaky-word"
        />
      </div>

      <div className="mysak-toolbar">
        <button type="button" className="btn btn-outline-primary" onClick={skip}>
          Jiné slovo
        </button>
      </div>
    </div>
  );
};

export default ZnakyKlavesnice;
