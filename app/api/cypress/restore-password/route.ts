import prisma from '@/app/libs/prismadb';
import { NextResponse } from 'next/server';
import bcrypt from 'bcrypt';

export async function PUT(request: Request) {
    const body = await request.json();
    const {
        email,
        password
    } = body;

    const HashedPassword = await bcrypt.hash(password, 12);

    const user = await prisma.user.update({
        where: {
            email: body.email,
        },
        data: {
            hashedPassword: HashedPassword,
        },
    })
    return NextResponse.json({ success: true });
}