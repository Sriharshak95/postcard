import { Link, useLocation } from "react-router-dom";
import useInviteDetails from "../hooks/useInviteDetails";
import CustomSpinner from "../components/spinner";
import TimeLineItem from "../components/timeline/timelineItem";
import "../App.css";
import Intro from "./intro";
import { useState } from "react";
import { Transition } from "@headlessui/react";
import TimeAgo from "timeago-react";
import useLinkOpened from "../hooks/useLinkOpened";
import useGift from "../hooks/useGift";
import useIsCouponSent from "../hooks/useIsCouponSent";

const Intros: React.FC = () => {
  const location = useLocation();
  const { inviteDetails, isLoading } = useInviteDetails(location);
  const { isListLoaded, viewData } = useLinkOpened(location);
  
  const { isCouponSent, couponList } = useIsCouponSent(
    location,
    undefined
  );
  const [isDetailedView, setDetailedView] = useState(false);
  const introId = location.pathname.substring(
    location.pathname.lastIndexOf("/") + 1
  );

  console.log(couponList);

  if (!isLoading) {
    return (
      <div>
        <Transition show={!isDetailedView}>
          <TimeLineItem
            introId={introId}
            inviteDetails={inviteDetails}
            onClick={() => setDetailedView(true)}
          />
        </Transition>
        <Transition
          show={isDetailedView}
          enter="transition-opacity ease-linear duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transition-opacity ease-linear duration-300"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <Intro />
        </Transition>
        <ol className="mt-5 min-w-[570px] max-w-[570px] relative border-l border-gray-400 dark:border-gray-700 mx-auto">
          <li className="mb-10 ml-6">
            <span className="flex absolute -left-2 justify-center items-center w-3 h-3 bg-blue-500 rounded-full ring-8 ring-white dark:ring-gray-900 dark:bg-blue-900"></span>
            <div className="justify-between items-center p-4 bg-blue-100 rounded-lg border border-gray-200 shadow-sm sm:flex dark:bg-gray-700 dark:border-gray-600">
              <time className="mb-1 text-xs font-normal text-gray-400 sm:order-last sm:mb-0">
                <TimeAgo datetime={inviteDetails.createdAt} />
              </time>
              <div className="text-sm font-normal text-gray-500 dark:text-gray-300">
                Intro cards sent to{" "}
                <a
                  href={"https://twitter.com/" + inviteDetails.fromHandle}
                  target="_blank"
                  rel="noreferrer"
                  className="font-semibold text-blue-600 dark:text-blue-500 hover:underline"
                >
                  {inviteDetails.fromHandle}
                </a>{" "}
                and{" "}
                <a
                  href={"https://twitter.com/" + inviteDetails.toHandle}
                  target="_blank"
                  rel="noreferrer"
                  className="font-semibold text-blue-600 dark:text-blue-500 hover:underline"
                >
                  {inviteDetails.toHandle}
                </a>{" "}
              </div>
            </div>
          </li>
          {!isListLoaded &&
            viewData.map((view) => {
              return (
                <li className="mb-10 ml-6" key={view.viewId}>
                  <span className="flex absolute -left-2 justify-center items-center w-3 h-3 bg-blue-200 rounded-full ring-8 ring-white dark:ring-gray-900 dark:bg-blue-900">
                    <img
                      className="rounded-full shadow-lg"
                      src="https://via.placeholder.com/150/0000FF/"
                      alt="Thomas Lean"
                    />
                  </span>
                  <div className="p-4 bg-blue-100 rounded-lg border border-gray-200 shadow-sm dark:bg-gray-700 dark:border-gray-600">
                    <div className="justify-between items-center sm:flex">
                      <time className="mb-1 text-xs font-normal text-gray-400 sm:order-last sm:mb-0">
                        <TimeAgo datetime={view.createdAt} />
                      </time>
                      <div className="text-sm font-normal text-gray-500 lex dark:text-gray-300">
                        <a
                          href={"https://twitter.com/" + view.handleName}
                          className="font-semibold text-blue-600 dark:text-white hover:underline"
                          target="_blank"
                          rel="noreferrer"
                        >
                          {view.handleName}
                        </a>{" "}
                        viewed intro card.{" "}
                      </div>
                    </div>
                  </div>
                </li>
              );
            })}
            {isCouponSent &&
              couponList.map((coupon) => {
                return (
                  <li className="mb-10 ml-6" key={coupon.createdAt}>
                    <span className="flex absolute -left-2 justify-center items-center w-3 h-3 bg-blue-200 rounded-full ring-8 ring-white dark:ring-gray-900 dark:bg-blue-900">
                      <img
                        className="rounded-full shadow-lg"
                        src="https://via.placeholder.com/150/0000FF/"
                        alt="Thomas Lean"
                      />
                    </span>
                    <div className="p-4 bg-blue-100 rounded-lg border border-gray-200 shadow-sm dark:bg-gray-700 dark:border-gray-600">
                      <div className="justify-between items-center sm:flex">
                        <time className="mb-1 text-xs font-normal text-gray-400 sm:order-last sm:mb-0">
                          <TimeAgo datetime={coupon.createdAt} />
                        </time>
                        <div className="text-sm font-normal text-gray-500 lex dark:text-gray-300">
                          <a
                            href={"https://twitter.com/" + coupon.handleName}
                            className="font-semibold text-blue-600 dark:text-white hover:underline"
                            target="_blank"
                            rel="noreferrer"
                          >
                            {coupon.handleName}
                          </a>{" "}
                          sent you a{" "}
                          <Link
                            to={"/gifts/" + coupon.id}
                            className="font-semibold text-blue-600 dark:text-white hover:underline"
                            target="_blank"
                            rel="noreferrer"
                          >
                            gift
                          </Link>.{" "}
                        </div>
                      </div>
                    </div>
                  </li>
                );
              })}
        </ol>
      </div>
    );
  } else {
    return <CustomSpinner />;
  }
};

export default Intros;
