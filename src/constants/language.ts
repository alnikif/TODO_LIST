export enum Languages {
  en = 'en',
  pl = 'pl'
}

export type Language = {
  key: Languages;
  title: string;
  constants: Record<string, string>;
};

export const DEFAULT_LANGUAGE = Languages.pl;

export const languagesConstants = {
  [Languages.en]: {
    toDoListTitle: 'Todo list',
    addTaskButtonTitle: 'Add task',
    removeSelectedTasksButtonTitle: 'Remove selected tasks',
    removeCompletedTasksButtonTitle: 'Remove completed tasks',
    checkAllTasksCheckboxTitle: 'Check all tasks',
    sliderCheckboxTitle: 'done',
    modalFormInputTitle: 'Title',
    modalFormInputDescription: 'Description',
    modalFormAddButtonTitle: 'Add',
    modalRemoveSelectedTasksTitle: 'Are you sure you want to delete next tasks?',
    modalRemoveTasksButtonTitle: 'Agree',
    modalRemoveCompletedTasksTitle: 'Are you sure you want to delete all completed tasks?'
  },
  [Languages.pl]: {
    toDoListTitle: 'Lista zadań',
    addTaskButtonTitle: 'Dodaj zadanie',
    removeSelectedTasksButtonTitle: 'Usuń wybrane zadania',
    removeCompletedTasksButtonTitle: 'Usuń ukończone zadania',
    checkAllTasksCheckboxTitle: 'Zaznacz wszystkie zadania',
    sliderCheckboxTitle: 'już',
    modalFormInputTitle: 'Tytuł',
    modalFormInputDescription: 'Opis',
    modalFormAddButtonTitle: 'Dodaj',
    modalRemoveSelectedTasksTitle: 'Czy na pewno chcesz usunąć następujące zadania?',
    modalRemoveTasksButtonTitle: 'Zgadzam się',
    modalRemoveCompletedTasksTitle: 'Czy na pewno chcesz usunąć wszystkie ukończone zadania?'
  }
};

export const languages: Language[] = [
  { key: Languages.en, title: 'English', constants: languagesConstants[Languages.en] },
  { key: Languages.pl, title: 'Polish', constants: languagesConstants[Languages.pl] }
];
