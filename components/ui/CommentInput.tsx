"use client"
import React from 'react'
import { ProfilePhoto } from '../shared/ProfilePhoto'
import { useUser } from '@clerk/nextjs'
import { Input } from './input'
import { Button } from './button'
import { createCommentAction } from '@/lib/serveractions'

export const CommentInput = ({postId}: {postId: string}) => {
    const {user} = useUser();
    
    const commentActionHandler = async (formData: FormData) => {
        try {
            if(!user) throw new Error("User not authenticated")
            await createCommentAction(postId, formData)
        }
        catch {
            throw new Error("An error occured")
        }
    }
  return (
    <form action={(formData) => commentActionHandler(formData)} >
        <div className='flex items-center gap-2'>
            <ProfilePhoto src={user?.imageUrl ?? "/banner.jpg" } />
            <Input type="text" name="inputText" placeholder="Add a comment" className='rounded-full' />
            <Button variant={'outline'} className='rounded-full'>Send</Button>
        </div>
    </form>
  )
}
