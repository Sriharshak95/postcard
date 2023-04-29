import { useState } from "react";
import CardInput from "../cardInput";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../../utils/firebase";
import { useLocation } from "react-router-dom";

const Coupon = ({ setCouponsVisible, introducerId, handleName }) => {
  const [message, setMessage] = useState("");
  const location = useLocation();
  const thankId = location.pathname.substring(location.pathname.lastIndexOf("/") + 1);
  const sendCoupon = async() => {
    //needed introducerId, message, from whom handle?
    const objectGift = {
      message,
      introducerId,
      handleName,
      thankId 
    }

    const savedDetails = await addDoc(collection(db, "gifts"), objectGift);
    if(savedDetails.id) {
      setCouponsVisible(false);
    }
  }

  return (
    <div className="inset-0">
      <div className="bg-white p-4 rounded-lg shadow-lg">
        <h3 className="font-bold text-lg mb-0">
          Take an opportunity to send a gift to our introducer...
        </h3>
        <CardInput
          type="text"
          name="toHandle"
          maxLength={80}
          placeholder="Say thanks"
          onFocus={(e) => {}}
          onChange={(e) => setMessage(e.target.value)}
          value={message}
          className="w-full"
        />
        <div>
          <button
            className="bg-orange-400 mt-5 w-1/2 text-[14px] font-semibold rounded text-white py-2"
            onClick={() =>
              sendCoupon()
            }
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default Coupon;
