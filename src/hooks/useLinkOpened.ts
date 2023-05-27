import { useEffect, useState } from "react";
import { getDocs, doc, query, collection, where, } from "firebase/firestore";
import { db } from "../utils/firebase";

function useLinkOpened(location) {
  const [isListLoaded, setListLoaded] = useState(true);
  const [viewData, setViewData] = useState<{
    createdAt?:string;
    handleName?:string;
    introducer?:string;
    thankId?:string;
    viewId?:string;
  }[]>([]);

  const getDocuments = async () => {
    try {
        const q = query(
          collection(db, "links-opened"),
          where("thankId", "==", location.pathname.substring(
            location.pathname.lastIndexOf("/") + 1
          ))
        );

      const newViewList = [];
      const docSnap = await getDocs(q);
      
      docSnap.forEach((coupon) => {
        newViewList.push({...coupon.data(), viewId: coupon.id});
      })
      setViewData(newViewList);
      setListLoaded(false);
    } catch (error) {
        setListLoaded(false);
    }
  };

  useEffect(() => {
    if(location){
        getDocuments();
    }
  }, [location]);

  return {isListLoaded, viewData};
}

export default useLinkOpened;
