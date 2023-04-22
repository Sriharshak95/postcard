import { useEffect, useState } from "react";
import { getDoc, doc } from "firebase/firestore";
import { db } from "../utils/firebase";
import axios from "axios";
import { hostName } from "../utils/changeUrl";

function useInviteDetails(location) {
  const [inviteDetails, setInviteDetails] = useState({
    desc: "",
    fromHandle: "",
    toHandle: "",
    purpose: "",
    fromHandleImage: "",
    toHandleImage:"",
    introducerImage: "",
    introducer: ""
  });
  const [isLoading, setLoading] = useState(false);

  const getDocuments = async () => {
    try {
      setLoading(true);
      const docRef = doc(
        db,
        "incentive-cards",
        location.pathname.substring(location.pathname.lastIndexOf("/") + 1)
      );
      const docSnap = await getDoc(docRef);
      if (docSnap.data()) {
        getUserNameProfilePic(docSnap.data().toHandle, docSnap.data().fromHandle).then((data) => {
          const object = {...inviteDetails};
          object.desc = docSnap.data().desc;
          object.fromHandle = docSnap.data().fromHandle;
          object.toHandle = docSnap.data().toHandle;
          object.purpose = docSnap.data().purpose;
          object.introducerImage = docSnap.data().introducerImage;
          object.introducer = docSnap.data().introducer;
          if(data.status) {
            object.toHandleImage = data.profiles[0].profile_image_url;
            object.fromHandleImage = data.profiles[1].profile_image_url;
            setInviteDetails(object);
            setLoading(false);
          }
        });
      }

    } catch (error) {
      console.log(error);
    }
  };

  const getUserNameProfilePic = async(toUsername, fromUsername) => {
    try {
      const userProfile = (await axios.get(`${hostName}/username?toUsername=${toUsername}&fromUsername=${fromUsername}`, {
        headers: {
          "Authorization": "Access-Control-Allow-Origin"
        }
      })).data;
      return userProfile;
    } catch(error) {
      return error;
    }
  }

  useEffect(() => {
    getDocuments();
  }, []);

  return { inviteDetails, isLoading };
}

export default useInviteDetails;
