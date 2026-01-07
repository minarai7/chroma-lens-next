import { useContext } from "react";
import HistoryGrid from "../ui/HistoryGrid";
import { LanguageContext } from "../layout";

export default function HistoryPage() {
  const { lang } = useContext(LanguageContext);

  return (
    <main className="app-main" style={{ gridTemplateColumns: "1fr" }}>
      <section>
        <h2>{lang === "EN" ? "Upload History" : "アップロード履歴"}</h2>
        <HistoryGrid />
      </section>
    </main>
  );
}
