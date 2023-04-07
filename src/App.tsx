import './App.css';
import Main from './pages/main';
import TwitterLogin from 'react-twitter-auth';
import { useState } from 'react';

function App() {
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  const onSuccess = (response) => {
    setLoggedIn(true);
    setUser(response);
  }

  const onFailure = (error) => {
    console.error(error);
  }

  return (
    <div className="App">
      <header className="App-header">
        {isLoggedIn ? (
        <Main />
        ) : (
          <TwitterLogin
            loginUrl="http://localhost:3001/api/v1/auth/twitter"
            onFailure={onFailure}
            onSuccess={onSuccess}
            requestTokenUrl="http://localhost:3001/api/v1/auth/twitter/reverse"
          />
        )}
      </header>
    </div>
  );
}

export default App;
