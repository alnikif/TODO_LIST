import React from "react";
import Task, {ExtendedTaskType} from "../Task/Task";
import styles from './ToDoList.module.scss';
import {CustomCheckbox} from "../CustomCheckbox/CustomCheckbox";

export type ToDoListType = {
    readonly list: ExtendedTaskType[],
    readonly isAllTasksSelected: boolean,
    readonly onToggleAllTasks: () => void
    readonly onRemoveTask: (id: string) => void,
    readonly onToggleStatus: (id: string) => void,
    readonly onToggleTask: (id: string) => void,
    readonly onOpenUpdateTaskModal: (id: string) => void
}

const ToDoList: React.FC<ToDoListType> = (props) => {
    const { list, isAllTasksSelected, onRemoveTask, onToggleStatus, onToggleTask, onToggleAllTasks, onOpenUpdateTaskModal } = props;

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
                        onOpenUpdateTaskModal={onOpenUpdateTaskModal}
                    />
                    );
                })}
            </div>
        </div>
    )
};

export default ToDoList;
