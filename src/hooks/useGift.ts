import { useEffect, useState } from "react";
import { getDoc, doc, query, collection, where, } from "firebase/firestore";
import { db } from "../utils/firebase";

function useGift(location) {
  const [isGiftLoaded, setGiftLoaded] = useState(true);
  const [giftData, setGiftData] = useState<{
    createdAt?:string;
    handleName?:string;
    introducer?:string;
    message?:string;
    thankId?:string;
    updatedAt?:string;
    type?:string;
  }>({});

  const getDocuments = async () => {
    try {
      const docRef = doc(db, "gifts", location.pathname.substring(location.pathname.lastIndexOf("/") + 1));
      const docSnap = await getDoc(docRef);
      setGiftData(docSnap.data());
      setGiftLoaded(false);
    } catch (error) {
        setGiftLoaded(false);
    }
  };

  useEffect(() => {
    if(location){
        getDocuments();
    }
  }, [location]);

  return {isGiftLoaded, giftData};
}

export default useGift;
