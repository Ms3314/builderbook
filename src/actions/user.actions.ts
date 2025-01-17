"use server"
// in production level applications we use something called the web hooks
import { prisma } from "@/lib/prisma"
import {  auth, currentUser } from "@clerk/nextjs/server"

export const syncUser = async () =>{
    try {
        const {userId} = await auth()
        const user = await currentUser()
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
                name : `${user.firstName || ""} ${user.lastName || ""} ${(!user.firstName && !user.lastName ) ? user.username ?? user.emailAddresses[0].emailAddress.split("@")[0] : null}`  ,
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

export async function getUserByClerkId(clerkId : string) {
    return prisma.user.findUnique({
        where : {
            clerkId ,
        },
        include : {
            _count : {
                select : {
                    followers : true,
                    following : true,
                    posts : true 
                }
            }
        }
    })
}


 
export async function getDbUserId () {
    const {userId : clerkId} = await auth()
    console.log(clerkId , "this is it ????")
    if(!clerkId) throw new Error("Unauthorized")

    const User = await getUserByClerkId(clerkId)
    if(!User) throw new Error("User is not found")
    return User.id
}
export async function getTheUser () {
    const {userId : clerkId} = await auth()
    if(!clerkId) throw new Error("Unauthorized")

    const User = await getUserByClerkId(clerkId)
    if(!User) throw new Error("User is not found")
    
    return User
}