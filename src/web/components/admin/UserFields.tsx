import { PERMISSION_LABELS, PERMISSIONS } from "@/lib/auth/sections";
import type { Permission } from "@/lib/generated/prisma/enums";

type Props = { user?: { username: string; realName: string | null; permissions: Permission[] } };

// Sign-in name, real name (seen only by admins) and the sections the user may open
const UserFields = ({ user }: Props) => (
  <>
    <div className="row g-3">
      <div className="col-sm-6">
        <label htmlFor="username" className="form-label">
          Přihlašovací jméno
        </label>
        <input
          id="username"
          name="username"
          className="form-control"
          autoComplete="off"
          defaultValue={user?.username}
          required
        />
      </div>
      <div className="col-sm-6">
        <label htmlFor="realName" className="form-label">
          Skutečné jméno (nepovinné)
        </label>
        <input
          id="realName"
          name="realName"
          className="form-control"
          autoComplete="off"
          defaultValue={user?.realName ?? ""}
          aria-describedby="realName-help"
        />
        <div id="realName-help" className="form-text">
          Vidí ho jen správci.
        </div>
      </div>
    </div>
    <fieldset>
      <legend className="form-label fs-6">Přístup do částí správy</legend>
      <div className="admin-permissions">
        {PERMISSIONS.map((permission) => (
          <div key={permission} className="form-check">
            <input
              id={`permission-${permission}`}
              name="permissions"
              type="checkbox"
              value={permission}
              className="form-check-input"
              defaultChecked={user?.permissions.includes(permission)}
            />
            <label htmlFor={`permission-${permission}`} className="form-check-label">
              {PERMISSION_LABELS[permission]}
            </label>
          </div>
        ))}
      </div>
      <div className="form-text">Správce může do všech částí.</div>
    </fieldset>
  </>
);

export default UserFields;
