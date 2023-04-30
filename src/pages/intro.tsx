import { Link, useLocation } from "react-router-dom";
import useInviteDetails from "../hooks/useInviteDetails";
import TimeAgo from "timeago-react";
import CustomSpinner from "../components/spinner";

const Intro: React.FC = () => {
  const location = useLocation();
  const { inviteDetails, isLoading } = useInviteDetails(location);
  console.log(inviteDetails.createdAt);
  if (isLoading) {
    return <CustomSpinner />;
  } else {
    return (
      <nav className="py-4 relative">
        <Link to="/main" className="text-[14px] hover:text-amber-500">
          <i className="fa-solid fa-address-card" /> Create
        </Link>
        <div className="timeline mt-2">
          <li className="block px-4 py-2 border-1 mb-5 rounded-lg bg-gray-300 relative">
            <div className="flex text-[14px]">
              <span>This intro was created</span>
              <TimeAgo className="pl-2" datetime={inviteDetails.createdAt} />
            </div>
            <p className="text-right text-[12px] mt-2 text-slate-500">
              <i className="fa-regular fa-clock"></i>{" "}
              <TimeAgo datetime={inviteDetails.createdAt} />
            </p>
          </li>
          <div className="timeline-divider"></div>
          <li className="block px-4 py-2 border-1 mb-5 rounded-lg bg-gray-300 relative">
            <div className="flex text-[14px]">
              intro link was viewed on 29 April by @harshaunknownu
            </div>
            <p className="text-right text-[12px] mt-2 text-slate-500">
              <i className="fa-regular fa-clock"></i> wednesday 12.55pm
            </p>
          </li>
          <div className="timeline-divider"></div>
          <li className="block px-4 py-2 border-1 mb-5 rounded-lg bg-gray-300 relative">
            <div className="flex text-[14px]">
              Harsha has said thanks to Girish
            </div>
            <p className="text-right text-[12px] mt-2 text-slate-500">
              <i className="fa-regular fa-clock"></i> friday 8am
            </p>
          </li>
          <div className="timeline-divider"></div>
          <li className="block px-4 py-2 border-1 rounded-lg bg-gray-300 relative">
            <div className="flex text-[14px]">
              Nilesh has said thanks to Girish
            </div>
            <p className="text-right text-[12px] mt-2 text-slate-500">
              <i className="fa-regular fa-clock"></i> yesterday 1.00pm
            </p>
          </li>
        </div>
      </nav>
    );
  }
};

export default Intro;
