/* eslint-disable react/prop-types,react/display-name */
import { renderHook, cleanup } from '@testing-library/react-hooks';
import useAuthenticatedFetch from './useAuthenticatedFetch';
import { AuthProvider } from '../context/AuthProvider';
import React from 'react';
import UnauthorizedError from '../services/auth/UnauthorizedError';
jest.mock('../context/AuthProvider');

afterEach(async () => {
  await cleanup();
});

test('throws error and set expired session true when query result.current is unauthorized', async () => {
  const setShowExpiredSessionMessageMock = jest.fn();
  AuthProvider.__mock.mockValue.setShowExpiredSessionMessage = setShowExpiredSessionMessageMock;
  const wrapper = ({ children }) => <AuthProvider>{children}</AuthProvider>;
  const { waitForNextUpdate, result } = renderHook(
    () =>
      useAuthenticatedFetch(['test'], () => {
        throw new UnauthorizedError('unauthorized');
      }),
    { wrapper },
  );
  expect(result.current.status).toBe('loading');
  expect(result.current.data).toBe(undefined);
  expect(result.current.error).toBe(null);

  await waitForNextUpdate();

  expect(result.current.status).toBe('error');
  expect(result.current.data).toBe(undefined);
  expect(result.current.error).toBeInstanceOf(UnauthorizedError);

  expect(setShowExpiredSessionMessageMock).toBeCalledWith(true);
});

test('retries when result.current is an error', async () => {
  jest.restoreAllMocks();
  const wrapper = ({ children }) => <AuthProvider>{children}</AuthProvider>;
  const { waitForNextUpdate, result } = renderHook(
    () =>
      useAuthenticatedFetch(
        ['test2'],
        () => {
          throw new Error('fake error');
        },
        { retryDelay: 10 },
      ),
    { wrapper },
  );

  expect(result.current.status).toBe('loading');
  expect(result.current.data).toBe(undefined);
  expect(result.current.error).toBe(null);

  await waitForNextUpdate();

  expect(result.current.status).toBe('loading');
  expect(result.current.data).toBe(undefined);
  expect(result.current.error).toBe(null);

  await waitForNextUpdate();

  expect(result.current.status).toBe('error');
  expect(result.current.data).toBe(undefined);
  expect(result.current.error).toBeInstanceOf(Error);
  expect(result.current.error).not.toBeInstanceOf(UnauthorizedError);
});
