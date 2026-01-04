import HistoryGrid from "../ui/HistoryGrid";

export default function HistoryPage() {
  return (
    <main className="app-main" style={{ gridTemplateColumns: "1fr" }}>
      <section>
        <h2>Upload History</h2>
        <HistoryGrid />
      </section>
    </main>
  );
}
