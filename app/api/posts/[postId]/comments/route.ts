import connectDB from "@/lib/db";
import { Post } from "@/models/post.model";
import { NextRequest, NextResponse } from "next/server";

//fetch all comments
export const GET = async (req: NextRequest) => {
  try {
    await connectDB();

    const url = new URL(req.url);
    const postId = url.pathname.split("/").pop();

    if (!postId) {
      return NextResponse.json(
        { error: "No post ID provided" },
        { status: 400 }
      );
    }

    const post = Post.findById(postId);

    if (!post) return NextResponse.json({ error: "post not found" });
    const comments = await post.populate({
      path: "comments",
      options: { sort: { createdAt: -1 } },
    });
    
    return NextResponse.json(comments);
  } catch {
    return NextResponse.json({ error: "an error occured" });
  }
};
