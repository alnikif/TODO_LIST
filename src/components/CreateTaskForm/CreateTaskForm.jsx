import React, { useState, useEffect } from "react";
import { ToDoListStateType, TaskType } from "../../redux/toDoList-types";

const initialFormData = {
    title: '',
    description: '',
    isDone: false
}

export const CreateTaskForm = (props) => {
   const { onCreateTask } = props;

    const [taskData, setTaskData] = useState(initialFormData);

    const {title, description} = taskData;

    const onResetForm = () => {
        setTaskData(initialFormData);
    }

    const onChangeTitle = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setTaskData((prevTaskData) => ({
            ...prevTaskData, 
            title : e.target.value,
            
        }));
    };

    const onChangeDiscription = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setTaskData((prevTaskData) => ({
            ...prevTaskData, description : e.target.value
        }));
    };
    
    const onSubmit = (e) => {
        e.preventDefault();
        e.stopPropagation();
        onCreateTask(taskData);
        onResetForm();
    }

    return (
        <form name='createTask' onSubmit={onSubmit}>
            <label htmlFor="title">Tittle</label>
            <input type="text" id="title" className="inpt-txt" value={title} onChange={onChangeTitle} />
            <label htmlFor="description">Description</label>
            <input type="text" id="description" className="inpt-txt" value={description} onChange={onChangeDiscription} />
            <button type="submit" disabled={!title } className="btn"> ADD </button>
        </form>
    );
};