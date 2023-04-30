import React, { useContext } from "react";
import PostImage from "../../assets/stamp.png";
import LogoImage from "../../assets/I.png";
import { Link, useLocation } from "react-router-dom";
import useInviteDetails from "../../hooks/useInviteDetails";
import { PostCardDetailsContext, UserAuthContext } from "../../store";
import CustomSpinner from "../spinner";
import { auth } from "../../utils/firebase";

const ThanksHeader: React.FC = () => {
  const { cardDetails } = useContext(PostCardDetailsContext);
  const location = useLocation();
  const { inviteDetails, isLoading } = useInviteDetails(location);
  const [showTooltip, setShowTooltip] = React.useState(false);
  const { userDetails } = useContext(UserAuthContext);

  const handleLogout = () => {
    if (Object.keys(cardDetails).length > 0) {
      setShowTooltip(!showTooltip);
    } else {
      return null;
    }
  };

  return (
    <React.Fragment>
      <div className="relative">
        <img
          src={PostImage}
          onClick={handleLogout}
          alt="Stamp"
          className={
            Object.keys(userDetails).length > 0
              ? "h-16 w-16 shadow stamp-border cursor-pointer"
              : "h-16 w-16 shadow stamp-border"
          }
        />
        {showTooltip && (
          <div
            className="tooltip"
            onClick={() => {
              auth.signOut().then(() => {
                localStorage.clear();
                window.location.reload();
              });
            }}
          >
            <span>Logout</span>
          </div>
        )}
      </div>
      {!isLoading ? (
        Object.keys(userDetails).length !== 0 ? (
          <div className="relative">
            <Link to="/main">
              <img
                src={
                  inviteDetails.introducerImage &&
                  inviteDetails.introducerImage.length > 0
                    ? inviteDetails.introducerImage
                    : PostImage
                }
                alt="Stamp"
                className={"h-16 w-16 shadow rounded-full"}
              />
            </Link>
          </div>
        ) : null
      ) : (
        <CustomSpinner />
      )}
    </React.Fragment>
  );
};

export default ThanksHeader;
