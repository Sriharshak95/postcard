import TimeAgo from "timeago-react";
const IntroCreatedTime = ({inviteDetails}) => {
    return (
        <div className="flex justify-end p-2 items-center text-gray-700 text-[15px]">
            <i className="fa-regular fa-clock"></i>{" "}
            <TimeAgo className="pl-2" datetime={inviteDetails.createdAt} />
          </div>
    )
}

export default IntroCreatedTime;