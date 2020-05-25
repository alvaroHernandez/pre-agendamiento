import { useEffect, useState } from 'react';
export const LOCAL_STORAGE_AUTH_KEY = 'userAuth';

const getStoredAuthenticatedUser = () => {
  try {
    const auth = window.localStorage.getItem('userAuth');
    if (auth) {
      return JSON.parse(auth);
    }
  } catch (e) {
    // eslint-disable-next-line no-console
    console.log('Error getting access token: ' + e.message);
  }
  return null;
};

const putStoredAuthenticatedUser = (authInformation) => {
  window.localStorage.setItem('userAuth', JSON.stringify(authInformation));
};

const clearStoredAuthenticatedUser = () => {
  window.localStorage.removeItem('userAuth');
};

const useAuthHandler = () => {
  const [authenticatedUser, setAuthenticatedUser] = useState();

  const [showExpiredSessionMessage, setShowExpiredSessionMessage] = useState(
    false,
  );

  useEffect(() => {
    setAuthenticatedUser(getStoredAuthenticatedUser());
  }, []);

  const login = (authInformation) => {
    putStoredAuthenticatedUser(authInformation);
    setAuthenticatedUser(authInformation);
  };

  const logout = () => {
    clearStoredAuthenticatedUser();
    setAuthenticatedUser(null);
    window.location.assign(window.location);
  };

  return {
    authenticatedUser,
    login,
    logout,
    showExpiredSessionMessage,
    setShowExpiredSessionMessage,
  };
};

export default useAuthHandler;
