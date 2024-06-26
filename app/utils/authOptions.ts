import bcrypt from 'bcrypt';
import NextAuth, { AuthOptions } from 'next-auth';

import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';
import FacebookProvider from 'next-auth/providers/facebook';
import { PrismaAdapter } from '@next-auth/prisma-adapter';

import prisma from '@/app/libs/prismaDb';

export const authOptions: AuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID as string,
      clientSecret: process.env.GOOGLE_SECRET as string,
      profile(profile) {
        return {
          id: profile.sub,
          name: profile.name,
          email: profile.email,
          image: profile.picture,
          role: profile.role ?? 'user',
        };
      },
    }),
    FacebookProvider({
      clientId: process.env.FACEBOOK_CLIENT_ID as string,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET as string,
    }),
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials, req) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error('Invalid Credentials');
        }
        const user = await prisma.user.findUnique({
          where: {
            email: credentials.email,
          },
        });

        if (!user) {
          throw new Error('email');
        }

        if (!user?.hashedPassword) {
          throw new Error('google');
        }

        if (!user.emailVerified) {
          // We can skip this step and add verification on dashbaord later
          throw new Error('not_confirmed');
        }

        const isPasswordCorrect = await bcrypt.compare(credentials.password, user.hashedPassword);

        if (!isPasswordCorrect) {
          throw new Error('password');
        }
        return user;
      },
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
      if (account?.provider === 'google') {
        const existingUser = await prisma.user.findUnique({
          where: { email: user.email ?? undefined },
        });

        if (existingUser) {
          console.log('existing user', existingUser);

          // Link the Google account to the existing user
          await prisma.account.upsert({
            where: {
              provider_providerAccountId: {
                provider: 'google',
                providerAccountId: account.providerAccountId,
              },
            },
            create: {
              userId: existingUser.id,
              type: 'oauth',
              provider: 'google',
              providerAccountId: account.providerAccountId,
            },
            update: {
              userId: existingUser.id,
              type: 'oauth',
              provider: 'google',
              providerAccountId: account.providerAccountId,
            },
          });
          return true; // Allow the sign-in
        }
      }
      return true; // Allow sign-ins for other providers
    },
    async session({ session, token, user }) {
      if (token.sub) {
        const user = await prisma.user.findUnique({
          where: { id: token.sub },
        });
        if (session.user && user) {
          session.user.id = user.id;
          session.user.role = user.role;
          session.user.image = user.image;
        }
      }

      return session;
    },
  },
  debug: process.env.NODE_ENV === 'development',
  session: {
    strategy: 'jwt',
    maxAge: 24 * 60 * 60, // 24 hours in seconds
  },
  secret: process.env.SECRET,
};
