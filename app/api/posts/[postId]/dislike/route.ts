import connectDB from "@/lib/db";
import { Post } from "@/models/post.model";
import { NextRequest, NextResponse } from "next/server";

//post dislikes
export const POST = async (req: NextRequest) => {
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

    const userId = await req.json();
    const post = await Post.findById(postId);
    if (!post) return NextResponse.json({ error: "Post not found" });
    await post.updateOne({ $pull: { likes: userId } });
    return NextResponse.json({ message: "Post disliked successfully" });
  } catch {
    return NextResponse.json({ error: "An error occured" });
  }
};
