import React, { useContext, useEffect, useState } from "react";
import { collection, query, getDocs, where } from "firebase/firestore";
import { db } from "../../utils/firebase";
import { UserAuthContext } from "../../store";
import IntroList from "./introList";
import useGiftList from "../../hooks/useGiftList";
import GiftList from "./giftList";

const Sidebar: React.FC = () => {
  const [isLoading, setLoading] = useState(false);
  const { userDetails } = useContext(UserAuthContext);
  const [listDetails, setListDetails] = useState([]);
  const [navs, setNavs] = useState("intros");
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

  console.log(couponList);

  useEffect(() => {
    getUsers();
  }, [userDetails]);

  return (
    <div className="rounded-lg p-2 bg-slate-100 border-yellow-800 h-96 w-72">
      <div className="p-2 flex justify-between">
        <button className={navs === "intros" ? "text-blue-700 text-[14px] hover:text-blue-700": "text-[14px] hover:text-blue-700" } onClick={() => setNavs("intros")}>
          <i className="fa-solid fa-timeline"></i> intros
        </button>
        <button className={navs === "gifts" ? "text-green-700 text-[14px]" : "hover:text-green-700 text-[14px]"} onClick={() => setNavs("gifts")}>
          <i className="fa-solid fa-gift" /> gifts
        </button>
      </div>

      <nav className="py-4">
        {navs === "intros" ?<IntroList
          listDetails={listDetails}
          isLoading={isLoading}
        /> : <GiftList couponList={couponList} isGiftListLoaded={isGiftListLoaded} />}
      </nav>
    </div>
  );
};

export default Sidebar;
