"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { isActive, navigation } from "@/lib/navigation";
import LayoutSwitch from "@/components/LayoutSwitch";
import ThemeSwitch from "@/components/ThemeSwitch";

const Header = () => {
  const pathname = usePathname();
  const [sticky, setSticky] = useState(false);
  const collapseRef = useRef<HTMLDivElement>(null);

  // if you are not on top of the page, header should be full width and stick to the top
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
    // hide through Bootstrap so the toggler's aria-expanded stays in sync
    import("bootstrap").then(({ Collapse }) => {
      if (collapseRef.current) Collapse.getInstance(collapseRef.current)?.hide();
    });
  }, [pathname]);

  return (
    <header className={`header${sticky ? " sticky" : ""}`} id="myHeader">
      <nav className="navbar navbar-expand-xxl navbar-dark bg-primary" aria-label="Hlavní menu">
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
            aria-label="Zobrazit menu"
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
                      <Link
                        className={`nav-link${active}${item.label.length > 20 ? " nav-link--long" : ""}`}
                        href={item.href}
                        aria-current={active ? "page" : undefined}
                      >
                        {item.label}
                      </Link>
                    </li>
                  );
                }
                return (
                  <li className="nav-item dropdown" key={item.label}>
                    <button
                      type="button"
                      className={`nav-link dropdown-toggle${active}`}
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      {item.label}
                    </button>
                    <ul className="dropdown-menu">
                      {item.children.map((child) => (
                        <li key={child.href}>
                          <Link
                            className={`dropdown-item${isActive(pathname, child) ? " active" : ""}`}
                            href={child.href}
                            aria-current={isActive(pathname, child) ? "page" : undefined}
                          >
                            {child.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </li>
                );
              })}
            </ul>
            <LayoutSwitch />
            <ThemeSwitch />
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
