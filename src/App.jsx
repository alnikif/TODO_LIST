import React, { useMemo, useState } from 'react';
import './App.scss';
import { CreateTaskForm } from './components/CreateTaskForm/CreateTaskForm';
import Providers from './Providers';
import ToDoList from './components/ToDoList';
import { nanoid } from "@reduxjs/toolkit";
import {Modal} from "./components/Modal/Modal";
import {Portal} from "./components/Portal";
import {DeleteTasksModalBody} from "./components/Modal/DeleteTasksModalBody";

function App() {
  const [list, setList] = useState([]);
  const [selectedTasksIds, setSelectedTasksIds] = useState([]);
  const [display , setDisplay] = useState('none');
  const [showAddTaskModal, setShowAddTaskModal] = useState(false);
  const [showDeleteTasksModal, setShowDeleteTasksModal] = useState(false);


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


  const onCreateTask = (newTask) => {
    setList((prevList) => ([...prevList, {...newTask, id: nanoid()}]));
    onCloseCreateTaskModal();
  };

  const onRemoveTask = (removeId) => {
    setList((prevList) => (prevList.filter((item) => item.id !== removeId)));
  };

  const onRemoveCompletedTasks = () => {
    const newList = list.filter(item => !item.isDone)
    setList(newList)
  }

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
  }

  const onToggleAllTasks = () => {
    if(!isAllTasksSelected){
      return setSelectedTasksIds(list.map((item) => item.id));
    }
    return setSelectedTasksIds([]);
  }
  const showDescription = () => {
    return display === 'none' ? setDisplay('block') : setDisplay('none');
  }

  const onRemoveSelectedTasks = () => {
    const selectedList = list.filter(item => !selectedTasksIds.includes(item.id));
    setShowDeleteTasksModal(false);
    setList(selectedList);
  }


  return (
    <Providers>
      <div className='container'>
        <h1>TODO LIST</h1>
        <button className='btn' onClick={onOpenCreateTaskModal}>Add task</button>
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
            <Modal
              onClose={onCloseDeleteSelectedTasksModal}>
              <DeleteTasksModalBody   
                onRemoveCompletedTasks={onRemoveSelectedTasks}
              />
            </Modal>
          </Portal>
        )}
        <button onClick={onOpenDeleteSelectedTasksModal} className='btn'> Remove selected tasks </button>
        <button onClick={onRemoveCompletedTasks} className='btn'> Remove completed tasks </button>
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
