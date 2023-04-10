import React, { useContext } from "react";
import { UserAuthContext } from "../../store";
import CardHeader from "./cardHeader";

const PostCard: React.FC<{ children: JSX.Element }> = (props) => {
  const { userDetails } = useContext(UserAuthContext);
  const sendTweet = () => {
  };
  return (
    <React.Fragment>
      <div className="min-w-[570px] max-w-[570px] bg-indian-post rounded-lg overflow-hidden border-2 border-yellow-800 h-96 flex flex-col">
        <CardHeader userDetails={userDetails} />
        <div className="flex-1 flex flex-col justify-center items-center">
          <div className="px-5 py-4 text-center">{props.children}</div>
        </div>
        {Object.keys(userDetails).length > 0 ? (
          <div className="mt-4">
            <button
              className="bg-orange-400 mt-5 w-full text-[18px] text-white py-2"
              onClick={() => sendTweet()}
            >
              Submit
            </button>
          </div>
        ) : null}
      </div>
    </React.Fragment>
  );
};

export default PostCard;
