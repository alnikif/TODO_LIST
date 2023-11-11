import React from "react";
import Task from "../Task/Task";
import styles from './ToDoList.module.scss';
import {CustomCheckbox} from "../CustomCheckbox/CustomCheckbox";

const ToDoList = (props) => {
    const { list, isAllTasksSelected, onRemoveTask, onToggleStatus, onToggleTask, onToggleAllTasks } = props;

    return (
        <div className={styles.listWrapper}>
            <div>
                <label>Check all tasks
                    <CustomCheckbox  checked={isAllTasksSelected} onChange={onToggleAllTasks} />
                </label>
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
}

export default ToDoList;
