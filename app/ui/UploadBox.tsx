"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import styles from "./UploadBox.module.css";

interface UploadBoxProps {
  onAnalysisComplete: (result: any) => void;
}

export default function UploadBox({ onAnalysisComplete }: UploadBoxProps) {
  const searchParams = useSearchParams();
  const presetImg = searchParams.get("img"); // e.g. "/uploads/_DSC3250.jpg"

  const [previewSrc, setPreviewSrc] = useState<string | null>(null);
  const API_BASE = process.env.NEXT_PUBLIC_API_BASE;

  // Function to analyze an image (either file or URL)
  const analyzeImage = async (image: File | string) => {
    if (typeof image === "string") {
      const fileId = new URL(image).pathname.split("/")[2].split("_")[0];
      const response = await fetch(`${API_BASE}/analysis/${fileId}`);
      if (response.ok) {
        const result = await response.json();
        setPreviewSrc(image);
        onAnalysisComplete(result);
      } else {
        console.error("Failed to fetch analysis");
      }
      return;
    }

    const imageUrl = URL.createObjectURL(image);
    setPreviewSrc(imageUrl);

    const formData = new FormData();
    formData.append("file", image);

    const response = await fetch(`${API_BASE}/analyze`, {
      method: "POST",
      body: formData,
    });

    if (response.ok) {
      const result = await response.json();
      onAnalysisComplete(result);
    } else {
      console.error("Failed to analyze image");
    }
  };

  // Prefill the preview and process the image if presetImg is available
  useEffect(() => {
    if (presetImg) {
      const fullUrl = presetImg.startsWith("/") ? `${API_BASE}${presetImg}` : presetImg;
      analyzeImage(fullUrl);
    }
  }, [presetImg]);

  return (
    <label
      className={`${styles.uploadBox} ${previewSrc ? styles.hasImage : ""}`}
    >
      <input
        type="file"
        className={styles.uploadInput}
        accept="image/*"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) {
            analyzeImage(file);
          }
        }}
      />

      <div className={styles.placeholder}>
        Click to upload an image
        <br />
        (PNG, JPG, WebP)
      </div>

      {/* eslint-disable-next-line @next/next/no-img-element */}
      {previewSrc && <img className={styles.preview} alt="" src={previewSrc} />}
    </label>
  );
}
