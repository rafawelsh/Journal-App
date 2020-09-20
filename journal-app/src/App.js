import React from 'react';
import './App.css';
import JournalsList from './components/journalsList/journalsList';
import JournalForm from './components/form/form';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Enter Your Journal Entries Below</h1>
        <JournalForm />
        <JournalsList />
      </header>
    </div>
  );
}

export default App;
