import { Link } from "react-router-dom";
import { DateTime } from "luxon";

const TimeLineItem: React.FC<{
  introId: string;
  inviteDetails: any;
  onClick: () => void
}> = ({ introId, inviteDetails, onClick }) => {

  return (
    <div className="mx-auto min-w-[570px] max-w-[570px] cursor-pointer p-3 shadow-xl mb-5" onClick={onClick}>
      <div className="flex items-center mt-5">
        <div className="flex-shrink-0 mr-4">
          <img
            className="h-10 w-10 rounded-full mx-auto"
            src={inviteDetails.fromHandleImage}
            alt="From User"
          />
        </div>

        <div className="flex-grow">
          <p className="text-[15px] antialiased font-medium text-gray-600 bg-gradient-to-r from-gray-200 via-white to-gray-200 rounded-full p-2 text-center">
            {inviteDetails.purpose}
          </p>
        </div>

        <div className="flex-shrink-0 ml-4">
          <img
            className="h-10 w-10 rounded-full text-center mx-auto"
            src={inviteDetails.toHandleImage}
            alt="To User"
          />
        </div>
      </div>
      <div className="mt-3 text-center text-[15px] antialiased italic text-slate-500">
        "{inviteDetails.desc}"
      </div>
      <div className="text-right">
        <span className="text-gray-600 text-xs">
          <i className="far fa-clock"></i>{" "}
          {DateTime.fromISO(inviteDetails.updatedAt).toFormat("DD T")}
        </span>
      </div>
    </div>
  );
};

export default TimeLineItem;
