"use server";
import { Post } from "@/models/post.model";
import { currentUser } from "@clerk/nextjs/server";
import { v2 as cloudinary } from "cloudinary";
import connectDB from "./db";
import { IUser } from "@/models/user.model";

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
  secure: true,
});

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
  } catch (err: any) {
    throw new Error(err);
  }
};
