"use client"
// we need some sought of interactivity over here so 
//that is why we are making this a client component
import axios from "axios"
import React, { useState } from 'react'
import { Card, CardContent, CardFooter, CardHeader } from './ui/card'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { Textarea } from './ui/textarea'
import { Button } from './ui/button'
import { ImageIcon, ImagesIcon, Loader2Icon, SendIcon } from 'lucide-react'
import { getDbUserId } from "@/actions/user.actions"

export function CreatePost() {
    const [message , setMessage] = useState('')
    const [isPosting , setIsPosting] = useState(false)
    const [showImageUpload , setShowImageUpload] = useState(false)
    const userId = getDbUserId()
    const handleSubmit =async () => {
        if (!message.trim()) return 
        setIsPosting(true) 
        try {
            console.log(message)
            await axios.post(`http://localhost:3000/api/user/${userId}/message` , message)  
        } catch (error) {
            console.error(error )            
        }
    } 
    return (    

    <div>
        <Card >
            <CardContent className='flex gap-3 p-6 flex-row '>
            <Avatar>
                <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
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
