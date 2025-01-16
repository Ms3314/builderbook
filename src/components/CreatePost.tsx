"use client"
// we need some sought of interactivity over here so 
//that is why we are making this a client component
import axios from "axios"
import React, { useEffect, useState } from 'react'
import { Card, CardContent, CardFooter } from './ui/card'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { Textarea } from './ui/textarea'
import { Button } from './ui/button'
import { ImageIcon , Loader2Icon, SendIcon } from 'lucide-react'
import { useToast } from "@/hooks/use-toast"
import { getTheUser, getTheUserInSession } from "@/actions/user.actions"
import { currentUser } from "@clerk/nextjs/server"

export function CreatePost() {
    const [message , setMessage] = useState('')
    const [isPosting , setIsPosting] = useState(false)
    const [userImage , setUserImage] = useState("")
    const [showImageUpload , setShowImageUpload] = useState(false)
    const [imageUrl , setImageUrl] = useState('www.github.com') 
    const {toast} = useToast()
    // this useEffect exist such that the data is fetched to get the image 
    useEffect( ()=>{
        async function findImageAndSetImage () {
            const data = await getTheUser()  
            console.log(data)      
            setUserImage(data.image || "ssss")
        }
        findImageAndSetImage()
    },[])
    const handleSubmit = async () => {
        if (!message.trim()) return 
        setIsPosting(true)  
        try {
            console.log(message)
               
            const result = await axios.post(`http://localhost:3000/api/user/message` , { message , imageUrl  })  
            if (result.status == 200) {
                // trying to reset our form 
                setMessage("")
                setImageUrl("");
                setShowImageUpload(false);
                toast({
                    title: "Succesfull",
                    description: "You have posted !!",
                })
            }
        } catch (error) {
            console.error(error )            
        }
    }
    return (    

    <div>
        <Card >
            <CardContent className='flex gap-3 p-6 flex-row '>
            <Avatar>
                <AvatarImage src={userImage} alt="@shadcn" />
                <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <Textarea 
                placeholder='What is in your mind ?'
                className='min-h-[100px] resize-none border-none text-base font-visible:ring-0 '
                value={message}
                onChange={(e)=>setMessage(e.target.value)}
                disabled={isPosting}
            />
            </CardContent>
            <CardFooter className='flex flex-row justify-between p-4 items-center'>
                    <Button
                    variant="ghost"
                    className=' text-muted-foreground hover:text-primary'
                    disabled={isPosting}
                    onClick={()=>setShowImageUpload(!showImageUpload)}
                    >
                    <ImageIcon className='size-4 mr-2'/>
                    Photo    
                </Button>
                <Button 
                    onClick={handleSubmit}
                    disabled={!message.trim || isPosting}
                >   
                    {
                        isPosting ? (
                            <>
                                <Loader2Icon className='size-4 mr-2 animate-spin'/>
                            </>
                        )
                        :
                        (
                        <>
                            <SendIcon className='size-4 mr-2'/>
                            Post
                        </>
                        )
                    }
                    </Button>
            </CardFooter>
        </Card>
    </div>
  )

}
