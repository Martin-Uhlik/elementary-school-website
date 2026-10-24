"use client";

import { useState } from "react";
import { LuPlus, LuTrash2 } from "react-icons/lu";
import { PHONE_KIND_LABELS } from "@/lib/content/format";
import type { Phone } from "@/lib/content/types";

// Phone numbers of a person: rows can be added and removed; empty rows are ignored when saving
const PhoneFields = ({ phones }: { phones: Phone[] }) => {
  const [rows, setRows] = useState(() =>
    (phones.length > 0 ? phones : [{ kind: "landline" as const, number: "" }]).map((phone, key) => ({ ...phone, key })),
  );
  return (
    <fieldset className="d-flex flex-column gap-2">
      <legend className="form-label fs-6 mb-0">Telefony</legend>
      {rows.map((row, i) => (
        <div key={row.key} className="d-flex gap-2">
          <select
            name="phoneKind"
            className="form-select w-auto"
            defaultValue={row.kind}
            aria-label={`Druh telefonu ${i + 1}`}
          >
            {Object.entries(PHONE_KIND_LABELS).map(([kind, label]) => (
              <option key={kind} value={kind}>
                {label}
              </option>
            ))}
          </select>
          <input
            name="phoneNumber"
            className="form-control"
            defaultValue={row.number}
            inputMode="tel"
            aria-label={`Číslo ${i + 1}`}
          />
          <button
            type="button"
            className="btn btn-outline-danger"
            aria-label={`Odebrat telefon ${i + 1}`}
            title="Odebrat"
            onClick={() => setRows(rows.filter((r) => r.key !== row.key))}
          >
            <LuTrash2 aria-hidden="true" />
          </button>
        </div>
      ))}
      <div>
        <button
          type="button"
          className="btn btn-sm btn-outline-primary"
          onClick={() =>
            setRows([...rows, { kind: "landline", number: "", key: Math.max(-1, ...rows.map((r) => r.key)) + 1 }])
          }
        >
          <LuPlus aria-hidden="true" /> Přidat telefon
        </button>
      </div>
    </fieldset>
  );
};

export default PhoneFields;
