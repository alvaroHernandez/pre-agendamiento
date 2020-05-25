/* eslint-disable react/prop-types */
import React from 'react';
import * as rtl from '@testing-library/react';
import { LOCAL_STORAGE_AUTH_KEY } from '../services/auth/useAuthHandler';
import { ReactQueryConfigProvider } from 'react-query';
import { MemoryRouter as Router } from 'react-router-dom';
import * as AuthProvider from '../context/AuthProvider';

jest.requireActual('../context/AuthProvider');

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
        <Router initialEntries={initialEntries}>
          <AuthProvider.AuthProvider>{children}</AuthProvider.AuthProvider>
        </Router>
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
    AuthProvider.authContext._currentValue.authenticatedUser = {
      accessToken: 'testToken',
      userId: 'testUserId',
      userName: 'testUserName',
    };
  }
}

export * from '@testing-library/react';
export { render, loginAsUser };
