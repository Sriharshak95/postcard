import React from "react";
import PostCard from "../components/postcard";
import PostForm from "../components/postcard/postForm";

function Main() {
  return (
    <>
      <PostCard>
        <PostForm />
      </PostCard>
      <button className="bg-orange-400 mt-5 w-1/2 text-[18px] text-white py-2">
        Say Thanks
      </button>
    </>
  );
}

export default Main;
