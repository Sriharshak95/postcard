import { useContext, useState } from "react";
import { Tab } from "@headlessui/react";
import CardInput from "../cardInput";
import In from "../../pages/in";
import { db } from "../../utils/firebase";
import { addDoc, collection } from "firebase/firestore";
import { CouponVisibleContext } from "../../store";
import useInviteDetails from "../../hooks/useInviteDetails";
import { useLocation } from "react-router-dom";
import { DateTime } from "luxon";

function TabbedCard({ handleName }) {
  const [selectedTab, setSelectedTab] = useState(0);
  const location = useLocation();
  const [messageInfo, setMessageInfo] = useState({type:"", message: ""});
  const tabs = [
    { id: 0, title: "Mentorship", content: "This is the content of Tab 1" },
    { id: 1, title: "Coupon", content: "This is the content of Tab 2" },
    { id: 2, title: "Trust Card", content: "This is the content of Tab 3" },
  ];
  const { isCouponsVisible, setCouponsVisible } =
    useContext(CouponVisibleContext);
  const thankId = location.pathname.substring(
    location.pathname.lastIndexOf("/") + 1
  );
  const { inviteDetails, isLoading } = useInviteDetails(location);
  const [couponCode, getCouponCode] = useState("");

  const sendCoupon = async () => {
    //needed introducerId, message, from whom handle?
    const objectGift = {
      message: messageInfo.type === "calendly" ? "https://calendly.com/" + messageInfo.message : messageInfo.message,
      introducer: inviteDetails.introducer,
      type:messageInfo.type,
      handleName,
      thankId,
      createdAt: DateTime.now().toISO(),
      updatedAt: DateTime.now().toISO(),
    };

    const savedDetails = await addDoc(collection(db, "gifts"), objectGift);
    if (savedDetails.id) {
      setMessageInfo({type:"", message: ""});
      setCouponsVisible(false);
    }
  };

  return (
    <div className="w-full max-w-md px-2 py-16 sm:px-0">
      <button
        onClick={() => setCouponsVisible(false)}
        className="px-2 py-1 text-gray-500 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-300 rounded"
      >
        <i className="fa-solid fa-xmark"></i>
      </button>
      <Tab.Group defaultIndex={selectedTab} onChange={setSelectedTab}>
        <div className="px-4 py-2">
          <Tab.List className="flex justify-between rounded-xl bg-blue-900/20 p-1">
            {tabs.map((tab) => (
              <Tab
                key={tab.id}
                className={({ selected }) =>
                  `${
                    selected
                      ? "border-indigo-500 text-indigo-600"
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  } py-4 px-1 border-b-2 font-medium text-sm`
                }
              >
                {tab.title}
              </Tab>
            ))}
          </Tab.List>
        </div>
        <div className="px-4 py-2">
          <Tab.Panels>
            <Tab.Panel>
              <div className="text-[15px] bg-gray-200 p-2">
                Buy your time for the introducer...
              </div>
              <div className="flex text-gray-700 mt-2">
                <span className="text-[14px]">https://calendly.com/</span>
                <CardInput
                  type="text"
                  name="toHandle"
                  maxLength={80}
                  placeholder="Username"
                  onFocus={(e) => {}}
                  onChange={(e) => setMessageInfo({type:"calendly",  message:e.target.value})}
                  value={messageInfo.message}
                  className="w-full text-[14px]"
                />
              </div>
            </Tab.Panel>
            <Tab.Panel>
              <div className="text-gray-700">
                <In sendCouponCode={(code) => setMessageInfo({message:code, type:"coupon"})} />
              </div>
            </Tab.Panel>
            <Tab.Panel>
              <div className="text-gray-700">tab13r</div>
            </Tab.Panel>
          </Tab.Panels>
        </div>

        <button
          onClick={() => sendCoupon()}
          className="flex mx-auto bg-orange-700 text-[14px] text-white py-2 px-4 rounded-md hover:bg-gray-800 transition-colors"
        >
          Say Thanks
        </button>
      </Tab.Group>
    </div>
  );
}

export default TabbedCard;
