import { useState } from "react";

const Task = (props) => {
    const { data: {id, title, description, isDone, isSelected},index, onRemoveTask, onToggleStatus, onToggleTask } = props;
    const [showDescription, setShowDescription] = useState(false);
    const display = showDescription ? 'block' : 'none';
    const onToggleShowDescription = () => setShowDescription(!showDescription);
    return (
        <div className="todo-list">
            <input type="checkbox" className="is-selected-checkbox" checked={isSelected} onChange={() => onToggleTask(id)} />
            <div className="tittle-header" onClick={onToggleShowDescription}> { index + 1}. {title}</div>
            <p style={{display: display}}  className="description-text">{description}</p>
            <div className="remove-item" onClick={() => onRemoveTask(id)}/> 
            <div>
                <input type="checkbox" id="done-checkbox" checked={isDone} onChange={() => onToggleStatus(id)} />
                <label htmlFor="done-checkbox" className="checkbox-text">Done</label>
            </div>
        </div>
    );
}

export default Task;