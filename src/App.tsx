import React from 'react';
import Providers from './Providers';
import ToDoListPage from "./Pages/ToDoList/ToDoListPage";
import './App.scss';

function App() {
  return (
      <Providers>
        <ToDoListPage />
      </Providers>
  );
}

export default App;
