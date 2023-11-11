import React from'react';
import { useState } from "react";
import { SliderCheckbox } from '../SliderCheckbox/SliderCheckbox';
import styles from './Task.module.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import {getFormattedDate} from "../../utils/date-utils";
import {CustomCheckbox} from "../CustomCheckbox/CustomCheckbox";
import cx from 'classnames';
import {TaskType} from "../../App";

export type ExtendedTaskType = TaskType & {isSelected: boolean};

export type TaskPropsType = {
    index: number,
    data: ExtendedTaskType,
    onRemoveTask: (id: string) => void,
    onToggleStatus: (id: string) => void,
    onToggleTask: (id: string) => void,
};

const Task: React.FC<TaskPropsType> = (props) => {
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
            </div>
        </div>
    );
};

export default Task;

