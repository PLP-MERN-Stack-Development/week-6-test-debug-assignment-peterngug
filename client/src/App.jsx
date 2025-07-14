import React from 'react';
import BugForm from './components/BugForm';
import BugList from './components/BugList';
import ErrorBoundary from './components/ErrorBoundary';

const App = () => {
  const handleBugAdded = (newBug) => {
    // Intentionally incorrect state update for debugging demo
    // This will cause a warning in console
    // setBugs([...bugs, newBug]); // Incorrect: needs useState
    console.log('New bug added:', newBug);
  };

  return (
    <ErrorBoundary>
      <div>
        <h1>Bug Tracker</h1>
        <BugForm onBugAdded={handleBugAdded} />
        <BugList />
      </div>
    </ErrorBoundary>
  );
};

export default App;