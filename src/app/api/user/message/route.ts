import { getDbUserId } from "@/actions/user.actions";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

export async function POST (request : Request ) {
    try {
        const userid = await getDbUserId()
        const {message , image} = await request.json() ;
        console.log(message , image , "this is the message "); 
        const post = await prisma.post.create({
            data : {
                authorid :userid ,
                content : message ,
                image , 
            } 
        })
        revalidatePath("/");
        return NextResponse.json({
            success : true ,
            post 
        },{status : 200})

    } catch (error) {
        console.error(error)
        return NextResponse.json({
            success : false,
            message : "Failed to create a post" ,
            error
        },{status : 500} )
    }
    
}