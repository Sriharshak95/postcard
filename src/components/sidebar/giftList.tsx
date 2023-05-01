import CustomSpinner from "../spinner";

const GiftList = ({isGiftListLoaded, couponList}) => {
    return (
        <ul className="space-y-2">
          {!isGiftListLoaded ? couponList.map((intro, index) => {
            return (
                <div className="flex text-[12px] bg-gray-200 p-2" key={intro.thankId+index}>
                    {intro.message}
                </div>
            );
          }) : <CustomSpinner />}
        </ul>
    )
}

export default GiftList;