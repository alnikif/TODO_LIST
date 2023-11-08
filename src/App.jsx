import React, {useCallback, useEffect, useMemo, useState} from 'react';
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
  const [list, setList] = useState(null);
  const [selectedTasksIds, setSelectedTasksIds] = useState([]);
  const [visibility , setVisibility] = useState('hidden');
  const [showAddTaskModal, setShowAddTaskModal] = useState(false);
  const [showDeleteTasksModal, setShowDeleteTasksModal] = useState(false);
  const [deleteCompleteTasksModal, setDeleteCompleteTasksModal] = useState(false);

  useEffect(() => {
    const initialToDoList = getToDoListFromLS() || [];
    setList(initialToDoList);
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
    const newTask = {
      ...newTaskData,
      id: nanoid(),
      date: new Date(),
    };

    setList((prevList) => ([ ...prevList, newTask ]));
    onCloseCreateTaskModal();
  };

  const onRemoveTask = (removeId) => {
    setList((prevList) => (prevList.filter((item) => item.id !== removeId)));
  };

  const onRemoveCompletedTasks = useCallback(() => {
    const newList = list.filter(item => !item.isDone);
    setDeleteCompleteTasksModal(false);
    setList(newList);
  }, [list]);

  const onToggleStatus = (taskId) => {
    setList((prevList) => (prevList.map((item) => {
      if(item.id !== taskId) return item;
      return { ...item, isDone: !item.isDone };
    })));
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
    const selectedList = list.filter(item => !selectedTasksIds.includes(item.id));
    setShowDeleteTasksModal(false);
    setList(selectedList);
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
                    onAccept={onRemoveCompletedTasks}
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
