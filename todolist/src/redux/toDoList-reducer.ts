import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ToDoListStateType, TaskTypeItems } from './toDoList-types';
import { type } from 'os';

const getInitialState = (): ToDoListStateType => ({
    list: []
})

export const toDoListSlice = createSlice({
    name: 'toDolist',
    initialState: getInitialState(),
    reducers: {
        addTaskItem: (state, action: PayloadAction<TaskTypeItems & { type: ToDoListStateType }>) => {
            const { title, discription } = action.payload;
            const { list } = state;
            console.log(list)
        }
    },
});

export const {
   
} = toDoListSlice.actions;

export default toDoListSlice.reducer;

