import { SuggestedUsers } from "../components/SuggestedUsers.tsx";
import { CreatePost } from "../components/CreatePost.tsx";  
import { Card, CardContent, CardFooter, CardTitle } from "@/components/ui/card";
import { currentUser } from "@clerk/nextjs/server";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import Image from "next/image.js";
import { CommandIcon, FileHeart, HeartIcon, HeartOffIcon } from "lucide-react";
import PostComponent from "../components/PostComponent.tsx";

export default async  function Home() {
  const user = await currentUser()
  return (
    <>
    <div className="grid  grid-cols-1 lg:grid-cols-10 gap-6" >
        {/*  so in small screes we are using grid-1 so that everything is propper in vertical direction */}
        <div className="lg:col-span-6"> { user ? <CreatePost/> : null} 
        
        <PostComponent/>
        </div>
        <div className="hidden lg:block lg:col-span-4 sticky top-20">
        {user ? <SuggestedUsers/> : 
          (
            <Card>
              
            </Card>
          )
        }
        </div>
    </div>
    </>
  );
}
