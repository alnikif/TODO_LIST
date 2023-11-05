import { useState } from "react";
import { SliderCheckbox } from '../SliderCheckbox/SliderCheckbox';
import styles from './Task.module.scss'

const Task = (props) => {
    const { data: {id, title, description, isDone, isSelected},index, onRemoveTask, onToggleStatus, onToggleTask } = props;
    const [showDescription, setShowDescription] = useState(false);
    const display = showDescription ? 'block' : 'none';
    const onToggleShowDescription = () => setShowDescription(!showDescription);
    return (
        <div className={styles.toDoList}>
            <div className={styles.tittleText} onClick={onToggleShowDescription}> 
                <div className={styles.removeItem} onClick={() => onRemoveTask(id)}/> 
                <input type="checkbox" checked={isSelected} onChange={() => onToggleTask(id)} />
                { index + 1}.
                {title}
            </div>
            <p className={styles.descriptionText} style={{display: display}}>{description}</p>
            <SliderCheckbox isDone={isDone} onChange={()=>onToggleStatus(id)} />

            {/* old version */}
            {/* <div>
                <input type="checkbox" id="done-checkbox" className={styles.doneCheckbox} checked={isDone} onChange={() => onToggleStatus(id)} />
                <label htmlFor="done-checkbox" className="checkbox-text">Done</label>
            </div> */}

        </div>
    );
}

export default Task;