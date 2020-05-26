import React from 'react';
import PropTypes from 'prop-types';

const MockAuthContext = React.createContext();
MockAuthContext.displayName = 'MockAuthContext';

const mockValue = {
  authenticatedUser: undefined,
  login: jest.fn().mockResolvedValue(),
  logout: jest.fn().mockResolvedValue(),
  showExpiredSessionMessage: false,
  setShowExpiredSessionMessage: jest.fn().mockResolvedValue(),
};

function MockAuthProvider({ children }) {
  return (
    <MockAuthContext.Provider value={mockValue}>
      {children}
    </MockAuthContext.Provider>
  );
}

MockAuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

MockAuthProvider.__mock = { mockValue };

function useMockAuth() {
  const context = React.useContext(MockAuthContext);
  if (context === undefined) {
    throw new Error(`(mock) useAuth must be used within a AuthProvider`);
  }
  return context;
}

export { MockAuthProvider as AuthProvider, useMockAuth as useAuth };
