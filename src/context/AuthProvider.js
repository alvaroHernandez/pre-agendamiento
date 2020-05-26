import useAuthHandler from '../services/auth/useAuthHandler';
import React, { createContext, useContext } from 'react';
import PropTypes from 'prop-types';

const AuthContext = createContext();
AuthContext.displayName = 'AuthContext';

function AuthProvider({ children }) {
  //TODO: useMemo
  const authHandler = useAuthHandler();

  return (
    <AuthContext.Provider value={authHandler}>{children}</AuthContext.Provider>
  );
}

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

function useAuth() {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error(`useAuth must be used within a AuthProvider`);
  }
  return context;
}

export { AuthProvider, useAuth };
