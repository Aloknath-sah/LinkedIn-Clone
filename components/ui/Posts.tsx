import React from 'react'
import { Post } from './Post'
import { IPostDocument } from '@/models/post.model'

export const Posts = ({posts}: {posts: IPostDocument[]}) => {
  return (
    <div>
      {
        posts.map((post) => (
          <Post key={post._id} post={post} />
        ))
      }
    </div>
  )
}
