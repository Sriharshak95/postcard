import React from "react";
import PostImage from "../../assets/stamp.png";
import { Link } from "react-router-dom";

const NormalHeader: React.FC<{
  userDetails?: {
    name: string;
    email: string;
    picture: string;
  };
}> = ({ userDetails }) => {
  const [showTooltip, setShowTooltip] = React.useState(false);
  const handleLogout = () => {
    if(Object.keys(userDetails).length > 0) {
        setShowTooltip(!showTooltip)
    } else {
        return null;
    }
  };
  return (
    <React.Fragment>
      <Link to="/main" className="app-title">
        Incentive
      </Link>
      <div className="relative">
        <img
          src={
            Object.keys(userDetails).length > 0
              ? userDetails.picture
              : PostImage
          }
          onClick={handleLogout}
          alt="Stamp"
          className={Object.keys(userDetails).length > 0 ? "h-16 w-16 shadow stamp-border cursor-pointer" : "h-16 w-16 shadow stamp-border"}
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
      </div>
    </React.Fragment>
  );
};

export default NormalHeader;
