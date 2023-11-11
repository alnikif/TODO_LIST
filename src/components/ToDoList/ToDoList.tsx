import React from "react";
import Task, {ExtendedTaskType} from "../Task/Task";
import styles from './ToDoList.module.scss';
import {CustomCheckbox} from "../CustomCheckbox/CustomCheckbox";

export type ToDoListType = {
    list: ExtendedTaskType[],
    isAllTasksSelected: boolean,
    onToggleAllTasks: () => void
    onRemoveTask: (id: string) => void,
    onToggleStatus: (id: string) => void,
    onToggleTask: (id: string) => void,
}

const ToDoList: React.FC<ToDoListType> = (props) => {
    const { list, isAllTasksSelected, onRemoveTask, onToggleStatus, onToggleTask, onToggleAllTasks } = props;

    return (
        <div className={styles.listWrapper}>
            <div className={styles.checkbox}>
                <CustomCheckbox  checked={isAllTasksSelected} onChange={onToggleAllTasks} />
                <label>Check all tasks</label>
            </div>
            <div className={styles.list}>
              {list.map((lisItem, index ) => {
                    return (
                        <Task key={lisItem.id}
                        data={lisItem}
                        index={index}
                        onRemoveTask={onRemoveTask}
                        onToggleStatus={onToggleStatus}
                        onToggleTask={onToggleTask}
                    />
                    );
                })}
            </div>
        </div>
    )
};

export default ToDoList;
