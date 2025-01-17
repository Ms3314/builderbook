import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { id, myid } = await request.json();

    if (!id || !myid) {
      return NextResponse.json(
        { success: false, message: "Both follower and following IDs are required." },
        { status: 400 }
      );
    }

    await prisma.follows.create({
      data: {
        followerId: myid,
        followingId: id,
      },
    });

    return NextResponse.json({
      success: true,
      message: "Follow operation successful.",
    },{status:200});
  } catch (error) {
    // console.error("Error creating follow:", error);
    return NextResponse.json({
      success: false,
      message: "An error occurred while processing the follow operation.",
      error: error.message,
    }, { status: 500 });
  }
}

