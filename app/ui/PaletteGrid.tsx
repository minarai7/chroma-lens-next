import styles from "./PaletteGrid.module.css";

interface PaletteGridProps {
  swatchCount: number;
}

export default function PaletteGrid({ swatchCount }: PaletteGridProps) {
  return (
    <div className={styles.grid}>
      {Array.from({ length: swatchCount }).map((_, i) => (
        <div className={styles.swatch} key={i} />
      ))}
    </div>
  );
}
