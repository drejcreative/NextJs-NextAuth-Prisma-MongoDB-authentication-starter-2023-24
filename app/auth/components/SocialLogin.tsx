import Loading from '@/components/ui/Loading';
import React from 'react';

type social = 'google' | 'facebook';

interface ISocialLoading {
  loading: boolean;
  onClick: (type: social) => void;
}

const SocialLogin: React.FC<ISocialLoading> = ({ onClick, loading }) => {
  return (
    <div className="mt-12 grid gap-6 sm:grid-cols-2">
      <button className="rounded-xl bg-blue-50 px-6 py-3 hover:bg-blue-100 focus:bg-blue-100 active:bg-blue-200">
        <div className="flex justify-center gap-4" onClick={() => onClick('google')}>
          {loading ? <Loading /> : <img src="images/google.svg" className="w-5" alt="" />}
          <span className="block w-max text-sm font-medium tracking-wide text-blue-700">
            with Google
          </span>
        </div>
      </button>
      <button className="rounded-xl bg-gray-900 px-6 py-3 transition hover:bg-gray-800 focus:bg-gray-700 active:bg-gray-600">
        <div className="flex items-center justify-center gap-4 text-white">
          {loading ? <Loading /> : <p>FB</p>}
          <span className="block w-max text-sm font-medium tracking-wide text-white">
            with Github
          </span>
        </div>
      </button>
    </div>
  );
};

export default SocialLogin;
