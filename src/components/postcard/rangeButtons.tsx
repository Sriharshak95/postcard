import { useContext } from "react";
import { SocialMediaContext } from "../../store";

const RangeButtons: React.FC = () => {
  const {setSocialText} = useContext(SocialMediaContext);
  return (
    <div>
      <button className="p-2" onClick={(e) => {
        setSocialText("https://twitter.com/");
      }}>
        <i className="fa-brands fa-twitter"></i>
      </button>
      <button className="p-2" onClick={(e) => {
        setSocialText("https://linkedin.com/");
      }}>
        <i className="fa-brands fa-linkedin"></i>
      </button>
      {/* <button className="p-2">
        <i className="fa-solid fa-envelope"></i>
      </button> */}
    </div>
  );
};

export default RangeButtons;
