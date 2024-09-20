import prisma from '@/app/libs/prismadb';
import { NextResponse } from 'next/server';

export async function DELETE(request: Request) {
    const body = await request.json();
    const {
        email
    } = body;

    const user = await prisma.user.findFirst({
        where: {
            email
        }
    })

    const questionnaire = await prisma.questionnaire.delete({
        where: {
            userId: user?.id
        }
    })
    return NextResponse.json({ success: true });
}