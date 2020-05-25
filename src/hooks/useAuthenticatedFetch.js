import { useQuery } from 'react-query';
import useAuth from './useAuth';

const RETRIES = 3;

function useAuthenticatedFetch(query, queryFunction) {
  const { setShowExpiredSessionMessage } = useAuth();

  const { status, data, error } = useQuery(query, queryFunction, {
    retry: (failureCount, error) => {
      if (error.unauthorized) {
        if (error && error.unauthorized) {
          setShowExpiredSessionMessage(true);
        }
        return false;
      }
      return failureCount < RETRIES;
    },
  });

  return { status, data, error };
}

export default useAuthenticatedFetch;
