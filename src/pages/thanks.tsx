import { useContext, useState, useEffect } from "react";
import { CouponVisibleContext, UserAuthContext } from "../store";
import { getDoc, doc, query, collection, where, getDocs, addDoc } from "firebase/firestore";
import { db } from "../utils/firebase";
import { useLocation, Navigate } from "react-router-dom";
import CustomSpinner from "../components/spinner";
import useInviteDetails from "../hooks/useInviteDetails";
import withPostCardWrapper from "../components/hoc";
import Coupon from "../components/coupon";
import useIsCouponSent from "../hooks/useIsCouponSent";
import {DateTime} from "luxon";

function Thanks() {
  const { userDetails } = useContext(UserAuthContext);
  const location = useLocation();
  const { inviteDetails, isLoading } = useInviteDetails(location);
  const { isCouponsVisible, setCouponsVisible } =
    useContext(CouponVisibleContext);
  const { isCouponSent } = useIsCouponSent(
    location,
    userDetails.handleName,
    isCouponsVisible
  );

  const viewLink = async () => {
    try { 
      const q = query(
        collection(db, "links-opened"),
        where("thankId", "==", location.pathname.substring(
          location.pathname.lastIndexOf("/") + 1
        )),
        where("handleName", "==", userDetails.handleName)
      );
      const docSnap = await getDocs(q);

      if(docSnap.empty) {
        const savedDetails = await addDoc(collection(db, "links-opened"), {
          thankId: location.pathname.substring(
            location.pathname.lastIndexOf("/") + 1
          ),
          handleName: userDetails.handleName,
          createdAt: DateTime.now().toISO(),
        });

        console.log(savedDetails.id);
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    if(inviteDetails.introducer !== "" && inviteDetails.introducer!==userDetails.handleName){
      viewLink();
    }
  }, [inviteDetails]);


  if (!isLoading) {
    if (
      userDetails.handleName === inviteDetails.fromHandle ||
      userDetails.handleName === inviteDetails.toHandle ||
      userDetails.handleName === inviteDetails.introducer
    ) {
      return (
        <>
          {!isCouponsVisible ? (
            <div>
              <div className="flex items-center justify-between">
                <a
                  href={"https://twitter.com/" + inviteDetails.toHandle}
                  rel="noreferrer"
                  target="_blank"
                  className="text-[14px] underline"
                >
                  {inviteDetails.toHandleImage.length > 0 ? (
                    <img
                      className="rounded-full"
                      src={inviteDetails.toHandleImage}
                      alt="from"
                    />
                  ) : (
                    <span>@{inviteDetails.toHandle}</span>
                  )}
                </a>
                -<div className="text-[1rem]">{inviteDetails.purpose}</div> -
                <a
                  href={"https://twitter.com/" + inviteDetails.fromHandle}
                  rel="noreferrer"
                  target="_blank"
                  className="text-[14px] underline"
                >
                  {inviteDetails.fromHandleImage.length > 0 ? (
                    <img
                      className="rounded-full"
                      src={inviteDetails.fromHandleImage}
                      alt="to"
                    />
                  ) : (
                    <span>@{inviteDetails.fromHandle}</span>
                  )}
                </a>
              </div>

              <div className="text-[18px] p-5">{inviteDetails.desc}</div>

              {!isCouponSent && (
                <button
                  className="bg-orange-400 mt-5 rounded w-full font-semibold text-[14px] text-white p-2"
                  onClick={() => setCouponsVisible(true)}
                >
                  Say Thanks to {inviteDetails.introducer}
                </button>
              )}
            </div>
          ) : (
            <Coupon
              setCouponsVisible={() => setCouponsVisible(false)}
              {...inviteDetails}
              {...userDetails}
            />
          )}
        </>
      );
    } else {
      return <Navigate to="/404" />;
    }
  } else {
    return <CustomSpinner />;
  }
}

export default withPostCardWrapper(Thanks);
