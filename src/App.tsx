import React, {useCallback, useEffect, useMemo, useState, useReducer} from 'react';
import { CreateTaskForm } from './components/CreateTaskForm/CreateTaskForm';
import Providers from './Providers';
import ToDoList from './components/ToDoList/ToDoList';
import { nanoid } from "@reduxjs/toolkit";
import { Modal } from "./components/Modal/Modal";
import { Portal } from "./components/Portal";
import { DeleteTasksModalBody } from "./components/DeleteTasksModalBody/DeleteTasksModalBody";
import {Button, ButtonType} from './components/Button/Button';
import {getToDoListFromLS, setToDoListToLS} from "./utils/local-storage-utils";
import { reducer ,Actions } from './components/reducer/reducer';
import {UpdateTaskForm} from "./components/UpdateTaskForm/UpdateTaskForm";
import './App.scss';
import task from "./components/Task/Task";

  export type TaskType = {
    title: string,
    description: string,
    id: string,
    isDone: boolean,
    date: Date
  };

  export type StateType = {
    list: TaskType[],
    selectedTasksIds: string[],

  }

  const initialState: StateType = {
    list: [],
    selectedTasksIds: [],

  };

 export type ActionType = {
    type: Actions;
    payload?: any;
  };

function App() {
  const [showAddTaskModal, setShowAddTaskModal] = useState(false);
  const [showDeleteTasksModal, setShowDeleteTasksModal] = useState(false);
  const [deleteCompleteTasksModal, setDeleteCompleteTasksModal] = useState(false);
  const [updateTaskId, setUpdateTaskId] = useState<string | null>(null);
  const [state, dispatch] = useReducer(reducer, initialState); // rename
  const { list, selectedTasksIds } = state;

  useEffect(() => {
    dispatch({type: Actions.setList, payload: getToDoListFromLS() || []});
  }, []);

  useEffect(() => {
    if (!list.length) return;
    setToDoListToLS(list);
  }, [list]);

  const taskList = useMemo(() => (
      (list || []).map((item) => ({...item, isSelected: selectedTasksIds.includes(item.id)}))
  ), [list, selectedTasksIds]);

  const isAllTasksSelected = useMemo(()=> (
      Array.isArray(list) && list.length > 0 && list.every((item) => selectedTasksIds.includes(item.id))
  ), [list, selectedTasksIds]);

  const selectedTasks = useMemo(() => (
      taskList.filter((item) => item.isSelected)
  ), [taskList]);

  const completedTasks = useMemo(() => (
      taskList.filter((item) => item.isDone)
  ), [taskList]);

  const updateTask = useMemo(() => {
    if(!updateTaskId) return null;
    const targetTask = taskList.find((item) => item.id === updateTaskId)
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
    dispatch({ type: Actions.createTask, payload: newTaskData});
    onCloseCreateTaskModal();
  };

  const onRemoveTask = (removeId: string) => {
    dispatch({type: Actions.deleteTask, payload: removeId})
  };

  const onRemoveCompleteTasks = () => {
    dispatch({type: Actions.removeCompleteTasks});
    setDeleteCompleteTasksModal(false);
  };

  const onToggleStatus = (taskId: string) => {
    dispatch({type: Actions.toggleStatus, payload: taskId})
  };

  const onToggleTask = ((taskId: string) => {
      return dispatch({type: Actions.toggleSelectedTaskId, payload: taskId})
  });

  const onToggleAllTasks = () => {
      dispatch({type: Actions.toggleAllTasks, payload: isAllTasksSelected })
  };

  const onRemoveSelectedTasks = useCallback(() => {
    setShowDeleteTasksModal(false);
    dispatch({type: Actions.removeSelectedTasks})
  }, [list]);

  const onUpdateTask = useCallback((updateTask: Pick<TaskType, 'title' | 'description' | 'id'>) => {
    dispatch({type: Actions.updateTask, payload: updateTask})
    setUpdateTaskId(null);
  }, [list]);

  return (
      <Providers>
        <div className='container'>
          <h1>TODO LIST</h1>
          <Button onClick={onOpenCreateTaskModal} type={ButtonType.action}>Add task</Button>
          {showAddTaskModal && (
              <Portal>
                <Modal onClose={onCloseCreateTaskModal}>
                  <CreateTaskForm onCreateTask={onCreateTask} />
                </Modal>
              </Portal>
          )}
          {showDeleteTasksModal && (
              <Portal>
                <Modal
                    onAccept={onRemoveSelectedTasks}
                    onClose={onCloseDeleteSelectedTasksModal}
                >
                  <DeleteTasksModalBody
                      title="Are you sure you want to delete next tasks?"
                      selectedTasks={selectedTasks}
                  />
                </Modal>
              </Portal>
          )}
          {deleteCompleteTasksModal && (
              <Portal>
                <Modal
                    onAccept={onRemoveCompleteTasks}
                    onClose={onCloseDeleteCompletedTaskModal}
                >
                  <DeleteTasksModalBody
                      title="Are you sure you want to delete all completed tasks?"
                      selectedTasks={completedTasks}
                  />
                </Modal>
              </Portal>
          )}
          {updateTaskId && updateTask && (
              <Portal>
                <Modal
                    onClose={onCloseUpdateTaskModal}
                >
                  <UpdateTaskForm
                    task={updateTask}
                    onUpdateTask={onUpdateTask}
                  />
                </Modal>
              </Portal>
          )}
          <Button type={ButtonType.action} disabled={!selectedTasks.length} onClick={onOpenDeleteSelectedTasksModal}>
            Remove selected tasks
          </Button>
          <Button type={ButtonType.action} disabled={!completedTasks.length} onClick={onOpenDeleteCompletedTaskModal}>
            Remove completed tasks</Button>
          <ToDoList
              list={taskList}
              isAllTasksSelected={isAllTasksSelected}
              onToggleTask={onToggleTask}
              onRemoveTask={onRemoveTask}
              onToggleStatus={onToggleStatus}
              onToggleAllTasks={onToggleAllTasks}
              onOpenUpdateTaskModal={onOpenUpdateTaskModal}
          />
        </div>
      </Providers>
  );
}

export default App;
