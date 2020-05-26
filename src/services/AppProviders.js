import React from 'react';
import { ReactQueryConfigProvider } from 'react-query';
import { AuthProvider } from '../context/AuthProvider';
import PropTypes from 'prop-types';

const queryConfig = {
  refetchAllOnWindowFocus: false,
};

function AppProviders({ children }) {
  return (
    <ReactQueryConfigProvider config={queryConfig}>
      <AuthProvider>{children}</AuthProvider>
    </ReactQueryConfigProvider>
  );
}

AppProviders.propTypes = {
  children: PropTypes.any.isRequired,
};

export { AppProviders };
