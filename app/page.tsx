"use client";

import { Suspense, useState } from "react";
import UploadBox from "./ui/UploadBox";
import PaletteGrid from "./ui/PaletteGrid";

export default function HomePage() {
  const [analysisResult, setAnalysisResult] = useState<any>(null);

  return (
    <main className="app-main">
      {/* LEFT */}
      <section>
        <h2>Image Input</h2>
        <Suspense fallback={null}>
          <UploadBox onAnalysisComplete={setAnalysisResult} />
        </Suspense>
      </section>

      {/* RIGHT */}
      <div style={{ display: "grid", gap: "1.5rem" }}>
        <section>
          <h2>Hue Distribution</h2>
          {analysisResult ? (
            <div className="placeholder">
              {JSON.stringify(analysisResult.hue_histogram)}
            </div>
          ) : (
            <div className="placeholder">Hue histogram will appear here</div>
          )}
        </section>

        <section>
          <h2>Extracted Palette</h2>
          <PaletteGrid
            swatchCount={analysisResult?.palette?.length || 5}
            colors={analysisResult?.palette}
          />
        </section>

        <section>
          <h2>Harmony Suggestions</h2>
          <PaletteGrid
            swatchCount={analysisResult?.harmonies?.analogous?.length || 4}
            colors={analysisResult?.harmonies?.analogous}
          />
        </section>
      </div>
    </main>
  );
}
