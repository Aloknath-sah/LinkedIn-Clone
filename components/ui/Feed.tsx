import React from "react";

import { FeedInput } from "./FeedInput";
import { Posts } from "./Posts";
import { getAllPosts } from "@/lib/serveractions";

export const Feed = async ({ user }: { user: any }) => {
  const userData = JSON.parse(JSON.stringify(user));
  const posts = await getAllPosts();
  return (
    <div className="bg-white w-full h-full rounded-2xl">
      <FeedInput user={userData} />

      <div className="bg-gray-200 h-4 w-full" />

      <Posts posts={posts} />
    </div>
  );
};
