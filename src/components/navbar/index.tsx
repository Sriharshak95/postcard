import { useContext } from "react";
import { UserAuthContext } from "../../store";

const Navbar:React.FC = () => {
    const {userDetails, setUserDetails} = useContext(UserAuthContext);
    return (
        <nav className="bg-white p-4 flex justify-between items-center">
          <div className="text-lg font-bold text-grey-500 mx-auto app-title">Incentive</div>
          {Object.keys(userDetails).length > 0 && (
            <button
              className="px-4 py-2 rounded text-white bg-red-500 hover:bg-red-600"
              onClick={() => {
                setUserDetails({});
                localStorage.removeItem("userDetails");
              }}
            >
              Logout
            </button>
          )}
        </nav>
    )
}

export default Navbar;