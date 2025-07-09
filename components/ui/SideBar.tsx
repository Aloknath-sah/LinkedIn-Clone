import Image from 'next/image'
import React from 'react'
import { ProfilePhoto } from '../shared/ProfilePhoto'
import { getAllPosts } from '@/lib/serveractions'

export const SideBar = async ({user}: {user: any}) => {
  
  const posts = await getAllPosts();

  return (
    <div className='hidden md:block h-fit w-full rounded-xl bg-white border border-gray-200 overflow-hidden'>
      <div className='flex flex-col items-center relative border border-gray-300 bg-white ' >
        <div className='w-full h-[120px] overflow-hidden'>
          
          {
            user && (
              <Image src={"/banner.jpg"} alt="Banner" width={100} height={100} className='w-full h-full rounded-top' />
            )
          }
        </div>
        <div className='absolute
            left-1/2 -translate-x-1/2 
            md:left-6 md:translate-x-0 
            top-[70px]'>
          <ProfilePhoto src={user? user?.imageUrl: "/banner.jpg"} size="w-28 h-28" />
        </div>
        <div style={{marginTop: '50px'}} className='w-full border-b border-b-gray-300'>
          <div className='p-2 mt-5 text-center font-bold'>
            <h1>{user ? `${user?.firstName} ${user?.lastName}` : "User"} </h1>
            <p>{user ? `${user?.username}` : "username" } </p>
          </div>
          <div className='text-xs'>
            <div className='w-[100%] flex justify-between items-center px-3 py-2 hover:bg-gray-200 cursor-pointer'>
              <p className='text-left' >Post Impression</p>
              <p className='text-blue-500 font-bold text-right'>88 </p>
            </div>
             <div className='w-[100%] flex justify-between items-center px-3 py-2 hover:bg-gray-200 cursor-pointer'>
              <p className='text-left' >Posts</p>
              <p className='text-blue-500 font-bold text-right'>{posts.length} </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
