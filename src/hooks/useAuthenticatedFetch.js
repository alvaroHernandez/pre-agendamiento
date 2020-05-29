import { useQuery } from 'react-query';
import { useAuth } from '../context/AuthProvider';
import UnauthorizedError from '../services/auth/UnauthorizedError';

const RETRIES = 3;

function useAuthenticatedFetch(query, queryFunction, queryConfig = {}) {
  const { setShowExpiredSessionMessage } = useAuth();

  const { status, data, error } = useQuery(query, queryFunction, {
    ...queryConfig,
    retry: (failureCount, error) => {
      if (error instanceof UnauthorizedError) {
        setShowExpiredSessionMessage(true);
        return false;
      }
      return failureCount < RETRIES;
    },
  });

  return { status, data, error };
}

export default useAuthenticatedFetch;
