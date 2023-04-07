import React from "react";
import PostImage from "../../assets/stamp.png";

const CardHeader: React.FC<{ userDetails?: {
    name: string;
    email: string;
    picture: string;
}}> = ({userDetails}) => {
  return (
    <div className="flex justify-between items-center justify-end text-black font-bold px-4 py-2 mt-2">
      <div className="app-title">Incentive</div>
      <div className="relative">
        <img
          src={
            Object.keys(userDetails).length > 0
              ? userDetails.picture
              : PostImage
          }
          alt="Stamp"
          className="h-16 w-16 shadow stamp-border"
        />
      </div>
    </div>
  );
};

export default CardHeader;
