import styles from './Button.module.scss'
import cx from 'classnames';

export const Button = ({onClick, tittle, type}) => {
    return (
        <button className={
            cx(styles.btn,
            type==='action' && styles.action)} 
            onClick={onClick}>
            {tittle}
        </button>
    )
}