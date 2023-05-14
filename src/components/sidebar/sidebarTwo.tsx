import React, { useContext, useEffect, useState } from "react";
import { collection, query, getDocs, where } from "firebase/firestore";
import { db } from "../../utils/firebase";
import { SideBarContext, UserAuthContext } from "../../store";
import IntroList from "./introList";
import useGiftList from "../../hooks/useGiftList";
import GiftList from "./giftList";

const Sidebar: React.FC = () => {
  const [isLoading, setLoading] = useState(false);
  const { userDetails } = useContext(UserAuthContext);
  const [listDetails, setListDetails] = useState([]);
  const {navs, setNavs} = useContext(SideBarContext);
  const {isGiftListLoaded, couponList} = useGiftList(userDetails.handleName);

  const getUsers = async () => {
    try {
      setLoading(true);
      if (Object.keys(userDetails).length > 0) {
        const q = query(
          collection(db, "incentive-cards"),
          where("introducerId", "==", userDetails.uid)
        );
        const querySnapshot = await getDocs(q);
        const intros = [...listDetails];
        querySnapshot.forEach((doc) => {
          intros.push({ ...doc.data(), introId: doc.id });
        });

        setListDetails(intros);
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
    }
  };

  useEffect(() => {
    getUsers();
  }, [userDetails]);

  return (
    <div>
      <nav>
        {navs === "intros" ?<IntroList
          listDetails={listDetails}
          isLoading={isLoading}
        /> : <GiftList couponList={couponList} isGiftListLoaded={isGiftListLoaded} />}
      </nav>
    </div>
  );
};

export default Sidebar;
