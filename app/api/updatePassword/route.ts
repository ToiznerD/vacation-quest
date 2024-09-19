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
        return NextResponse.json({ message: 'User not found', success: false});
    }

    const currentUser = await prisma.user.findUnique({
        where: { id: user.id },
    });

    if (!currentUser || !currentUser.hashedPassword) {
        return NextResponse.json({ message: 'User not found or no password set', success: false});
    }

    const isMatch = await bcrypt.compare(oldPassword, currentUser.hashedPassword);
    if (!isMatch) {
        return NextResponse.json({ message: 'Old password is incorrect', success: false});
    }

    const newHashedPassword = await bcrypt.hash(newPassword, 12);

    const updatedUser = await prisma.user.update({
        where: { id: user.id },
        data: { hashedPassword: newHashedPassword },
    });

    return NextResponse.json({ message: "Password has been changed successfully", success: true});
}