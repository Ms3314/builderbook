"use client"

import axios from "axios"
import { Button } from "./ui/button"
import { useToast } from "@/hooks/use-toast"
import { useEffect, useState } from "react"
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
  } from "@/components/ui/alert-dialog"
  

function FollowButtonClient({id , myid} : {id:string , myid : string}) {
    const {toast} = useToast()
    const [followExist , setFollowExist] = useState(false)
    const [effectcomp , setEffectcomp] = useState(0)

    useEffect(()=>{
        console.log("use efffect is running ")
        async function doesfollowExist () {
            const response = await axios.post("http://localhost:3000/api/user/follow-exist" , {id , myid} )
            console.log(response.status , "the status for deos this exist or not")
            if (response.status == 200) {
                setFollowExist(true)
            }
            else if (response.status == 402) {
                setFollowExist(false)
            }
        }
        doesfollowExist()
    },[effectcomp , id , myid])

    const handleFollow = async () => {
        const response = await axios.post("http://localhost:3000/api/user/follow" , {id , myid})
        if(response.status == 200) {
            toast({
                title : "Followed successfull"
            })
            setEffectcomp(Math.random())
            setFollowExist(true)

        }
    }
    
    const handleUnfollow = async () => {
        const response = await axios.delete(`http://localhost:3000/api/user/follow/${id}/${myid}`)
        if(response.status == 200) {
            toast({
                variant : "destructive",
                title : "Unfollow successfull"
            })
            setEffectcomp(Math.random())
            setFollowExist(false)
        }
        
    }

    return (
    <div>
        {
            followExist ? (
                // <Button onClick={handleUnfollow} variant={"secondary"} >Followed</Button>
                <DeleteComponent button={"Followed "} handleSubmit={handleUnfollow} title={"Do you want to Unfollow"} description={"hlleeeluja"}/>
            ) :   
            (
            <Button className="w-full" onClick={handleFollow}>
                Follow
            </Button>
        )}
    </div>
  )
}

function DeleteComponent({button , handleSubmit , title , description} : {button:string  , handleSubmit:unknown , title:string , description:string}) {
    return (
        <AlertDialog>
        <AlertDialogTrigger >
            <Button 
                variant="secondary" 
                className="transition-opacity duration-200 hover:bg-red-800 opacity-100 group-hover:opacity-0"
            >
                {button}
            </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{ title ||"Are you absolutely sure?"}</AlertDialogTitle>
            <AlertDialogDescription>
              { description ||"This action cannot be undone. This will permanently delete your account and remove your data from our servers."}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleSubmit}>Continue</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      
    )
}


export default FollowButtonClient
