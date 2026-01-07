import "./globals.css";
import type { Metadata } from "next";
import Sidebar from "./ui/Sidebar";
import { createContext, useState } from "react";

export const metadata: Metadata = {
  title: "ChromaLens – Color Harmony Analyzer",
  description: "Analyze and explore color harmonies with ChromaLens.",
};

export const LanguageContext = createContext<{ lang: string; setLang: (lang: string) => void }>({
  lang: "EN",
  setLang: () => {},
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const [lang, setLang] = useState("EN");

  return (
    <html lang={lang === "EN" ? "en" : "ja"}>
      <body>
        <LanguageContext.Provider value={{ lang, setLang }}>
          <header>
            <div className="brand">
              <p>{lang === "EN" ? "Color Harmony Analysis" : "色調和分析"}</p>
              <h1>{lang === "EN" ? "Chroma Lens" : "クロマレンズ"}</h1>
            </div>
            <div className="language-toggle">
              <button onClick={() => setLang("EN")} disabled={lang === "EN"}>
                EN
              </button>
              <button onClick={() => setLang("JP")} disabled={lang === "JP"}>
                JP
              </button>
            </div>
            <Sidebar />
          </header>

          {children}

          <footer>
            {lang === "EN" ? "© 2025 ChromaLens · Built while learning fullstack" : "© 2025 クロマレンズ · フルスタック学習中に構築"}
          </footer>
        </LanguageContext.Provider>
      </body>
    </html>
  );
}
