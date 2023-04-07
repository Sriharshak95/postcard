import React, { useState } from "react";

const PostCardLine: React.FC = (props) => {
  const [value1, setValue1] = useState("");
  const [value2, setValue2] = useState("");
  const [options, setOptions] = useState(["Should talk to", "Please meet", "Should interview" ]);
  return (
    <React.Fragment>
      <input
        type="text"
        className="text-[15px] border-b-2 bg-indian-post border-black focus:border-transparent focus:ring-0 focus:outline-none"
        onChange={(e) => setValue1(e.target.value)}
        value={value1}
      />
      <select name="cars" id="cars" className="text-[15px] bg-indian-post">
        {options.map((data, index) => {
            return (<option key={index} value={data}>{data}</option>)
        })}
      </select>
      <input
        type="text"
        className="text-[15px] border-b-2 border-black bg-indian-post focus:border-transparent focus:ring-0 focus:outline-none"
        onChange={(e) => setValue2(e.target.value)}
        value={value2}
      />
    </React.Fragment>
  );
};

export default PostCardLine;
