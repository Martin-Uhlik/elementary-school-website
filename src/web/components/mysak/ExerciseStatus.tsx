import type { ReactNode } from "react";

type Stat = { label: string; value: ReactNode };

type Props = {
  stats: Stat[];
  done?: boolean;
  doneText?: ReactNode;
  onRestart?: () => void;
};

// Stats bar plus the "Hotovo!" message, shared by all exercises
const ExerciseStatus = ({ stats, done = false, doneText, onRestart }: Props) => {
  return (
    <>
      <dl className="mysak-stats">
        {stats.map((stat) => (
          <div key={stat.label} className="mysak-stats__item">
            <dt>{stat.label}</dt>
            <dd>{stat.value}</dd>
          </div>
        ))}
      </dl>
      <div role="status" className="mysak-result">
        {done && (
          <div className="alert alert-success d-flex flex-wrap align-items-center gap-3 mb-0">
            <span>
              <strong>Hotovo!</strong> {doneText}
            </span>
            {onRestart && (
              <button type="button" className="btn btn-success btn-sm ms-auto" onClick={onRestart}>
                Hrát znovu
              </button>
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default ExerciseStatus;
