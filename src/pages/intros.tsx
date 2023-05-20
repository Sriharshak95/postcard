import { Link, useLocation, useParams } from "react-router-dom";
import useInviteDetails from "../hooks/useInviteDetails";
import TimeAgo from "timeago-react";
import CustomSpinner from "../components/spinner";
import { useNavigate, Navigate } from "react-router-dom";
import useIsCouponSent from "../hooks/useIsCouponSent";
import { useContext } from "react";
import { UserAuthContext } from "../store";
import { auth } from "../utils/firebase";
import { DateTime } from "luxon";

const Intro: React.FC = () => {
  const location = useLocation();
  const { userDetails } = useContext(UserAuthContext);
  const { inviteDetails, isLoading } = useInviteDetails(location);
  const { couponList } = useIsCouponSent(location, null);
  const introId = location.pathname.substring(
    location.pathname.lastIndexOf("/") + 1
  );
  const sideBarListItemStyle =
    "block px-4 py-2 border-b border-slate-200 hover:bg-gray-100 cursor-pointer";
  const navigate = useNavigate();

  if (Object.keys(userDetails).length > 0) {
    if (!isLoading) {
      return (
        <Link
          to={"/intro/" + introId}
          key={introId}
          className={sideBarListItemStyle + " shadow-lg bg-white"}
        >
          <div className="flex items-center">
            <div className="pr-2 text-[14px]">
              <img
                className="rounded-full h-10 w-10"
                src={inviteDetails.fromHandleImage}
                alt="to"
              />
            </div>
            <div className="pr-2 text-[14px] italic">
              {inviteDetails.purpose}
            </div>
            <div className="text-[14px]">
              <img
                className="rounded-full h-10 w-10"
                src={inviteDetails.toHandleImage}
                alt="to"
              />
            </div>

            <p className="pl-2 text-gray-500 text-[14px] italic text-right">
              {inviteDetails.desc}
            </p>
          </div>
          <div className="flex justify-end mb-2">
            <span className="text-gray-500 text-[12px]">
              <i className="fa-regular fa-clock"></i>{" "}
              {DateTime.fromISO(inviteDetails.updatedAt).toFormat("ff")}
            </span>
          </div>
        </Link>
      );
    } else {
      return <CustomSpinner />;
    }
  }
};

export default Intro;
