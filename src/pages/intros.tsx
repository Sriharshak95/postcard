import { Link, useLocation, useParams } from "react-router-dom";
import useInviteDetails from "../hooks/useInviteDetails";
import TimeAgo from "timeago-react";
import CustomSpinner from "../components/spinner";
import { useNavigate, Navigate } from "react-router-dom";
import useIsCouponSent from "../hooks/useIsCouponSent";
import { useContext } from "react";
import { UserAuthContext } from "../store";
import { auth } from "../utils/firebase";

const Intro: React.FC = () => {
  const location = useLocation();
  const { userDetails } = useContext(UserAuthContext);
  const { inviteDetails, isLoading } = useInviteDetails(location);
  const { couponList } = useIsCouponSent(location, null);
  const navigate = useNavigate();
  if(Object.keys(userDetails).length > 0) {

    return (
      <nav className="py-4 relative">
        <div className="flex justify-between">
          <Link to="/main" className="text-[14px] hover:text-amber-500">
            <i className="fa-solid fa-address-card" /> Create
          </Link>
          <button className="text-[14px] hover:text-amber-500" onClick={() => {
              auth.signOut().then(() => {
                localStorage.clear();
                navigate('/');
              });
          }}>
            <i className="fa-solid fa-right-from-bracket" />
          </button>
        </div>
        <div className="timeline mt-2">
          <Link
            to={
              "/intro/" +
              location.pathname.substring(location.pathname.lastIndexOf("/") + 1)
            }
            className="block px-4 py-2 border-1 mb-5 rounded-lg bg-gray-300 relative"
          >
            <div className="flex text-[14px]">
              <span>This intro was created</span>
              <TimeAgo className="pl-2" datetime={inviteDetails.createdAt} />
            </div>
            <p className="text-right text-[12px] mt-2 text-slate-500">
              <i className="fa-regular fa-clock"></i>{" "}
              <TimeAgo datetime={inviteDetails.createdAt} />
            </p>
          </Link>
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
