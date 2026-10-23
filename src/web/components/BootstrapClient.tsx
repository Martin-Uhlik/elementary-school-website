"use client";

import { useEffect } from "react";

// loads Bootstrap's JS (dropdowns, collapse, carousel) on the client
const BootstrapClient = () => {
  useEffect(() => {
    import("bootstrap");
  }, []);
  return null;
};

export default BootstrapClient;
