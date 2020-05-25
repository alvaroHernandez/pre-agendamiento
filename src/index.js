import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { AuthProvider } from './context/AuthProvider';
import { ReactQueryConfigProvider } from 'react-query';

const queryConfig = {
  refetchAllOnWindowFocus: false,
};

ReactDOM.render(
  <AuthProvider>
    <ReactQueryConfigProvider config={queryConfig}>
      <App />
    </ReactQueryConfigProvider>
  </AuthProvider>,
  document.getElementById('root'),
);
