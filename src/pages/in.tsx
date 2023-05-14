import SayThanksImage from "../assets/saythanks.png";
import Zomato from "../assets/zomato.png";
import AmazonGift from "../assets/amazongift.png";
import SwiggyImage from "../assets/swiggy.png";
import { useState } from "react";



function In({ sendCouponCode }) {
  const [coupons, setCoupons] = useState([
    {
      code: "SUMMER20",
      discount: 20,
      logo: SayThanksImage,
      shadow: "shadow-[0_2px_4px_0_rgb(235,231,163,1)]",
      selected: false,
    },
    {
      code: "ZOMATOOD",
      discount: 15,
      logo: Zomato,
      shadow: "shadow-[0_2px_4px_0_rgb(244,166,166,1)]",
      selected: false,
    },
    {
      code: "AMAZON25",
      discount: 25,
      logo: AmazonGift,
      shadow: "shadow-[0_2px_4px_0_rgb(243,157,74,1)]",
      selected: false,
    },
    {
      code: "SWIG15",
      discount: 15,
      logo: SwiggyImage,
      shadow: "shadow-[0_2px_4px_0_rgb(252,121,26,0.4)]",
      selected: false,
    },
  ]);
  return (
    <div className="grid grid-cols-2 gap-2">
      {coupons.map((coupon, index) => {
        return (
          <div className={"bg-white rounded-md p-4 " + coupon.shadow}>
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-bold text-[14px] pr-2">
                Coupon Code
              </h2>
              <span className="text-gray-600 text-[16px]">{coupon.code}</span>
            </div>
            {coupon.logo && (
              <div className="flex justify-center items-center mt-4">
                <img
                  src={coupon.logo}
                  alt="Company logo"
                  className="w-20 h-20 object-contain"
                />
              </div>
            )}
            <div className="flex justify-between items-center mt-4">
              <span className="text-gray-600 text-[14px]">
                {coupon.discount}% OFF
              </span>
              <button
                onClick={() => {
                  sendCouponCode(coupon.code);
                  const updatedCoupons = [...coupons];
                  setCoupons(
                    updatedCoupons.map(obj => (obj.code === coupon.code ? {...obj, selected: true} : {...obj, selected: false}))
                  );
                }}
                className={coupon.selected ? "bg-orange-900 text-[14px] text-white py-2 px-4 rounded-md hover:bg-gray-800 transition-colors" : "bg-gray-900 text-[14px] text-white py-2 px-4 rounded-md hover:bg-gray-800 transition-colors"}
              >
                SELECT
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default In;
