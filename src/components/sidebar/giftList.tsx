import { Link } from "react-router-dom";
import CustomSpinner from "../spinner";

const GiftList = ({isGiftListLoaded, couponList}) => {
    return (
        <ul className="space-y-2">
          {!isGiftListLoaded ? couponList.map((intro, index) => {
            return (
                <Link to={"/gifts/"+intro.id} className="flex text-[12px] bg-gray-200 p-2 hover:bg-gray-100 cursor-pointer" key={intro.thankId+index}>
                    Gift {intro.id}
                </Link>
            );
          }) : <CustomSpinner />}
        </ul>
    )
}

export default GiftList;