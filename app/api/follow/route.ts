import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/route";
import { prisma } from "@/lib/prisma";

const getCurrentUserId = async () => {
    const session = await getServerSession(authOptions);
    const currentUserEmail = session?.user?.email!;

    const currentUserId = await prisma.user
        .findUnique({
            where: { email: currentUserEmail },
        })
        .then((user) => user?.id!);

    return currentUserId;
};

export const POST = async (req: Request) => {
    const currentUserId = await getCurrentUserId();
    const targetUserId = await req.json();

    const record = await prisma.follows.create({
        data: {
            followerId: currentUserId,
            followingId: targetUserId,
        },
    });

    return NextResponse.json(record);
};

export const DELETE = async (req: NextRequest) => {
    const currentUserId = await getCurrentUserId();
    const targetUserId = req.nextUrl.searchParams.get("targetUserId");

    const record = await prisma.follows.delete({
        where: {
            followerId_followingId: {
                followerId: currentUserId,
                followingId: targetUserId!,
            },
        },
    });
    return NextResponse.json(record);
};
