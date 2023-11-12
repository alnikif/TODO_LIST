import React, {useEffect, useState} from "react";
import {Button, ButtonType} from "../Button/Button";
import { TaskType } from "../../App";
import cx from 'classnames';
import styles from './UpdateTaskForm.module.scss'

type UpdatedTaskFormProps = Pick<TaskType, 'title' | 'description'>

type UpdateTaskFormPropsType = {
    task: TaskType;
    onUpdateTask: (newTaskData: Pick<TaskType, 'title' | 'description' | 'id'>) => void
};

const initialFormData: UpdatedTaskFormProps = {
    title: '',
    description: '',
};




export const UpdateTaskForm : React.FC<UpdateTaskFormPropsType> = (props)  => {
    const { task, onUpdateTask } = props;

    const [taskData, setTaskData] = useState<UpdatedTaskFormProps>(initialFormData);
    const {title, description} = taskData;
    useEffect(() => {
        setTaskData(task)
        return () => setTaskData(initialFormData)
    }, [task]);

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
        onUpdateTask({...taskData, id: task.id});
    };

    return (
        <form name='updateeTask'
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
