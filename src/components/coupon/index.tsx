import { useState } from "react";
import CardInput from "../cardInput";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../../utils/firebase";
import { useLocation } from "react-router-dom";
import { DateTime } from "luxon";

const Coupon = ({ setCouponsVisible, introducerId, handleName, introducer }) => {
  const [message, setMessage] = useState("");
  const location = useLocation();
  const thankId = location.pathname.substring(
    location.pathname.lastIndexOf("/") + 1
  );
  const sendCoupon = async () => {
    //needed introducerId, message, from whom handle?
    const objectGift = {
      message,
      introducer,
      handleName,
      thankId,
      createdAt: DateTime.now().toISO(),
      updatedAt: DateTime.now().toISO()
    };

    const savedDetails = await addDoc(collection(db, "gifts"), objectGift);
    if (savedDetails.id) {
      setCouponsVisible(false);
    }
  };

  return (
    <div className="relative">
      <button className="absolute top-0 right-0 p-2" onClick={() => setCouponsVisible(false)}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="h-6 w-6"
        >
          <path
            fillRule="evenodd"
            d="M3.707 3.707a1 1 0 011.414 0L12 10.586l6.879-6.88a1 1 0 011.414 0l1.414 1.414a1 1 0 010 1.414L14.414 12l6.879 6.879a1 1 0 010 1.414l-1.414 1.414a1 1 0 01-1.414 0L12 13.414l-6.879 6.88a1 1 0 01-1.414 0l-1.414-1.414a1 1 0 010-1.414L9.586 12 2.707 5.121a1 1 0 010-1.414l1.414-1.414z"
            clipRule="evenodd"
          />
        </svg>
      </button>
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
            onClick={() => sendCoupon()}
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default Coupon;
