import { currentUser } from '@clerk/nextjs/server'
import React from 'react'
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { SignInButton, SignUpButton } from '@clerk/nextjs'
import Image from 'next/image'
import { Separator } from './ui/separator'
import { LocateIcon, PinIcon } from 'lucide-react'
import Link from 'next/link'
import { getUserByClerkId } from '@/actions/user.actions'


async function Sidebar() {
    const authUser = await currentUser()
    if(!authUser) return <UnAuthenticatedSidebar/>
    console.log(authUser.id , " this is the id")
    
    // const response = await axios.get(`http://localhost:3000/api/user/${authUser.id}`)
    // const data = await response.data.data
    // we created a methood and did this over POST most
    const data = await getUserByClerkId(authUser.id)
    console.log(data)
    return (
        <div>
          <Card className="w-[350px]">
            <CardHeader>
              <div className="text-white flex flex-col gap-2 justify-center items-center">
                <Image
                  src={authUser.imageUrl}
                  alt={authUser.firstName || "image of user"}
                  width={80}
                  height={80}
                  className="rounded-full"
                />
                
                <h2 className="text-lg">{data?.name}</h2>
                <Link href={`/profile/${data?.username}`}>
                    <p className="cursor-pointer text-md text-slate-400">{data?.username || "No username provided"}</p>
                </Link>
                <p className="text-sm text-slate-400">{data?.bio || "No bio" }</p>
              </div>
            </CardHeader>
            <CardDescription>
                <Separator orientation="horizontal" className='w-full border-slate-200 my-2' />
              <div className="flex flex-row justify-around pt-3 items-center">
                <div className="flex flex-col items-center">
                  <p className="text-xl">{data?._count.followers}</p>
                  <p>Followers</p>
                </div>
                <Separator orientation="vertical" className="h-10 w-[1px] bg-slate-200 mx-4" />
                <div className="flex flex-col items-center">
                  <p className="text-xl">{data?._count.following}</p>
                  <p>Following</p>
                </div>
              </div>
            </CardDescription>
            <CardFooter>
                {
                    ( data?.location !=null || data?.website != null ) &&
                    <Separator orientation="horizontal" className="w-full border-slate-200 my-2" />
                }
              <div className='flex flex-col'>
                {
                data?.location != null && (
                    <div className='flex flex-row'>
                        <LocateIcon />  
                        <p>{data?.location}</p>
                    </div> )
                }
                {
                data?.website != null && (
                    <div>
                        <PinIcon />
                        <p>{data?.website}</p>
                     </div>
                )
                }
              </div>
            </CardFooter>
          </Card>
        </div>
      );
    }



 function UnAuthenticatedSidebar() {
  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Welcome Back</CardTitle>
        <CardDescription>Logic to access your profile and connect with devs like you</CardDescription>
      </CardHeader>
      <CardContent className="flex gap-3 flex-col">
        <SignInButton mode='modal'>
            <Button className='w-full' variant="outline">Sign in</Button>
        </SignInButton>
        <SignUpButton mode='modal'>
            <Button className='w-full'>Sign up</Button>
        </SignUpButton>
     </CardContent>
    </Card>
  )
}

export default Sidebar
