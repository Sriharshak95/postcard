import { useEffect, useState } from "react";
import { getDoc, doc, query, collection, where, getDocs } from "firebase/firestore";
import { db } from "../utils/firebase";

function useGiftList(handleName) {
  const [isGiftListLoaded, setGiftListLoaded] = useState(true);
  const [couponList, setCouponList] = useState([]);

  const getDocuments = async () => {
    try {
      const q = query(
        collection(db, "gifts"),
        where("handleName", "==", handleName),
      );
      const newCouponList = [];
      const docSnap = await getDocs(q);
      docSnap.forEach((gifts) => {
        newCouponList.push(gifts.data());
      })
      setGiftListLoaded(false);
      setCouponList([...couponList, ...newCouponList]);
    } catch (error) {
        setGiftListLoaded(false);
    }
  };

  useEffect(() => {
    if(handleName){
        getDocuments();
    }
  }, [handleName]);

  return {isGiftListLoaded, couponList};
}

export default useGiftList;
