import { useContext} from "react";
import { UserAuthContext } from "../store";
import { useLocation, Navigate } from "react-router-dom";
import SignInTwitter from "../components/button/signInTwitter";
import { signInWithPopup } from "firebase/auth";
import { auth, Provider } from "../utils/firebase";
import CustomSpinner from "../components/spinner";
import useInviteDetails from "../hooks/useInviteDetails";

function Thanks() {
  const { userDetails, setUserDetails } = useContext(UserAuthContext);
  const location = useLocation();
  const {inviteDetails, isLoading} = useInviteDetails(location);

  const handleClick = () => {
    signInWithPopup(auth, Provider).then((data) => {
      const user = {
        name: data.user.displayName,
        email: data.user.email,
        picture: data.user.photoURL,
        handleName: data.user["reloadUserInfo"]["screenName"],
      };
      setUserDetails(user);
      localStorage.setItem("userDetails", JSON.stringify(user));
    });
  };

  if (Object.keys(userDetails).length > 0) {
    if (!isLoading) {
      if (
        userDetails.handleName === inviteDetails.fromHandle ||
        userDetails.handleName === inviteDetails.toHandle
      ) {
        return (
          <>
            <div className="flex items-center justify-between">
              <a
                href={"https://twitter.com/" + inviteDetails.fromHandle}
                rel="noreferrer"
                target="_blank"
                className="text-[14px] underline"
              >
                {"@" + inviteDetails.fromHandle}
              </a>
              -<div className="text-[14px]">{inviteDetails.purpose}</div> -
              <a
                href={"https://twitter.com/" + inviteDetails.toHandle}
                rel="noreferrer"
                target="_blank"
                className="text-[14px] underline"
              >
                {"@" + inviteDetails.toHandle}
              </a>
              <div className="text-[14px]">{inviteDetails.desc}</div>
            </div>
          </>
        );
      } else {
        localStorage.clear();
        return <Navigate to="/404" />;
      }
    } else {
      return <CustomSpinner />;
    }
  } else {
    return <SignInTwitter onClick={handleClick} />;
  }
}

export default Thanks;
