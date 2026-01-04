"use client";

import Link from "next/link";
import styles from "./HistoryGrid.module.css"; // Import the CSS module

const uploads = [
  "/uploads/_DSC3250.jpg",
  "/uploads/_DSC3288.jpg",
  "/uploads/_DSC3302.jpg",
];

export default function HistoryGrid() {
  return (
    <div className={styles.historyGrid}> {/* Update class name */}
      {uploads.map((src) => (
        <Link key={src} href={`/?img=${encodeURIComponent(src)}`}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={src} alt="Uploaded Image" className={styles.historyImage} /> {/* Update class name */}
        </Link>
      ))}
    </div>
  );
}
