"use client";

import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import styles from "./UploadBox.module.css";

export default function UploadBox() {
  const searchParams = useSearchParams();
  const presetImg = searchParams.get("img"); // e.g. "/uploads/_DSC3250.jpg"

  const [previewSrc, setPreviewSrc] = useState<string | null>(null);

  // If coming from History, prefill the preview
  useEffect(() => {
    if (presetImg) setPreviewSrc(presetImg);
  }, [presetImg]);

  const hasImage = useMemo(() => Boolean(previewSrc), [previewSrc]);

  return (
    <label
      className={`${styles.uploadBox} ${hasImage ? styles.hasImage : ""}`}
    >
      <input
        type="file"
        className={styles.uploadInput}
        accept="image/*"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (!file) return;
          const url = URL.createObjectURL(file);
          setPreviewSrc(url);
        }}
      />

      <div className={styles.placeholder}>
        Click to upload an image
        <br />
        (PNG, JPG, WebP)
      </div>

      {/* eslint-disable-next-line @next/next/no-img-element */}
      {previewSrc ? (
        <img className={styles.preview} alt="" src={previewSrc} />
      ) : (
        <img className={styles.preview} alt="" hidden />
      )}
    </label>
  );
}
