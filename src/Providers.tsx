import React, { FC, ReactNode } from 'react';
import LanguageProvider from './Providers/LanguageProvider';
import ReduxProvider from "./Providers/ReduxProvider";
import ThemeProvider from "./Providers/ThemeProvider";

type ProvidersType = {
    readonly children: ReactNode;
};

const Providers: FC<ProvidersType> = (props) => {
    const { children } = props;

    return(
        <ThemeProvider>
            <LanguageProvider>
                <ReduxProvider>
                    {children}
                </ReduxProvider>
            </LanguageProvider>
        </ThemeProvider>
    )
};

export default Providers;
