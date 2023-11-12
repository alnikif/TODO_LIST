import React, { useState } from "react";
import { TaskType } from "../../App";
import {TaskForm} from "../TaskForm/TaskForm";

type CreateTaskFormPropsType = {
    onCreateTask: (newTaskData: Pick<TaskType, 'title' | 'description'>) => void
};

type InitialFormDataType ={
    title: string,
    description: string,
};

const initialFormData: InitialFormDataType = {
    title: '',
    description: '',
};

export const CreateTaskForm : React.FC<CreateTaskFormPropsType> = (props)  => {
    const { onCreateTask } = props;

    const [taskData, setTaskData] = useState(initialFormData);
    const {title, description} = taskData;

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
        onCreateTask(taskData);
        onResetForm();
    };

    return (
        <TaskForm
            formName='createTask'
            title={title}
            description={description}
            onResetForm={onResetForm}
            onChangeTitle={onChangeTitle}
            onChangeDescription={onChangeDescription}
            onSubmit={onSubmit}
        />
    );
};
