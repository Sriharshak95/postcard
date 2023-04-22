import { useContext, useState } from "react";
import { UserAuthContext } from "../store";
import { useLocation, Navigate } from "react-router-dom";
import SignInTwitter from "../components/button/signInTwitter";
import { signInWithPopup } from "firebase/auth";
import { auth, Provider } from "../utils/firebase";
import CustomSpinner from "../components/spinner";
import useInviteDetails from "../hooks/useInviteDetails";
import SayThanksCards from "../components/cardThanks";
import SayThanksImage from '../assets/saythanks.png';
import Zomato from '../assets/zomato.png';
import AmazonGift from '../assets/amazongift.png';
import Play from '../assets/play.png';

function Thanks() {
  const { userDetails, setUserDetails } = useContext(UserAuthContext);
  const location = useLocation();
  const { inviteDetails, isLoading } = useInviteDetails(location);
  const [isCouponsVisible, setCouponsVisible] = useState(false);

  const handleClick = () => {
    signInWithPopup(auth, Provider).then((data) => {
      const user = {
        name: data.user.displayName,
        email: data.user.email,
        picture: data.user.photoURL,
        handleName: data.user["reloadUserInfo"]["screenName"]
      };
      setUserDetails(user);
      localStorage.setItem("userDetails", JSON.stringify(user));
    });
  };

  if (Object.keys(userDetails).length > 0) {
    if (!isLoading) {
      if (
        (userDetails.handleName === inviteDetails.fromHandle) ||
        (userDetails.handleName === inviteDetails.toHandle)
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
                {inviteDetails.toHandleImage.length > 0 ? <img className="rounded-full" src={inviteDetails.toHandleImage} alt="from" /> : <span>@{inviteDetails.toHandle}</span>}
              </a>
              -<div className="text-[1rem]">{inviteDetails.purpose}</div> -
              <a
                href={"https://twitter.com/" + inviteDetails.fromHandle}
                rel="noreferrer"
                target="_blank"
                className="text-[14px] underline"
              >
                {inviteDetails.fromHandleImage.length > 0 ? <img className="rounded-full" src={inviteDetails.fromHandleImage} alt="to" /> : <span>@{inviteDetails.fromHandle}</span>}
              </a>
            </div>

            <div className="text-[18px] p-5">{inviteDetails.desc}</div>
            {!isCouponsVisible ? <button
              className="bg-orange-400 mt-5 w-full text-[18px] text-white py-2"
              onClick={() => setCouponsVisible(true)}
            >
              Say Thanks to {inviteDetails.introducer}
            </button> :
            <div className="flex justify-between mt-4">
              <div className="w-1/3 mr-2 p-2"> <SayThanksCards src={SayThanksImage}/> </div>
              <div className="w-1/3 mr-2 p-2"> <SayThanksCards src={Zomato} /> </div>
              <div className="w-1/3 p-2"> <SayThanksCards src={AmazonGift} /> </div>
              <div className="w-1/3 p-2"> <SayThanksCards src={Play} /> </div>
            </div>}
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

export default Thanks;
