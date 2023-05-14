import React, { useContext, useEffect, useState } from "react";
import { collection, query, getDocs, where } from "firebase/firestore";
import { db } from "../../utils/firebase";
import { SideBarContext, UserAuthContext } from "../../store";

const Sidebar: React.FC = () => {
  const [,setLoading] = useState(false);
  const { userDetails } = useContext(UserAuthContext);
  const [listDetails, setListDetails] = useState([]);
  const {navs, setNavs} = useContext(SideBarContext);

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
    <div>
      <nav className="py-4">
        <div className="flex flex-col space-y-2">
          <button className={navs === "intros" ? "text-blue-700 text-[16px] hover:text-blue-700 hover:bg-slate-200 py-2" : "text-[16px] hover:text-blue-700 hover:bg-slate-200 py-2"} onClick={() => setNavs("intros")}>
            <i className="fa-solid fa-timeline"></i> intros
          </button>
          <button className={navs === "gifts" ? "text-blue-700 text-[16px] hover:text-blue-700 hover:bg-slate-200 py-2" : "text-[16px] hover:text-blue-700 hover:bg-slate-200 py-2"} onClick={() => setNavs("gifts")}>
            <i className="fa-solid fa-gift"></i> gifts
          </button>
        </div>
      </nav>
    </div>
  );
};

export default Sidebar;
