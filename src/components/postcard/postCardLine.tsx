import React, { useContext, useEffect, useRef, useState } from "react";
import CardInput from "../cardInput";
import { PostCardDetailsContext } from "../../store";
import SimpleReactValidator from "simple-react-validator";

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
  });
  const [descText, setDescText] = useState("");
  const simpleValidator = useRef(
    new SimpleReactValidator({ autoForceUpdate: this })
  );
  const [, forceUpdate] = useState<any>();
  const [fromTextBox, setFromTextBox] = useState({
    value: "",
    isFocus: false,
  });
  const [options] = useState([
    "Should talk to",
    "Please meet",
    "Should interview",
  ]);
  const [selectedOption, setSelectedOption] = useState("Should talk to");
  const toRef = useRef(null);
  const fromRef = useRef(null);
  const [urlOptions] = useState([
    {
      value: "https://twitter.com/",
      label: '<i class="fab fa-twitter"></i> Twitter',
    },
    {
      value: "https://linkedin.com/",
      label: '<i class="fab fa-linkedin"></i> LinkedIn',
    },
  ]);
  const [selectedUrlOption, setSelectedUrlOption] = useState("");

  const handleOptionSelect = (option) => {
    if (toTextBox.isFocus) {
      setToTextBox((prevState) => ({
        ...prevState,
        value: option,
        isFocus: false,
      }));
    } else {
      setFromTextBox((prevState) => ({
        ...prevState,
        value: option,
        isFocus: false,
      }));
    }
    setSelectedUrlOption(option);
  };

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
      <div className="flex mb-4 flex-nowrap">
        <div className="w-1/3" ref={toRef}>
          <div className="flex">
            <span className="text-[15px]">@</span>
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
                setToTextBox({ ...toTextBox, value: e.target.value });
                setCardDetails({ ...cardDetails, toHandle: e.target.value });
              }}
              value={toTextBox.value}
            />
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
            className="text-[15px] bg-indian-post"
            onChange={(e) => {
              setCardDetails({ ...cardDetails, purpose: e.target.value });
              setSelectedOption(e.target.value);
            }}
            value={selectedOption}
          >
            {options.map((data, index) => {
              return (
                <option key={index} value={data}>
                  {data}
                </option>
              );
            })}
          </select>
          </div>
        </div>
        <div className="w-1/3" ref={fromRef}>
          <div className="flex">
            <span className="text-[15px]">@</span>
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
                setFromTextBox({ ...fromTextBox, value: e.target.value });
                setCardDetails({ ...cardDetails, fromHandle: e.target.value });
              }}
              value={fromTextBox.value}
            />
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
        <CardInput
          type="text"
          name="description"
          className="w-full mt-5"
          placeholder="description"
          maxLength={200}
          value={descText}
          onChange={(e) => {
            setDescText(e.target.value);
            setCardDetails({ ...cardDetails, desc: e.target.value });
          }}
        />
        {simpleValidator.current.message("description", descText, "required", {
          messages: {
            regex: "Can only contain letter, spaces",
          },
        })}

        <div className="mt-4">
          <button
            className="bg-orange-400 mt-5 w-full text-[18px] text-white py-2"
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
