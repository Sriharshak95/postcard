import PostForm from "../components/postcard/postForm";
import SignInTwitter from "../components/button/signInTwitter";
import { useContext, useEffect } from "react";
import { UserAuthContext } from "../store";
import { useSearchParams } from "react-router-dom";
import { auth, Provider } from "../utils/firebase";
import { signInWithPopup } from "firebase/auth";

function Main() {
  const {userDetails, setUserDetails} = useContext(UserAuthContext);
  const [searchParams] = useSearchParams();
  
  const handleClick = () => {
    signInWithPopup(auth, Provider).then((data) => {
      const user = {
        name: data.user.displayName,
        email: data.user.email,
        picture: data.user.photoURL,
        handleName: data.user['reloadUserInfo']['screenName'],
        token: data.user['accessToken']
      };
      setUserDetails(user);
      localStorage.setItem("userDetails", JSON.stringify(user));
    });
  };

  useEffect(() => {
    if(JSON.parse(searchParams.get("data"))){
      setUserDetails(JSON.parse(searchParams.get("data")).data);
    }
  },[])
  
  return (
    <>
        {Object.keys(userDetails).length > 0 ? <PostForm /> : <SignInTwitter onClick={handleClick} />}
    </>
  );
}

export default Main;
