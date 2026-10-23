"use client";

import { useEffect, useId, useState } from "react";
import { LuInfo } from "react-icons/lu";

// An (i) button with a longer note. It shows on hover (CSS, so the pointer can move onto the note) and on focus or
// click; Escape hides it until the pointer or focus comes back.
const InfoTooltip = ({ label, text }: { label: string; text: string }) => {
  const id = useId();
  const [open, setOpen] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      setOpen(false);
      setDismissed(true);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  const show = () => {
    setDismissed(false);
    setOpen(true);
  };

  return (
    <span className={`info-tooltip${open ? " is-open" : ""}${dismissed ? " is-dismissed" : ""}`}>
      <button
        type="button"
        className="info-tooltip__button"
        aria-label={label}
        aria-describedby={id}
        aria-expanded={open}
        onFocus={show}
        onBlur={() => setOpen(false)}
        onMouseEnter={() => setDismissed(false)}
        onClick={() => (open ? setOpen(false) : show())}
      >
        <LuInfo aria-hidden="true" focusable="false" />
      </button>
      <span id={id} role="tooltip" className="info-tooltip__text">
        {text}
      </span>
    </span>
  );
};

export default InfoTooltip;
