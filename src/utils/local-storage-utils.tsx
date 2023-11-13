import {TaskType} from "../Pages/ToDoList/ToDoListReducer";

export const LS_KEYS = {
    toDoList: 'todo-list',
};

export const setToDoListToLS= (toDoList: TaskType[]) => {
    localStorage.setItem(LS_KEYS.toDoList, JSON.stringify(toDoList));
};

export const getToDoListFromLS = () => {
    const toDoListJson = localStorage.getItem(LS_KEYS.toDoList);
    return !toDoListJson ? null : JSON.parse(toDoListJson);
};

export const clearToDoListData = () => localStorage.removeItem(LS_KEYS.toDoList);
