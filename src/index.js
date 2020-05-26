import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { AppProviders } from './services/AppProviders';

ReactDOM.render(
  <AppProviders>
    <App />
  </AppProviders>,
  document.getElementById('root'),
);
