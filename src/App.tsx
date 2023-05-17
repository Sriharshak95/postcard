import "./App.css";
import Main from "./pages/main";
import { CardThemeContext, UserAuthContext } from "./store";
import useUser from "./hooks/useUser";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import NotFound from "./pages/notFound";
import Done from "./pages/done";
import Thanks from "./pages/thanks";
import Landing from "./pages/landing";
import SidebarOne from "./components/sidebar/sidebarOne";
import Intros from "./pages/intros";
import Intro from "./pages/intro";
import GreetingCard from "./pages/gift";
import { SideBarContext } from "./store";
import In from "./pages/in";
import ThankPage from "./pages/thank";
import { useState } from "react";
import { themes } from "./utils/themes";

function App() {
  const { userDetails, setUserDetails } = useUser();
  const [navs, setNavs] = useState("intros");
  const [themeColor, setThemeColor] = useState(themes[0]);
  const location = window.location.pathname;
  return (
    <div className="App">
      <BrowserRouter>
        <CardThemeContext.Provider value={{themeColor, setThemeColor}}>
          <UserAuthContext.Provider value={{ userDetails, setUserDetails }}>
            <SideBarContext.Provider value={{ navs, setNavs }}>
              <div
                className={
                  Object.keys(userDetails).length > 0 &&
                  (location !== "/" || location.includes("thanks"))
                    ? "grid lg:grid-cols-5 md:grid-cols-5 sm:grid-cols-1"
                    : "grid grid-cols-4"
                }
              >
                {Object.keys(userDetails).length > 0 &&
                (location !== "/" || location.includes("thanks")) ? (
                  <div className="bg-white border-r-2 border-slate-200">
                    <SidebarOne />
                  </div>
                ) : null}
                <div
                  className={
                    Object.keys(userDetails).length > 0 &&
                    (location !== "/" || location.includes("thanks"))
                      ? "bg-slate-50 lg:col-span-3 md:col-span-3"
                      : "bg-slate-50 col-span-4"
                  }
                >
                  <header className="App-header">
                    <Routes>
                      <Route path="/" element={<Landing />} />
                      <Route path="/main" element={<Main />} />
                      <Route path="/gifts/:id" element={<GreetingCard />} />
                      <Route path="/done" element={<Done />} />
                      <Route path="/thanks/:id" element={<ThankPage />} />
                      <Route path="/intros/:id" element={<Intros />} />
                      <Route path="/intro/:id" element={<Intro />} />
                      <Route path="*" element={<NotFound />} />
                    </Routes>
                  </header>
                </div>
              </div>
            </SideBarContext.Provider>
          </UserAuthContext.Provider>
        </CardThemeContext.Provider>
      </BrowserRouter>
    </div>
  );
}

export default App;
