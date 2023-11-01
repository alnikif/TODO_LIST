import React from "react";

const ToDoList = (props) => {
    const { list, isAllTasksSelected, display, onRemoveTask, onToggleStatus, onToggleTask, onToggleAllTasks, showDescription } = props;

    return (
        <div>
            <label htmlFor="selected" className="checkbox-text">Check all tasks</label>
            <input type="checkbox" id="selected" className="all-selected-checkbox" disabled={!list.length} checked={isAllTasksSelected} onChange={onToggleAllTasks} />
            {list.map(({id, title, description, isDone, isSelected}, i) => {
                return (
                    <div key={id} className="todo-list">
                        <input type="checkbox" className="is-selected-checkbox" checked={isSelected} onChange={() => onToggleTask(id)} />
                        <div className="tittle-header" onClick={showDescription}> {i + 1}. {title}</div>
                        <p style={{display: display}} className="description-text">{description}</p>
                        <div className="remove-item" onClick={() => onRemoveTask(id)}/> 
                        <div>
                            <input type="checkbox" id="done-checkbox" checked={isDone} onChange={() => onToggleStatus(id)} />
                            <label htmlFor="done-checkbox" className="checkbox-text">Done</label>
                        </div>
                    </div>
                );
            })}
        </div>
    )
}

export default ToDoList;