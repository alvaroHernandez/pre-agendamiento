import { authContext } from '../context/AuthProvider';
import { useContext } from 'react';

function useAuth() {
  return useContext(authContext);
}

export default useAuth;
