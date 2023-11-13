import React, { FC, ReactNode } from 'react';
import { Provider } from 'react-redux';
import { store } from '../store';

type ProvidersType = {
    children: ReactNode;
};

const ReduxProvider: FC<ProvidersType> = (props) => {
    const { children } = props;

    return(
        <Provider store={store}>
            {children}
        </Provider>
    )
};

export default ReduxProvider;
