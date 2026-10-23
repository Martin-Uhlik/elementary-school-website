"use client";

import { useCallback, useEffect, useState } from "react";

export const formatTime = (seconds: number) => {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = seconds % 60;
  const mmss = `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
  return h > 0 ? `${h}:${mmss}` : mmss;
};

// Starts on the first move, stops when the exercise is done
export const useStopwatch = () => {
  const [startedAt, setStartedAt] = useState<number | null>(null);
  const [stoppedAt, setStoppedAt] = useState<number | null>(null);
  const [now, setNow] = useState(0);

  useEffect(() => {
    if (startedAt === null || stoppedAt !== null) return;
    const id = setInterval(() => setNow(Date.now()), 250);
    return () => clearInterval(id);
  }, [startedAt, stoppedAt]);

  const start = useCallback(() => {
    setNow(Date.now());
    setStartedAt((s) => s ?? Date.now());
  }, []);
  const stop = useCallback(() => setStoppedAt((s) => s ?? Date.now()), []);
  const reset = useCallback(() => {
    setStartedAt(null);
    setStoppedAt(null);
  }, []);

  const seconds = startedAt === null ? 0 : Math.max(0, Math.floor(((stoppedAt ?? now) - startedAt) / 1000));
  return { seconds, running: startedAt !== null && stoppedAt === null, start, stop, reset };
};
