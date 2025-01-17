import { getDbUserId } from "@/actions/user.actions";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    // const id = await getDbUserId();


    const whoToFollow = await prisma.user.findMany({
      
      take: 5,
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json({
      success: true,
      message: "You have received some users you can follow.",
      payload: whoToFollow,
    });
  } catch (error) {
    console.error("Error fetching users to follow:", error);

    return NextResponse.json({
      success: false,
      message: "Failed to fetch users to follow.",
      error: error.message,
    }, { status: 500 });
  }
}
