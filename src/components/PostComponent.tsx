import { Card, CardContent, CardFooter } from "@/components/ui/card";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import halfHearth from "../../public/icons/hearth.png"
import fullHearth from "../../public/icons/fullheart.png"
import Image from "next/image";
import { Heart, MessageSquareIcon } from "lucide-react";

export default async  function PostComponent() {
  return (
    <>
    <Card >
            <CardContent className="gap-1 p-3 flex flex-row ">
              <div>
              <Avatar>
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              </div>
              <div className="pl-3 gap-1 flex flex-col">
                <p className="font-bold ">Jason Deluro</p>
                <p className="text-md ">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Tempore ut numquam qui similique molestiae, nisi deleniti minus repudiandae et veniam impedit enim possimus voluptatibus repellendus maxime inventore culpa, quos eos.</p>
                <img className="w-full p-2 rounded" src="https://images.unsplash.com/photo-1587691592099-24045742c181?q=80&w=2073&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" width={100} alt="some detaisl" height={100} />
                <div className="flex gap-10 px-5  items-center w-full">
                    <div>
                        <MessageSquareIcon width={20}/>                              
                    </div>
                    <div>
                        <Heart width={20}/>
                    </div>
                </div>
              </div>

            </CardContent>
           
          
        </Card>
    </>
  );
}
