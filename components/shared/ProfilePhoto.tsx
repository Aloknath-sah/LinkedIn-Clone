import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export const ProfilePhoto = ({src, size = "w-14 h-14",}: {src: string; size?: string;}) => {
  return (
    <div>
      <Avatar className={size} >
        <AvatarImage src={src} alt="banner"/>
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
    </div>
  );
};
