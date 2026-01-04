import UploadBox from "./ui/UploadBox";
import PaletteGrid from "./ui/PaletteGrid";

export default function HomePage() {
  return (
    <main className="app-main">
      {/* LEFT */}
      <section>
        <h2>Image Input</h2>
        <UploadBox />
      </section>

      {/* RIGHT */}
      <div style={{ display: "grid", gap: "1.5rem" }}>
        <section>
          <h2>Hue Distribution</h2>
          <div className="placeholder">Hue histogram will appear here</div>
        </section>

        <section>
          <h2>Extracted Palette</h2>
          <PaletteGrid swatchCount={5} />
        </section>

        <section>
          <h2>Harmony Suggestions</h2>
          <PaletteGrid swatchCount={4} />
        </section>
      </div>
    </main>
  );
}
