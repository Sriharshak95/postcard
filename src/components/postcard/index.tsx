import React from "react";
import PostImage from "../../assets/stamp.png";
const PostCard: React.FC<{ children: JSX.Element }> = (props) => {
  return (
    <React.Fragment>
      <div className="max-w-1/2 bg-indian-post rounded-lg overflow-hidden border-2 border-yellow-800 h-96 flex flex-col">
        <div className="flex justify-end text-black font-bold px-4 py-2 mt-2">
          <img src={PostImage} alt="Stamp" className="h-16 w-16 shadow" />
        </div>
        <div className="flex-1 flex flex-col justify-center items-center">
          <div className="px-6 py-4 text-center">{props.children}</div>
        </div>
        <div className="mt-4">
          <button className="bg-orange-400 mt-5 w-full text-[18px] text-white py-2">
            Submit
          </button>
        </div>
      </div>
    </React.Fragment>
  );
};

export default PostCard;
