import styles from './Button.module.scss'
import cx from 'classnames';

export const Button = ({disabled, children, type, onClick}) => {
    return (
        <button className={
            cx(styles.btn, type==='action' && styles.action)}
            disabled={disabled}
            onClick={onClick}
        >
            {children}
        </button>
    )
}
