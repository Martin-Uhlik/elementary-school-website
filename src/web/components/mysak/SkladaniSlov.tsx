"use client";

import { useCallback, useEffect, useState, type CSSProperties } from "react";
import ExerciseStatus from "./ExerciseStatus";
import { randomItem, shuffleChanged } from "@/lib/mysak/random";
import { usePointerDrag } from "@/lib/mysak/usePointerDrag";

const WORDS = [
  "Saturn",
  "kolibřík",
  "Merkur",
  "Amazonie",
  "Afrika",
  "Japonsko",
  "olympiáda",
  "Jupiter",
  "planeta",
  "Slunce",
  "komplikace",
  "vítězství",
  "semafor",
  "klávesnice",
  "mikroskop",
  "prázdniny",
  "telefon",
  "klobása",
  "záchrana",
  "revoluce",
  "legrace",
  "mikrofon",
  "slunečnice",
  "antilopa",
  "kopřiva",
  "čokoláda",
  "detektivka",
  "náhrdelník",
  "trojúhelník",
  "hrneček",
  "leopard",
  "Krkonoše",
  "Šumava",
  "Berounka",
  "Litomyšl",
  "Lotyšsko",
  "Estonsko",
  "kreveta",
  "veleještěr",
  "aligátor",
  "tiskárna",
  "pivovar",
  "čerpadlo",
  "stručnost",
  "spokojenost",
  "zahrada",
  "střecha",
  "harampádí",
  "kotrmelec",
  "diamant",
  "držadlo",
  "lokomotiva",
  "ostrůvek",
  "Austrálie",
  "Oceánie",
  "Antarktida",
  "geometrie",
  "knihovna",
  "Evropa",
  "tajemství",
  "zoufalství",
  "přátelství",
  "rozhodnutí",
  "zárodek",
  "buňka",
];

type Letter = { id: number; char: string };

const SOLVED_PAUSE = 1500;

const toLetters = (word: string) => Array.from(word).map((char, id) => ({ id, char }));
const spell = (letters: Letter[]) => letters.map((l) => l.char).join("");

const scramble = (word: string) => shuffleChanged(toLetters(word), (l) => spell(l) === word);

const pickWord = (previous?: string) => {
  let word = randomItem(WORDS);
  while (word === previous) word = randomItem(WORDS);
  return word;
};

const move = <T,>(items: T[], from: number, to: number) => {
  const next = [...items];
  const [item] = next.splice(from, 1);
  next.splice(to, 0, item);
  return next;
};

const SkladaniSlov = () => {
  const [word, setWord] = useState("");
  const [letters, setLetters] = useState<Letter[]>([]);
  const [selected, setSelected] = useState<number | null>(null);
  const [hinted, setHinted] = useState<number[]>([]);
  const [right, setRight] = useState(0);
  const [skipped, setSkipped] = useState(0);

  const nextWord = useCallback((previous?: string) => {
    const w = pickWord(previous);
    setWord(w);
    setLetters(scramble(w));
    setSelected(null);
    setHinted([]);
  }, []);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- random word must not run during SSR
    nextWord();
  }, [nextWord]);

  const solved = word !== "" && spell(letters) === word;

  useEffect(() => {
    if (!solved) return;
    const id = setTimeout(() => nextWord(word), SOLVED_PAUSE);
    return () => clearTimeout(id);
  }, [solved, word, nextWord]);

  const place = (next: Letter[]) => {
    setLetters(next);
    setSelected(null);
    if (spell(next) === word) setRight((r) => r + 1);
  };

  const moveLetter = (from: number, to: number) => {
    if (solved || from === to) return;
    place(move(letters, from, to));
  };

  const { bind, wasDragged } = usePointerDrag(moveLetter, !solved);

  const handleClick = (index: number) => {
    if (wasDragged() || solved) return;
    if (selected === null) setSelected(index);
    else if (selected === index) setSelected(null);
    else moveLetter(selected, index);
  };

  // put the first and the last letter in place
  const hint = () => {
    let next = letters;
    const chars = Array.from(word);
    const first = next.findIndex((l) => l.char === chars[0]);
    next = move(next, first, 0);
    const last = next.findIndex((l, i) => i > 0 && l.char === chars[chars.length - 1]);
    if (last > 0) next = move(next, last, next.length - 1);
    setHinted([next[0].id, next[next.length - 1].id]);
    place(next);
  };

  const skip = () => {
    setSkipped((s) => s + 1);
    nextWord(word);
  };

  return (
    <div className="slova mysak__exercise">
      <ExerciseStatus
        stats={[
          { label: "Složeno", value: right },
          { label: "Přeskočeno", value: skipped },
        ]}
      />

      <ol
        aria-label="Písmena"
        className={`slova__letters${solved ? " is-solved" : ""}`}
        style={{ "--letters": letters.length } as CSSProperties}
      >
        {letters.map((letter, i) => (
          <li key={letter.id}>
            <button
              type="button"
              className={`slova__letter${selected === i ? " is-selected" : ""}${hinted.includes(letter.id) ? " is-hinted" : ""}`}
              aria-label={`${letter.char}, pozice ${i + 1}`}
              aria-pressed={selected === i}
              onClick={() => handleClick(i)}
              {...bind(i)}
            >
              {letter.char}
            </button>
          </li>
        ))}
      </ol>

      <div className="mysak-toolbar">
        <button type="button" className="btn btn-outline-primary" onClick={skip} disabled={solved}>
          Přeskočit
        </button>
        <button type="button" className="btn btn-outline-secondary" onClick={hint} disabled={solved}>
          Nápověda
        </button>
      </div>
    </div>
  );
};

export default SkladaniSlov;
