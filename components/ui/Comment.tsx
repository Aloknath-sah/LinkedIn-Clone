import { ICommentDocument } from '@/models/comment.model'
import React from 'react'
import { ProfilePhoto } from '../shared/ProfilePhoto'
import ReactTimeAgo from 'react-time-ago'

export const Comment = ({comment}: {comment: ICommentDocument}) => {
  return (
    <div className='flex gap-2 my-4' >
        <div className='mt-2' >
            <ProfilePhoto src={comment?.user?.profilePhoto ?? "/banner.jpg" } />
        </div>
        <div className='flex flex-1 justify-between p-3 bg-gray-200' >
            <div>
                <h1 className='text-sm font-medium'>{`${comment.user.firstName} ${comment.user.lastName}`} </h1>
                <p className='text-xm text-gray-500'>@{comment.user.firstName} </p>
                <p className='my-2'> {comment.textMessage} </p>
            </div>
            <div>
                <p className='text-xs text-gray-500'>
                    <ReactTimeAgo date={new Date(comment.createdAt)} />    
                </p>
            </div>
        </div>
    </div>
  )
}
