import React, {FC, ReactNode, createContext, useState, useMemo, useEffect} from 'react';
import {themesTokensConstants, DEFAULT_THEME, Themes, themesMap} from "../constants/theme";
import {changeThemesConstants} from "../utils/theme-utils";

type ThemeContextType = {
    theme: Themes;
    onChangeTheme: (nextTheme: Themes) => void;
};

const defaultThemeContext = {
    theme: DEFAULT_THEME,
    onChangeTheme: () => {},
};

export const ThemeContext = createContext<ThemeContextType>(defaultThemeContext);

type ProvidersType = {
    children: ReactNode;
};

const ThemeProvider: FC<ProvidersType> = (props) => {
    const { children } = props;

    const [theme, setTheme] = useState<Themes>(defaultThemeContext.theme);

    const themeTokens = useMemo(() => (
        themesTokensConstants[theme]
    ), [theme]);

    // TODO: use it inside future select theme dropdown
    const themeDetails = useMemo(() => (
        themesMap[theme]
    ), [theme]);

    const themeContextValue = useMemo(() => ({
        theme,
        onChangeTheme: setTheme,
    }), [theme]);

    useEffect(() => {
        changeThemesConstants(themeTokens)
    }, [themeTokens]);

    return(
        <ThemeContext.Provider value={themeContextValue}>
            {children}
        </ThemeContext.Provider>
    )
};

export default ThemeProvider;
