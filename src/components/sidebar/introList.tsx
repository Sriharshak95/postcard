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

const IntroList = ({isLoading, listDetails}) => {
    const location = useLocation();
    const introId = location.pathname.substring(location.pathname.lastIndexOf("/") + 1);
    const sideBarListItemStyle = "block px-4 py-2 border-b border-slate-200 hover:bg-gray-100 cursor-pointer";
    return (
        <ul className="space-y-2">
          {!isLoading ? listDetails.map((intro) => {
            return (
              <Link
                to={"/intros/"+intro.introId}
                key={intro.introId}
                className={intro.introId === introId ? sideBarListItemStyle + " shadow-inner bg-slate-100" : sideBarListItemStyle + " shadow-lg bg-white"}
              >
              <div
                className="cursor-pointer"
                onClick={() => {}}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-gray-500">10:45 AM</span>
                </div>
                <div className="">
                  <div className="pr-2 text-[14px]">@{intro.fromHandle}</div> 
                  <div className="pr-2 text-[14px]">{intro.purpose}</div>
                  <div className="text-[14px]">@{intro.toHandle}</div>
                </div>
                <p className="text-gray-500">{intro.desc}</p>
              </div>
              </Link>
            );
          }) : <CustomSpinner />}
        </ul>
    )
}

export default IntroList;
