import React, { useCallback, useEffect, useMemo, useReducer, useState, useContext } from 'react';
import { CreateTaskForm } from '../../components/CreateTaskForm/CreateTaskForm';
import ToDoList from '../../components/ToDoList/ToDoList';
import { Modal } from '../../components/Modal/Modal';
import { Portal } from '../../components/Portal';
import { DeleteTasksModalBody } from '../../components/DeleteTasksModalBody/DeleteTasksModalBody';
import { Button, ButtonType } from '../../components/Button/Button';
import { getToDoListFromLS, setToDoListToLS } from '../../utils/local-storage-utils';
import { Actions, initialStateToDoListReducer, TaskType, toDoListReducer } from './ToDoListReducer';
import { UpdateTaskForm } from '../../components/UpdateTaskForm/UpdateTaskForm';
import Dropdown from '../../components/Dropdown/Dropdown';
import { ThemeContext } from '../../Providers/ThemeProvider';
import { LanguageContext } from '../../Providers/LanguageProvider';
import { themes } from '../../constants/theme';
import { languages } from '../../constants/language';
import styles from './ToDoListPage.module.scss';

function ToDoListPage() {
  const themesOptions = themes.map(({ key, title }) => ({
    id: key,
    label: title
  }));

  const languagesOptions = languages.map(({ key, title, constants }) => ({
    id: key,
    label: title,
    constants: constants
  }));

  const { theme, setTheme: onChangeTheme } = useContext(ThemeContext);

  const { language, constants: langConstants, setLanguage: onChangeLanguage } = useContext(LanguageContext);

  const {
    toDoListTitle,
    addTaskButtonTitle,
    removeSelectedTasksButtonTitle,
    removeCompletedTasksButtonTitle,
    checkAllTasksCheckboxTitle,
    sliderCheckboxTitle,
    modalFormInputTitle,
    modalFormInputDescription,
    modalFormAddButtonTitle,
    modalRemoveSelectedTasksTitle,
    modalRemoveTasksButtonTitle,
    modalRemoveCompletedTasksTitle
  } = langConstants;

  const [showAddTaskModal, setShowAddTaskModal] = useState(false);
  const [showDeleteTasksModal, setShowDeleteTasksModal] = useState(false);
  const [deleteCompleteTasksModal, setDeleteCompleteTasksModal] = useState(false);
  const [updateTaskId, setUpdateTaskId] = useState<string | null>(null);
  const [state, dispatch] = useReducer(toDoListReducer, initialStateToDoListReducer);
  const { list, selectedTasksIds } = state;

  useEffect(() => {
    dispatch({ type: Actions.setList, payload: getToDoListFromLS() || [] });
  }, []);

  useEffect(() => {
    if (!list.length) return;
    setToDoListToLS(list);
  }, [list]);

  const taskList = useMemo(() => (list || []).map((item) => ({ ...item, isSelected: selectedTasksIds.includes(item.id) })), [list, selectedTasksIds]);

  const isAllTasksSelected = useMemo(
    () => Array.isArray(list) && list.length > 0 && list.every((item) => selectedTasksIds.includes(item.id)),
    [list, selectedTasksIds]
  );

  const selectedTasks = useMemo(() => taskList.filter((item) => item.isSelected), [taskList]);

  const completedTasks = useMemo(() => taskList.filter((item) => item.isDone), [taskList]);

  const updateTask = useMemo(() => {
    if (!updateTaskId) return null;
    const targetTask = taskList.find((item) => item.id === updateTaskId);
    return targetTask || null;
  }, [taskList, updateTaskId]);

  const onOpenCreateTaskModal = () => setShowAddTaskModal(true);
  const onCloseCreateTaskModal = () => setShowAddTaskModal(false);

  const onOpenUpdateTaskModal = (taskId: string) => setUpdateTaskId(taskId);
  const onCloseUpdateTaskModal = () => setUpdateTaskId(null);

  const onOpenDeleteSelectedTasksModal = () => setShowDeleteTasksModal(true);
  const onCloseDeleteSelectedTasksModal = () => setShowDeleteTasksModal(false);

  const onOpenDeleteCompletedTaskModal = () => setDeleteCompleteTasksModal(true);
  const onCloseDeleteCompletedTaskModal = () => setDeleteCompleteTasksModal(false);

  const onCreateTask = (newTaskData: Pick<TaskType, 'title' | 'description'>) => {
    dispatch({ type: Actions.createTask, payload: newTaskData });
    onCloseCreateTaskModal();
  };

  const onRemoveTask = (removeId: string) => {
    dispatch({ type: Actions.deleteTask, payload: removeId });
  };

  const onRemoveCompleteTasks = () => {
    dispatch({ type: Actions.removeCompleteTasks });
    setDeleteCompleteTasksModal(false);
  };

  const onToggleStatus = (taskId: string) => {
    dispatch({ type: Actions.toggleStatus, payload: taskId });
  };

  const onToggleTask = (taskId: string) => {
    return dispatch({ type: Actions.toggleSelectedTaskId, payload: taskId });
  };

  const onToggleAllTasks = () => {
    dispatch({ type: Actions.toggleAllTasks, payload: isAllTasksSelected });
  };

  const onRemoveSelectedTasks = useCallback(() => {
    setShowDeleteTasksModal(false);
    dispatch({ type: Actions.removeSelectedTasks });
  }, [list]);

  const onUpdateTask = useCallback(
    (updateTaskItem: Pick<TaskType, 'title' | 'description' | 'id'>) => {
      dispatch({ type: Actions.updateTask, payload: updateTaskItem });
      setUpdateTaskId(null);
    },
    [list]
  );

  return (
    <div className={styles.container}>
      <div className={styles.dropDownContainer}>
        <Dropdown selectedOptionId={language} options={languagesOptions} onSelect={onChangeLanguage} />
        <Dropdown selectedOptionId={theme} options={themesOptions} onSelect={onChangeTheme} />
      </div>
      <h1>{toDoListTitle}</h1>
      <Button type={ButtonType.action} onClick={onOpenCreateTaskModal}>
        {addTaskButtonTitle}
      </Button>

      <Button type={ButtonType.action} disabled={!selectedTasks.length} onClick={onOpenDeleteSelectedTasksModal}>
        {removeSelectedTasksButtonTitle}
      </Button>

      <Button type={ButtonType.action} disabled={!completedTasks.length} onClick={onOpenDeleteCompletedTaskModal}>
        {removeCompletedTasksButtonTitle}
      </Button>

      <ToDoList
        list={taskList}
        isAllTasksSelected={isAllTasksSelected}
        onToggleTask={onToggleTask}
        onRemoveTask={onRemoveTask}
        onToggleStatus={onToggleStatus}
        onToggleAllTasks={onToggleAllTasks}
        onOpenUpdateTaskModal={onOpenUpdateTaskModal}
        checkAllTasksCheckboxTitle={checkAllTasksCheckboxTitle}
      />

      {showAddTaskModal && (
        <Portal>
          <Modal onClose={onCloseCreateTaskModal}>
            <CreateTaskForm onCreateTask={onCreateTask} />
          </Modal>
        </Portal>
      )}

      {showDeleteTasksModal && (
        <Portal>
          <Modal onAccept={onRemoveSelectedTasks} onClose={onCloseDeleteSelectedTasksModal}>
            <DeleteTasksModalBody title={modalRemoveSelectedTasksTitle} selectedTasks={selectedTasks} />
          </Modal>
        </Portal>
      )}

      {deleteCompleteTasksModal && (
        <Portal>
          <Modal onAccept={onRemoveCompleteTasks} onClose={onCloseDeleteCompletedTaskModal}>
            <DeleteTasksModalBody title={modalRemoveCompletedTasksTitle} selectedTasks={completedTasks} />
          </Modal>
        </Portal>
      )}

      {updateTaskId && updateTask && (
        <Portal>
          <Modal onClose={onCloseUpdateTaskModal}>
            <UpdateTaskForm task={updateTask} onUpdateTask={onUpdateTask} />
          </Modal>
        </Portal>
      )}
    </div>
  );
}

export default ToDoListPage;
