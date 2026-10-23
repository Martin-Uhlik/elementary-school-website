"use client";

import { type ReactNode, useId, useState } from "react";
import { LuChevronRight } from "react-icons/lu";

// A heading button that slides its content open and closed; the height animates through grid-template-rows (styles.css)
const Collapsible = ({
  title,
  children,
  className = "",
}: {
  title: string;
  children: ReactNode;
  className?: string;
}) => {
  const [open, setOpen] = useState(false);
  const id = useId();
  return (
    <div className={`collapsible${open ? " is-open" : ""} ${className}`.trim()}>
      <button
        type="button"
        className="collapsible__toggle"
        aria-expanded={open}
        aria-controls={id}
        onClick={() => setOpen((value) => !value)}
      >
        <LuChevronRight className="collapsible__icon" aria-hidden="true" focusable="false" />
        {title}
      </button>
      <div id={id} className="collapsible__panel">
        <div className="collapsible__content" inert={!open}>
          {children}
        </div>
      </div>
    </div>
  );
};

export default Collapsible;
