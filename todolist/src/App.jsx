import React, { useMemo, useState } from 'react';
import './App.scss';
import { CreateTaskForm } from './components/CreateTaskForm';
import Providers from './Providers';
import ToDoList from './components/ToDoList';
import { nanoid } from "@reduxjs/toolkit";


function App() {
  const [list, setList] = useState([]);
  const [selectedTasksIds, setSelectedTasksIds] = useState([]);
  const [display , setDisplay] = useState('none');

  const taskList = useMemo(() => (
    list.map((item) => ({...item, isSelected: selectedTasksIds.includes(item.id)}))
  ), [list, selectedTasksIds]);

  const isAllTasksSelected = useMemo(()=> (
    list.length && list.every((item) => selectedTasksIds.includes(item.id))
  ), [list, selectedTasksIds]);


  const onCreateTask = (newTask) => {
    setList((prevList) => ([...prevList, {...newTask, id: nanoid()}]));
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

  return (
    <Providers>
      <div className='container'>
        <h1>TODO LIST</h1>
        <CreateTaskForm onCreateTask={onCreateTask} onRemoveCompletedTasks={onRemoveCompletedTasks} />
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
