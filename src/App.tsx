import React from 'react';
import './App.css';
import AppHeader from './Header/AppHeader';
import Todos from './Todos/Todos';

function App() {
  return (
    <div className="App m-4">
      <AppHeader></AppHeader>
      <Todos></Todos>
    </div>
  );
}

export default App;
