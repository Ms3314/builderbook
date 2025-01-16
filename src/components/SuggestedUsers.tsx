import axios from "axios"
import { Avatar } from "./ui/avatar"

export async function SuggestedUsers  () {
    const data =await  axios.get("http://localhost:3000/api/user/who-to-follow")
    // const loopdata = data.message ;    
    console.log( data.data , "this is the data")
    return (
    <div>
        <div className="grid grid-cols-10 ">
            <div className="col-span-2">
                <Avatar>
                    
                </Avatar>
            </div>
            <div className="col-span-5"></div>
            <div className="col-span-3"></div>
        </div>

    </div>
  )
}

