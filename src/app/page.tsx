import { SuggestedUsers } from "../components/SuggestedUsers.tsx";
import { CreatePost } from "../components/CreatePost.tsx";  
import { Card} from "@/components/ui/card";
import { currentUser } from "@clerk/nextjs/server";
import PostComponent from "../components/PostComponent.tsx";
import Sidebar from "../components/Sidebar.tsx"

export default async  function Home() {
  const user = await currentUser()
  return (
    <>
    <div className="grid  grid-cols-1 lg:grid-cols-10 gap-6" >
        {/*  so in small screes we are using grid-1 so that everything is propper in vertical direction */}
        <div className="lg:col-span-7 flex flex-col gap-3"> 
        { user ? <CreatePost/> : null} 
        <PostComponent/>
        </div>
        <div className="hidden flex flex-col lg:block lg:col-span-3 sticky top-20">
          <Sidebar/>
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
