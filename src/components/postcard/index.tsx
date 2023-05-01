import React, { useContext, useEffect, useState } from "react";
import { PostCardDetailsContext, UserAuthContext } from "../../store";
import CardHeader from "./cardHeader";
import TimeAgo from "timeago-react";
import { Link, useLocation } from "react-router-dom";
import useInviteDetails from "../../hooks/useInviteDetails";
import IntroCreatedTime from "./introCreatedTime";
import CustomSpinner from "../spinner";

const PostCard: React.FC<{ children: JSX.Element | JSX.Element[] }> = (
  props
) => {
  const { userDetails } = useContext(UserAuthContext);
  const location = useLocation();
  const { inviteDetails, isLoading } = useInviteDetails(location);
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
      introducer: userDetails.name,
      introducerImage: userDetails.picture,
    });
  }, [userDetails]);

  return (
    <React.Fragment>
      <PostCardDetailsContext.Provider value={{ cardDetails, setCardDetails }}>
        <div className="min-w-[570px] max-w-[570px] bg-indian-post rounded-lg border-2 border-yellow-800 h-96 flex flex-col">
          <CardHeader userDetails={userDetails} />
          <div className="flex flex-1 w-full justify-center">
            <div className="px-5 py-4 text-center">{props.children}</div>
          </div>
          {inviteDetails.fromHandle!=="" ? !isLoading ? <IntroCreatedTime inviteDetails={inviteDetails} /> : <CustomSpinner /> : null}
        </div>
      </PostCardDetailsContext.Provider>
    </React.Fragment>
  );
};

export default PostCard;
