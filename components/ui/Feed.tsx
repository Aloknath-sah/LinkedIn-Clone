
import React from "react";

import { FeedInput } from "./FeedInput";
import { Posts } from "./Posts";
import { getAllPosts } from "@/lib/serveractions";

export const Feed = async ({ user }: { user: any }) => {
  const userData = JSON.parse(JSON.stringify(user));
  const posts = await getAllPosts();
  console.log(posts)
  return (
    <div className="bg-white w-full h-full">
      <FeedInput user={userData} />
      <Posts posts={posts} />
     
    </div>
  );
};
