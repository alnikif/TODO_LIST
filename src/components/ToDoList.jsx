import React from "react";
import Task from "./Task";


const ToDoList = (props) => {
    const { list, isAllTasksSelected, onRemoveTask, onToggleStatus, onToggleTask, onToggleAllTasks } = props;

    return (
        <div>
            <label htmlFor="selected" className="checkbox-text">Check all tasks</label>
            <input type="checkbox" id="selected" className="all-selected-checkbox" disabled={!list.length} checked={isAllTasksSelected} onChange={onToggleAllTasks} />
            {list.map((lisItem, index ) => {
                return (
                    <Task key={lisItem.id}
                    data={lisItem} 
                    index={index}
                    onRemoveTask={onRemoveTask}  
                    onToggleStatus={onToggleStatus}
                    onToggleTask={onToggleTask}
                />
                );
            })}
        </div>
    )
}

export default ToDoList;