import CustomSpinner from "../spinner";
import { Link, useLocation } from "react-router-dom";

const IntroList = ({isLoading, listDetails}) => {
    const location = useLocation();
    const introId = location.pathname.substring(location.pathname.lastIndexOf("/") + 1);
    const sideBarListItemStyle = "block px-4 py-2 border-1 rounded-lg border-yellow-800 bg-indian-post hover:bg-gray-100 cursor-pointer";
    return (
        <ul className="space-y-2">
          {!isLoading ? listDetails.map((intro) => {
            return (
              <Link
                to={"/intros/"+intro.introId}
                key={intro.introId}
                className={intro.introId === introId ? sideBarListItemStyle + " shadow-[inset_-2px_0_8px_rgba(196,148,46,1)]" : sideBarListItemStyle}
              >
                <div className="flex text-[12px]">
                  <div>
                    {false ? (
                      <img
                        className="rounded-full mr-2"
                        src={
                          "https://pbs.twimg.com/profile_images/1540904475665506304/DfWfyaLE_normal.jpg"
                        }
                        alt="from"
                      />
                    ) : (
                      <span className="font-medium">@{intro.toHandle}</span>
                    )}
                  </div>
                  <div>{intro.purpose}</div>
                  <div>
                    {false ? (
                      <img
                        className="rounded-full ml-2"
                        src={
                          "https://pbs.twimg.com/profile_images/1540904475665506304/DfWfyaLE_normal.jpg"
                        }
                        alt="to"
                      />
                    ) : (
                      <span className="font-medium">@{intro.fromHandle}</span>
                    )}
                  </div>
                </div>
              </Link>
            );
          }) : <CustomSpinner />}
        </ul>
    )
}

export default IntroList;