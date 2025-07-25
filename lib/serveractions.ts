"use server";
import { Post } from "@/models/post.model";
import { currentUser } from "@clerk/nextjs/server";
import { v2 as cloudinary } from "cloudinary";
import connectDB from "./db";
import { IUser } from "@/models/user.model";
import { revalidatePath } from "next/cache";
import { Comment } from "@/models/comment.model";

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
  secure: true,
});

// creating post using server actions
export const createPostAction = async (
  inputText: string,
  selectedFile: string
) => {
  await connectDB();
  console.log("connected");
  const user = await currentUser();
  if (!user) throw new Error("User not authenticated");
  if (!inputText) throw new Error("Input field is required");

  const image = selectedFile;

  const userDatabase: IUser = {
    firstName: user.firstName || "Alok",
    lastName: user.lastName || "sah",
    userId: user.id,
    profilePhoto: user.imageUrl,
  };

  let uploadResponse;

  try {
    //create post with image
    if (image) {
      uploadResponse = await cloudinary.uploader.upload(image);

      await Post.create({
        description: inputText,
        user: userDatabase,
        imageUrl: uploadResponse?.secure_url,
      });
    } else {
      await Post.create({
        description: inputText,
        user: userDatabase,
      });
    }
    revalidatePath("/");
  } catch {
    throw new Error("An error occured");
  }
};

//get all post using server actions
export const getAllPosts = async () => {
  await connectDB();
  try {
    const posts = await Post.find().sort({ createdAt: -1 }).populate({path: 'comments', options: {sort: {createdAt: -1}}});
    if(!posts) return [];
    return JSON.parse(JSON.stringify(posts));
  } catch (error) {
    console.log(error);
    return [];
  }
};

//delete post by id
export const deletePostAction = async (postId: string) => {
  await connectDB();
  const user = await currentUser();
  if (!user) throw new Error("User not authenticated");
  const post = await Post.findById(postId);
  if (!post) throw new Error("Post not found");

  //delete only your post only not others
  if (post.user.userId !== user.id) {
    throw new Error("You are not an owner of this post");
  }

  try {
    await Post.deleteOne({ _id: postId });
    revalidatePath("/");
  } catch {
    throw new Error("An error occured");
  }
};

export const createCommentAction = async (
  postId: string,
  formData: FormData
) => {
  try {
    const user = await currentUser();
    if (!user) throw new Error("User not authenticated");
    const inputText = formData.get("inputText") as string;
    if (!inputText) throw new Error("field is required");
    if (!postId) throw new Error("postId is required");

    const userDatabase: IUser = {
      firstName: user.firstName || "Alok",
      lastName: user.lastName || "sah",
      userId: user.id,
      profilePhoto: user.imageUrl,
    };

    const post = await Post.findById({ _id: postId });
    if (!post) throw new Error("post not found");

    const comment = await Comment.create({
      textMessage: inputText,
      user: userDatabase,
    });

    post.comments?.push(comment._id);
    await post.save();
    revalidatePath("/");

  } catch {
    throw new Error("error occured");
  }
};
