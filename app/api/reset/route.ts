import crypto from 'crypto';
import { NextResponse } from 'next/server';

import prisma from '@/app/libs/prismaDb';
import sendEmail from '@/app/utils/sendEmail';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email } = body;

    if (!email) {
      return new NextResponse('Missing info', { status: 400 });
    }

    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) {
      return NextResponse.json(`User with ${email} not exist`, { status: 401 });
    }

    if (user) {
      const token = crypto.randomBytes(32).toString('hex');
      const tokenExpiration = new Date(new Date().getTime() + 60 * 60000); // 60000 milliseconds in a minute

      await prisma.user.update({
        where: {
          email,
        },
        data: {
          resetToken: token,
          resetTokenExpiry: tokenExpiration,
        },
      });

      // Send email
      const resetLink = `${process.env.APP_URL}/reset-password?token=${token}`;
      sendEmail(email, 'reset password', resetLink);
    }

    return NextResponse.json(`Reset link sent to ${email}`, { status: 200 });
  } catch (error) {
    console.log(error, 'REGISTRATION ERROR');
    return new NextResponse('Internal Error', { status: 500 });
  }
}
