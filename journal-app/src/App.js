import React from 'react';
import './App.css';
import JournalsList from './components/journalsList/journalsList';
import JournalForm from './components/form/form';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Digital Journal <span>| Create A Note</span></h1>
        <JournalForm />
        <JournalsList />
      </header>
    </div>
  );
}

export default App;
