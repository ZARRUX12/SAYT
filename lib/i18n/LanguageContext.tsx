"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { Language, translations, Translations } from "./translations";

interface LanguageContextType {
  lang: Language;
  language: Language;
  setLang: (l: Language) => void;
  t: Translations;
}

const LanguageContext = createContext<LanguageContextType>({
  lang: "ru",
  language: "ru",
  setLang: () => {},
  t: translations.ru,
});

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Language>("ru");

  useEffect(() => {
    // 1. Check saved language preference in localStorage
    const saved = localStorage.getItem("target_pro_lang") as Language | null;
    if (saved && (saved === "ru" || saved === "uz" || saved === "en")) {
      setLangState(saved);
      return;
    }

    // 2. Auto-detect browser language
    if (typeof navigator !== "undefined") {
      const browserLang = navigator.language.toLowerCase();
      if (browserLang.startsWith("uz")) {
        setLangState("uz");
      } else if (browserLang.startsWith("en")) {
        setLangState("en");
      } else {
        setLangState("ru");
      }
    }
  }, []);

  const setLang = (newLang: Language) => {
    setLangState(newLang);
    localStorage.setItem("target_pro_lang", newLang);
    document.documentElement.lang = newLang;
  };

  return (
    <LanguageContext.Provider
      value={{
        lang,
        language: lang,
        setLang,
        t: translations[lang] || translations.ru,
      }}
    >{children}
    </LanguageContext.Provider>
  );
}

export const useLanguage = () => useContext(LanguageContext);
