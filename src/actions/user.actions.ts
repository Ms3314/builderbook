"use server"
// in production level applications we use something called the web hooks
import { prisma } from "@/lib/prisma"
import {  auth, currentUser } from "@clerk/nextjs/server"

export const syncUser = async () =>{
    try {
        const {userId} = await auth()
        const user = await currentUser()
        console.log(user , "this is the user that i got")
        if(!user || !userId) return ;

        // check if user lrady exists
        const existingUser = await prisma.user.findUnique({
            where: {
                clerkId : userId ,
                
            } , 
        })
        if (existingUser) return existingUser ; 

        const dbUser = await prisma.user.create({
            data : {
                clerkId : userId || "" ,
                name : `${user.firstName || ""} ${user.lastName || ""}` ,
                username : user.username ?? user.emailAddresses[0].emailAddress.split("@")[0] ,
                email : user.emailAddresses[0].emailAddress ,
                image : user.imageUrl
            }
        })
        return dbUser
    } catch (error) {
        console.log("Error in sync user" , error)
    }
}