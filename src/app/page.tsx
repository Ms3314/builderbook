import { SuggestedUsers } from "../components/SuggestedUsers.tsx";
import { CreatePost } from "../components/CreatePost.tsx";  
import { Card, CardTitle } from "@/components/ui/card";
import { currentUser } from "@clerk/nextjs/server";
export default async  function Home() {
  const user = await currentUser()
  return (
    <>
    <div className="grid grid-cols-1 lg:grid-cols-10 gap-6" >
        {/*  so in small screes we are using grid-1 so that everything is propper in vertical direction */}
        <div className="lg:col-span-6"> { user ? <CreatePost/> : null} </div>
        <div className="hidden lg:block lg:col-span-4 sticky top-20">
        <Card >
          <CardTitle className="p-5">
            <h2>Who to follow</h2>
            <SuggestedUsers/>
          </CardTitle>
        </Card>
        </div>
    </div>
    </>
  );
}
