"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import styles from "./Sidebar.module.css";

export default function Sidebar() {
  const [open, setOpen] = useState(false);
  const drawerRef = useRef<HTMLElement | null>(null);
  const pathname = usePathname();

  // Close drawer on outside click
  useEffect(() => {
    function onClick(e: MouseEvent) {
      if (!open) return;
      const drawer = drawerRef.current;
      if (!drawer) return;
      if (drawer.contains(e.target as Node)) return;
      setOpen(false);
    }
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, [open]);

  return (
    <>
      <button
        id="mobile-menu-button"
        className={styles.mobileMenuButton}
        aria-label="Open menu"
        onClick={(e) => {
          e.stopPropagation();
          setOpen((v) => !v);
        }}
      >
        <svg
          id="menu-icon"
          className={styles.menuIcon}
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <line className={styles.line} x1="4" y1="7" x2="20" y2="7" />
          <line className={styles.line} x1="4" y1="12" x2="20" y2="12" />
          <line className={styles.line} x1="4" y1="17" x2="20" y2="17" />
        </svg>
      </button>

      <nav
        ref={(el) => {
          drawerRef.current = el;
        }}
        className={clsx(styles.navDrawer, { [styles.active]: open })}
        aria-hidden={!open}
      >
        <ul>
          <li>
            <Link
              href="/"
              className={clsx({ [styles.active]: pathname === "/" })}
              onClick={() => setOpen(false)}
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              href="/history"
              className={clsx({ [styles.active]: pathname === "/history" })}
              onClick={() => setOpen(false)}
            >
              History
            </Link>
          </li>
          <li>
            <Link
              href="/help"
              className={clsx({ [styles.active]: pathname === "/help" })}
              onClick={() => setOpen(false)}
            >
              Help
            </Link>
          </li>
        </ul>
      </nav>
    </>
  );
}
