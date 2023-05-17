import React, { useContext, useState } from "react";
import PostImage from "../../assets/stamp.png";
import { Link } from "react-router-dom";
import { auth } from "../../utils/firebase";
import { Popover, RadioGroup, Transition } from "@headlessui/react";
import { CardThemeContext } from "../../store";
import { themes } from "../../utils/themes";

const NormalHeader: React.FC<{
  userDetails?: {
    name: string;
    email: string;
    picture: string;
  };
}> = ({ userDetails }) => {
  const [showTooltip, setShowTooltip] = React.useState(false);
  const { themeColor, setThemeColor } = useContext(CardThemeContext);
  const handleLogout = () => {
    if (Object.keys(userDetails).length > 0) {
      setShowTooltip(!showTooltip);
    } else {
      return null;
    }
  };


  const setProfileTheme = () => {
    switch (themeColor) {
      case "default":
        return "h-14 w-14 shadow-2xl shadow-gray-500 rounded-full border-2 border-yellow-800";
      case "plain":
        return "h-14 w-14 shadow-2xl shadow-gray-500 rounded-full border-2 border-gray-800";
      case "inland":
        return "h-14 w-14 shadow-2xl shadow-gray-500 rounded-full border-2 border-cyan-800";
      default:
        return "h-14 w-14 shadow-2xl shadow-gray-500 rounded-full border-2 border-yellow-800";
    }
  };

  return (
    <React.Fragment>
      <div className="relative">
        <img
          src={PostImage}
          onClick={handleLogout}
          alt="Stamp"
          className={
            Object.keys(userDetails).length > 0
              ? "h-16 w-16 shadow stamp-border cursor-pointer"
              : "h-16 w-16 shadow stamp-border"
          }
        />
        {showTooltip && (
          <div
            className="tooltip"
            onClick={() => {
              auth.signOut().then(() => {
                localStorage.clear();
                window.location.reload();
              });
            }}
          >
            <span>Logout</span>
          </div>
        )}
      </div>
      {Object.keys(userDetails).length > 0 ? (
        <Popover className="relative">
          <Popover.Button>
            <img
              src={
                Object.keys(userDetails).length > 0
                  ? userDetails.picture
                  : PostImage
              }
              alt="Stamp"
              className={setProfileTheme()}
            />
          </Popover.Button>
          <Transition
            enter="transition duration-100 ease-out"
            enterFrom="transform scale-95 opacity-0"
            enterTo="transform scale-100 opacity-100"
            leave="transition duration-75 ease-out"
            leaveFrom="transform scale-100 opacity-100"
            leaveTo="transform scale-95 opacity-0"
          >
            <Popover.Panel className="absolute z-10 bg-white shadow-md p-2 rounded-lg w-32">
              <div className="text-[14px] mb-3 antialiased font-normal">
                Set the tone
              </div>
              <div className="flex">
                <div
                  className={
                    themeColor === themes[0]
                      ? "bg-yellow-700 h-5 w-5 shadow-[inset_0_-1px_4px_0_rgb(172,171,171,1)] cursor-pointer rounded-full mr-2 border border-blue-700"
                      : "bg-yellow-700 h-5 w-5 cursor-pointer rounded-full mr-2"
                  }
                  onClick={() => setThemeColor(themes[0])}
                />
                <div
                  className={
                    themeColor === themes[1]
                      ? "bg-slate-500 h-5 w-5 shadow-[inset_0_-1px_4px_0_rgb(172,171,171,1)] cursor-pointer rounded-full mr-2 border border-blue-700"
                      : "bg-slate-500 h-5 w-5 cursor-pointer rounded-full mr-2"
                  }
                  onClick={() => setThemeColor(themes[1])}
                />
                <div
                  className={
                    themeColor === themes[2]
                      ? "bg-blue-300 h-5 w-5 shadow-[inset_0_-1px_4px_0_rgb(172,171,171,1)] rounded-full cursor-pointer border border-blue-700"
                      : "bg-blue-300 h-5 w-5 rounded-full cursor-pointer"
                  }
                  onClick={() => setThemeColor(themes[2])}
                />
              </div>
            </Popover.Panel>
          </Transition>
        </Popover>
      ) : null}
    </React.Fragment>
  );
};

export default NormalHeader;
