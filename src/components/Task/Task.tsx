import React, { useState } from'react';
import cx from 'classnames';
import { SliderCheckbox } from '../SliderCheckbox/SliderCheckbox';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash,  faPencil } from '@fortawesome/free-solid-svg-icons'
import { getFormattedDate } from "../../utils/date-utils";
import { CustomCheckbox } from "../CustomCheckbox/CustomCheckbox";
import {TaskType} from "../../Pages/ToDoList/ToDoListReducer";
import styles from './Task.module.scss'

export type ExtendedTaskType = TaskType & {isSelected: boolean};

export type TaskPropsType = {
    readonly index: number,
    readonly data: ExtendedTaskType,
    readonly onRemoveTask: (id: string) => void,
    readonly onToggleStatus: (id: string) => void,
    readonly onToggleTask: (id: string) => void,
    readonly onOpenUpdateTaskModal: (id: string) => void
};

const Task: React.FC<TaskPropsType> = (props) => {
    const { data, index, onRemoveTask, onToggleStatus, onToggleTask, onOpenUpdateTaskModal } = props;
    const { id, title, date, description, isDone, isSelected } = data;

    const [showDescription, setShowDescription] = useState(false);

    const visibility = showDescription ? 'visible' : 'hidden';
    const formattedDate = getFormattedDate(date);


    const onToggleShowDescription = () => setShowDescription(!showDescription);

    return (
        <div className={styles.taskWrapper}>
            <div className={styles.tailBox}>
                <CustomCheckbox checked={isSelected} onChange={() => onToggleTask(id)} />
                <div className={styles.index} />
            </div>

            <div className={styles.date} onClick={onToggleShowDescription}>{formattedDate}</div>
            <div className={
                cx(styles.title,
                    isDone && styles.isDoneTitle)}
                 onClick={onToggleShowDescription}
            >
                {index + 1}. {title}
            </div>
            <p className={styles.description} style={{visibility: visibility}}>{description}</p>

            <div className={styles.tailBox}>
                <SliderCheckbox isDone={isDone} onChange={() => onToggleStatus(id)} />
                <div className={styles.removeItem} onClick={() => onRemoveTask(id)} ><FontAwesomeIcon icon={faTrash} /></div>
                <div className={styles.updateItem} onClick={() => onOpenUpdateTaskModal(id)} ><FontAwesomeIcon icon={faPencil} /></div>
            </div>
        </div>
    );
};

export default Task;

