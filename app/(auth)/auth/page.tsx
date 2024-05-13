import { Suspense } from 'react';
import Auth from './auth';

const AuthPage = () => (
  <Suspense>
    <Auth />
  </Suspense>
);

export default AuthPage;
