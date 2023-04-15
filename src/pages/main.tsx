import PostForm from "../components/postcard/postForm";
import { auth, Provider } from "../utils/firebase";
import { signInWithPopup } from "firebase/auth";
import SignInTwitter from "../components/button/signInTwitter";
import { useContext, useEffect } from "react";
import { UserAuthContext } from "../store";
import axios from 'axios';

function Main() {
  const {userDetails, setUserDetails} = useContext(UserAuthContext);
  const handleClick = () => {
    axios.get('http://localhost:443/login', {headers:{
      Authorization : 'Access-Control-Allow-Origin'
    }}).then((res) => {
      window.location.href = res.data.redirectUri;
    });
    // signInWithPopup(auth, Provider).then((data) => {
    //   const user = {
    //     name: data.user.displayName,
    //     email: data.user.email,
    //     picture: data.user.photoURL,
    //   };
    //   setUserDetails(user);
    //   localStorage.setItem("userDetails", JSON.stringify(user));
    // });
  };
  
  return (
    <>
        {Object.keys(userDetails).length > 0 ? <PostForm /> : <SignInTwitter onClick={handleClick} />}
    </>
  );
}

export default Main;
