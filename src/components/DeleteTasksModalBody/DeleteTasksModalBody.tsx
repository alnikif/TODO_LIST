import React from "react";
import { TaskType } from "../../Pages/ToDoList/ToDoListReducer";
import styles from './DeleteTasksModalBody.module.scss';

export type DeleteTasksModalBodyProps = {
    readonly title: string,
    readonly selectedTasks: TaskType[],
};

export const DeleteTasksModalBody: React.FC<DeleteTasksModalBodyProps> = ({ title, selectedTasks }) => {
    return(
        <>
          <p className={styles.modalText}>{title}</p>
          <div>
            {selectedTasks.map(({ id, title: titleTask}, i) => (
              <div className={styles.deleteItem} key={id}>{i+1}. {title}</div>
            ))}
          </div>
        </>
    )
};
