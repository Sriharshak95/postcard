import React, { useContext } from "react";
import PostImage from "../../assets/stamp.png";
import { Link } from "react-router-dom";
import { PostCardDetailsContext } from "../../store";

const ThanksHeader: React.FC = () => {
  const { cardDetails } = useContext(PostCardDetailsContext);
  const [showTooltip, setShowTooltip] = React.useState(false);
  const handleLogout = () => {
    if(Object.keys(cardDetails).length > 0) {
        setShowTooltip(!showTooltip)
    } else {
        return null;
    }
  };
  return (
    <React.Fragment>
      <div className="relative">
        <img
          src={
            cardDetails.introducerImage &&
            cardDetails.introducerImage.length > 0
              ? cardDetails.introducerImage
              : PostImage
          }
          alt="Stamp"
          className={Object.keys(cardDetails).length > 0 ? "h-16 w-16 shadow stamp-border cursor-pointer" : "h-16 w-16 shadow stamp-border"}
          onClick={handleLogout}
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
      <Link to="/" className="app-title">
        Incentive
      </Link>
    </React.Fragment>
  );
};

export default ThanksHeader;
