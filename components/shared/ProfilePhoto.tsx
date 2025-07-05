import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export const ProfilePhoto = ({src}: {src: string}) => {
  return (
    <div>
      <Avatar>
        <AvatarImage src={src} alt="banner"/>
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
    </div>
  );
};
