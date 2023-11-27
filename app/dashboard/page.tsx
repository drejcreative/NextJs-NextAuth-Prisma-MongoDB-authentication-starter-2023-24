'use client';
import { Button } from '@/components/ui/button';
import { signOut } from 'next-auth/react';

export default function Home() {
  return (
    <div>
      <p>This is PROTECTED</p>
      <Button variant="destructive" onClick={() => signOut()}>
        Logout
      </Button>
    </div>
  );
}
