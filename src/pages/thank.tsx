import { useContext, useState } from "react";
import { CouponVisibleContext, UserAuthContext } from "../store";
import SignInTwitter from "../components/button/signInTwitter";
import { signInWithPopup } from "firebase/auth";
import { auth, Provider } from "../utils/firebase";
import Thanks from "./thanks";
import TabbedCard from "../components/TabCard";
import { Transition } from "@headlessui/react";

function ThankPage() {
  const { userDetails, setUserDetails } = useContext(UserAuthContext);
  const [isCouponsVisible, setCouponsVisible] = useState(false);

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
    return (
      <CouponVisibleContext.Provider
        value={{ isCouponsVisible, setCouponsVisible }}
      >
        <Transition
          show={!isCouponsVisible}
          enter="transition-all duration-300"
          enterFrom="opacity-0 scale-95"
          enterTo="opacity-100 scale-100"
          leave="transition-all duration-300"
          leaveFrom="opacity-100 scale-100"
          leaveTo="opacity-0 scale-95"
        >
          <Thanks />
        </Transition>
        {isCouponsVisible && <TabbedCard {...userDetails} />}
      </CouponVisibleContext.Provider>
    );
  } else {
    return <SignInTwitter onClick={handleClick} />;
  }
}

export default ThankPage;
