import React, {FC, ReactNode} from "react";
import cx from 'classnames';
import styles from './Button.module.scss';

export enum ButtonType {
    action = 'action',
    close = 'close'
}

export type ButtonProps = {
    readonly type: ButtonType | number;
    readonly disabled?: boolean;
    readonly children?: ReactNode;
    readonly onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
};



export const Button: FC<ButtonProps> = (props) => {
    const { disabled, children, type, onClick } = props;

    return (
        <button
            type='button'
            className={
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

