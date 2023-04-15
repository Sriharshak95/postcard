import { useEffect, useState } from "react";
import { getDoc, doc } from "firebase/firestore";
import { db } from "../utils/firebase";

function useInviteDetails(location) {
  const [inviteDetails, setInviteDetails] = useState({
    desc: "",
    fromHandle: "",
    toHandle: "",
    purpose: "",
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
        setInviteDetails({
          desc: docSnap.data().desc,
          fromHandle: docSnap.data().fromHandle,
          toHandle: docSnap.data().toHandle,
          purpose: docSnap.data().purpose,
        });
      }

      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getDocuments();
  }, []);

  return { inviteDetails, isLoading };
}

export default useInviteDetails;
