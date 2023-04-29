import React, { useContext, useEffect, useState } from "react";
import { collection, query, getDocs, where } from "firebase/firestore";
import { Link } from "react-router-dom";
import { db } from "../../utils/firebase";
import { UserAuthContext } from "../../store";

const Sidebar: React.FC = () => {
  const inviteDetails = {
    toHandle: "user1",
    fromHandle: "user2",
    toHandleImage:
      "https://pbs.twimg.com/profile_images/1540904475665506304/DfWfyaLE_normal.jpg",
    fromHandleImage:
      "https://pbs.twimg.com/profile_images/1540904475665506304/DfWfyaLE_normal.jpg",
    purpose: "Should talk to",
  };
  const { userDetails } = useContext(UserAuthContext);
  const [listDetails, setListDetails] = useState([]);

  const getUsers = async () => {
    try {
      if (Object.keys(userDetails).length > 0) {
        const q = query(
          collection(db, "incentive-cards"),
          where("introducerId", "==", userDetails.uid)
        );
        const querySnapshot = await getDocs(q);
        const intros = [...listDetails];
        querySnapshot.forEach((doc) => {
          intros.push({ ...doc.data(), introId: doc.id });
        });

        setListDetails(intros);
      }
    } catch (error) {}
  };

  useEffect(() => {
    getUsers();
  }, [userDetails]);

  return (
    <div className="bg-white rounded-lg p-2 bg-orange-100 border-yellow-800 h-96 w-72">
      <div className="p-2 flex justify-between">
        <button className="text-blue-700 text-[14px] hover:text-blue-700">
          <i className="fa-solid fa-address-card" /> intros
        </button>
        <button className="hover:text-green-700 text-[14px]">
          <i className="fa-solid fa-gift" /> gifts
        </button>
      </div>

      <nav className="py-4">
        <ul className="space-y-2">
          {listDetails.map((intro) => {
            return (
              <Link
                to={"/intros/"+intro.introId}
                key={intro.introId}
                className="block px-4 py-2 border-1 rounded-lg border-yellow-800 bg-indian-post hover:bg-gray-100 cursor-pointer"
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
          })}
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
