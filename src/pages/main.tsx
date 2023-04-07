import PostCard from "../components/postcard";
import PostForm from "../components/postcard/postForm";
import { auth, Provider } from "../utils/firebase";
import { signInWithPopup } from "firebase/auth";
import SignInTwitter from "../components/button/signInTwitter";
import { useContext } from "react";
import { UserAuthContext } from "../store";

function Main() {
  const {userDetails, setUserDetails} = useContext(UserAuthContext);
  const handleClick = () => {
    signInWithPopup(auth, Provider).then((data) => {
      const user = {
        name: data.user.displayName,
        email: data.user.email,
        picture: data.user.photoURL,
      };
      setUserDetails(user);
      localStorage.setItem("userDetails", JSON.stringify(user));
    });
  };
  return (
    <>
      <PostCard>
        {Object.keys(userDetails).length > 0 ? <PostForm /> : <SignInTwitter onClick={handleClick} />}
      </PostCard>
    </>
  );
}

export default Main;
