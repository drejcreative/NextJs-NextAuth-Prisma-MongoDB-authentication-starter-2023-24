'use client';
import { signOut } from 'next-auth/react';
import Link from 'next/link';

import { Button } from '@/components/ui/button';
import useAdminRoute from './hooks/useAdminRoute';
import Loading from '@/components/ui/Loading';

const AdminPage = () => {
  const { loading } = useAdminRoute();
  if (loading)
    return (
      <div className="fixed left-0 top-0 z-50 h-full w-full bg-white opacity-75">
        <div className="mt-[50vh] flex items-center justify-center">
          <Loading size={10} />
        </div>
      </div>
    );

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
                  href="/dashboard"
                >
                  Protected
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <div className="mt-5 flex w-full justify-center">
        <h2 className="bg-gradient-to-r from-purple-400 to-blue-700 bg-clip-text text-8xl font-extrabold text-transparent">
          YOU ARE ADMIN
        </h2>
      </div>
    </div>
  );
};

export default AdminPage;
