import React from "react";
import { FeedInput } from "./FeedInput";
import { Posts } from "./Posts";
import { getAllPosts } from "@/lib/serveractions";
import type { User } from "@clerk/nextjs/server";

export const Feed = async ({ user }: { user: User | null  }) => {

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
