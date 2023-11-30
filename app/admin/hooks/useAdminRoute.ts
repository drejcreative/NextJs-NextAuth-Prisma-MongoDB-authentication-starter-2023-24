import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

const useAdminRoute = (redirectTo = '/auth') => {
  const { data: session, status } = useSession();
  const [loading, setLoading] = useState<boolean>(true);
  const router = useRouter();

  useEffect(() => {
    // Wait until the session is checked
    if (status === 'loading') return;

    // Redirect if not logged in or not an admin
    if (!session || session.user.role !== 'admin') {
      router.push(redirectTo);
    } else {
      setLoading(false);
    }
  }, [session, status, redirectTo, router]);

  // Return the session and a loading state for conditional rendering
  return { session, loading };
};

export default useAdminRoute;
