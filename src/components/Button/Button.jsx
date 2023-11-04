import styles from './Button.module.scss'

export const Button = ({onClick, tittle, type}) => {
    return (
        <button className={styles.btn} onClick={onClick}>{tittle}</button>
    )
}