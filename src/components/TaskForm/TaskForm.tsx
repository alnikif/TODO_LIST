import React from "react";
import cx from "classnames";
import {Button, ButtonType} from "../Button/Button";
import styles from "./TaskForm.module.scss";

type TaskFormPropsType = {
    readonly formName: string,
    readonly title: string,
    readonly description: string,
    readonly onResetForm?: () => void,
    readonly onChangeTitle: (e: React.ChangeEvent<HTMLInputElement>) => void,
    readonly onChangeDescription: (e: React.ChangeEvent<HTMLInputElement>) => void,
    readonly onSubmit: (e: React.MouseEvent<HTMLButtonElement>) => void,
}


export const TaskForm: React.FC<TaskFormPropsType> = (props) => {
    const { formName, title, description, onResetForm, onChangeTitle, onChangeDescription, onSubmit } = props;
    return(
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
    )
};