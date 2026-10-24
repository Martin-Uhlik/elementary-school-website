"use client";

import Form from "next/form";
import type { ReactNode } from "react";

// Filters above a list (select, date): the list changes as soon as a field does, there is no "Zobrazit" button
const FilterForm = ({ action, children }: { action: string; children: ReactNode }) => (
  <Form action={action} className="admin-filters" onChange={(event) => event.currentTarget.requestSubmit()}>
    {children}
    <noscript>
      <button type="submit" className="btn btn-outline-primary">
        Zobrazit
      </button>
    </noscript>
  </Form>
);

export default FilterForm;
