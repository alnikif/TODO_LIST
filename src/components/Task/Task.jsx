import { useState } from "react";
import { SliderCheckbox } from '../SliderCheckbox/SliderCheckbox';
import styles from './Task.module.scss'
// import { toContainElement } from "@testing-library/jest-dom/matchers";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import {getFormattedDate} from "../../utils/date-utils";
import {CustomCheckbox} from "../CustomCheckbox/CustomCheckbox";

const Task = (props) => {
    const { data, index, onRemoveTask, onToggleStatus, onToggleTask } = props;
    const { id, title, date, description, isDone, isSelected } = data;

    const [showDescription, setShowDescription] = useState(false);
    const visibility = showDescription ? 'visible' : 'hidden';
    const formattedDate = getFormattedDate(date);

    const onToggleShowDescription = () => setShowDescription(!showDescription);

    return (
        <div className={styles.taskWrapper}>
            <div className={styles.tailBox}>
                <CustomCheckbox checked={isSelected} onChange={() => onToggleTask(id)} />
                <div className={styles.index}></div>
            </div>

            <div className={styles.date} onClick={onToggleShowDescription}>{formattedDate}</div>
            <div className={styles.title} onClick={onToggleShowDescription}>{index + 1}. {title}</div>
            <p className={styles.description} style={{visibility: visibility}}>{description}</p>

            <div className={styles.tailBox}>
                <SliderCheckbox isDone={isDone} onChange={() => onToggleStatus(id)} />
                <div className={styles.removeItem} onClick={() => onRemoveTask(id)} ><FontAwesomeIcon icon={faTrash} /></div>
            </div>
        </div>
    );
}

export default Task;

