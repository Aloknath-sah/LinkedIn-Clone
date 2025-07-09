'use client';
import React, { useState } from 'react'
import { Input } from "./input";
import { ProfilePhoto } from '../shared/ProfilePhoto';
import { PostDialog } from './PostDialog';

export const FeedInput = ({ user }: { user: any }) => {
  const [open, setOpen] = useState<boolean>(false)
  const inputHandler = () => {
    setOpen(true)
  }
  if(!user) return null
  return (
    <div className='w-full rounded-md'>
    
       <div className="w-full p-4 m-2 md:m-0 border border-gray-300 rounded-lg flex justify-between" >
        <div className="" >
         <ProfilePhoto src={user? user?.imageUrl: "/banner.jpg"} />
        </div>
        <div className="w-full ml-5" >
          <Input type="text" placeholder="Start a post" className='rounded-full hover:bg-gray-100' onClick={inputHandler} />
        </div>
        
      </div>
      <PostDialog setOpen={setOpen} open={open} src={user.imageUrl} />

      <div className="w-full flex justify-between">
        <div> </div>
        <div></div>
        <div></div>
      </div>
    </div>
  )
}
