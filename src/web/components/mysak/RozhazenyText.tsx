"use client";

import { useEffect, useState } from "react";
import ExerciseStatus from "./ExerciseStatus";
import { randomInt } from "@/lib/mysak/random";
import { formatTime, useStopwatch } from "@/lib/mysak/useStopwatch";

const FABLE =
  'Sejdou se zvířátka na večerní sněm a z nudy se dohodnou, že uspořádají soutěž ve vyprávění vtipů. Pravidla jsou jednoduchá: když někdo řekne vtip, kterému se nebudou smát úplně všichni, tak ho zabijou a jeho kůži prodají na trhu. Jako první byl vylosován zajíc. Dopovídal vtip a všichni se hrozně smějí, jenom želva ani nepípne a tváří se, jako by to byla ukrutná nuda. Zvířátkům je to divné, ale pravidla jsou pravidla, a tak zajíce zabijí. Jako druhý povídá vtip medvěd. Úžasný vtip. Všichni jsou mrtví smíchy, pro slzy skoro nevidí, jenom želva se vůbec nesměje. Zvířátkům je to zase divné, ale řeknou si, když se želva nesměje, tak to tě musíme, medvěde, zabít. A stalo se. Třetí den vypraví vtip stará sova. Neskutečně suchý a trapný vtip. Nikdo se ani neusměje, až želva najednou má záchvat smíchu, že nemůže ani mluvit, a popadá se za krunýř. Zvířátka se jí ptají, čemu se tak směje. A želva na to: "Ten zajícův fór byl ale dobrý, co?" A z toho plyne ponaučení: "Kdo se směje naposled, ten má dlouhé vedení."';

const insertAt = (text: string, index: number, part: string) => text.slice(0, index) + part + text.slice(index);

// Same damage as the original: line breaks, runs of spaces, no space after commas and from level 4 stray characters
const scramble = (level: number) => {
  let text = FABLE;
  const damage = Math.round((FABLE.length / 100) * level);
  for (let i = 0; i < damage; i++) {
    text = insertAt(text, 1 + randomInt(text.length), "\n");
    text = insertAt(text, randomInt(text.length + 1), " ".repeat(1 + randomInt(13)));
  }
  text = text.replace(/, /g, ",");
  if (level > 3) {
    const junk = level > 8 ? damage * 2 : damage;
    for (let i = 0; i <= junk; i++) {
      const code = 33 + randomInt(level < 9 ? 11 : 34);
      text = insertAt(text, 2 + randomInt(text.length - 1), String.fromCharCode(code));
    }
  }
  return text;
};

const isRestored = (text: string) => text.replace(/\n/g, "") === FABLE;

const RozhazenyText = () => {
  const [level, setLevel] = useState(1);
  const [text, setText] = useState("");
  const stopwatch = useStopwatch();

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- random damage must not run during SSR
    setText(scramble(1));
  }, []);

  const done = text !== "" && isRestored(text);

  const restart = (lvl = level) => {
    setLevel(lvl);
    setText(scramble(lvl));
    stopwatch.reset();
  };

  const handleChange = (value: string) => {
    setText(value);
    stopwatch.start();
    if (isRestored(value)) stopwatch.stop();
  };

  return (
    <div className="rozhazeny-text mysak__exercise">
      <ExerciseStatus
        stats={[
          { label: "Čas", value: formatTime(stopwatch.seconds) },
          { label: "Obtížnost", value: level },
        ]}
        done={done}
        doneText={`Bajka je opravená, splněno za ${formatTime(stopwatch.seconds)}.`}
        onRestart={() => restart()}
      />

      <div className="mysak-range">
        <label htmlFor="text-level" className="form-label">
          Obtížnost: <strong>{level}</strong>
        </label>
        <input
          id="text-level"
          type="range"
          className="form-range"
          min={1}
          max={10}
          value={level}
          onChange={(e) => restart(Number(e.target.value))}
        />
      </div>

      <label htmlFor="text-fable" className="form-label">
        Text bajky
      </label>
      <textarea
        id="text-fable"
        className="form-control mysak-textarea mysak-textarea--mono"
        rows={16}
        value={text}
        readOnly={done}
        spellCheck={false}
        onChange={(e) => handleChange(e.target.value)}
      />
    </div>
  );
};

export default RozhazenyText;
