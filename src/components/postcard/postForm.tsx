import React, { useContext, useState } from "react";
import {
  PostCardDetailsContext,
  SocialMediaContext,
  UserAuthContext,
} from "../../store";
import PostCardLine from "./postCardLine";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../../utils/firebase";
import CustomSpinner from "../spinner";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { hostName } from "../../utils/changeUrl";
import { DateTime } from "luxon";

const PostForm: React.FC = (props) => {
  const [socialText, setSocialText] = useState("");
  const { cardDetails, setCardDetails } = useContext(PostCardDetailsContext);
  const {userDetails} = useContext(UserAuthContext);
  const [isSpinner, setSpinner] = useState(false);
  const navigate = useNavigate();

  const sendTweet = async (simpleValidator, forceUpdate) => {
    try {
      if (simpleValidator.current.allValid()) {
        if(userDetails.handleName !== cardDetails.toHandle && userDetails.handleName !== cardDetails.fromHandle && cardDetails.fromHandle !== cardDetails.toHandle) {
          setSpinner(true);
          const savedDetails = await addDoc(collection(db, "incentive-cards"), {
            toHandle: cardDetails.toHandle,
            fromHandle: cardDetails.fromHandle,
            desc: cardDetails.desc,
            purpose: cardDetails.purpose,
            introducer: cardDetails.introducer,
            introducerImage: cardDetails.introducerImage,
            introducerId: userDetails.uid,
            createdAt: DateTime.now().toISO(),
            updatedAt: DateTime.now().toISO()
          });
  
          const tweetText = {
            tweetText: `@${cardDetails.toHandle} @${cardDetails.fromHandle} Check: https://voluble-unicorn-fad212.netlify.app/thanks/${savedDetails.id}`,
          };
  
          const sentTweetDetails = (
            await axios.post(`${hostName}/api/tweet`, tweetText, {
              headers: {
                Authorization: "Bearer "+userDetails.token,
              },
            })
          ).data;
  
          if (sentTweetDetails.status) {
            setCardDetails({ ...cardDetails, savedId: savedDetails.id });
            setSpinner(false);
            navigate(`/done?id=${savedDetails.id}`);
          }
        } else {
          alert('You cannot introduce yourself to someone directly');
        }

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
          <PostCardLine
            sendTweetCallback={(validator, forceUpdate) =>
              sendTweet(validator, forceUpdate)
            }
          />
        </SocialMediaContext.Provider>
      ) : (
        <CustomSpinner />
      )}
    </React.Fragment>
  );
};

export default PostForm;
