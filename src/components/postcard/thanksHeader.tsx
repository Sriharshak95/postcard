import React, { useContext } from "react";
import PostImage from "../../assets/stamp.png";
import { Link, useLocation } from "react-router-dom";
import useInviteDetails from "../../hooks/useInviteDetails";
import { PostCardDetailsContext, UserAuthContext } from "../../store";
import CustomSpinner from "../spinner";

const ThanksHeader: React.FC = () => {
  const { cardDetails } = useContext(PostCardDetailsContext);
  const location = useLocation();
  const { inviteDetails, isLoading } = useInviteDetails(location);
  const [showTooltip, setShowTooltip] = React.useState(false);
  const { userDetails, setUserDetails } = useContext(UserAuthContext);

  const handleLogout = () => {
    if (Object.keys(cardDetails).length > 0) {
      setShowTooltip(!showTooltip);
    } else {
      return null;
    }
  };

  console.log(userDetails);

  return (
    <React.Fragment>
      {!isLoading ? Object.keys(userDetails).length!==0 ? <div className="relative">
        <img
          src={
            inviteDetails.introducerImage &&
            inviteDetails.introducerImage.length > 0
              ? inviteDetails.introducerImage
              : PostImage
          }
          alt="Stamp"
          className={
            Object.keys(inviteDetails).length > 0
              ? "h-16 w-16 shadow stamp-border cursor-pointer"
              : "h-16 w-16 shadow stamp-border"
          }
          onClick={() => handleLogout()}
        />
        {showTooltip && (
          <div
            className="tooltip"
            onClick={() => {
              localStorage.clear();
              window.location.reload();
            }}
          >
            <span>Logout</span>
          </div>
        )}
      </div> : null : <CustomSpinner />}
      <Link to="/main" className="app-title">
        Incentive
      </Link>
    </React.Fragment>
  );
};

export default ThanksHeader;
