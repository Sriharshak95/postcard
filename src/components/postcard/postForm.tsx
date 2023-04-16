import React, { useContext, useState } from "react";
import { PostCardDetailsContext, SocialMediaContext } from "../../store";
import PostCardLine from "./postCardLine";
import CardInput from "../cardInput";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../../utils/firebase";
import CustomSpinner from "../spinner";
import { useNavigate } from "react-router-dom";

const PostForm: React.FC = (props) => {
  const [socialText, setSocialText] = useState("");
  const [descText, setDescText] = useState("");
  const { cardDetails, setCardDetails } = useContext(PostCardDetailsContext);
  const [isSpinner, setSpinner] = useState(false);
  const navigate = useNavigate();

  const sendTweet = async () => {
    try {
      setSpinner(true);
      const savedDetails = await addDoc(collection(db, "incentive-cards"), {
        toHandle: cardDetails.toHandle,
        fromHandle: cardDetails.fromHandle,
        desc: cardDetails.desc,
        purpose: cardDetails.purpose,
        introducer: cardDetails.introducer,
        introducerImage: cardDetails.introducerImage
      });
      setCardDetails({ ...cardDetails, savedId: savedDetails.id });
      setSpinner(false);
      navigate('/done');
    } catch (error) {
      setSpinner(false);
    }
  };

  return (
    <React.Fragment>
      {!isSpinner ? (
        <SocialMediaContext.Provider value={{ socialText, setSocialText }}>
          <div className="flex mb-4 flex-nowrap">
            <PostCardLine />
          </div>
          <CardInput
            type="text"
            className="w-full mt-5"
            placeholder="description"
            value={descText}
            onChange={(e) => {
              setDescText(e.target.value);
              setCardDetails({ ...cardDetails, desc: e.target.value });
            }}
          />

          <div className="mt-4">
            <button
              className="bg-orange-400 mt-5 w-full text-[18px] text-white py-2"
              onClick={() => sendTweet()}
            >
              Submit
            </button>
          </div>
        </SocialMediaContext.Provider>
      ) : (
        <CustomSpinner />
      )}
    </React.Fragment>
  );
};

export default PostForm;
