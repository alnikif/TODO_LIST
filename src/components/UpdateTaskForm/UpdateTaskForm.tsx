import React, {useEffect, useState} from "react";
import { TaskType } from "../../App";
import {TaskForm} from "../TaskForm/TaskForm";

type UpdatedTaskFormProps = Pick<TaskType, 'title' | 'description'>

type UpdateTaskFormPropsType = {
    task: TaskType;
    onUpdateTask: (newTaskData: Pick<TaskType, 'title' | 'description' | 'id'>) => void
};

const initialFormData: UpdatedTaskFormProps = {
    title: '',
    description: '',
};



export const UpdateTaskForm : React.FC<UpdateTaskFormPropsType> = (props)  => {
    const { task, onUpdateTask } = props;

    const [taskData, setTaskData] = useState<UpdatedTaskFormProps>(initialFormData);
    const {title, description} = taskData;
    useEffect(() => {
        setTaskData(task)
    }, [task]);

    const onResetForm = () => setTaskData(initialFormData);

    const onChangeTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        e.stopPropagation();

        setTaskData((prevTaskData) => ({
            ...prevTaskData,
            title : e.target.value,
        }));
    };

    const onChangeDescription = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        e.stopPropagation();

        setTaskData((prevTaskData) => ({
            ...prevTaskData, description : e.target.value
        }));
    };

    const onSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        e.stopPropagation();
        onUpdateTask({...taskData, id: task.id});
        onResetForm();
    };

    return (
        <TaskForm
            formName='updateTask'
            title={title}
            description={description}
            onChangeTitle={onChangeTitle}
            onChangeDescription={onChangeDescription}
            onSubmit={onSubmit}
            onResetForm={onResetForm}
        />
    );
};
