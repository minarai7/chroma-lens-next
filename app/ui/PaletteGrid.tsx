import styles from "./PaletteGrid.module.css";

interface PaletteGridProps {
  swatchCount: number;
  colors?: string[];
}

export default function PaletteGrid({ swatchCount, colors }: PaletteGridProps) {
  return (
    <div className={styles.grid}>
      {Array.from({ length: swatchCount }).map((_, i) => (
        <div
          className={styles.swatch}
          key={i}
          style={{ backgroundColor: colors?.[i] || "#ccc" }}
        />
      ))}
    </div>
  );
}
