import React, { JSX } from "react";
import {
  Bell,
  BriefcaseBusiness,
  HomeIcon,
  MessageCircleMore,
  Users,
} from "lucide-react";
import Link from "next/link";

interface NAVITEMS {
  src: string;
  icon: JSX.Element;
  text: string;
}

const navItems: NAVITEMS[] = [
  {
    src: "/home",
    icon: <HomeIcon />,
    text: "Home",
  },
  {
    src: "/networks",
    icon: <Users />,
    text: "Network",
  },
  {
    src: "/job",
    icon: <BriefcaseBusiness />,
    text: "Jobs",
  },
  {
    src: "/message",
    icon: <MessageCircleMore />,
    text: "Messaging",
  },
  {
    src: "/notification",
    icon: <Bell />,
    text: "Notification",
  },
];

export const NavItems = () => {
  return (
    <div className="flex gap-8">
      {navItems.map((navitem, index) => (
        <div
          key={index}
          className="flex flex-col items-center cursor-pointer text-[#666666] hover:text-black"
        >
          <span>{navitem.icon} </span>
          <Link href={`${navitem.src}`} >{navitem.text} </Link>
        </div>
      ))}
    </div>
  );
};
