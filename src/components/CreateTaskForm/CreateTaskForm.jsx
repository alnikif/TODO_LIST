import { useState } from "react";
import styles from './CreateTaskForm.module.scss'
import { Button } from "../Button/Button";
import cx from 'classnames';

const initialFormData = {
    title: '',
    description: '',
    isDone: false
}

export const CreateTaskForm = (props) => {
   const { onCreateTask } = props;

    const [taskData, setTaskData] = useState(initialFormData);

    const {title, description} = taskData;

    const onResetForm = () => {
        setTaskData(initialFormData);
    }

    const onChangeTitle = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setTaskData((prevTaskData) => ({
            ...prevTaskData,
            title : e.target.value,

        }));
    };

    const onChangeDiscription = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setTaskData((prevTaskData) => ({
            ...prevTaskData, description : e.target.value
        }));
    };

    const onSubmit = (e) => {
        e.preventDefault();
        e.stopPropagation();
        onCreateTask(taskData);
        onResetForm();
    }

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
            <input type="text" id="description" className={styles.inptTxt} value={description} onChange={onChangeDiscription} />
            <Button onClick={onSubmit} type={title.length && 'action'}>ADD</Button>
        </form>
    );
};
