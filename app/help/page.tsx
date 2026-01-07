import { useContext } from "react";
import { LanguageContext } from "../layout";

export default function HelpPage() {
  const { lang } = useContext(LanguageContext);

  return (
    <main className="app-main" style={{ gridTemplateColumns: "1fr" }}>
      <section>
        <h2>{lang === "EN" ? "Color Harmony Guide" : "色の調和ガイド"}</h2>
        <p>
          {lang === "EN"
            ? "Explain complementary / analogous / triadic / split complementary, suggested weights, and typical use-cases here."
            : "補色 / 類似色 / 三色 / 分割補色、推奨される比率、典型的な使用例をここに説明します。"}
        </p>
      </section>
    </main>
  );
}
