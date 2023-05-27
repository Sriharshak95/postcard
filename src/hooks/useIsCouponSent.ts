import { useEffect, useState } from "react";
import { query, collection, where, getDocs } from "firebase/firestore";
import { db } from "../utils/firebase";

function useIsCouponSent(location, handleName, isThanksSet = false) {
  const [isCouponSent, setCouponSent] = useState(false);
  const [couponList, setCouponList] = useState([]);
  const thankId = location.pathname.substring(location.pathname.lastIndexOf("/") + 1);

  const getDocuments = async () => {
    try {
      if(handleName) {
        const q = query(
          collection(db, "gifts"),
          where("thankId", "==", thankId),
          where("handleName", "==", handleName)
        );
  
        const newCouponList = [];
        const docSnap = await getDocs(q);
        docSnap.forEach((coupon) => {
          newCouponList.push(coupon.data())
        })
        setCouponSent(docSnap.docs.length > 0);
        setCouponList(newCouponList);
      } else {
        const q = query(
          collection(db, "gifts"),
          where("thankId", "==", thankId),
        );
  
        const newCouponList = [];
        const docSnap = await getDocs(q);
        docSnap.forEach((coupon) => {
          newCouponList.push({...coupon.data(), id: coupon.id})
        })
        setCouponSent(docSnap.docs.length > 0);
        setCouponList(newCouponList);
      }
    } catch (error) {
       setCouponSent(false);
    }
  };

  useEffect(() => {
        getDocuments();
  }, [handleName, location, isThanksSet]);

  return {couponList, isCouponSent};
}

export default useIsCouponSent;
