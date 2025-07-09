"use client";
import React from "react";
import { ProfilePhoto } from "../shared/ProfilePhoto";
import { useUser } from "@clerk/nextjs";
import { Button } from "./button";
import { Trash2 } from "lucide-react";
import { Badge } from "./badge";
import { IPost } from "@/models/post.model";
import { PostContent } from "./PostContent";
import { SocialOptions } from "./SocialOptions";
import TimeAgoComponent from "./TimeAgo";
import { deletePostAction } from "@/lib/serveractions";

export const Post = ({ post }: { post: IPost }) => {
  const { user } = useUser();
  const fullName = post?.user.firstName + " " + post?.user.lastName;
  const loggedInUser = user?.id === post?.user?.userId;

  return (
    <div className="bg-white my-2 rounded-lg border-gray-300">
      <div className="flex gap-2 p-4">
        <ProfilePhoto src={post?.user?.profilePhoto || "/banner.jpg"} />

        <div className="flex w-full">
          <div>
            <div className="flex justify-center w-full">
              <h1 className="text-sm font-bold">{fullName} </h1>
              <Badge variant={"secondary"}>You</Badge>
            </div>

            <p className="text-xs text-gray-500">
              @{user ? user?.username : "username"}
            </p>
            <p className="text-xs text-gray-500">
              <TimeAgoComponent date={post.createdAt} />
            </p>
          </div>
        </div>
        <div>
          {loggedInUser && (
            <Button
              onClick={() => {
                deletePostAction(post._id);
              }}
              size={"icon"}
              className="rounded-full cursor-pointer"
              variant={"outline"}
            >
              <Trash2 />
            </Button>
          )}
        </div>
      </div>

      <PostContent post={post} />
      <SocialOptions post={post} />
    </div>
  );
};
