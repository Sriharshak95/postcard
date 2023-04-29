import { useEffect, useState } from "react";
import { getDoc, doc, query, collection, where, getDocs } from "firebase/firestore";
import { db } from "../utils/firebase";

function useIsCouponSent(location, handleName) {
  const [isCouponSent, setCouponSent] = useState(false);
  const thankId = location.pathname.substring(location.pathname.lastIndexOf("/") + 1);
    console.log(thankId, handleName);
  const getDocuments = async () => {
    try {
      const q = query(
        collection(db, "gifts"),
        where("thankId", "==", "b2tzKxHKwebVzD8nGZIN"),
        where("handleName", "==", handleName)
      );
      const docSnap = await getDocs(q);
      setCouponSent(docSnap.docs.length > 0);

    } catch (error) {
       setCouponSent(false);
    }
  };

  useEffect(() => {
    if(handleName){
        getDocuments();
    }
  }, [handleName]);

  return {isCouponSent};
}

export default useIsCouponSent;
