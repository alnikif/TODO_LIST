import styles from './Button.module.scss'
import cx from 'classnames';
import React, {FC, ReactNode} from "react";

export enum ButtonType {
    action = 'action',
    close = 'close'
};

export type ButtonProps = {
    type: ButtonType | number;
    disabled?: boolean;
    children?: ReactNode;
    onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
};

export const Button: FC<ButtonProps> = (props) => {
    const { disabled, children, type, onClick } = props;

    return (
        <button className={
            cx(styles.btn, 
                type === ButtonType.action && styles.action,
                type === ButtonType.close && styles.closeButton
            )}
            disabled={disabled}
            onClick={onClick}
        >
            {children}
        </button>
    )
};

