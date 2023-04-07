import { useState } from "react";

const RangeButtons: React.FC = (props) => {
  return (
    <div>
      <button className="p-2">
        <i className="fa-brands fa-twitter"></i>
      </button>
      <button className="p-2">
        <i className="fa-brands fa-linkedin"></i>
      </button>
      <button className="p-2">
        <i className="fa-solid fa-envelope"></i>
      </button>
    </div>
  );
};

export default RangeButtons;
