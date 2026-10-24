"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { keepAlive, timeoutLogout } from "@/app/admin/actions";

// The last activity is shared through localStorage, so working in one tab keeps the others signed in too
const KEY = "zsmp-admin-activity";
const PING_EVERY = 30 * 1000;
const SIGNED_OUT = "/admin?odhlaseno=neaktivita";

const readShared = () => {
  try {
    return Number(localStorage.getItem(KEY)) || 0;
  } catch {
    return 0;
  }
};

const format = (ms: number) => {
  const seconds = Math.max(0, Math.ceil(ms / 1000));
  return `${Math.floor(seconds / 60)}:${String(seconds % 60).padStart(2, "0")}`;
};

// Counts down the time until the automatic sign-out; a click, a key press or scrolling starts it again.
// The server ends the session on its own as well, the timer only shows it and tells the server about activity.
const SessionTimer = ({ minutes }: { minutes: number }) => {
  const limit = minutes * 60 * 1000;
  const [left, setLeft] = useState(limit);
  const lastActivity = useRef(0);
  const lastPing = useRef(0);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    lastActivity.current = Date.now();
    lastPing.current = Date.now();
    const onActivity = () => {
      const now = Date.now();
      lastActivity.current = now;
      try {
        localStorage.setItem(KEY, String(now));
      } catch {}
      if (now - lastPing.current > PING_EVERY) {
        lastPing.current = now;
        keepAlive().then((signedIn) => {
          if (!signedIn) router.replace(SIGNED_OUT);
        });
      }
    };
    onActivity();
    const events = ["pointerdown", "keydown", "wheel", "touchstart"] as const;
    events.forEach((name) => window.addEventListener(name, onActivity, { passive: true }));
    const timer = window.setInterval(() => {
      const remaining = Math.max(lastActivity.current, readShared()) + limit - Date.now();
      setLeft(remaining);
      if (remaining <= 0) {
        window.clearInterval(timer);
        timeoutLogout().finally(() => router.replace(SIGNED_OUT));
      }
    }, 1000);
    return () => {
      events.forEach((name) => window.removeEventListener(name, onActivity));
      window.clearInterval(timer);
    };
    // a new page (pathname) counts as activity as well
  }, [limit, pathname, router]);

  const warning = left <= 60 * 1000;
  return (
    <>
      <span
        className={`admin-timer badge ${warning ? "text-bg-warning" : "admin-timer--calm"}`}
        title={`Bez aktivity budete po ${minutes} minutách odhlášeni`}
      >
        Odhlášení za <span className="font-monospace">{format(left)}</span>
      </span>
      <span className="visually-hidden" role="status">
        {warning ? "Za minutu budete kvůli nečinnosti odhlášeni. Pokračujte stisknutím klávesy nebo kliknutím." : ""}
      </span>
    </>
  );
};

export default SessionTimer;
