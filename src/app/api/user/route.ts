import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getDbUserId } from '@/actions/user.actions';

// this function is used to get the data of the current user 
export async function GET() {
  // const id  = await  params.id;
  const id = await getDbUserId()
  console.log("we have been called")
  // console.log(id , "the id that is send from the client")
  const data = await prisma.user.findUnique({
    where : {
      id  ,
    } ,
    include : {
     followers : true ,
     following : true 
    }
  })
  console.log(data)
  // Simulating fetching user data (replace with actual DB or API call)
  

  return NextResponse.json({
    message : "this is the costum message" ,
    data ,
  });
}
