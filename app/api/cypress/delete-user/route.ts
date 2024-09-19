import prisma from '@/app/libs/prismadb';
import { NextResponse } from 'next/server';

export async function DELETE(request: Request) {
    const body = await request.json();
    const {
        email
    } = body;

    const user = await prisma.user.delete({
        where: {
            email
        }
    })
    return NextResponse.json({ success: true });
}