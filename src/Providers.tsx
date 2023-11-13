import React, { FC, ReactNode } from 'react';
import ReduxProvider from "./Providers/ReduxProvider";
import ThemeProvider from "./Providers/ThemeProvider";

type ProvidersType = {
    children: ReactNode;
};

const Providers: FC<ProvidersType> = (props) => {
    const { children } = props;

    return(
        <ThemeProvider>
            <ReduxProvider>
                {children}
            </ReduxProvider>
        </ThemeProvider>
    )
};

export default Providers;
