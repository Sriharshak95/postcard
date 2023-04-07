import "./App.css";
import Main from "./pages/main";
import { UserAuthContext } from "./store";
import useUser from "./hooks/useUser";

function App() {
  const { userDetails, setUserDetails } = useUser();
  return (
    <div className="App">
      <UserAuthContext.Provider value={{ userDetails, setUserDetails }}>
        <header className="App-header">
          <Main />
        </header>
      </UserAuthContext.Provider>
    </div>
  );
}

export default App;
