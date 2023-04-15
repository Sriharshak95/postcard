import { useContext, useEffect, useState } from "react";
import { UserAuthContext } from "../store";
import { getDoc, doc } from "firebase/firestore";
import { db } from "../utils/firebase";
import { useLocation } from "react-router-dom";
import SignInTwitter from "../components/button/signInTwitter";
import { signInWithPopup } from "firebase/auth";
import { auth, Provider } from "../utils/firebase";
import CustomSpinner from "../components/spinner";

function Thanks() {
  const { userDetails, setUserDetails } = useContext(UserAuthContext);
  const [inviteDetails, setInviteDetails] = useState({
    desc: "",
    fromHandle: "",
    toHandle: "",
    purpose: "",
  });
  const [isLoading, setLoading] = useState(false);
  const location = useLocation();

  const getDocuments = async () => {
    try {
      setLoading(true);
      const docRef = doc(
        db,
        "incentive-cards",
        location.pathname.substring(location.pathname.lastIndexOf("/") + 1)
      );
      const docSnap = await getDoc(docRef);
      const { desc, fromHandle, toHandle, purpose } = docSnap.data();
      setInviteDetails({
        ...inviteDetails,
        desc,
        fromHandle,
        toHandle,
        purpose,
      });
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

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

  useEffect(() => {
    getDocuments();
  }, []);

  console.log(userDetails);

  if (Object.keys(userDetails).length > 0) {
    if(!isLoading) {
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
              className="text-[14px] underline">{"@" + inviteDetails.toHandle}</a>
            <div className="text-[14px]">
              {inviteDetails.desc}
            </div>
          </div>
        </>
      );
    } else {
      return <CustomSpinner />
    }
  } else {
    return <SignInTwitter onClick={handleClick} />;
  }
}

export default Thanks;
