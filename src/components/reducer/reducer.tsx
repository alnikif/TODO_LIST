import {nanoid} from "@reduxjs/toolkit";
import { StateType, ActionType } from "../../App";

export enum Actions {
    setList = 'SET_LIST',
    deleteTask = 'DELETE_TASK',
    removeCompleteTasks = 'REMOVE_COMPLETE_TASKS',
    removeSelectedTasks = 'REMOVE_SELECTED_TASKS',
    createTask = 'CREATE_TASK',
    toggleStatus = 'TOGGLE_STATUS',
    toggleAllTasks = 'TOGGLE_ALL_TASKS',
    toggleSelectedTaskId = 'TOGGLE_SELECTED_TASK_ID',
}

export const reducer = (state: StateType, action: ActionType): StateType => {
    switch (action.type) {
        case Actions.setList :
            return { ...state, list : action.payload};

        case Actions.deleteTask :
            return { ...state, list : state.list.filter((item) => item.id !== action.payload)};

        case Actions.removeCompleteTasks:
            return { ...state, list: state.list.filter(item => !item.isDone)};
        case Actions.removeSelectedTasks:
            return { ...state, list: state.list.filter(item => !state.selectedTasksIds.includes(item.id))};

        case Actions.createTask: {
            return { ...state, list: [...state.list, {
                    ...action.payload,
                    isDone: false,
                    id: nanoid(),
                    date: new Date()
                }] }
        }
        case Actions.toggleStatus :

            return{ ...state, list: state.list.map((item) => {
                    if(item.id !== action.payload) return item;
                    return { ...item, isDone: !item.isDone }})
            }
        case Actions.toggleAllTasks :
            if(!action.payload && state.list) {
                return {...state, selectedTasksIds: state.list.map((item) => item.id)};
            }
            return { ...state, selectedTasksIds: []};

        case Actions.toggleSelectedTaskId :
            const isSelected = state.selectedTasksIds.includes(action.payload);

            if(!isSelected) {
                const nextSelectedTasksIds = [ ...state.selectedTasksIds, action.payload ];
                return { ...state, selectedTasksIds: nextSelectedTasksIds };
            }

            const nextSelectedTasksIds = state.selectedTasksIds.filter((item) => item !== action.payload);

            return { ...state, selectedTasksIds: nextSelectedTasksIds };


        default:
            return state;
    }
};