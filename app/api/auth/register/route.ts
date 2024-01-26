import bcrypt from 'bcrypt';
import crypto from 'crypto';
import { NextResponse } from 'next/server';

import prisma from '@/app/libs/prismaDb';
import sendEmail from '@/app/utils/sendEmail';

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const { email, name, password } = body;
    if (!email || !name || !password) {
      return NextResponse.json('Missing info', { status: 400 });
    }

    // Check if the user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      // User already exists, handle accordingly
      return NextResponse.json('User already exists with this email', { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    const token = crypto.randomBytes(32).toString('hex');
    const tokenExpiration = new Date(new Date().getTime() + 30 * 24 * 60 * 60000); // 60000 milliseconds in a minute

    await prisma.user.create({
      data: {
        email,
        name,
        hashedPassword,
        resetToken: token,
        resetTokenExpiry: tokenExpiration,
      },
    });

    // Send email
    const link = `${process.env.APP_URL}/auth?token=${token}`;
    sendEmail(email, 'Email confirmation', link);

    return NextResponse.json(`Confirmation link is sent to ${email}. Please check your email!`, {
      status: 200,
    });
  } catch (error) {
    console.log(error, 'REGISTRATION ERROR');
    return NextResponse.json('Internal Error', { status: 500 });
  }
}
