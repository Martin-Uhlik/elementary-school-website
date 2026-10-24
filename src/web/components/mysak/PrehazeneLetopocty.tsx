"use client";

import { useEffect, useRef, useState, type PointerEvent } from "react";
import ExerciseStatus from "./ExerciseStatus";
import { shuffleChanged } from "@/lib/mysak/random";
import { formatTime, useStopwatch } from "@/lib/mysak/useStopwatch";

const EVENTS = [
  "623 - vznik Sámovy říše",
  "863 - příchod Cyrila a Metoděje",
  "935 - smrt sv. Václava",
  "1212 - Zlatá bula sicilská",
  "1306 - zavraždění Václava III. - vymření Přemyslovců po meči",
  "1310 - Lucemburkové na českém trůnu",
  "1346 - bitva u Kresčaku - smrt Jana Lucemburského",
  "1348 - založena Karlova univerzita",
  "1378 - smrt Karla IV.",
  "1415 - upálení mistra Jana Husa",
  "1420 - husitské války",
  "1424 - zemřel Jan Žižka z Trocnova",
  "1458 - Jiří z Poděbrad českým králem",
  "1526 - nástup Habsburků na český trůn",
  "1618 - začátek třicetileté války",
  "1620 - bitva na Bílé hoře",
  "1740 - Marie Terezie usedá na trůn",
  "1774 - zavedení povinné školní docházky",
  "1780 - končí vláda Marie Terezie",
  "1848 - zrušení roboty",
  "1868 - položení základního kamene Národního divadla",
  "1881 - otevření a požár Národního divadla",
  "1914 - 1. světová válka",
  "1918 - vznik Československa",
  "1942 - vypálení obcí Lidice a Ležáky",
  "1945 - konec 2. světové války",
  "1989 - sametová revoluce",
  "1993 - vznik České republiky",
  "2004 - vstup do EU",
];

const lines = (text: string) =>
  text
    .split("\n")
    .map((l) => l.trim())
    .filter(Boolean);

const createText = () => shuffleChanged(EVENTS).join("\n") + "\n";

// typing is off: only the clipboard, Delete, Backspace, Enter, space and moving the cursor work
const ALLOWED_INPUT = /^(delete|insertFromPaste|insertLineBreak|insertParagraph|history)/;

const PrehazeneLetopocty = () => {
  const [text, setText] = useState("");
  const [warning, setWarning] = useState(false);
  const stopwatch = useStopwatch();
  const ref = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- random order must not run during SSR
    setText(createText());
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const block = (e: InputEvent) => {
      if (ALLOWED_INPUT.test(e.inputType) || (e.inputType === "insertText" && e.data === " ")) return;
      e.preventDefault();
    };
    el.addEventListener("beforeinput", block);
    return () => el.removeEventListener("beforeinput", block);
  }, []);

  const current = lines(text);
  const inPlace = current.filter((line, i) => line === EVENTS[i]).length;
  const done = text !== "" && current.length === EVENTS.length && inPlace === EVENTS.length;

  const restart = () => {
    setText(createText());
    stopwatch.reset();
    ref.current?.setSelectionRange(0, 0);
  };

  const handleChange = (value: string) => {
    setText(value);
    setWarning(false);
    stopwatch.start();
    const next = lines(value);
    if (next.length === EVENTS.length && next.every((line, i) => line === EVENTS[i])) stopwatch.stop();
  };

  // the original exercise is for the keyboard only: using the mouse in the text shuffles it again
  // (a finger on a touch screen is let through, there is no other way to place the cursor there)
  const handlePointerDown = (e: PointerEvent) => {
    if (!stopwatch.running || e.pointerType !== "mouse") return;
    restart();
    setWarning(true);
  };

  return (
    <div className="letopocty mysak__exercise">
      <ExerciseStatus
        stats={[
          { label: "Čas", value: formatTime(stopwatch.seconds) },
          { label: "Na svém místě", value: `${inPlace} / ${EVENTS.length}` },
        ]}
        done={done}
        doneText={`Události jsou seřazené, splněno za ${formatTime(stopwatch.seconds)}.`}
        onRestart={restart}
      />

      {warning && (
        <div className="alert alert-warning" role="alert">
          Myš se v tomto cvičení nepoužívá, události se znovu zamíchaly. Pracuj jen s klávesnicí.
        </div>
      )}

      <label htmlFor="letopocty-text" className="form-label">
        Události (pouze pro klávesnici)
      </label>
      <textarea
        id="letopocty-text"
        ref={ref}
        className="form-control mysak-textarea"
        rows={EVENTS.length + 2}
        value={text}
        readOnly={done}
        spellCheck={false}
        onChange={(e) => handleChange(e.target.value)}
        onPointerDown={handlePointerDown}
        onDrop={(e) => e.preventDefault()}
      />

      <div className="mysak-toolbar">
        <button type="button" className="btn btn-outline-primary" onClick={restart}>
          Zamíchat
        </button>
      </div>
    </div>
  );
};

export default PrehazeneLetopocty;
