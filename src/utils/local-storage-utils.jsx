export const LS_KEYS = {
    toDoList: 'todo-list',
};

export const setToDoListToLS = (toToList) => {
    localStorage.setItem(LS_KEYS.toDoList, JSON.stringify(toToList));
}

export const getToDoListFromLS = () => {
    const toDoListJson = localStorage.getItem(LS_KEYS.toDoList);
    return !toDoListJson ? null : JSON.parse(toDoListJson);
}

export const clearToDoListData = () => localStorage.removeItem(LS_KEYS.toDoList);
