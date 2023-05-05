import { useContext } from "react";
import { UserAuthContext } from "../store";
import { useLocation, Navigate } from "react-router-dom";
import SignInTwitter from "../components/button/signInTwitter";
import { signInWithPopup } from "firebase/auth";
import { auth, Provider } from "../utils/firebase";
import CustomSpinner from "../components/spinner";
import useInviteDetails from "../hooks/useInviteDetails";
import withPostCardWrapper from "../components/hoc";

function Intro() {
  const { userDetails, setUserDetails } = useContext(UserAuthContext);
  const location = useLocation();
  const { inviteDetails, isLoading } = useInviteDetails(location);

  const handleClick = () => {
    signInWithPopup(auth, Provider).then((data) => {
      const user = {
        name: data.user.displayName,
        email: data.user.email,
        picture: data.user.photoURL,
        handleName: data.user["reloadUserInfo"]["screenName"],
        token: data.user["accessToken"],
        uid: data.user.uid,
      };
      setUserDetails(user);
      localStorage.setItem("userDetails", JSON.stringify(user));
    });
  };

  if (Object.keys(userDetails).length > 0) {
    if (!isLoading) {
      if (
        userDetails.handleName === inviteDetails.fromHandle ||
        userDetails.handleName === inviteDetails.toHandle ||
        userDetails.handleName === inviteDetails.introducer
      ) {
        return (
          <>
            <div className="flex items-center justify-between">
              <a
                href={"https://twitter.com/" + inviteDetails.toHandle}
                rel="noreferrer"
                target="_blank"
                className="text-[14px] underline"
              >
                {inviteDetails.toHandleImage.length > 0 ? (
                  <img
                    className="rounded-full"
                    src={inviteDetails.toHandleImage}
                    alt="from"
                  />
                ) : (
                  <span>@{inviteDetails.toHandle}</span>
                )}
              </a>
              -<div className="text-[1rem]">{inviteDetails.purpose}</div> -
              <a
                href={"https://twitter.com/" + inviteDetails.fromHandle}
                rel="noreferrer"
                target="_blank"
                className="text-[14px] underline"
              >
                {inviteDetails.fromHandleImage.length > 0 ? (
                  <img
                    className="rounded-full"
                    src={inviteDetails.fromHandleImage}
                    alt="to"
                  />
                ) : (
                  <span>@{inviteDetails.fromHandle}</span>
                )}
              </a>
            </div>

            <div className="text-[16px] mt-5 p-2 bg-[#ffffffa1] rounded">{inviteDetails.desc}</div>
          </>
        );
      } else {
        return <Navigate to="/404" />;
      }
    } else {
      return <CustomSpinner />;
    }
  } else {
    return <SignInTwitter onClick={handleClick} />;
  }
}

export default withPostCardWrapper(Intro);
