"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { isActive, navigation } from "@/lib/navigation";

const Header = () => {
  const pathname = usePathname();
  const [sticky, setSticky] = useState(false);
  const collapseRef = useRef<HTMLDivElement>(null);

  // if you are not on top of the page, header should be 100vw and stick to the top
  useEffect(() => {
    const onScroll = () => {
      const padding = 3 * parseFloat(getComputedStyle(document.documentElement).fontSize);
      setSticky(document.documentElement.scrollTop > padding);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // close the mobile menu after navigating
  useEffect(() => {
    collapseRef.current?.classList.remove("show");
  }, [pathname]);

  return (
    <header className={`header${sticky ? " sticky" : ""}`} id="myHeader">
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
        <div className="container-fluid align-center">
          <Link className="navbar-brand" href="/">
            ZŠMP
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent" ref={collapseRef}>
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              {navigation.map((item) => {
                const active = isActive(pathname, item) ? " active" : "";
                if (!("children" in item)) {
                  return (
                    <li className="nav-item" key={item.href}>
                      <Link className={`nav-link${active}`} href={item.href} aria-current={active ? "page" : undefined}>
                        {item.label}
                      </Link>
                    </li>
                  );
                }
                return (
                  <li className="nav-item dropdown" key={item.label}>
                    <a
                      className={`nav-link dropdown-toggle${active}`}
                      role="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      {item.label}
                    </a>
                    <ul className="dropdown-menu">
                      {item.children.map((child) => (
                        <li key={child.href}>
                          <Link className="dropdown-item" href={child.href}>
                            {child.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
