import React from "react";
import {useLocation} from 'react-router-dom';
import ThanksHeader from "./thanksHeader";
import NormalHeader from "./normalHeader";
import { CardHeaderInterface } from "../../interface";

const CardHeader: React.FC<CardHeaderInterface> = ({userDetails}) => {
  const location = useLocation();
  return (
    <div className="flex justify-between items-center justify-end text-black font-bold px-4 py-2 mt-2">
      {location.pathname.includes('thanks') ? <ThanksHeader /> : !location.pathname.includes('404') ?<NormalHeader userDetails={userDetails} /> : null}
    </div>
  );
};

export default CardHeader;
