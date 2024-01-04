'use client';
import { useCallback, useState, useEffect } from 'react';
import { useForm, FieldValues, SubmitHandler } from 'react-hook-form';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { motion, useAnimation } from 'framer-motion';

import SocialLogin from './components/SocialLogin';
import Divider from './components/Divider';
import Input from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { emailValidation, nameValidation, passwordValidation } from './validation/validation';
import Loading from '@/components/ui/Loading';
import { useAuth } from './hooks/useAuth';
import FadeIn from '@/components/animation/FadeIn';

enum VARIANTS {
  login = 'LOGIN',
  register = 'REGISTER',
  reset = 'RESET PASSWORD',
}

interface IShowMessage {
  type: 'error' | 'success';
  message: string;
}

type Variant = VARIANTS.login | VARIANTS.register | VARIANTS.reset;

const Auth = () => {
  const [variant, setVariant] = useState<Variant>(VARIANTS.login);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showMessage, setShowMessage] = useState<IShowMessage | null>(null);
  const controls = useAnimation();

  const slideOut = useCallback(async () => {
    await controls.start({ x: 500, opacity: 0, transition: { duration: 0.5 } });
  }, [controls]);

  const slideIn = useCallback(() => {
    controls.start({ x: 0, opacity: 1, transition: { duration: 0.5 } });
  }, [controls]);

  useEffect(() => {
    slideIn();
  }, [variant, slideIn]);

  const isLogin = useCallback(() => {
    return variant === VARIANTS.login;
  }, [variant]);
  const isRegister = useCallback(() => {
    return variant === VARIANTS.register;
  }, [variant]);
  const isReset = useCallback(() => {
    return variant === VARIANTS.reset;
  }, [variant]);

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
    clearErrors,
  } = useForm<FieldValues>({
    defaultValues: {
      name: '',
      email: '',
      password: '',
    },
  });

  const changeVariant = useCallback(
    async (variant: Variant) => {
      clearErrors();
      setShowMessage(null);
      await slideOut();
      setVariant(variant);
    },
    [slideOut, clearErrors],
  );

  const { loading, register: registerUser, signin, passwordReset } = useAuth(setError);

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    if (isRegister()) {
      await registerUser(data);
    }
    if (isLogin()) {
      await signin(data);
    }
    if (isReset()) {
      try {
        const message = await passwordReset(data);
        setShowMessage({ type: 'success', message });
      } catch (error: any) {
        setShowMessage({ type: 'error', message: error?.message || 'Error' });
      }
    }
  };

  return (
    <motion.div initial={{ opacity: 1, x: 0 }} animate={controls}>
      <FadeIn delay={0.2} direction="left">
        <SocialLogin />
      </FadeIn>
      <FadeIn delay={0.4} direction="left">
        <Divider />
      </FadeIn>

      <form action="" onSubmit={handleSubmit(onSubmit)} className="py-6">
        <FadeIn delay={0.8} direction="left">
          {isRegister() && (
            <Input
              label="Name"
              register={register}
              id="name"
              type="text"
              errors={errors}
              className="mb-6"
              validation={nameValidation}
            />
          )}

          <Input
            label="Email"
            register={register}
            id="email"
            type="email"
            className={`${showMessage ? '' : 'mb-6'}`}
            errors={errors}
            validation={emailValidation}
          />

          {showMessage && (
            <div
              className={`mb-6 mt-1 text-xs leading-3 ${
                showMessage.type === 'error' ? 'text-rose-500' : 'text-lime-600'
              }`}
            >
              {showMessage?.message}
            </div>
          )}

          {!isReset() && (
            <div className="relative flex flex-col items-end">
              <Input
                label="Password"
                register={register}
                type={showPassword ? 'text' : 'password'}
                id="password"
                errors={errors}
                validation={isRegister() ? passwordValidation : {}}
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

              {isRegister() && (
                <p className="ml-2 mt-2 text-xs text-gray-500">
                  Your password must be at least 8 characters long and include a mix of upper and
                  lower case letters, numbers, and special characters.
                </p>
              )}

              <span
                className="-mr-3 w-max cursor-pointer p-3"
                onClick={() => changeVariant(VARIANTS.reset)}
              >
                <span className="text-sm tracking-wide text-blue-600">Forgot password ?</span>
              </span>
            </div>
          )}
        </FadeIn>

        <FadeIn delay={0.8} direction="left">
          <Button type="submit" size="full" disabled={loading || showMessage?.type === 'success'}>
            {loading && <Loading />}
            {(isLogin() && VARIANTS.login) ||
              (isRegister() && VARIANTS.register) ||
              (isReset() && VARIANTS.reset)}
          </Button>
          <div className="-ml-3 w-max p-3">
            <span
              onClick={() => changeVariant(isLogin() ? VARIANTS.register : VARIANTS.login)}
              className="cursor-pointer text-sm tracking-wide text-blue-600"
            >
              {isLogin() ? 'Create new account' : 'Login to your account'}
            </span>
          </div>
        </FadeIn>
      </form>
    </motion.div>
  );
};

export default Auth;
