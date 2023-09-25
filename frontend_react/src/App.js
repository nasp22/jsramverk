import React from 'react';
import './App.css';
import MainView from './components/MainView'

function App() {
  return (
    <div className="App">
      <header className="App-header">
        Trafikledare Applikationen
      </header>
      <div className="container">
          <MainView />
      </div>
    </div>
  );
}

export default App;
