import React, { useMemo, useState } from 'react';
import './App.scss';
import { CreateTaskForm } from './components/CreateTaskForm/CreateTaskForm';
import Providers from './Providers';
import ToDoList from './components/ToDoList/ToDoList';
import { nanoid } from "@reduxjs/toolkit";
import { Modal } from "./components/Modal/Modal";
import { Portal } from "./components/Portal";
import { DeleteTasksModalBody } from "./components/DeleteTasksModalBody/DeleteTasksModalBody";
import { Button } from './components/Button/Button';
import { DeleteComleteTasksModalBody } from './components/DeleteCompletedTasksModalBody/DeleteCompletedTasksModalBody';

function App() {
  const [list, setList] = useState([]);
  const [selectedTasksIds, setSelectedTasksIds] = useState([]);
  const [display , setDisplay] = useState('none');
  const [showAddTaskModal, setShowAddTaskModal] = useState(false);
  const [showDeleteTasksModal, setShowDeleteTasksModal] = useState(false);
  const [deleteComleteTasksModal, setDeleteComleteTasksModal] = useState(false);


  const taskList = useMemo(() => (
    list.map((item) => ({...item, isSelected: selectedTasksIds.includes(item.id)}))
  ), [list, selectedTasksIds]);

  const isAllTasksSelected = useMemo(()=> (
    list.length && list.every((item) => selectedTasksIds.includes(item.id))
  ), [list, selectedTasksIds]);

  const onOpenCreateTaskModal = () => setShowAddTaskModal(true);
  const onCloseCreateTaskModal = () => setShowAddTaskModal(false);
  
  const onOpenDeleteSelectedTasksModal = () => setShowDeleteTasksModal(true);
  const onCloseDeleteSelectedTasksModal = () => setShowDeleteTasksModal(false);

  const onOpenDeleteCompletedTaskModal = () => setDeleteComleteTasksModal(true);
  const onCloseDeleteCompletedTaskModal = () => setDeleteComleteTasksModal(false);


  const onCreateTask = (newTask) => {
    setList((prevList) => ([...prevList, {...newTask, id: nanoid()}]));
    onCloseCreateTaskModal();
  };

  const onRemoveTask = (removeId) => {
    setList((prevList) => (prevList.filter((item) => item.id !== removeId)));
  };

  const onRemoveCompletedTasks = () => {
    const newList = list.filter(item => !item.isDone)
    setDeleteComleteTasksModal(false);
    setList(newList)
  };

  const onToggleStatus = (taskId) => {
    setList((prevList) => (prevList.map((item) => {
      if(item.id !== taskId) return item;
      return { ...item, isDone: !item.isDone };
    })));
  };

  const onToggleTask = (taskId) => {
    const isSelected = selectedTasksIds.includes(taskId);
    if(!isSelected){
      return setSelectedTasksIds([...selectedTasksIds, taskId]);
    }
    return setSelectedTasksIds(selectedTasksIds.filter((item) => item !== taskId));
  };

  const onToggleAllTasks = () => {
    if(!isAllTasksSelected){
      return setSelectedTasksIds(list.map((item) => item.id));
    }
    return setSelectedTasksIds([]);
  };

  const showDescription = () => {
    return display === 'none' ? setDisplay('block') : setDisplay('none');
  };

  const onRemoveSelectedTasks = () => {
    const selectedList = list.filter(item => !selectedTasksIds.includes(item.id));
    setShowDeleteTasksModal(false);
    setList(selectedList);
  };

  return (
    <Providers>
      <div className='container'>
        <h1>TODO LIST</h1>
        <Button onClick={onOpenCreateTaskModal} tittle='Add task' />
        {showAddTaskModal && (
          <Portal>
            <Modal onClose={onCloseCreateTaskModal}>
              <CreateTaskForm
                onCreateTask={onCreateTask}
              />
            </Modal>
          </Portal>
        )}
  {showDeleteTasksModal && (
          <Portal>
            <Modal onClose={onCloseDeleteSelectedTasksModal}>
              <DeleteTasksModalBody   
                onClick={onRemoveSelectedTasks}
              />
            </Modal>
          </Portal>
        )}
         {deleteComleteTasksModal && (
          <Portal>
            <Modal onClose={onCloseDeleteCompletedTaskModal}>
              <DeleteComleteTasksModalBody   
                onClick={onRemoveCompletedTasks}
              />
            </Modal>
          </Portal>
        )}
        <Button onClick={onOpenDeleteSelectedTasksModal} tittle='Remove selected tasks' />
        <Button onClick={onOpenDeleteCompletedTaskModal} tittle='Remove completed tasks' />
        <ToDoList
          list={taskList}
          isAllTasksSelected={isAllTasksSelected}
          display={display}
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
