import React from "react";
import PostCard from "../postcard";

const withPostCardWrapper = (Component: any) => (props: any) => {
  return <PostCard>{<Component {...props} />}</PostCard>;
};

export default withPostCardWrapper;
