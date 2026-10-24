"use client";

import { useState, useTransition, type ReactNode } from "react";

export type ActionState = { error?: string; message?: string } | void;

type Props = {
  action: (data: FormData) => Promise<ActionState>;
  submitLabel: string;
  children: ReactNode;
  className?: string;
};

// A form for a server action that keeps what was typed when the action reports an error
// (a plain <form action> would reset the fields), and shows the result above the button.
const ActionForm = ({ action, submitLabel, children, className }: Props) => {
  const [state, setState] = useState<ActionState>();
  const [pending, startTransition] = useTransition();

  return (
    <form
      className={`admin-form ${className ?? ""}`}
      // the admin is used on shared school computers: browsers should not fill in or remember what is typed
      autoComplete="off"
      onSubmit={(event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        startTransition(async () => setState(await action(data)));
      }}
    >
      {children}
      {state?.error && (
        <div className="alert alert-danger mb-0" role="alert">
          {state.error}
        </div>
      )}
      {state?.message && (
        <div className="alert alert-success mb-0" role="status">
          {state.message}
        </div>
      )}
      <div>
        <button type="submit" className="btn btn-primary" disabled={pending}>
          {pending ? "Ukládám…" : submitLabel}
        </button>
      </div>
    </form>
  );
};

export default ActionForm;
