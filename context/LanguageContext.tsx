'use client';

import React, { createContext, useContext, useState, useCallback } from 'react';

export type Lang = 'fr' | 'en';

interface LangContextValue {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: (obj: { fr: string; en: string } | undefined) => string;
}

const LangContext = createContext<LangContextValue>({
  lang: 'fr',
  setLang: () => {},
  t: (obj) => obj?.fr ?? '',
});

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Lang>('fr');

  const setLang = useCallback((l: Lang) => setLangState(l), []);

  const t = useCallback(
    (obj: { fr: string; en: string } | undefined): string => {
      if (!obj) return '';
      return obj[lang] ?? obj.fr ?? '';
    },
    [lang],
  );

  return (
    <LangContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LangContext.Provider>
  );
}

export const useLang = () => useContext(LangContext);
