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
            <div className="flex items-center">
              <a
                href={"https://twitter.com/" + inviteDetails.fromHandle}
                rel="noreferrer"
                target="_blank"
                className="text-[14px] flex-shrink-0"
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
              <div className="text-[15px] flex-grow antialiased font-medium text-gray-600 bg-gradient-to-r from-gray-200 via-white to-gray-200 rounded-full p-2 text-center">
                {inviteDetails.purpose}
              </div>
              <a
                href={"https://twitter.com/" + inviteDetails.toHandle}
                rel="noreferrer"
                target="_blank"
                className="text-[14px] flex-shrink-0"
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
            </div>

            <div className="mt-3 text-center text-[15px] antialiased italic text-slate-500">
              "{inviteDetails.desc}"
            </div>
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
