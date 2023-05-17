import React, { useContext, useEffect, useState } from "react";
import { collection, query, getDocs, where } from "firebase/firestore";
import { db } from "../../utils/firebase";
import { SideBarContext, UserAuthContext } from "../../store";
import TawkMessengerReact from "@tawk.to/tawk-messenger-react";
import IntroList from "./introList";
import GiftList from "./giftList";
import {AiOutlineUsergroupAdd} from "react-icons/ai";
import useGiftList from "../../hooks/useGiftList";
import axios from "axios";
import { hostName } from "../../utils/changeUrl";
import { Link } from "react-router-dom";

const Sidebar: React.FC = () => {
  const [isLoading, setLoading] = useState(false);
  const { userDetails } = useContext(UserAuthContext);
  const [listDetails, setListDetails] = useState([]);
  const { navs, setNavs } = useContext(SideBarContext);
  const { isGiftListLoaded, couponList } = useGiftList(userDetails.handleName);

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
          getUserNameProfilePic(
            doc.data().toHandle,
            doc.data().fromHandle
          ).then((data) => {
            if (data.status) {
              setLoading(false);
              intros.push({
                ...doc.data(),
                introId: doc.id,
                toHandleImage: data.profiles[0].profile_image_url,
                fromHandleImage: data.profiles[1].profile_image_url,
              });
              setListDetails(intros);
            }
          });
        });

      }
    } catch (error) {
      setLoading(false);
    }
  };

  const getUserNameProfilePic = async (toUsername, fromUsername) => {
    try {
      const userProfile = (
        await axios.get(
          `${hostName}/username?toUsername=${toUsername}&fromUsername=${fromUsername}`,
          {
            headers: {
              Authorization: "Access-Control-Allow-Origin",
            },
          }
        )
      ).data;
      return userProfile;
    } catch (error) {
      return error;
    }
  };

  useEffect(() => {
    getUsers();
  }, [userDetails]);

  return (
    <div>
      <nav className="py-4">
        <div className="flex flex-row-reverse items-center">
          <button
            className={
              navs === "intros"
                ? "text-blue-700 text-[16px] rounded-full hover:text-blue-700 hover:bg-slate-200 py-2 px-2"
                : "text-[16px] hover:text-blue-700 rounded-full hover:bg-slate-200 py-2 px-2"
            }
            onClick={() => setNavs("intros")}
          >
            <i className="fa-solid text-[20px] fa-address-card" />
          </button>
          <button
            className={
              navs === "gifts"
                ? "text-blue-700 text-[16px] rounded-full hover:text-blue-700 hover:bg-slate-200 py-2 px-2"
                : "text-[16px] hover:text-blue-700 rounded-full hover:bg-slate-200 py-2 px-2"
            }
            onClick={() => setNavs("gifts")}
          >
            <i className="fa-solid fa-gift text-[20px]"></i>
          </button>
          <Link to="/main"
            className="text-[16px] hover:text-blue-700 rounded-full hover:bg-slate-200 py-2 px-2">
            <AiOutlineUsergroupAdd className="text-[20px]" />
          </Link>
        </div>
        {/* <TawkMessengerReact
                propertyId="64611d6f74285f0ec46b6584"
                widgetId="1h0dllvnl"/> */}
        <nav>
          {navs === "intros" ? (
            <IntroList listDetails={listDetails} isLoading={isLoading} />
          ) : (
            <GiftList
              couponList={couponList}
              isGiftListLoaded={isGiftListLoaded}
            />
          )}
        </nav>
      </nav>
    </div>
  );
};

export default Sidebar;
