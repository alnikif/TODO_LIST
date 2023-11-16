import { DEFAULT_LANGUAGE, Languages, languagesConstants } from '../constants/language';
import React, { createContext, FC, ReactNode, useMemo, useState } from 'react';

type LanguageContextType = {
  language: Languages;
  constants: Record<string, string>;
  setLanguage: (nextLanguage: Languages) => void;
};

const defaultLanguageContextValue = {
  language: DEFAULT_LANGUAGE,
  constants: languagesConstants[DEFAULT_LANGUAGE],
  setLanguage: () => void {}
};

export const LanguageContext = createContext<LanguageContextType>(defaultLanguageContextValue);

type ProvidersType = {
  readonly children: ReactNode;
};

const LanguageProvider: FC<ProvidersType> = (props) => {
  const { children } = props;

  const [language, setLanguage] = useState<Languages>(defaultLanguageContextValue.language);

  const languageContextValue = useMemo(
    () => ({
      language,
      constants: languagesConstants[language],
      setLanguage
    }),
    [language]
  );

  return <LanguageContext.Provider value={languageContextValue}>{children}</LanguageContext.Provider>;
};

export default LanguageProvider;
