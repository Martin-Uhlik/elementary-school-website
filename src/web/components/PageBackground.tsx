"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

// seasonal background: winter in December and January, Easter in March, boxes otherwise
const backgroundForMonth = (month: number) => {
  if (month === 11 || month === 0) return "winter.svg";
  if (month === 2) return "easter.svg";
  return "boxes.svg";
};

const PageBackground = () => {
  const pathname = usePathname();
  const [image, setImage] = useState<string | null>(null);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- depends on the visitor's date
    setImage(backgroundForMonth(new Date().getMonth()));
  }, []);

  // the home page has its own carousel instead
  if (pathname === "/") return null;

  return (
    <div className="page-background">
      {image && <img className="background-elem-wide" src={`/data/images/background_elements/${image}`} alt="" />}
    </div>
  );
};

export default PageBackground;
