import React, { useContext, useEffect, useState } from "react";
import { collection, query, getDocs, where } from "firebase/firestore";
import { Link, useLocation } from "react-router-dom";
import { db } from "../../utils/firebase";
import { UserAuthContext } from "../../store";
import CustomSpinner from "../spinner";

const Sidebar: React.FC = () => {
  const [isLoading, setLoading] = useState(false);
  const { userDetails } = useContext(UserAuthContext);
  const [listDetails, setListDetails] = useState([]);
  const location = useLocation();
  const introId = location.pathname.substring(location.pathname.lastIndexOf("/") + 1);
  const sideBarListItemStyle = "block px-4 py-2 border-1 rounded-lg border-yellow-800 bg-indian-post hover:bg-gray-100 cursor-pointer";
  const getUsers = async () => {
    try {
      setLoading(true);
      if (Object.keys(userDetails).length > 0) {
        const q = query(
          collection(db, "incentive-cards"),
          where("introducerId", "==", userDetails.uid)
        );
        const querySnapshot = await getDocs(q);
        const intros = [...listDetails];
        querySnapshot.forEach((doc) => {
          console.log(doc['_document']['createTime']);
          intros.push({ ...doc.data(), introId: doc.id });
        });

        setListDetails(intros);
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
    }
  };

  useEffect(() => {
    getUsers();
  }, [userDetails]);

  return (
    <div className="rounded-lg p-2 bg-slate-300 border-yellow-800 h-96 w-72">
      <div className="p-2 flex justify-between">
        <button className="text-blue-700 text-[14px] hover:text-blue-700">
          <i className="fa-solid fa-timeline"></i> intros
        </button>
        <button className="hover:text-green-700 text-[14px]">
          <i className="fa-solid fa-gift" /> gifts
        </button>
      </div>

      <nav className="py-4">
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
      </nav>
    </div>
  );
};

export default Sidebar;
