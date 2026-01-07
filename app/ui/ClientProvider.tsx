"use client";

import { createContext, useState } from "react";
import styles from "./ClientProvider.module.css";

export const LanguageContext = createContext<{ lang: string; setLang: (lang: string) => void }>({
  lang: "EN",
  setLang: () => {},
});

export default function ClientProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLang] = useState("EN");

  return (
    <LanguageContext.Provider value={{ lang, setLang }}>
      <div className={styles["language-toggle"]}>
        <button onClick={() => setLang("EN")} disabled={lang === "EN"}>
          EN
        </button>
        <button onClick={() => setLang("JP")} disabled={lang === "JP"}>
          JP
        </button>
      </div>
      {children}
    </LanguageContext.Provider>
  );
}
