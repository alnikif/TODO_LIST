import React from 'react';
import cx from 'classnames';
import styles from './CustomCheckbox.module.scss';

export type CustomCheckboxProps = {
    readonly onChange: () => void,
    readonly checked: boolean,
};

export const CustomCheckbox: React.FC<CustomCheckboxProps> = ({onChange, checked}: CustomCheckboxProps) => {
    const onClick = (e: React.MouseEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
        onChange();
    };
    return (
        <div className={styles.checkboxContainer}>
            <div
                className={cx(styles.customCheckbox, checked && styles.checked)}
                onClick={onClick}
            />
        </div>
    )
};
