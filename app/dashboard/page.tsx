'use client';
import { Button } from '@/components/ui/button';
import { signOut } from 'next-auth/react';
import Link from 'next/link';
import { useIsLogedIn } from '../admin/hooks/useIsLogedIn';

export default function Home() {
  // Check if user is logged in | Add redirect logic if needed
  const logedIn = useIsLogedIn();

  return (
    <div>
      <nav className="border-gray-200 bg-white dark:bg-gray-900">
        <div className="mx-auto flex max-w-screen-xl flex-wrap items-center justify-between p-4">
          <div className="ml-4 flex items-center space-x-3 rtl:space-x-reverse">
            <img src="images/logo.svg" className="w-10" alt="logo" />
          </div>
          <div className="flex items-center space-x-3 md:order-2 md:space-x-0 rtl:space-x-reverse">
            <Button onClick={() => signOut()}>Logout</Button>
          </div>
          <div
            className="hidden w-full items-center justify-between md:order-1 md:flex md:w-auto"
            id="navbar-user"
          >
            <ul className="mt-4 flex flex-col rounded-lg border border-gray-100 bg-gray-50 p-4 font-medium md:mt-0 md:flex-row md:space-x-8 md:border-0 md:bg-white md:p-0 rtl:space-x-reverse dark:border-gray-700 dark:bg-gray-800 md:dark:bg-gray-900">
              <li>
                <Link
                  className="block rounded bg-blue-700 px-3 py-2 text-white md:bg-transparent md:p-0 md:text-blue-700 md:dark:text-blue-500"
                  href="/"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  className="block rounded bg-blue-700 px-3 py-2 text-white md:bg-transparent md:p-0 md:text-blue-700 md:dark:text-blue-500"
                  href="/admin"
                >
                  Admin
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <div className="mt-5 flex w-full justify-center">
        <h2 className="bg-gradient-to-r from-orange-400 to-blue-700 bg-clip-text text-3xl font-extrabold text-transparent">
          You are on Protected page
        </h2>
      </div>
    </div>
  );
}
