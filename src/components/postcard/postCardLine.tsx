import React, { useEffect, useRef, useState } from "react";
import CardInput from "../cardInput";

const PostCardLine: React.FC = (props) => {
  const [toTextBox, setToTextBox] = useState({
    value: "",
    isFocus: false,
  });
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
      <div className="flex" ref={toRef}>
        {/* <select
          name="options"
          id="options"
          className="text-[15px] bg-indian-post"
          onChange={(e) => handleOptionSelect(e.target.value)}
          value={selectedUrlOption}
        >
          {urlOptions.map((option, index) => (
            <option
              key={index}
              value={option.value}
              dangerouslySetInnerHTML={{ __html: option.label }}
            />
          ))}
        </select> */}

        <CardInput
          type="text"
          placeholder="Enter Twitter handle"
          onFocus={(e) => {
            setFromTextBox({ ...fromTextBox, isFocus: false });
            setToTextBox({ ...toTextBox, isFocus: true });
          }}
          onChange={(e) => {
            setToTextBox({ ...toTextBox, value: e.target.value });
          }}
          value={toTextBox.value}
        />
      </div>
      <div className="flex" ref={fromRef}>
        <select
          name="options"
          id="options"
          className="text-[15px] bg-indian-post"
          onChange={(e) => setSelectedOption(e.target.value)}
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
        {/* <select
          name="options"
          id="options"
          className="text-[15px] bg-indian-post"
          onChange={(e) => handleOptionSelect(e.target.value)}
          value={selectedUrlOption}
        >
          {urlOptions.map((option, index) => (
            <option
              key={index}
              value={option.value}
              dangerouslySetInnerHTML={{ __html: option.label }}
            />
          ))}
        </select> */}
        <CardInput
          type="text"
          placeholder="Enter Twitter handle"
          onFocus={(e) => {
            setToTextBox({ ...toTextBox, isFocus: false });
            setFromTextBox({ ...fromTextBox, isFocus: true });
          }}
          onChange={(e) => {
            setFromTextBox({ ...fromTextBox, value: e.target.value });
          }}
          value={fromTextBox.value}
        />
      </div>
    </React.Fragment>
  );
};

export default PostCardLine;
