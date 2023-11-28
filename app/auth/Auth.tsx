'use client';
import { useCallback, useState } from 'react';
import { useForm, FieldValues, SubmitHandler } from 'react-hook-form';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

import SocialLogin from './components/SocialLogin';
import Divider from './components/Divider';
import Input from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { emailValidation, nameValidation, passwordValidation } from './validation/validation';
import Loading from '@/components/ui/Loading';
import { useAuth } from './hooks/useAuth';

enum VARIANTS {
  login = 'LOGIN',
  register = 'REGISTER',
}

type Variant = VARIANTS.login | VARIANTS.register;

const Auth = () => {
  const [variant, setVariant] = useState<Variant>(VARIANTS.login);
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const changeVariant = useCallback(() => {
    clearErrors();
    if (variant === VARIANTS.login) {
      setVariant(VARIANTS.register);
    } else {
      setVariant(VARIANTS.login);
    }
  }, [variant]);

  const isLogin = useCallback(() => {
    return variant === VARIANTS.login;
  }, [variant]);

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting, isDirty, isValid },
    clearErrors,
  } = useForm<FieldValues>({
    defaultValues: {
      name: '',
      email: '',
      password: '',
    },
  });

  const { loading, socialActions, register: registerUser, signin } = useAuth(setError);

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    if (!isLogin()) {
      await registerUser(data);
    }
    if (isLogin()) {
      await signin(data);
    }
  };

  return (
    <>
      <SocialLogin />
      <Divider />
      <form action="" onSubmit={handleSubmit(onSubmit)} className="space-y-6 py-6">
        {!isLogin() && (
          <Input
            label="Name"
            register={register}
            id="name"
            type="text"
            errors={errors}
            validation={nameValidation}
          />
        )}
        <Input
          label="Email"
          register={register}
          id="email"
          type="email"
          errors={errors}
          validation={emailValidation}
        />

        <div className="relative flex flex-col items-end">
          <Input
            label="Password"
            register={register}
            type={showPassword ? 'text' : 'password'}
            id="password"
            errors={errors}
            validation={!isLogin() ? passwordValidation : {}}
          />

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

          {!isLogin() && (
            <p className="ml-2 mt-2 text-xs text-gray-500">
              Your password must be at least 8 characters long and include a mix of upper and lower
              case letters, numbers, and special characters.
            </p>
          )}
          <button type="reset" className="-mr-3 w-max p-3">
            <span className="text-sm tracking-wide text-blue-600">Forgot password ?</span>
          </button>
        </div>

        <div>
          <Button type="submit" size="full" disabled={loading}>
            {loading && <Loading />}
            {isLogin() ? VARIANTS.login : VARIANTS.register}
          </Button>
          <div className="-ml-3 w-max p-3">
            <span
              onClick={() => changeVariant()}
              className="cursor-pointer text-sm tracking-wide text-blue-600"
            >
              {isLogin() ? 'Create new account' : 'Login to your account'}
            </span>
          </div>
        </div>
      </form>
    </>
  );
};

export default Auth;
