
import React from "react";

import { FeedInput } from "./FeedInput";
import { Posts } from "./Posts";

export const Feed = ({ user }: { user: any }) => {
  const userData = JSON.parse(JSON.stringify(user))
  return (
    <div className="bg-white w-full h-full">
      <FeedInput user={userData} />
      <Posts/>
     
    </div>
  );
};
