import React, { useContext, useEffect, useRef, useState } from "react";
import CardInput from "../cardInput";
import { CardThemeContext, PostCardDetailsContext } from "../../store";
import SimpleReactValidator from "simple-react-validator";
import axios from "axios";
import { hostName } from "../../utils/changeUrl";
import { debounce } from "../../utils/addDebounceEffect";

const PostCardLine: React.FC<{
  sendTweetCallback: (
    validator: React.MutableRefObject<SimpleReactValidator>,
    forceUpdate: any
  ) => void;
}> = (props) => {
  const { cardDetails, setCardDetails } = useContext(PostCardDetailsContext);
  const [toTextBox, setToTextBox] = useState({
    value: "",
    isFocus: false,
    image: "",
  });
  const { themeColor } = useContext(CardThemeContext);
  const [descText, setDescText] = useState("");
  const simpleValidator = useRef(
    new SimpleReactValidator({ autoForceUpdate: this })
  );
  const [, forceUpdate] = useState<any>();
  const [fromTextBox, setFromTextBox] = useState({
    value: "",
    isFocus: false,
    image: "",
  });
  const [options] = useState([
    {purpose:"Should talk to", prepo: "about"},
    {purpose:"Please meet", prepo: "to"},
    {purpose:"Should interview",prepo: "on"},
  ]);
  const [selectedOption, setSelectedOption] = useState({purpose:"Should talk to", prepo: "about"});
  const toRef = useRef(null);
  const fromRef = useRef(null);
  const [userHandleSearchList, setUserHandleSearchList] = useState([]);

  const setButtonTheme = () => {
    switch (themeColor) {
      case "default":
        return "mt-5 w-full rounded text-[14px] text-white bg-yellow-800 hover:bg-yellow-700 py-2";
      case "plain":
        return "mt-5 w-full rounded text-[14px] text-white bg-gray-800 hover:bg-gray-700 py-2";
      case "inland":
        return "mt-5 w-full rounded text-[14px] text-white bg-cyan-700 hover:bg-cyan-600 py-2";
      default:
        return "mt-5 w-full rounded text-[14px] text-white bg-yellow-800 hover:bg-yellow-700 py-2";
    }
  };

  const setPlaceHolderTheme = () => {
    switch (themeColor) {
      case "default":
        return "text-[15px] bg-indian-post";
      case "plain":
        return "text-[15px] bg-white";
      case "inland":
        return "text-[15px] bg-cyan-100";
      default:
        return "text-[15px] bg-indian-post";
    }
  };

  const debouncedListHandles = useRef(
    debounce(async (name) => {
      try {
        const userProfileList = (
          await axios.get(`${hostName}/usernames?name=${name}`, {
            headers: {
              Authorization: "Access-Control-Allow-Origin",
            },
          })
        ).data;
        if (userProfileList.status) {
          setUserHandleSearchList(userProfileList.userList);
        } else {
          setUserHandleSearchList([]);
        }
      } catch (error) {
        setUserHandleSearchList([]);
      }
    }, 800) // Adjust the delay as needed (e.g., 800ms)
  );

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (toRef.current && !toRef.current.contains(event.target)) {
        setToTextBox((prevState) => ({
          ...prevState,
          isFocus: false,
        }));
      }
      if (fromRef.current && !fromRef.current.contains(event.target)) {
        setFromTextBox((prevState) => ({
          ...prevState,
          isFocus: false,
        }));
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [toRef, fromRef]);

  return (
    <React.Fragment>
      <div className="flex mb-4 flex-nowrap items-center">
        <div className="w-1/3" ref={toRef}>
          <div className="flex items-center">
            <span className="text-[15px]">@</span>
            <div className="relative">
              <CardInput
                type="text"
                name="toHandle"
                maxLength={80}
                placeholder="Enter Twitter handle"
                onFocus={(e) => {
                  setFromTextBox({ ...fromTextBox, isFocus: false });
                  setToTextBox({ ...toTextBox, isFocus: true });
                }}
                onChange={(e) => {
                  if (e.target.value !== "") {
                    debouncedListHandles.current(e.target.value);
                  }
                  setToTextBox({ ...toTextBox, value: e.target.value });
                  setCardDetails({ ...cardDetails, toHandle: e.target.value });
                }}
                value={toTextBox.value}
              />
              {/* Autocomplete dropdown */}
              {toTextBox.isFocus && (
                <div className="absolute top-full left-0 z-10 w-full max-h-48 overflow-y-auto bg-white border border-gray-300 rounded-b-md shadow-lg">
                  {userHandleSearchList.length > 0 ? (
                    userHandleSearchList.map((user) => {
                      return (
                        <div
                          key={user.id}
                          className="flex items-center px-4 py-2 cursor-pointer hover:bg-gray-100"
                          onClick={() => {
                            setToTextBox({
                              ...toTextBox,
                              value: user.screen_name,
                              isFocus: false,
                              image: user.profile_image_url,
                            });
                            setCardDetails({
                              ...cardDetails,
                              toHandleImage: user.profile_image_url,
                              toHandle: user.screen_name,
                            });
                            setUserHandleSearchList([]);
                          }}
                        >
                          <img
                            src={user.profile_image_url}
                            alt={user.screen_name}
                            className="w-6 h-6 rounded-full mr-2"
                          />
                          <span className="text-[12px]">
                            {user.screen_name}
                          </span>
                        </div>
                      );
                    })
                  ) : (
                    <div className="text-[12px]">handle cannot be found</div>
                  )}
                </div>
              )}
            </div>
          </div>
          {simpleValidator.current.message(
            "toHandle",
            toTextBox.value,
            "required|regex:^[a-zA-Z0-9]*$",
            {
              messages: {
                regex: "Can only contain letter, spaces",
              },
            }
          )}
        </div>
        <div className="w-1/3">
          <div className="flex justify-center">
            <select
              name="options"
              id="options"
              className={setPlaceHolderTheme()}
              onChange={(e) => {
                const filteredOption = options.find((option) => option.purpose === e.target.value);
                setSelectedOption({purpose:e.target.value, prepo:filteredOption.prepo});
                setCardDetails({ ...cardDetails, purpose: e.target.value, desc: filteredOption.prepo+" "+descText});
              }}
              value={selectedOption.purpose}
            >
              {options.map((data, index) => {
                return (
                  <option key={index} value={data.purpose}>
                    {data.purpose}
                  </option>
                );
              })}
            </select>
          </div>
        </div>
        <div className="w-1/3" ref={fromRef}>
          <div className="flex items-center">
            <span className="text-[15px]">@</span>
            <div className="relative">
              <CardInput
                type="text"
                name="fromHandle"
                maxLength={80}
                placeholder="Enter Twitter handle"
                onFocus={(e) => {
                  setToTextBox({ ...toTextBox, isFocus: false });
                  setFromTextBox({ ...fromTextBox, isFocus: true });
                }}
                onChange={(e) => {
                  if (e.target.value !== "") {
                    debouncedListHandles.current(e.target.value);
                  }
                  setFromTextBox({ ...fromTextBox, value: e.target.value });
                  setCardDetails({
                    ...cardDetails,
                    fromHandle: e.target.value,
                  });
                }}
                value={fromTextBox.value}
              />
              {/* Autocomplete dropdown */}
              {fromTextBox.isFocus && (
                <div className="absolute top-full left-0 z-10 w-full max-h-48 overflow-y-auto bg-white border border-gray-300 rounded-b-md shadow-lg">
                  {userHandleSearchList.length > 0 ? (
                    userHandleSearchList.map((user) => {
                      return (
                        <div
                          key={user.id}
                          className="flex items-center px-4 py-2 cursor-pointer hover:bg-gray-100"
                          onClick={() => {
                            setFromTextBox({
                              ...fromTextBox,
                              value: user.screen_name,
                              isFocus: false,
                              image: user.profile_image_url,
                            });
                            setCardDetails({
                              ...cardDetails,
                              fromHandleImage: user.profile_image_url,
                              fromHandle: user.screen_name,
                            });
                            setUserHandleSearchList([]);
                          }}
                        >
                          <img
                            src={user.profile_image_url}
                            alt={user.screen_name}
                            className="w-6 h-6 rounded-full mr-2"
                          />
                          <span className="text-[12px]">
                            {user.screen_name}
                          </span>
                        </div>
                      );
                    })
                  ) : (
                    <div className="text-[12px]">handle cannot be found</div>
                  )}
                </div>
              )}
            </div>
          </div>
          {simpleValidator.current.message(
            "fromHandle",
            fromTextBox.value,
            "required|regex:^[a-zA-Z0-9]*$",
            {
              messages: {
                regex: "Can only contain letter,number & spaces",
              },
            }
          )}
        </div>
      </div>

      <div className="w-full">
        <div className="flex items-center">
          <span className="text-[15px] mt-5 pr-2 italic font-bold">{selectedOption.prepo}</span>
          <CardInput
            type="text"
            name="description"
            className="w-full mt-5"
            placeholder="description"
            maxLength={200}
            value={descText}
            onChange={(e) => {
              setDescText(e.target.value);
              setCardDetails({ ...cardDetails, desc: selectedOption.prepo+" "+e.target.value });
            }}
          />
          {simpleValidator.current.message(
            "description",
            descText,
            "required",
            {
              messages: {
                regex: "Can only contain letter, spaces",
              },
            }
          )}
        </div>

        <div className="mt-4">
          <button
            className={setButtonTheme()}
            onClick={() =>
              props.sendTweetCallback(simpleValidator, forceUpdate)
            }
          >
            Submit
          </button>
        </div>
      </div>
    </React.Fragment>
  );
};

export default PostCardLine;
