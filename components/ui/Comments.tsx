import { ICommentDocument } from '@/models/comment.model'
import { IPostDocument } from '@/models/post.model'
import React from 'react'
import { Comment } from './Comment'

export const Comments = ({post}: {post: IPostDocument}) => {
  return (
    <div>
        {
            post?.comments?.map((comment: any) => {
                return (<Comment key={comment._id} comment={comment} />)
            })
        }
        
    </div>
  )
}
