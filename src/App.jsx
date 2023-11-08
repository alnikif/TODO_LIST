import React, {useCallback, useEffect, useMemo, useState, useReducer} from 'react';
import './App.scss';
import { CreateTaskForm } from './components/CreateTaskForm/CreateTaskForm';
import Providers from './Providers';
import ToDoList from './components/ToDoList/ToDoList';
import { nanoid } from "@reduxjs/toolkit";
import { Modal } from "./components/Modal/Modal";
import { Portal } from "./components/Portal";
import { DeleteTasksModalBody } from "./components/DeleteTasksModalBody/DeleteTasksModalBody";
import { Button } from './components/Button/Button';
import {getToDoListFromLS, setToDoListToLS} from "./utils/local-storage-utils";

function App() {
  // const [list, setList] = useState(null);
  const [selectedTasksIds, setSelectedTasksIds] = useState([]);
  const [visibility , setVisibility] = useState('hidden');
  const [showAddTaskModal, setShowAddTaskModal] = useState(false);
  const [showDeleteTasksModal, setShowDeleteTasksModal] = useState(false);
  const [deleteCompleteTasksModal, setDeleteCompleteTasksModal] = useState(false);

  const initialState = {
    list: null,
  };

  const reducer = (state, action) => {
    switch (action.type){
      case "SET_LIST" :
        return{ ...state, list : action.payload};
      case "DELETE_TASK" :
        return{ ...state, list : state.list.filter((item) => item.id !== action.payload)};
      case "REMOVE_COMPLETE_TASKS":
        return { ...state, list: state.list.filter(item => !item.isDone)};
      case "REMOVE_SELECTED_TASKS":
        return { ...state, list: state.list.filter(item => !selectedTasksIds.includes(item.id)) };
      case "CREATE_TASK":
        return { ...state, list: [...state.list,{
          ...action.payload,
            id: nanoid(),
            date: new Date()
          }] }
      case "TOGGLE_STATUS":
        return{ list: state.list.map((item) => {
            if(item.id !== action.payload) return item;
            return { ...item, isDone: !item.isDone }})
          }
      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(reducer, initialState);
  const { list } = state;

  useEffect(() => {
    dispatch({type: 'SET_LIST', payload: getToDoListFromLS() || []});
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

  const onCreateTask = (newTaskData) => {
    dispatch({ type: "CREATE_TASK", payload: newTaskData});
    onCloseCreateTaskModal();
  };

  const onRemoveTask = (removeId) => {
    dispatch({type: "DELETE_TASK", payload: removeId})
  };

  const onRemoveCompleteTasks = useCallback(() => {
    dispatch({type: "REMOVE_COMPLETE_TASKS"});
    setDeleteCompleteTasksModal(false);
  }, [list]);

  const onToggleStatus = (taskId) => {
    dispatch({type: "TOGGLE_STATUS", payload: taskId})
  };

  const onToggleTask = useCallback((taskId) => {
    const isSelected = selectedTasksIds.includes(taskId);
    if(!isSelected) {
      return setSelectedTasksIds([...selectedTasksIds, taskId]);
    }
    return setSelectedTasksIds(selectedTasksIds.filter((item) => item !== taskId));
  }, [selectedTasksIds]);

  const onToggleAllTasks = useCallback(() => {
    if(!isAllTasksSelected) {
      return setSelectedTasksIds(list.map((item) => item.id));
    }
    return setSelectedTasksIds([]);
  }, [list]);

  const showDescription = () => setVisibility(visibility === 'hidden' ? 'visible' : 'hidden');

  const onRemoveSelectedTasks = useCallback(() => {
    setShowDeleteTasksModal(false);
    dispatch({type: "REMOVE_SELECTED_TASKS"})
  }, [list]);

  return (
      <Providers>
        <div className='container'>
          <h1>TODO LIST</h1>
          <Button onClick={onOpenCreateTaskModal} type='action'>Add task</Button>
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
          <Button type="action" disabled={!selectedTasks.length} onClick={onOpenDeleteSelectedTasksModal}>
            Remove selected tasks
          </Button>
          <Button type='action' disabled={!completedTasks.length} onClick={onOpenDeleteCompletedTaskModal}>
            Remove completed tasks</Button>
          <ToDoList
              list={taskList}
              isAllTasksSelected={isAllTasksSelected}
              visibility={visibility}
              onToggleTask={onToggleTask}
              onRemoveTask={onRemoveTask}
              onToggleStatus={onToggleStatus}
              onToggleAllTasks={onToggleAllTasks}
              showDescription={showDescription}
          />
        </div>
      </Providers>
  );
}

export default App;
