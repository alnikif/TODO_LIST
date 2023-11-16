import React, { useContext } from 'react';
import Task, { ExtendedTaskType } from '../Task/Task';
import styles from './ToDoList.module.scss';
import { CustomCheckbox } from '../CustomCheckbox/CustomCheckbox';
import { LanguageContext } from '../../Providers/LanguageProvider';

export type ToDoListType = {
  readonly list: ExtendedTaskType[];
  readonly checkAllTasksCheckboxTitle: string;
  readonly isAllTasksSelected: boolean;
  readonly onToggleAllTasks: () => void;
  readonly onRemoveTask: (id: string) => void;
  readonly onToggleStatus: (id: string) => void;
  readonly onToggleTask: (id: string) => void;
  readonly onOpenUpdateTaskModal: (id: string) => void;
};

const ToDoList: React.FC<ToDoListType> = (props) => {
  const { list, isAllTasksSelected, onRemoveTask, onToggleStatus, onToggleTask, onToggleAllTasks, onOpenUpdateTaskModal } = props;

  const { constants: langConstants } = useContext(LanguageContext);
  const { checkAllTasksCheckboxTitle } = langConstants;

  return (
    <div className={styles.listWrapper}>
      <div className={styles.checkbox}>
        <CustomCheckbox checked={isAllTasksSelected} onChange={onToggleAllTasks} />
        <label>{checkAllTasksCheckboxTitle}</label>
      </div>
      <div className={styles.list}>
        {list.map((lisItem, index) => {
          return (
            <Task
              key={lisItem.id}
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
  );
};

export default ToDoList;
