import { useState } from "react";
import { SocialMediaContext } from "../../store";
import PostCardLine from "./postCardLine";
import CardInput from "../cardInput";

const PostForm: React.FC = (props) => {
  const [socialText, setSocialText] = useState("");
  const [descText, setDescText] = useState("");
  return (
    <div className="justify-center">
      <SocialMediaContext.Provider value={{ socialText, setSocialText }}>
        <div className="grid grid-cols-3 items-baseline">
          <PostCardLine />
        </div>
        <CardInput
          type="text"
          className="w-full mt-5"
          placeholder="description"
          value={descText}
          onChange={(e) => {
            setDescText(e.target.value);
          }}
        />
      </SocialMediaContext.Provider>
    </div>
  );
};

export default PostForm;
