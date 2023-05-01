import "./App.css";
import Main from "./pages/main";
import { UserAuthContext } from "./store";
import useUser from "./hooks/useUser";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import NotFound from "./pages/notFound";
import Done from "./pages/done";
import Thanks from "./pages/thanks";
import Landing from "./pages/landing";
import Sidebar from "./components/sidebar";
import Intros from "./pages/intros";
import Intro from "./pages/intro";

function App() {
  const { userDetails, setUserDetails } = useUser();
  const location = window.location.pathname;
  
  return (
    <div className="App">
      <BrowserRouter>
        <UserAuthContext.Provider value={{ userDetails, setUserDetails }}>
          <div className="container">
            {Object.keys(userDetails).length > 0 && (location!=="/" || location.includes("thanks")) ? <div className="sidebar">
              <Sidebar />
            </div> : null}
            <div className="main-content">
              <header className="App-header">
                <Routes>
                  <Route path="/" element={<Landing />} />
                  <Route path="/main" element={<Main />} />
                  <Route path="/done" element={<Done />} />
                  <Route path="/thanks/:id" element={<Thanks />} />
                  <Route path="/intros/:id" element={<Intros />} />
                  <Route path="/intro/:id" element={<Intro />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </header>
            </div>
          </div>
        </UserAuthContext.Provider>
      </BrowserRouter>
    </div>
  );
}

export default App;
