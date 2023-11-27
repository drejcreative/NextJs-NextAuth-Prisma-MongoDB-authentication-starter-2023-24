import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { FieldValues } from 'react-hook-form';
import { useRouter } from 'next/navigation';

import { post } from '@/app/utils/fetch';

type ErrorCb = (type: string, data: any) => void;

export const useAuth = (errorCb: ErrorCb) => {
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();

  const socialActions = (action: string) => {
    setLoading(true);
    signIn(action, { redirect: false })
      .then((cb) => {
        if (cb?.error) {
          console.log('error', cb?.error);
        }
        if (cb?.ok && !cb?.error) {
          console.log(cb?.ok);
        }
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const register = async (data: FieldValues) => {
    setLoading(true);
    await post('/api/register', data);
    router.push('/dashboard');
    setLoading(false);
  };

  const signin = async (data: FieldValues) => {
    setLoading(true);
    signIn('credentials', {
      ...data,
      redirect: false,
    })
      .then((cb) => {
        if (cb?.error) {
          if (cb.error === 'Incorect user') {
            errorCb('email', {
              type: 'backend',
              message: 'The provided credentials do not match our records.',
            });
          }
          if (cb.error === 'Incorrect password') {
            errorCb('password', {
              type: 'backend',
              message:
                "Incorrect password. Please try again or reset your password if you've forgotten it.",
            });
          }
        }
        if (cb?.ok && !cb?.error) {
          router.push('/dashboard');
          setLoading(false);
        }
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return { loading, socialActions, register, signin };
};
