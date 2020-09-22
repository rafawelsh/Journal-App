import React from 'react';
import './App.css';
import JournalsList from './components/journalsList/journalsList';
import JournalForm from './components/form/form';
import { useAuth0 } from '@auth0/auth0-react';
import LoginButton from './components/login-button';
import LogoutButton from './components/logout-button';

function App() {

  const AuthNav = () => {
    const {isAuthenticated} = useAuth0();

    return (
      <div>
        {isAuthenticated ? <LogoutButton /> : <LoginButton />}
      </div>
    )
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>Digital Journal <span>| Create A Note</span></h1>
        <AuthNav />
        <JournalForm />
        <JournalsList />
      </header>
    </div>
  );
}

export default App;
