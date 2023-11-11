import React from "react";
import { Button, ButtonType } from '../Button/Button';
import styles from './Modal.module.scss';
import cx from 'classnames';

export type ModalPropsType = {
    children: React.ReactNode,
    onClose: () => void,
    onAccept?: () => void,
};

export const Modal: React.FC<ModalPropsType> = (props) => {
    let { children, onAccept, onClose } = props;

    if (!children) {
        children = <p>This is a example modal</p>;
    }

    return (
        <div className={styles.modalDialog}>
            <div className={cx(
                styles.displayFlex,
                styles.flexCol,
                styles.justifyCenter,
                styles.itemsCenter
            )}>
                {children}
                {onAccept && <Button type={ButtonType.action} onClick={onAccept}>Agree</Button>}
                <Button onClick={onClose} type={ButtonType.close}></Button>
            </div>
        </div>
    );
};
