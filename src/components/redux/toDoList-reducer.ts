import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ToDoListStateType, TaskTypeItems } from './toDoList-types';
// import { DispatchType } from 'react-redux';



const getInitialState = (): ToDoListStateType => ({
    list: []
})

export const toDoListSlice = createSlice({
    name: 'toDolist',
    initialState: getInitialState(),
    reducers: {
        addTaskItem: (state, action: PayloadAction<TaskTypeItems & { type: ToDoListStateType }>) => {
            const { title, discription } = action.payload;
            const { list: list  } = state;

        }
    },
});

export const {
    addTaskItem
} = toDoListSlice.actions;

export default toDoListSlice.reducer;