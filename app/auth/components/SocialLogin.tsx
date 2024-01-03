import React from 'react';
import { FcGoogle } from 'react-icons/fc';
import { FaFacebook } from 'react-icons/fa';

import Loading from '@/components/ui/Loading';
import { useAuth } from '../hooks/useAuth';

const SocialLogin = () => {
  const { loadingGoogle, loadingFacebook, socialActions } = useAuth();

  return (
    <div className="mt-12 grid gap-6 sm:grid-cols-2">
      <button className="rounded-xl bg-blue-50 px-6 py-3 hover:bg-blue-100 focus:bg-blue-100 active:bg-blue-200">
        <div className="flex justify-center" onClick={() => socialActions('google')}>
          {loadingGoogle ? <Loading /> : <FcGoogle size={20} className="mr-2" />}
          <span className="block w-max text-sm font-medium tracking-wide text-blue-700">
            Google
          </span>
        </div>
      </button>
      <button className="rounded-xl bg-gray-900 px-6 py-3 transition hover:bg-gray-800 focus:bg-gray-700 active:bg-gray-600">
        <div
          className="flex items-center justify-center text-white"
          onClick={() => socialActions('facebook')}
        >
          {loadingFacebook ? (
            <Loading />
          ) : (
            <FaFacebook className="mr-2" size={20} color="#1877F2" />
          )}
          <span className="block w-max text-sm font-medium tracking-wide text-white">Facebook</span>
        </div>
      </button>
    </div>
  );
};

export default SocialLogin;
