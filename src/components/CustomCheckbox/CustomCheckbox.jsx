import cx from 'classnames';
import styles from './CustomCheckbox.module.scss';
export const CustomCheckbox = ({onChange, checked}) => {
    const onClick = (e) => {
        e.preventDefault();
        e.stopPropagation();
        onChange();
    }
    return (
        <div className={styles.checkboxContainer}>
            <div
                className={cx(styles.customCheckbox, checked && styles.checked)}
                onClick={onClick}
            />
        </div>
    )
};
