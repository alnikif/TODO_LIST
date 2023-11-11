import React from 'react';
import ReactDOM from 'react-dom';

export type PortalPropsType = {
    children: React.ReactNode,
};

export const Portal: React.FC<PortalPropsType> = ({ children }) => {
    const container = document.getElementById("modals");

    if (!container) return <>{children}</>;

    return ReactDOM.createPortal(children, container);
};
