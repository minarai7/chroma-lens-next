"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import styles from "./HistoryGrid.module.css";

interface Upload {
  id: string;
  filename: string;
  palette: string[];
  hue_histogram: string;
  harmonies: {
    complementary: string[];
    analogous: string[];
  };
}

export default function HistoryGrid() {
  const [uploads, setUploads] = useState<Upload[]>([]);
  const API_BASE = process.env.NEXT_PUBLIC_API_BASE;

  useEffect(() => {
    // Fetch the list of uploaded photos from the backend
    const fetchUploads = async () => {
      try {
        const response = await fetch(`${API_BASE}/uploads`);
        if (response.ok) {
          const data = await response.json();
          setUploads(data.uploads);
        } else {
          console.error("Failed to fetch uploads");
        }
      } catch (error) {
        console.error("Error fetching uploads:", error);
      }
    };

    fetchUploads();
  }, []);

  return (
    <div className={styles.historyGrid}>
      {uploads.map((upload) => (
        <Link key={upload.id} href={`/?img=${encodeURIComponent(`/uploads/${upload.id}_${upload.filename}`)}`}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={`${API_BASE}/uploads/${upload.id}_${upload.filename}`}
            alt={upload.filename}
            className={styles.historyImage}
          />
        </Link>
      ))}
    </div>
  );
}
