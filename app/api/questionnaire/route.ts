import getCurrentUser from "@/app/actions/getCurrentUser";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import prisma from '@/app/libs/prismadb';

export async function POST(request: Request) {
    const body = await request.json();
    const user = await getCurrentUser();
    if(user && user.questionnaire){
        await prisma.questionnaire.update({
            where: {
                userId: user.id,
            },
            data: body
        })
        return NextResponse .json({ success: true, message: "Questionnaire has been updated successfully" })
    }
    if(user && !user.questionnaire){
        await prisma.questionnaire.create({
            data: {
                ...body,
                userId: user.id
            }
        })
        return NextResponse .json({ success: true, message: "Questionnaire has been saved" })
    }
    return NextResponse .json({ success: false, message: "Something went wrong" })
}