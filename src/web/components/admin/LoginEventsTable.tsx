import { LOGIN_EVENT_LABELS } from "@/lib/admin/logs";
import { formatDateTime } from "@/lib/admin/time";
import { describeAgent } from "@/lib/admin/userAgent";
import type { LoginEvent } from "@/lib/generated/prisma/client";

type Props = { events: LoginEvent[]; caption: string; showUser?: boolean };

// Sign-ins and account changes: time, (user,) what happened, address and browser
const LoginEventsTable = ({ events, caption, showUser = false }: Props) => (
  <div className="table-responsive">
    <table className="table admin-table mb-0">
      <caption className="visually-hidden">{caption}</caption>
      <thead>
        <tr>
          <th scope="col">Čas</th>
          {showUser && <th scope="col">Uživatel</th>}
          <th scope="col">Událost</th>
          <th scope="col">IP adresa</th>
          <th scope="col">Prohlížeč</th>
        </tr>
      </thead>
      <tbody>
        {events.map((event) => (
          <tr key={event.id} className={event.kind === "failed" || event.kind === "locked" ? "table-warning" : ""}>
            <td className="text-nowrap">{formatDateTime(event.createdAt)}</td>
            {showUser && <td>{event.username}</td>}
            <td>{LOGIN_EVENT_LABELS[event.kind]}</td>
            <td>{event.ip || "–"}</td>
            <td className="agent">
              <span title={event.userAgent}>{describeAgent(event.userAgent)}</span>
              <div className="small text-body-secondary text-break">{event.userAgent}</div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export default LoginEventsTable;
