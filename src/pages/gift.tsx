import React, { useEffect } from "react";
import ScratchCard, { CUSTOM_BRUSH_PRESET } from "react-scratchcard-v2";
import { useLocation } from "react-router-dom";
import Scratch from "../assets/scratch.png";
import { db } from "../utils/firebase";
import { doc, getDoc } from "firebase/firestore";
import useGift from "../hooks/useGift";
import CustomSpinner from "../components/spinner";

const GreetingCard = () => {
  const location = useLocation();
  const { giftData, isGiftLoaded } = useGift(location);
  console.log(giftData);
  if (isGiftLoaded) {
    return <CustomSpinner />;
  } else {
    return (
      <div className="bg-white rounded-lg shadow-lg w-96 h-64 overflow-hidden relative">
        <div className="bg-gradient-to-r from-pink-400 to-purple-500 h-16 rounded-t-lg flex justify-center items-center">
          <h3 className="text-white font-bold text-xl tracking-wide">
            Thank you!
          </h3>
        </div>
        <div className="absolute top-0 left-0 right-0 bottom-0">
          <div className="bg-pink-300 w-32 h-32 absolute bottom-0 left-0 rounded-full transform translate-x-16 translate-y-24"></div>
          <div className="bg-purple-300 w-32 h-32 absolute bottom-0 left-0 rounded-full transform -translate-x-8 translate-y-32"></div>
          <div className="bg-yellow-300 w-32 h-32 absolute bottom-0 left-0 rounded-full transform -translate-x-24 translate-y-8"></div>
          <div className="bg-green-300 w-32 h-32 absolute bottom-0 left-0 rounded-full transform translate-x-64 translate-y-16"></div>
        </div>
        <div className="p-6 relative z-20">
          <p className="text-gray-600 text-center text-[16px] leading-relaxed">
            Here is a message from @{giftData.handleName}
          </p>
          <div className="flex justify-center mt-2 items-center">
            <ScratchCard
              width={220}
              height={50}
              image={Scratch}
              finishPercent={90}
              customBrush={CUSTOM_BRUSH_PRESET}
              onComplete={() => console.log("complete")}
            >
              <p className="text-gray-600 text-[14px] font-bold leading-relaxed">
                {giftData.message}
              </p>
            </ScratchCard>
          </div>
        </div>
      </div>
    );
  }
};

export default GreetingCard;
