import React, { useContext } from 'react';
import Providers from './Providers';
import ToDoListPage from './Pages/ToDoList/ToDoListPage';
import './App.scss';
import { themes } from './constants/theme';
import { languages } from './constants/language';
import { ThemeContext } from './Providers/ThemeProvider';
import { LanguageContext } from './Providers/LanguageProvider';
import Dropdown from './components/Dropdown/Dropdown';

function App() {
  return (
    <Providers>
      <ToDoListPage />
    </Providers>
  );
}

export default App;
