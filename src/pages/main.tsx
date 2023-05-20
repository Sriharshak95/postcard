import PostForm from "../components/postcard/postForm";
import SignInTwitter from "../components/button/signInTwitter";
import { useContext, useEffect } from "react";
import { UserAuthContext } from "../store";
import { useSearchParams } from "react-router-dom";
import { auth, Provider } from "../utils/firebase";
import { signInWithPopup } from "firebase/auth";
import withPostCardWrapper from "../components/hoc";
import axios from "axios";
import { hostName } from "../utils/changeUrl";


function Main() {
  const {userDetails, setUserDetails} = useContext(UserAuthContext);
  const [searchParams] = useSearchParams();
  const vpa = '8971138094@ybl';

  const handleClick = () => {
    signInWithPopup(auth, Provider).then((data) => {
      getUser(data.user['reloadUserInfo']['screenName']).then((userUpdate) => {
        if(userUpdate.status) {
          const user = {
            name: userUpdate.user.name,
            email: data.user.email,
            picture: userUpdate.user.profile_image_url,
            handleName: data.user['reloadUserInfo']['screenName'],
            token: data.user['accessToken'],
            uid: data.user.uid
          };
          
          setUserDetails(user);
          localStorage.setItem("userDetails", JSON.stringify(user));
        }
      });

    });
  };

  const getUser = async(handleName) => {
    try {
      const userProfile = (
        await axios.get(
          `${hostName}/me?username=${handleName}`,
          {
            headers: {
              Authorization: "Access-Control-Allow-Origin",
            },
          }
        )
      ).data;
      return userProfile;
    } catch(error) {
      return error;
    }
  }


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

export default withPostCardWrapper(Main);
