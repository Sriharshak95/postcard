import { useEffect, useState } from "react";
import "./App.css";
import Main from "./pages/main";
import { auth, Provider } from "./utils/firebase";
import { signInWithPopup } from "firebase/auth";
import SignInTwitter from "./components/button/signInTwitter";

function App() {
  const [userDetails, setUserDetails] = useState({});
  const handleClick = () => {
    signInWithPopup(auth, Provider).then((data) => {
      const user = {
        name: data.user.displayName,
        email: data.user.email,
        picture: data.user.photoURL
      }
      setUserDetails(user);
      localStorage.setItem("userDetails", JSON.stringify(user));
    });
  };

  useEffect(() => {
    const userDetails = localStorage.getItem("userDetails");
    if (userDetails) {
      setUserDetails(JSON.parse(userDetails));
    }
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        {Object.keys(userDetails).length > 0 ? <Main /> :
        <SignInTwitter onClick={handleClick} />}
      </header>
    </div>
  );
}

export default App;
