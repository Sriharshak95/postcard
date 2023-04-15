import { useContext, useState } from "react";
import { PostCardDetailsContext } from "../store";
const Done: React.FC = () => {
  const { cardDetails } = useContext(PostCardDetailsContext);
  const [inviteLinkValue] = useState(
    window.location.host + "/thanks/" + cardDetails.savedId
  );
  const copyLinkFunc = () => {
    navigator.clipboard.writeText(inviteLinkValue);
    setShowAlert(true);
    setTimeout(() => setShowAlert(false), 2000);
  };
  const [showAlert, setShowAlert] = useState(false);

  return (
    <>
      <p className="mb-4 text-[15px]">Copy this invite link below!</p>
      <div className="flex items-center">
        <input
          id="link-input"
          type="text"
          defaultValue={inviteLinkValue}
          className="bg-yellow-100 border border-gray-300 text-[15px] focus:border-blue-500 py-1 px-4 focus:outline-none rounded-l-md flex-1"
          disabled
        />
        <button
          className="bg-yellow-800 hover:bg-blue-600 text-white font-medium px-4 rounded-r-md"
          onClick={() => copyLinkFunc()}
        >
          <i className="fa-solid fa-copy fa-xs"></i>
        </button>
      </div>
      {showAlert && <div className="mt-2 p-1 rounded-md bg-green-100 text-[14px] text-green-800 transition-opacity duration-500">
        Link copied to clipboard!
      </div>}
    </>
  );
};

export default Done;
