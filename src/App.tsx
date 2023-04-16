import "./App.css";
import Main from "./pages/main";
import { UserAuthContext } from "./store";
import useUser from "./hooks/useUser";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import PostCard from "./components/postcard";
import NotFound from "./pages/notFound";
import Done from "./pages/done";
import Thanks from "./pages/thanks";
import Landing from "./pages/landing";

function App() {
  const { userDetails, setUserDetails } = useUser();
  return (
    <div className="App">
      <BrowserRouter>
        <UserAuthContext.Provider value={{ userDetails, setUserDetails }}>
          <header className="App-header">
            <PostCard>
              <Routes>
                <Route path="/" element={<Landing />} />
                <Route path="/main" element={<Main />} />
                <Route path="/done" element={<Done />} />
                <Route path="/thanks/:id" element={<Thanks />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </PostCard>
          </header>
        </UserAuthContext.Provider>
      </BrowserRouter>
    </div>
  );
}

export default App;
