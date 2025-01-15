import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(request: Request, { params }: { params: { id: string } }) {
  // const id  = await  params.id;
  const { id } = await params;
  console.log(id)
  console.log("we have been called")
  // console.log(id , "the id that is send from the client")
  const data = await prisma.user.findUnique({
    where : {
      clerkId : id ,
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
