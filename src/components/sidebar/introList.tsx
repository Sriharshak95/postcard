// import { useState } from "react";
// import EmailCard from "../emailCard";
// import CustomSpinner from "../spinner";
// import { Link, useLocation } from "react-router-dom";
// const emails = [
//   {
//     id: 1,
//     from: "John Doe",
//     subject: "Email Subject 1",
//     body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
//     time: "9:30 AM",
//   },
//   {
//     id: 2,
//     from: "Jane Smith",
//     subject: "Email Subject 2",
//     body: "Nulla facilisi. Fusce ut nulla nec elit faucibus maximus.",
//     time: "10:45 AM",
//   },
//   {
//     id: 3,
//     from: "Bob Johnson",
//     subject: "Email Subject 3",
//     body: "Sed non lacus rhoncus, tempor nulla in, laoreet felis.",
//     time: "11:15 AM",
//   },
// ];
// const IntroList = ({ isLoading, listDetails }) => {
//   const [setSelected] = useState(null);

//   return (
//     <ul className="space-y-2">
//       {emails.map((email) => (
//         <EmailCard key={email.id} email={email} setSelected={setSelected} />
//       ))}
//     </ul>
//   );
// };

// export default IntroList;

import CustomSpinner from "../spinner";
import { Link, useLocation } from "react-router-dom";
import { DateTime } from "luxon";
import TimeAgo from "timeago-react";

const IntroList = ({ isLoading, listDetails }) => {
  const location = useLocation();
  const introId = location.pathname.substring(
    location.pathname.lastIndexOf("/") + 1
  );
  const sideBarListItemStyle =
    "block px-4 py-2 border-b border-slate-200 hover:bg-gray-100 cursor-pointer";

  return (
    <ul className="space-y-2">
      {!isLoading ? (
        listDetails.length > 0 ? (
          listDetails.map((intro) => {
            return (
              <Link
                to={"/intros/" + intro.introId}
                key={intro.introId}
                className={
                  intro.introId === introId
                    ? sideBarListItemStyle +
                      " shadow-[inset_0_0_10px_1px_rgba(203,198,198,1)] bg-slate-100"
                    : sideBarListItemStyle + " shadow-lg bg-white"
                }
              >
                <div className="flex items-center w-full">
                  <div className="pr-2 text-[14px]">
                    <img
                      className="rounded-full h-10 w-10"
                      src={intro.fromHandleImage}
                      alt="to"
                    />
                  </div>
                  <div className="pr-2 text-[14px] italic">{intro.purpose}</div>
                  <div className="text-[14px]">
                    <img
                      className="rounded-full h-10 w-10"
                      src={intro.toHandleImage}
                      alt="to"
                    />
                  </div>
                </div>
                <div className="flex justify-between items-end my-2">
                  <p className="text-gray-500 text-[14px] italic">
                    {intro.desc}
                  </p>
                  <p className="text-gray-500 text-[12px] text-right">
                    <i className="fa-regular fa-clock"></i>{" "}
                    <TimeAgo datetime={intro.updatedAt} />
                  </p>
                </div>
              </Link>
            );
          })
        ) : (
          <div className="text-center">
            <Link
              to="/main"
              className="bg-orange-400 mt-5 px-2 text-[14px] font-semibold rounded text-white py-2"
              onClick={() => {}}
            >
              Create Intro
            </Link>
          </div>
        )
      ) : (
        <CustomSpinner />
      )}
    </ul>
  );
};

export default IntroList;
