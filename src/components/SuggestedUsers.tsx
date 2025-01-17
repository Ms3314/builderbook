import axios from "axios"
import { Avatar } from "./ui/avatar"
import { AvatarFallback, AvatarImage } from "@radix-ui/react-avatar"
import FollowButtonClient from "./FollowButtonClient"
import { getDbUserId } from "@/actions/user.actions"
import { Card } from "./ui/card"
import { User } from "@clerk/nextjs/server"

export async function SuggestedUsers  () {
    const myid = await getDbUserId()
    const response = await axios.get("http://localhost:3000/api/user/who-to-follow")
    const content = response.data.payload
    

    return (
    <Card className="p-3 flex-col items-center justify-center">
    <h1 className=" mb-5 font-semibold self-center ml-20 text-xl">People to Follow</h1>
    <div className="flex flex-col gap-5">
        {
        // @ts-expect-error-shusshh
        content.map((data , index)=>(
            <div key={index} className="p-1 grid grid-cols-10  ">
                <div className="col-span-2">
                    <Avatar>
                        <AvatarImage src={data.image} alt="@samikpk" />
                        <AvatarFallback>{data.name}</AvatarFallback>
                    </Avatar>
                </div>
                <div className="col-span-5">
                    <p className="text-md">{data.name}</p>
                    <p className="text-sm text-slate-400">{data.username}</p>
                </div>
                <div className="col-span-3 ">
                    <FollowButtonClient id={data.id} myid={myid} />
                </div>
            </div>
        ))
        }

    </div>
    </Card>
  )
}

