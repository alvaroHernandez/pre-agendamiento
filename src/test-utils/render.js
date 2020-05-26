import React from 'react';
import * as rtl from '@testing-library/react';
import { LOCAL_STORAGE_AUTH_KEY } from '../services/auth/useAuthHandler';
import { ReactQueryConfigProvider } from 'react-query';
import PropTypes from 'prop-types';
import { AuthProvider } from '../context/AuthProvider';
jest.mock('../context/AuthProvider');

const queryConfig = {
  retry: 0,
  refetchAllOnWindowFocus: false,
};

async function render(
  ui,
  { route = '/', initialEntries = [route], user, ...renderOptions } = {},
) {
  user = typeof user === 'undefined' ? await loginAsUser() : user;
  function Wrapper({ children }) {
    return (
      <ReactQueryConfigProvider config={queryConfig}>
        <AuthProvider>{children}</AuthProvider>
      </ReactQueryConfigProvider>
    );
  }

  const returnValue = {
    ...rtl.render(ui, {
      wrapper: Wrapper,
      ...renderOptions,
    }),
    user,
  };

  Wrapper.propTypes = {
    children: PropTypes.node.isRequired,
  };

  return returnValue;
}

async function loginAsUser() {
  const authenticatedUser = {
    accessToken: 'testToken',
    userId: 'testUserId',
    userName: 'testUserName',
  };

  window.localStorage.setItem(
    LOCAL_STORAGE_AUTH_KEY,
    JSON.stringify(authenticatedUser),
  );

  if (AuthProvider) {
    AuthProvider.__mock.mockValue.authenticatedUser = authenticatedUser;
  }
  return authenticatedUser;
}

export * from '@testing-library/react';
export { render, loginAsUser };
