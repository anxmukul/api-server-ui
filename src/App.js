import React from 'react';
import ShowTodos from './ShowTodos';
import CreateTodos from './CreateTodos';
import './App.css';

function App() {
  return (
    <div className="App">
      <ShowTodos />
      <CreateTodos />
    </div>
  );
}

export default App;
