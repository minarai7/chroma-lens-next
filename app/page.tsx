"use client";

import { Suspense, useState, useContext } from "react";
import UploadBox from "./ui/UploadBox";
import PaletteGrid from "./ui/PaletteGrid";
import { LanguageContext } from "./ui/ClientProvider";

export default function HomePage() {
  const [analysisResult, setAnalysisResult] = useState<any>(null);
  const languageContext = useContext(LanguageContext);
  const lang = languageContext?.lang || "EN"; // Default to "EN" if context is undefined

  return (
    <main className="app-main">
      {/* LEFT */}
      <section>
        <h2>{lang === "EN" ? "Image Input" : "画像入力"}</h2>
        <Suspense fallback={null}>
          <UploadBox onAnalysisComplete={setAnalysisResult} />
        </Suspense>
      </section>

      {/* RIGHT */}
      <div style={{ display: "grid", gap: "1.5rem" }}>
        <section>
          <h2>{lang === "EN" ? "Hue Distribution" : "色相分布"}</h2>
          {analysisResult ? (
            <div className="placeholder">
              {JSON.stringify(analysisResult.hue_histogram)}
            </div>
          ) : (
            <div className="placeholder">
              {lang === "EN"
                ? "Hue histogram will appear here"
                : "色相ヒストグラムがここに表示されます"}
            </div>
          )}
        </section>

        <section>
          <h2>{lang === "EN" ? "Extracted Palette" : "抽出されたパレット"}</h2>
          <PaletteGrid
            swatchCount={analysisResult?.palette?.length || 5}
            colors={analysisResult?.palette}
          />
        </section>

        <section>
          <h2>{lang === "EN" ? "Harmony Suggestions" : "調和の提案"}</h2>
          <PaletteGrid
            swatchCount={analysisResult?.harmonies?.analogous?.length || 4}
            colors={analysisResult?.harmonies?.analogous}
          />
        </section>
      </div>
    </main>
  );
}
