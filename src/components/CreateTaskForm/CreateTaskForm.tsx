import React, { useState } from "react";
import {Button, ButtonType} from "../Button/Button";
import { TaskType } from "../../App";
import cx from 'classnames';
import styles from './CreateTaskForm.module.scss'

type CreateTaskFormPropsType = {
    onCreateTask: (newTaskData: Pick<TaskType, 'title' | 'description'>) => void
};

type InitialFormDataType ={
    title: string,
    description: string,
}

const initialFormData: InitialFormDataType = {
    title: '',
    description: '',
};

export const CreateTaskForm : React.FC<CreateTaskFormPropsType> = (props)  => {
    const { onCreateTask } = props;

    const [taskData, setTaskData] = useState(initialFormData);
    const {title, description} = taskData;

    const onResetForm = () => setTaskData(initialFormData);

    const onChangeTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        e.stopPropagation();

        setTaskData((prevTaskData) => ({
            ...prevTaskData,
            title : e.target.value,
        }));
    };

    const onChangeDescription = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        e.stopPropagation();

        setTaskData((prevTaskData) => ({
            ...prevTaskData, description : e.target.value
        }));
    };

    const onSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        e.stopPropagation();

        onCreateTask(taskData);
        onResetForm();
    };

    return (
        <form name='createTask'
              className={cx(
                  styles.displayFlex,
                  styles.flexCol,
                  styles.justifyCenter,
                  styles.itemsCenter
              )}>
            <label htmlFor="title" className={styles.inptTittle}>Title</label>
            <input type="text" id="title" className={styles.inptTxt} value={title} onChange={onChangeTitle} />
            <label htmlFor="description" className={styles.inptTitle}>Description</label>
            <input type="text" id="description" className={styles.inptTxt} value={description} onChange={onChangeDescription} />
            <Button onClick={onSubmit} type={title.length && ButtonType.action}>ADD</Button>
        </form>
    );
};
