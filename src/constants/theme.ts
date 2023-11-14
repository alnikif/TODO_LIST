export enum Themes {
    light = 'light',
    dark = 'dark'
}

export type Theme = {
    key: Themes;
    title: string;
    constants: Record<string, string>;
}

export const DEFAULT_THEME = Themes.light;

export const themesTokensConstants = {
    [Themes.light]: {
        // button
        '--button-background': '#6370f0',
        '--button-background-hover': 'rgba(255, 255, 255, 0.2)',
        '--button-border': 'rgba(255, 255, 255, 0.24)',
        '--button-text': 'hsla(0, 0%, 100%, 0.1)',

        // checkbox
    },
    [Themes.dark]: {
        // button
        '--button-background': '#000000',
        '--button-background-hover': 'hsla(0, 0%, 100%, 0.2)',
        '--button-border': 'hsla(0, 0%, 100%, 0.24)',
        '--button-text': 'hsla(0, 0%, 100%, 1)',
    }
};

export const themes: Theme[] = [
    {key: Themes.light, title: 'Light', constants: themesTokensConstants[Themes.light]},
    {key: Themes.dark, title: 'Dark', constants: themesTokensConstants[Themes.dark]},
];

export const themesMap = themes.reduce((acc, theme: Theme) => ({
    ...acc, [theme.key]: theme
}), {} as Record<Themes, Theme>);
