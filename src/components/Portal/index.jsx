import ReactDOM from 'react-dom';
import React from 'react';

export const Portal = ({ children }) => {
    const container = document.getElementById("modals");

    if (!container) return <>{children}</>;

    return ReactDOM.createPortal(children, container);
};
