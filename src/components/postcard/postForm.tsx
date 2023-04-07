import { useState } from "react";
import PostCardLine from "./postCardLine";
import RangeButtons from "./rangeButtons";

const PostForm: React.FC = (props) => {
  return (
    <div className="justify-center">
      <div className="grid grid-cols-3 gap-4 items-baseline">
        <PostCardLine />
      </div>
      <RangeButtons />
    </div>
  );
};

export default PostForm;
