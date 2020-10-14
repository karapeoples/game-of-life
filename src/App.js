import React from 'react';
import './App.css';
import Button from './components/Button'
import Grid from './components/Grid'

const App = () => {
  return (
    <div className="App">
      <header className="App-header">
        <h3>John Conway's
        <br/>
        Game of Life</h3>
        <Button/>
      </header>
      <Grid/>
    </div>
  );
}

export default App;
