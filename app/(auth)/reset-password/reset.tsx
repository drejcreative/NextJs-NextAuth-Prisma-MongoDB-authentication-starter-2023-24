'use client';

import Input from '@/components/ui/input';
import { useSearchParams } from 'next/navigation';
import { useState } from 'react';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { passwordValidation } from '../auth/validation/validation';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import FadeIn from '@/components/animation/FadeIn';
import { RiLockPasswordLine } from 'react-icons/ri';
import { Button } from '@/components/ui/button';
import { useAuth } from '../auth/hooks/useAuth';

const Reset = () => {
  const searchParams = useSearchParams();
  const token = searchParams.get('token');
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
    clearErrors,
  } = useForm<FieldValues>({
    defaultValues: {
      password: '',
    },
  });

  const { loading, changePassword } = useAuth(setError);

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const packData = { password: data.password, token };
    try {
      await changePassword(packData);
    } catch (error: any) {
      setErrorMessage(error?.message || 'Error');
    }
  };

  return (
    <FadeIn delay={0.8} direction="left">
      <p className="mt-4 flex text-sm text-gray-500">
        <RiLockPasswordLine size={16} color="text-gray-500" className="mr-2" />
        Add your new password!
      </p>
      <form action="" onSubmit={handleSubmit(onSubmit)} className="py-6">
        <div className="relative flex flex-col items-end">
          <Input
            label="Password"
            register={register}
            type={showPassword ? 'text' : 'password'}
            id="password"
            errors={errors}
            validation={passwordValidation}
          />
          <div>
            {!showPassword ? (
              <FaEye
                className="absolute right-2 top-5 cursor-pointer"
                onClick={() => setShowPassword(true)}
              />
            ) : (
              <FaEyeSlash
                className="absolute right-2 top-5 cursor-pointer"
                onClick={() => setShowPassword(false)}
              />
            )}
          </div>
          {errorMessage && (
            <div className="mb-6 mt-1 text-xs leading-3 text-rose-500">{errorMessage}</div>
          )}
          <p className="mb-4 ml-2 mt-2 text-xs text-gray-500">
            Your password must be at least 8 characters long and include a mix of upper and lower
            case letters, numbers, and special characters.
          </p>
        </div>
        <Button type="submit" size="full" disabled={loading}>
          Reset Password
        </Button>
      </form>
    </FadeIn>
  );
};

export default Reset;
