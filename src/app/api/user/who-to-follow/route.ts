import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET () {
    try {
        const whofollow = await prisma.user.findMany({
            take : 5 ,
            orderBy : {
                createdAt : "desc"
            }
        })
        return Response.json({
            success : true ,
            message : "you have receieved some users you can follow",
            message : whofollow ,
        })
    } catch (error) {
        console.error(error)
        return Response.json({
            success : false,
            message : "Failed to create a post" ,
            error
        },{status : 500} )
    }
    
}