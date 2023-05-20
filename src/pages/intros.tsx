import { Link, useLocation } from "react-router-dom";
import useInviteDetails from "../hooks/useInviteDetails";
import TimeAgo from "timeago-react";
import CustomSpinner from "../components/spinner";
import { DateTime } from "luxon";

const Intro: React.FC = () => {
  const location = useLocation();
  const { inviteDetails, isLoading } = useInviteDetails(location);
  const introId = location.pathname.substring(
    location.pathname.lastIndexOf("/") + 1
  );

  if (!isLoading) {
    return (
      <div className="timeline">
        <div className="timeline-item">
          <div className="timeline-marker"></div>
          <div className="timeline-content">
            <Link
              to={"/intro/" + introId}
              key={introId}
              className="block relative pl-6 pr-8 py-4 bg-white border-l-4 border-indigo-500 hover:bg-indigo-100"
            >
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <img
                    className="h-10 w-10 rounded-full"
                    src={inviteDetails.fromHandleImage}
                    alt="From User"
                  />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-900">
                    {inviteDetails.purpose}
                  </p>
                  <p className="text-sm text-gray-500">
                    <span className="font-bold">
                      {inviteDetails.fromHandle}
                    </span>{" "}
                    invited{" "}
                    <span className="font-bold">
                      {inviteDetails.toHandle}
                    </span>
                  </p>
                </div>
              </div>
              <div className="mt-2">
                <p className="text-sm text-gray-500 italic">
                  {inviteDetails.desc}
                </p>
              </div>
              <div className="pl-3 py-1">
                <span className="text-gray-600 text-xs">
                  <i className="far fa-clock"></i>{" "}
                  {DateTime.fromISO(inviteDetails.updatedAt).toFormat("ff")}
                </span>
              </div>
            </Link>
          </div>
        </div>
      </div>
    );
  } else {
    return <CustomSpinner />;
  }
};

export default Intro;
