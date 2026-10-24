"use client";

import type { ReactNode } from "react";

type Props = {
  action: () => Promise<void>;
  question: string;
  children: ReactNode;
  className?: string;
  label?: string;
};

// A button that runs a server action (delete, move) after an optional "are you sure?" question
const ConfirmButton = ({ action, question, children, className, label }: Props) => (
  <form action={action} className="d-inline">
    <button
      type="submit"
      className={className ?? "btn btn-sm btn-outline-danger"}
      aria-label={label}
      title={label}
      onClick={(event) => {
        if (question && !confirm(question)) event.preventDefault();
      }}
    >
      {children}
    </button>
  </form>
);

export default ConfirmButton;
