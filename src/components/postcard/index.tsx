import React, { useContext, useEffect, useState } from "react";
import { PostCardDetailsContext, UserAuthContext } from "../../store";
import CardHeader from "./cardHeader";

const PostCard: React.FC<{ children: JSX.Element }> = (props) => {
  const { userDetails } = useContext(UserAuthContext);
  const [cardDetails, setCardDetails] = useState({
    toHandle: "",
    fromHandle: "",
    desc: "",
    purpose: "",
    savedId: "",
    introducer: userDetails.name,
    introducerImage: userDetails.picture,
  });

  useEffect(() => {
    setCardDetails({
      ...cardDetails,
      introducer: userDetails.name,
      introducerImage: userDetails.picture,
    });
  }, [userDetails]);

  return (
    <React.Fragment>
      <PostCardDetailsContext.Provider value={{ cardDetails, setCardDetails }}>
        <div className="min-w-[570px] max-w-[570px] bg-indian-post rounded-lg border-2 border-yellow-800 h-96 flex flex-col">
          <CardHeader userDetails={userDetails} />
          <div className="flex-1 w-full self-center">
            <div className="px-5 py-4 text-center">{props.children}</div>
          </div>
        </div>
      </PostCardDetailsContext.Provider>
    </React.Fragment>
  );
};

export default PostCard;
