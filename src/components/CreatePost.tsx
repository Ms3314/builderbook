"use client"
// we need some sought of interactivity over here so 
//that is why we are making this a client component
import axios from "axios"
import React, { useEffect, useState } from 'react'
import { Card, CardContent, CardDescription, CardFooter } from './ui/card'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { Textarea } from './ui/textarea'
import { Button } from './ui/button'
import { ImageIcon , Loader2, Loader2Icon, SendIcon } from 'lucide-react'
import { useToast } from "@/hooks/use-toast"
import { getTheUser } from "@/actions/user.actions"
import ImageButton from "./UploaderButton"

export function CreatePost() {
    const [message , setMessage] = useState('')
    const [isPosting , setIsPosting] = useState(false)
    const [userImage , setUserImage] = useState("")
    const [showImageUpload , setShowImageUpload] = useState(false)
    const [imageUrl , setImageUrl] = useState('') 
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
    
    function handleDeleleteImage () {
        
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
                {/* {
                    imageUrl != "" ? <img src={imageUrl} className="w-full"/> : null

                } */}
                    {/* 
                    <p>{JSON.stringify(imageUrl)}</p>
                    {
                        imageUrl != "" ? <img src={imageUrl} className="w-full"/> : null
                    } */}
            </CardContent>
            <CardDescription className={`flex flex-col justify-center items-center relative ${imageUrl == "" ? " hidden " : " "}`}>
                <img className={`w-[90%] p-2 rounded `} src={imageUrl} width={100} alt="some detaisl" height={100} />
                <button onClick={handleDeleleteImage} className="bg-red-900  text-white p-2 text-2xl font-bold w-10 h-10  rounded-full absolute top-5 right-20 "></button>    
                {
                        showImageUpload && <Loader2 className="spin-in-2"/>
                    }
                {/* {
                    imageUrl != "" ? <img  className="w-full"/> : null

                } */}
            </CardDescription>
            <CardFooter className='flex flex-row justify-between p-4 items-center'>
                <ImageButton  setLoader={setShowImageUpload} setImage={setImageUrl}/>
                {/* <ImageIcon className='size-4 mr-2'/>
                Photo     */}
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
