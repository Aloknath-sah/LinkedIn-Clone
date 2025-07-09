import Image from "next/image";
import React from "react";
import { SearchInput } from "./SearchInput";
import { NavItems } from "./NavItems";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import { Button } from "./button";

export const Navbar = () => {
  return (
    <div className="fixed w-full bg-white z-50 shadow-sm">
      <div className="flex items-center max-w-6xl justify-between h-14 mx-auto px-3">
        <div className="flex item-center gap-2">
          <Image src={"/download.png"} alt="logo" width={35} height={35} />
          <div className="md:block hidden">
            <SearchInput />
          </div>
        </div>
        <div className="flex items-center gap-5">
          <div className="md:block hidden">
            <NavItems />
          </div>
          <div>
            <SignedIn>
              <UserButton />
            </SignedIn>
            <SignedOut>
              <SignInButton mode="modal">
                <div>
                   <Image src={"/profileImg.png"} className="rounded-full ml-5" alt="logo" width={25} height={25} />
                <Button className="rounded-full cursor-pointer" variant={'secondary'}>Sign In</Button>
                </div>
               
              </SignInButton>
            </SignedOut>
          </div>
        </div>
      </div>
    </div>
  );
};
