"use client";

import { useEffect } from "react";

// loads Bootstrap's JS (dropdowns, collapse, carousel) on the client
export default function BootstrapClient() {
  useEffect(() => {
    import("bootstrap");
  }, []);
  return null;
}
