import { configureStore, AnyAction, ThunkAction, ThunkDispatch } from '@reduxjs/toolkit';
import toDoListReducer from './components/redux/toDoList-reducer';

const rootReducer = {
    toDolist: toDoListReducer,
};

export const store = configureStore({
    reducer: rootReducer,
});


export type RootState = ReturnType<typeof store.getState>
export type DispatchType = ThunkDispatch<RootState, unknown, AnyAction>;


