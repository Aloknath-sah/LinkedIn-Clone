import Image from 'next/image'
import React from 'react'
import { ProfilePhoto } from '../shared/ProfilePhoto'

export const SideBar = ({user}: {user: any}) => {
  return (
    <div className='hidden md:block h-fit border border-gray-300 bg-white rounded-lg pt-25'>
      <div className='flex flex-col items-center relative' >
        <div className='w-full h-45 overflow-hidden'>
          
          {
            user && (
              <Image src={"/banner.jpg"} alt="Banner" width={200} height={200} className='w-full h-full rounded-top' />
            )
          }
        </div>
        <div className='my-1 absolute top-40'>
          <ProfilePhoto src={user? user?.imageUrl: "/banner.jpg"} />
        </div>
        <div className='w-full border-b border-b-gray-300'>
          <div className='p-2 mt-5 text-center font-bold'>
            <h1>{user ? `${user?.firstName} ${user?.lastName}` : "User"} </h1>
            <p>{user ? `${user?.username}` : "username" } </p>
          </div>
          <div className='text-xs'>
            <div className='w-[100%] flex justify-between items-center px-3 py-2 hover:bg-gray-200 cursor-pointer' >
              <p className='text-left' >Post Impression</p>
              <p className='text-blue-500 font-bold text-right'>88 </p>
            </div>
             <div className='w-[100%] flex justify-between items-center px-3 py-2 hover:bg-gray-200 cursor-pointer' >
              <p className='text-left' >Posts</p>
              <p className='text-blue-500 font-bold text-right'>0 </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
