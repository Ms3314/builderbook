import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { id, myid } = await request.json();
    console.log("follow esist is being called ")
    if (!id || !myid) {
      return NextResponse.json(
        { success: false, message: "Both follower and following IDs are required." },
        { status: 400 }
      );
    }
    
    const data = await prisma.follows.findUnique({
        where : {
            followerId_followingId : {
                followerId : myid ,
                followingId : id 
            }
        }
    },);
    if(data) {
        return NextResponse.json({
            success: true,
            message: "Follow operation successful.",
        },{status:200});
    } else {
        return NextResponse.json({
            success : false ,
            message : "Follow not fount"
        },{status : 402})
    }
  } catch (error) {
    console.error("Error creating follow:", error);
    return NextResponse.json({
      success: false,
      message: "An error occurred while processing the follow operation.",
    }, { status: 500 });
  }
}
