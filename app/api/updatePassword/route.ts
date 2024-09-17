import getCurrentUser from '@/app/actions/getCurrentUser';
import prisma from '@/app/libs/prismadb';
import bcrypt from 'bcrypt';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    const body = await request.json();
    const user = await getCurrentUser();
    const {
        oldPassword,
        newPassword,
    } = body;

    if (!user) {
        return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    const currentUser = await prisma.user.findUnique({
        where: { id: user.id },
    });

    if (!currentUser || !currentUser.hashedPassword) {
        return NextResponse.json({ error: 'User not found or no password set' }, { status: 404 });
    }

    const isMatch = await bcrypt.compare(oldPassword, currentUser.hashedPassword);
    if (!isMatch) {
        return NextResponse.json({ error: 'Old password is incorrect' }, { status: 400 });
    }

    const newHashedPassword = await bcrypt.hash(newPassword, 12);

    const updatedUser = await prisma.user.update({
        where: { id: user.id },
        data: { hashedPassword: newHashedPassword },
    });

    return NextResponse.json(updatedUser);
}