import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";



export async function DELETE (request: Request , params : {params : string }) {
    try {
        // @ts-expect-error-SHUSHHHHH
        const { id, myid } =  (params.params);
        console.log(id, myid, "the params");
        // console.log(searchParams , "these are the search params")
        // const id = searchParams.get("id");
        // const myid = searchParams.get("myid");
        console.log(id, myid, "follow esist is being called ");
        if (!id || !myid) {
            return NextResponse.json(
                { success: false, message: "Both follower and following IDs are required." },
                { status: 400 }
            );
        }
      
      await prisma.follows.delete({ 
          where : {
              followerId_followingId : {
                  followerId : myid ,
                  followingId : id 
              }
          }
      },);
      return NextResponse.json({
        success: true,
        message: "delete operation successful.",
      },{status:200});
    } catch (error) {
      return NextResponse.json({
        success: false,
        message: "An error occurred while processing the delete operation.",
        error 
      }, { status: 500 });
    }
  }