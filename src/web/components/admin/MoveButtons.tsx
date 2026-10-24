import { LuArrowDown, LuArrowUp } from "react-icons/lu";

type Props = { up: () => Promise<void>; down: () => Promise<void>; name: string; first: boolean; last: boolean };

// Up/down buttons for changing the display order
const MoveButtons = ({ up, down, name, first, last }: Props) => (
  <>
    <form action={up} className="d-inline">
      <button
        type="submit"
        className="btn btn-sm btn-outline-secondary me-1"
        disabled={first}
        aria-label={`Posunout nahoru: ${name}`}
        title="Nahoru"
      >
        <LuArrowUp aria-hidden="true" />
      </button>
    </form>
    <form action={down} className="d-inline">
      <button
        type="submit"
        className="btn btn-sm btn-outline-secondary me-2"
        disabled={last}
        aria-label={`Posunout dolů: ${name}`}
        title="Dolů"
      >
        <LuArrowDown aria-hidden="true" />
      </button>
    </form>
  </>
);

export default MoveButtons;
