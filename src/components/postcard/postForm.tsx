import React, { useContext, useState } from "react";
import { PostCardDetailsContext, SocialMediaContext } from "../../store";
import PostCardLine from "./postCardLine";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../../utils/firebase";
import CustomSpinner from "../spinner";
import { useNavigate } from "react-router-dom";

const PostForm: React.FC = (props) => {
  const [socialText, setSocialText] = useState("");
  const { cardDetails, setCardDetails } = useContext(PostCardDetailsContext);
  const [isSpinner, setSpinner] = useState(false);
  const navigate = useNavigate();

  const sendTweet = async (simpleValidator, forceUpdate) => {
    try {
      if (simpleValidator.current.allValid()) {
        setSpinner(true);
        const savedDetails = await addDoc(collection(db, "incentive-cards"), {
          toHandle: cardDetails.toHandle,
          fromHandle: cardDetails.fromHandle,
          desc: cardDetails.desc,
          purpose: cardDetails.purpose,
          introducer: cardDetails.introducer,
          introducerImage: cardDetails.introducerImage,
        });
        setCardDetails({ ...cardDetails, savedId: savedDetails.id });
        setSpinner(false);
        navigate("/done");
      } else {
        simpleValidator.current.showMessages();
        forceUpdate(1);
      }
    } catch (error) {
      setSpinner(false);
    }
  };

  return (
    <React.Fragment>
      {!isSpinner ? (
        <SocialMediaContext.Provider value={{ socialText, setSocialText }}>
            <PostCardLine sendTweetCallback={(validator, forceUpdate) => sendTweet(validator, forceUpdate)} />
        </SocialMediaContext.Provider>
      ) : (
        <CustomSpinner />
      )}
    </React.Fragment>
  );
};

export default PostForm;
