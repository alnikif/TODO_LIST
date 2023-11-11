import React from "react";
import { TaskType } from "../../App";
import styles from './DeleteTasksModalBody.module.scss';

export type DeleteTasksModalBodyProps = {
    title: string,
    selectedTasks: TaskType[],
};

export const DeleteTasksModalBody: React.FC<DeleteTasksModalBodyProps> = ({ title, selectedTasks }) => {
    return(
        <>
          <p className={styles.modalText}>{title}</p>
          <div>
            {selectedTasks.map(({ id, title }) => (
              <div key={id}>{title}</div>
            ))}
          </div>
        </>
    )
};
