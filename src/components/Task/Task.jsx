import { useState } from "react";
import { SliderCheckbox } from '../SliderCheckbox/SliderCheckbox';
import styles from './Task.module.scss'

const Task = (props) => {
    const { data: {id, title, description, isDone, isSelected},index, onRemoveTask, onToggleStatus, onToggleTask } = props;

    const [showDescription, setShowDescription] = useState(false);
    const display = showDescription ? 'block' : 'none';

    const onToggleShowDescription = () => setShowDescription(!showDescription);

    return (
        <div className={styles.taskWrapper}>
          <div className={styles.tailBox}>
            <input type="checkbox" checked={isSelected} onChange={() => onToggleTask(id)} />
            <div className={styles.index}>{index + 1}</div>
          </div>

          <div className={styles.title} onClick={onToggleShowDescription}>{title}</div>
          {/*<p className={styles.description} style={{display: display}}>{description}</p>*/}

          <div className={styles.tailBox}>
            <SliderCheckbox isDone={isDone} onChange={() => onToggleStatus(id)} />
            <div className={styles.removeItem} onClick={() => onRemoveTask(id)} />
          </div>
        </div>
    );
}

export default Task;
