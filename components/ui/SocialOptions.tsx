import { MessageCircleMore, Repeat, Send, ThumbsUp } from 'lucide-react'
import React, { useState } from 'react'
import { Button } from './button'
import { IPostDocument } from '@/models/post.model';
import { useUser } from '@clerk/nextjs';
import { CommentInput } from './CommentInput';
import { Comments } from './Comments';

export const SocialOptions = ({post}: {post: IPostDocument}) => {
    const {user} = useUser();
    const [liked, setLiked] = useState(false);
    const [likes, setLikes] = useState(post.likes)
    const [commentOpen, setCommentOpen] = useState(false)

    const likeOrDislikeHandler = async () => {
        if(!user) throw new Error("user not authenticated");
        const tempLiked = liked
        const tempLikes = likes
        const dislike = liked ? likes?.filter((userId) => userId !== user?.id): likes;
        const like = [...(likes ?? []), user?.id];
        const newLike = liked ? dislike : like

        setLiked(!liked)
        setLikes(newLike)

        const res = await fetch(`/api/posts/${post._id}/${liked?'/dislike': 'like'}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user.id),
        })
        if(!res.ok) {
            setLiked(tempLiked);
            throw new Error("Failed to like or dislike")
        }
        const fetchAllLikes = await fetch(`/api/posts/${post._id}/like`);
        if(!fetchAllLikes.ok) {
            setLikes(tempLikes);
            throw new Error("Failed to fetch like")
        }
        const likedData = await fetchAllLikes.json()
        setLikes(likedData)
    }

  return (
    <div>
        <div>
            {
                likes && likes.length > 0 && (<p className='text-xm text-gray-500 hover:text-blue-500 hover:underline hover:cursor-pointer' >{likes.length} like </p>)
            }
            {
                post?.comments && post?.comments.length > 0 && (<p className='text-xm text-gray-500 hover:text-blue-500 hover:underline hover:cursor-pointer' >{post.comments.length} comment </p>)
            }
        </div>
        <div className="flex items-center m-1 justify-between">
            <Button onClick={likeOrDislikeHandler} variant={'ghost'} className="flex items-center gap-1 rounded-lg text-gray-600 hover:text-black cursor-pointer">
                <ThumbsUp className={`${liked && 'fill-[#ADD8E6]'}`} />
                <p className={`${liked && 'fill-[#ADD8E6]'}`}>Like</p>
            </Button>
            <Button variant={'ghost'} onClick={() => setCommentOpen(!commentOpen)} className="flex items-center gap-1 rounded-lg text-gray-600 hover:text-black cursor-pointer">
                <MessageCircleMore />
                <p>Message</p>
            </Button>
            <Button variant={'ghost'} className="flex items-center gap-1 rounded-lg text-gray-600 hover:text-black cursor-pointer">
                <Repeat/>
                <p>Repost</p>
            </Button>
            <Button variant={'ghost'} className="flex items-center gap-1 rounded-lg text-gray-600 hover:text-black cursor-pointer">
                <Send/>
                <p>Send</p>
            </Button>
        </div>
        {
            commentOpen && (
                <div>
                    <CommentInput postId={post._id} />
                    <Comments post={post} />
                </div>
            )
        }
    </div>
  )
}
