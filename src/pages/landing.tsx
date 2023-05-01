import { Link } from "react-router-dom";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../utils/firebase";
import { useState } from "react";
import QRCode from "react-qr-code";

import CustomSpinner from "../components/spinner";
import withPostCardWrapper from "../components/hoc";

function Landing() {
  const [email, setEmail] = useState('');
  const [isLoading, setLoading] = useState(false);
  const [isSubmitted, setSubmitted] = useState(false);
  const sendEmail = async () => {
    try {
        if(email.length > 0) {
            setLoading(true);
            const savedDetails = await addDoc(collection(db, "emails"), {
              email,
            });
            if(savedDetails.id) {
              setLoading(false);
              setSubmitted(true);
            }
        }
    } catch (error) {
        setLoading(false);
    }
  };

  return (
    <>
      <p className="text-[15px] font-bold mb-2">
        Every act of support shown should be more meaningful
      </p>
      <p className="text-[15px]">
        Incentive helps you to say thanks to anyone who has helped you with a
        reference, an intro, a solution, a review and .....
      </p>
      <p className="text-[13px] my-2">
        Say thanks with more confidence and gratitude
      </p>
      <Link
        to="/main"
        className="text-[15px] inline-block bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Try Incentive
      </Link>
      <p className="text-[14px] my-2 font-bold">
        Send digital rewards, better useful coupons, or fulfill a need for the
        help you have received. Make the thanks "count"
      </p>
{/* 
      <div>
        <QRCode
          value={`upi://pay?pa=${upiId}&am=10&cu=INR`}
          />
      </div> */}

      {!isLoading && !isSubmitted ? <div className="flex justify-center my-4">
        <input
          type="email"
          placeholder="Enter email"
          value={email}
          className="border border-gray-400 text-[15px] rounded px-3 mr-2"
          onChange={(e) => setEmail(e.target.value) }
        />
        <button onClick={() => sendEmail()} className="bg-blue-500 text-[15px] hover:bg-blue-700 text-white font-bold px-4 rounded">
          Send
        </button>
      </div> : isSubmitted ? 
      <div className="text-[15px] animate-pulse animation duration-1000 text-blue-500">Thanks, let us connect! <a href="https://twitter.com/seebiscut" className="underline text-sky-700">@seebiscuit</a></div> : <CustomSpinner />}
    </>
  );
}

export default withPostCardWrapper(Landing);
