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
import './App.scss';

  export type TaskType = {
    title: string,
    description: string,
    id: string,
    isDone: boolean,
    date: Date
  };

  type StateType = {
    list: TaskType[],
    selectedTasksIds: string[]
  }

  enum Actions {
    setList = 'SET_LIST',
    deleteTask = 'DELETE_TASK',
    removeCompleteTasks = 'REMOVE_COMPLETE_TASKS',
    removeSelectedTasks = 'REMOVE_SELECTED_TASKS',
    createTask = 'CREATE_TASK',
    toggleStatus = 'TOGGLE_STATUS',
    toggleAllTasks = 'TOGGLE_ALL_TASKS',
    toggleSelectedTaskId = 'TOGGLE_SELECTED_TASK_ID',
  }

  const initialState: StateType = {
    list: [],
    selectedTasksIds: []
  };

  type ActionType = {
    type: Actions;
    payload?: any;
  };

  const reducer = (state: StateType, action: ActionType): StateType => {
    switch (action.type) {
      case Actions.setList :
        return { ...state, list : action.payload};
      case Actions.deleteTask :
        return { ...state, list : state.list.filter((item) => item.id !== action.payload)};
      case Actions.removeCompleteTasks:
        return { ...state, list: state.list.filter(item => !item.isDone)};
      case Actions.removeSelectedTasks:
        return { ...state, list: state.list.filter(item => !state.selectedTasksIds.includes(item.id))};
      case Actions.createTask: {
        return { ...state, list: [...state.list, {
          ...action.payload,
            isDone: false,
            id: nanoid(),
            date: new Date()
          }] }
      }
      case Actions.toggleStatus:
        return{ ...state, list: state.list.map((item) => {
            if(item.id !== action.payload) return item;
            return { ...item, isDone: !item.isDone }})
        }
      case Actions.toggleAllTasks :
        if(!action.payload && state.list) {
          return {...state, selectedTasksIds: state.list.map((item) => item.id)};
        }
        return { ...state, selectedTasksIds: []};
      case Actions.toggleSelectedTaskId :
        const isSelected = state.selectedTasksIds.includes(action.payload);
        if(!isSelected) {
          const nextSelectedTasksIds = [ ...state.selectedTasksIds, action.payload ];
          return { ...state, selectedTasksIds: nextSelectedTasksIds };
        }

        const nextSelectedTasksIds = state.selectedTasksIds.filter((item) => item !== action.payload);
        return { ...state, selectedTasksIds: nextSelectedTasksIds };
      default:
        return state;
    }
  };

function App() {
  const [showAddTaskModal, setShowAddTaskModal] = useState(false);
  const [showDeleteTasksModal, setShowDeleteTasksModal] = useState(false);
  const [deleteCompleteTasksModal, setDeleteCompleteTasksModal] = useState(false);

  const [state, dispatch] = useReducer(reducer, initialState); // rename
  const { list, selectedTasksIds } = state;

  useEffect(() => {
    dispatch({type: Actions.setList, payload: getToDoListFromLS() || []});
  }, []);

  useEffect(() => {
    if (!list) return;
    setToDoListToLS(list);
  }, [list]);

  const taskList = useMemo(() => (
      (list || []).map((item) => ({...item, isSelected: selectedTasksIds.includes(item.id)}))
  ), [list, selectedTasksIds]);

  const isAllTasksSelected = useMemo(()=> (
      Array.isArray(list) && list.length && list.every((item) => selectedTasksIds.includes(item.id))
  ), [list, selectedTasksIds]);

  const selectedTasks = useMemo(() => (
      taskList.filter((item) => item.isSelected)
  ), [taskList]);

  const completedTasks = useMemo(() => (
      taskList.filter((item) => item.isDone)
  ), [taskList]);

  const onOpenCreateTaskModal = () => setShowAddTaskModal(true);
  const onCloseCreateTaskModal = () => setShowAddTaskModal(false);

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
          />
        </div>
      </Providers>
  );
}

export default App;
