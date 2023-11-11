export type TaskType = {
    id: string,
    isDone: boolean,
    title: string,
    discription: string | undefined | null
};

export type ToDoListStateType = {
    list: TaskType[]
};

export type TaskTypeItems = Partial<Omit<TaskType, 'id, isDone'>>;