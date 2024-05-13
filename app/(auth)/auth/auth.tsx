'use client';
import { useCallback, useState, useEffect } from 'react';
import { useForm, FieldValues, SubmitHandler, set } from 'react-hook-form';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { motion, useAnimation, useAnimationControls } from 'framer-motion';
import { useSearchParams } from 'next/navigation';

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
  const [bottomMessage, setBottomMessage] = useState<IShowMessage | null>(null);
  const controls = useAnimationControls();
  const searchParams = useSearchParams();
  const token = searchParams.get('token');

  const {
    register,
    handleSubmit,
    setError,
    setValue,
    formState: { errors },
    clearErrors,
  } = useForm<FieldValues>({
    defaultValues: {
      name: '',
      email: '',
      password: '',
    },
  });

  const {
    loading,
    register: registerUser,
    signin,
    passwordReset,
    activateUser,
  } = useAuth(setError);

  const slideOut = async () => {
    await controls.start({ x: 500, opacity: 0, transition: { duration: 0.5 } });
    slideIn();
  };

  const slideIn = async () => {
    await controls.start({ x: 0, opacity: 1, transition: { duration: 0.5 } });
  };

  const isLogin = variant === VARIANTS.login;
  const isRegister = variant === VARIANTS.register;
  const isReset = variant === VARIANTS.reset;

  const changeVariant = (variant: Variant) => {
    clearErrors();
    setShowMessage(null);
    slideOut();
    setVariant(variant);
  };

  const confirmEmail = async (token: string) => {
    try {
      const data = await activateUser(token);
      setBottomMessage({ type: 'success', message: data.message });
      setValue('email', data.email);
    } catch (error: any) {
      setBottomMessage({ type: 'error', message: error?.message || 'Error' });
    }
  };

  useEffect(() => {
    if (token) {
      confirmEmail(token);
    }
  }, [token]);

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    setBottomMessage(null);
    if (isRegister) {
      try {
        const message = await registerUser(data);
        setShowMessage({ type: 'success', message });
      } catch (error: any) {
        setShowMessage({ type: 'error', message: error?.message || 'Error' });
      }
    }
    if (isLogin) {
      await signin(data);
    }
    if (isReset) {
      try {
        const message = await passwordReset(data);
        setShowMessage({ type: 'success', message });
      } catch (error: any) {
        setShowMessage({ type: 'error', message: error?.message || 'Error' });
      }
    }
  };

  return (
    <div>
      <motion.div initial={{ opacity: 1, x: 0 }} animate={controls}>
        <FadeIn delay={0.2} direction="left">
          <SocialLogin />
        </FadeIn>
        <FadeIn delay={0.4} direction="left">
          <Divider />
        </FadeIn>

        <form action="" onSubmit={handleSubmit(onSubmit)} className="py-6">
          <FadeIn delay={0.8} direction="left">
            {isRegister && (
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

            {!isReset && (
              <div className="relative flex flex-col items-end">
                <Input
                  label="Password"
                  register={register}
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  errors={errors}
                  validation={isRegister ? passwordValidation : {}}
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

                {isRegister && (
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
            <Button
              type="submit"
              variant="ai"
              size="full"
              disabled={loading || showMessage?.type === 'success'}
            >
              {loading && <Loading className="mr-2" />}
              {(isLogin && VARIANTS.login) ||
                (isRegister && VARIANTS.register) ||
                (isReset && VARIANTS.reset)}
            </Button>
            <div className="-ml-3 w-max p-3">
              <span
                onClick={() => changeVariant(isLogin ? VARIANTS.register : VARIANTS.login)}
                className="cursor-pointer text-sm tracking-wide text-blue-600"
              >
                {isLogin ? 'Create new account' : 'Login to your account'}
              </span>
            </div>
          </FadeIn>
          {bottomMessage && (
            <div
              className={`text-sm leading-3 ${
                bottomMessage?.type === 'error' ? 'text-rose-500' : 'text-lime-600'
              }`}
            >
              {bottomMessage.message}
            </div>
          )}
        </form>
      </motion.div>
    </div>
  );
};

export default Auth;
