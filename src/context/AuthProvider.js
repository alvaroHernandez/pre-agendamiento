import useAuthHandler from '../services/auth/useAuthHandler';
import React, { createContext } from 'react';
import PropTypes from 'prop-types';

export const authContext = createContext({
  authenticatedUser: null,
  login: () => {},
  logout: () => {},
  sessionExpired: () => false,
  setShouldDisplayModal: () => {},
});

const { Provider } = authContext;

const AuthProvider = ({ children }) => {
  const authHandler = useAuthHandler();

  return <Provider value={authHandler}>{children}</Provider>;
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export { AuthProvider };
