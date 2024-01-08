import { NextResponse } from 'next/server';

import prisma from '@/app/libs/prismaDb';

export async function POST(request: Request) {
  const body = await request.json();
  const { token } = body;

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
        `Your confirmation email link has expired as it was not used within the 30 days time limit. If you want to use same email adress please contact us.`,
        { status: 400 },
      );
    }

    // Update user's password and clear reset token fields
    await prisma.user.update({
      where: { id: user.id },
      data: {
        emailVerified: true,
        resetToken: null,
        resetTokenExpiry: null,
      },
    });

    return NextResponse.json(
      { email: user.email, message: 'Email is verified, please login' },
      { status: 200 },
    );
  } catch (error) {
    console.log(error, 'REGISTRATION ERROR');
    return new NextResponse('Internal Error', { status: 500 });
  }
}
