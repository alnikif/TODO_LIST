import { Button } from '../Button/Button';
import styles from './DeleteTasksModalBody.module.scss';
import cx from 'classnames';

export const DeleteTasksModalBody = ({onRemoveCompletedTasks}) => {
    return(
        <div className={styles.modalDialog}>
            <div className={cx(
                styles.displayFlex,
                styles.flexCol,
                styles.justifyCenter,
                styles.itemsCenter
            )}>
                <p className={styles.modalText}> Are you suare ?</p>
                <Button onClick={onRemoveCompletedTasks} tittle='Agree' />
            </div>
        </div>
    )
}