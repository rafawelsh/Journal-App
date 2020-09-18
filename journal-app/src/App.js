import React from 'react';
import './App.css';
import Journals from './components/journalEntries/journalEntries';
import JournalForm from './components/form/form';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Enter Your Journal Entries Below</h1>
        <JournalForm />
        <Journals />
      </header>
    </div>
  );
}

export default App;
