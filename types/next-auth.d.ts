import NextAuth from 'next-auth';
import { Session } from 'next-auth';
import { User as DefaultUser } from 'next-auth';

declare module 'next-auth' {
  interface User extends DefaultUser {
    role: string;
  }

  interface Session {
    user: User & DefaultSession['user'];
  }
}
