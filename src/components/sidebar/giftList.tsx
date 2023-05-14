import { Link, useLocation } from "react-router-dom";
import CustomSpinner from "../spinner";

const GiftList = ({isGiftListLoaded, couponList}) => {
    const sideBarListItemStyle = "flex lg:justify-start md:justify-start justify-center text-[12px] bg-gray-200 p-2 hover:bg-gray-100 cursor-pointer shadow-lg bg-white";
    const location = useLocation();
    const giftId = location.pathname.substring(location.pathname.lastIndexOf("/") + 1);

    return (
        <ul className="space-y-2">
          {!isGiftListLoaded ? couponList.map((intro, index) => {
            return (
                <Link to={"/gifts/"+intro.id} className={intro.id === giftId ? sideBarListItemStyle+" shadow-inner bg-slate-100" :sideBarListItemStyle} key={intro.thankId+index}>
                    Gift {intro.id}
                </Link>
            );
          }) : <CustomSpinner />}
        </ul>
    )
}

export default GiftList;