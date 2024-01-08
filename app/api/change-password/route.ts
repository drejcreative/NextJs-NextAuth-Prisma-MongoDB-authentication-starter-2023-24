import bcrypt from 'bcrypt';
import { NextResponse } from 'next/server';

import prisma from '@/app/libs/prismaDb';

export async function POST(request: Request) {
  const body = await request.json();
  const { token, password } = body;

  try {
    // Find user by reset token
    const user = await prisma.user.findFirst({
      where: {
        resetToken: token,
        resetTokenExpiry: {
          not: null,
        },
      },
    });

    if (!user || !user?.resetTokenExpiry) {
      return NextResponse.json('Token invalid or expired', { status: 404 });
    }

    // Check if token is expired
    const now = new Date();

    if (now > user?.resetTokenExpiry) {
      return NextResponse.json(
        `Your password reset link has expired as it was not used within the 60-minute time limit. Please initiate a new password reset request to proceed.`,
        { status: 400 },
      );
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    // Update user's password and clear reset token fields
    await prisma.user.update({
      where: { id: user.id },
      data: {
        hashedPassword: hashedPassword,
        resetToken: null,
        resetTokenExpiry: null,
      },
    });

    return NextResponse.json(`Password updated successfully`, { status: 200 });
  } catch (error) {
    console.log(error, 'REGISTRATION ERROR');
    return NextResponse.json('Internal Error', { status: 500 });
  }
}
