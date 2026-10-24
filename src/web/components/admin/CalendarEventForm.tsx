"use client";

import { useState } from "react";
import ActionForm, { type ActionState } from "./ActionForm";
import { schoolYearOf } from "@/lib/content/format";

type Event = { schoolYear: string; date: string; endDate?: string; holiday?: boolean; text: string };
type Props = { action: (data: FormData) => Promise<ActionState>; event?: Event; years: string[] };

// An event of Průběh školního roku; the school year follows the date until it is changed by hand
const CalendarEventForm = ({ action, event, years }: Props) => {
  const [date, setDate] = useState(event?.date ?? new Date().toISOString().slice(0, 10));
  const [schoolYear, setSchoolYear] = useState(event?.schoolYear ?? schoolYearOf(date));
  const [ownYear, setOwnYear] = useState(Boolean(event));

  return (
    <ActionForm action={action} submitLabel="Uložit">
      <div className="row g-3">
        <div className="col-sm-4">
          <label htmlFor="date" className="form-label">
            Datum (začátek)
          </label>
          <input
            id="date"
            name="date"
            type="date"
            className="form-control"
            value={date}
            onChange={(e) => {
              setDate(e.target.value);
              if (!ownYear && e.target.value) setSchoolYear(schoolYearOf(e.target.value));
            }}
            required
          />
        </div>
        <div className="col-sm-4">
          <label htmlFor="endDate" className="form-label">
            Konec (u vícedenních)
          </label>
          <input
            id="endDate"
            name="endDate"
            type="date"
            className="form-control"
            min={date}
            defaultValue={event?.endDate}
          />
        </div>
        <div className="col-sm-4">
          <label htmlFor="schoolYear" className="form-label">
            Školní rok
          </label>
          <input
            id="schoolYear"
            name="schoolYear"
            className="form-control"
            list="school-years"
            pattern="\d{4}/\d{4}"
            placeholder="2026/2027"
            value={schoolYear}
            onChange={(e) => {
              setSchoolYear(e.target.value);
              setOwnYear(true);
            }}
            required
          />
          <datalist id="school-years">
            {years.map((year) => (
              <option key={year} value={year} />
            ))}
          </datalist>
        </div>
      </div>
      <div>
        <label htmlFor="text" className="form-label">
          Text
        </label>
        <textarea
          id="text"
          name="text"
          className="form-control"
          rows={3}
          defaultValue={event?.text}
          aria-describedby="text-help"
          required
        />
        <div id="text-help" className="form-text">
          Tučně: text mezi dvěma hvězdičkami, např. **Podzimní prázdniny**.
        </div>
      </div>
      <div className="form-check">
        <input
          id="holiday"
          name="holiday"
          type="checkbox"
          className="form-check-input"
          defaultChecked={event?.holiday}
        />
        <label htmlFor="holiday" className="form-check-label">
          Prázdniny (na webu označené sluníčkem)
        </label>
      </div>
    </ActionForm>
  );
};

export default CalendarEventForm;
