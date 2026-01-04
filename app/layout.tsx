import "./globals.css";
import type { Metadata } from "next";
import Sidebar from "./ui/Sidebar";

export const metadata: Metadata = {
  title: "ChromaLens – Color Harmony Analyzer",
  description: "Analyze and explore color harmonies with ChromaLens.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <header>
          <div className="brand">
            <p>Color Harmony Analysis</p>
            <h1>Chroma Lens</h1>
          </div>
          <Sidebar />
        </header>

        {children}

        <footer>© 2025 ChromaLens · Built while learning fullstack</footer>
      </body>
    </html>
  );
}
