"use client";

import { useLayoutEffect, useSyncExternalStore } from "react";
import { LuLayoutGrid, LuRows3 } from "react-icons/lu";
import {
  applyLayout,
  getLayoutPreference,
  LAYOUT_CHANGE_EVENT,
  setLayoutPreference,
  type LayoutPreference,
} from "@/lib/layout";

const options = [
  { value: "grid" as LayoutPreference, label: "Mřížka", Icon: LuLayoutGrid },
  { value: "rows" as LayoutPreference, label: "Řádky", Icon: LuRows3 },
];

const subscribe = (onChange: () => void) => {
  window.addEventListener(LAYOUT_CHANGE_EVENT, onChange);
  window.addEventListener("storage", onChange);
  return () => {
    window.removeEventListener(LAYOUT_CHANGE_EVENT, onChange);
    window.removeEventListener("storage", onChange);
  };
};

// grid / rows switch in the header for the lists of links, people and galleries
const LayoutSwitch = () => {
  const layout = useSyncExternalStore(subscribe, getLayoutPreference, () => "grid" as LayoutPreference);
  const current = options.find((o) => o.value === layout)!;

  // re-apply after React resets <html> attributes or a change in another tab
  useLayoutEffect(() => {
    applyLayout(layout);
  }, [layout]);

  return (
    <ul className="navbar-nav header-switch">
      <li className="nav-item dropdown">
        <button
          type="button"
          className="nav-link dropdown-toggle"
          data-bs-toggle="dropdown"
          aria-expanded="false"
          aria-label={`Zobrazení seznamů: ${current.label}`}
        >
          <current.Icon aria-hidden="true" focusable="false" size={18} />
          <span className="d-lg-none ms-2">Zobrazení seznamů</span>
        </button>
        <ul className="dropdown-menu dropdown-menu-lg-end">
          {options.map(({ value, label, Icon }) => (
            <li key={value}>
              <button
                type="button"
                className={`dropdown-item d-flex align-items-center gap-2${value === layout ? " active" : ""}`}
                aria-pressed={value === layout}
                onClick={() => setLayoutPreference(value)}
              >
                <Icon aria-hidden="true" focusable="false" size={16} />
                {label}
              </button>
            </li>
          ))}
        </ul>
      </li>
    </ul>
  );
};

export default LayoutSwitch;
