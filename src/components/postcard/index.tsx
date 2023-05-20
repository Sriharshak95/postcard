import React, { useContext, useEffect, useState } from "react";
import {
  CardThemeContext,
  PostCardDetailsContext,
  UserAuthContext,
} from "../../store";
import CardHeader from "./cardHeader";

const PostCard: React.FC<{ children: JSX.Element | JSX.Element[] }> = (
  props
) => {
  const { userDetails } = useContext(UserAuthContext);
  const { themeColor, } = useContext(CardThemeContext);
  const [cardDetails, setCardDetails] = useState({
    toHandle: "",
    fromHandle: "",
    desc: "",
    purpose: "Should talk to",
    savedId: "",
    introducer: userDetails.name,
    introducerImage: userDetails.picture,
  });

  useEffect(() => {
    setCardDetails({
      ...cardDetails,
      introducer: userDetails.handleName,
      introducerImage: userDetails.picture,
    });
  }, [userDetails]);

  const setCardTheme = () => {
    switch (themeColor) {
      case "default":
        return "min-w-[570px] max-w-[570px] bg-indian-post shadow-2xl rounded-lg h-96 flex flex-col";
      case "plain":
        return "min-w-[570px] max-w-[570px] bg-white shadow-2xl rounded-lg h-96 flex flex-col";
      case "inland":
        return "min-w-[570px] max-w-[570px] bg-cyan-100 shadow-2xl rounded-lg h-96 flex flex-col";
      default:
        return "min-w-[570px] max-w-[570px] bg-indian-post shadow-2xl rounded-lg h-96 flex flex-col";
    }
  };

  return (
    <React.Fragment>
      <PostCardDetailsContext.Provider value={{ cardDetails, setCardDetails }}>
        <div
          className={setCardTheme()}
        >
          <CardHeader userDetails={userDetails} />
          <div className="flex flex-1 w-full justify-center">
            <div className="px-5 py-4 text-center">{props.children}</div>
          </div>
        </div>
      </PostCardDetailsContext.Provider>
    </React.Fragment>
  );
};

export default PostCard;
