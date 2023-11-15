export enum Languages {
    en = "en",
    pl = "pl",
}

export type language = {
    key: Languages,
    title: string,
    constants: Record<string, string>
};

export const DEFAULT_LANGUAGE = Languages.en;

export const languagesConstants =  {
    [Languages.en] : {
        'toDoListTitle' : 'Todo list',
        'addTaskButtonTitle' : 'Add task',
        'removeSelectedTasksButtonTitle' : 'Remove selected tasks',
        'removeCompletedTasksButtonTitle' : 'Remove completed tasks',
        'checkAllTasksCheckboxTitle' : 'Check all tasks',
        'sliderCheckboxTitle' : 'done',
        'modalFormInputTitle' : 'Title',
        'modalFormInputDescription' : 'Description',
        'modalFormAddButtonTitle' : 'Add',
        'modalRemoveSelectedTasksTitle' : 'Are you sure you want to delete next tasks?',
        'modalRemoveTasksButtonTitle' : 'Agree',
        'modalRemoveCompletedTasksTitle': 'Are you sure you want to delete all completed tasks?',
    },
    [Languages.pl] : {
        'toDoListTitle' : 'Zadania',
        'addTaskButtonTitle' : 'Dodaj zadanie',
    }
};

export const languages: language[] = [
    {key: Languages.en, title: 'English', constants: languagesConstants[Languages.en]},
    {key: Languages.pl, title: 'Polish', constants: languagesConstants[Languages.pl]},
];