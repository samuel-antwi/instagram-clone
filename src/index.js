import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { ApolloProvider } from '@apollo/react-hooks';
import './assets/main.css';
import { BrowserRouter as Router } from 'react-router-dom';
import client from './graphql/client';
import AuthProvider from './auth';

ReactDOM.render(
  <ApolloProvider client={client}>
    <Router>
      <AuthProvider>
        <App />
      </AuthProvider>
    </Router>
  </ApolloProvider>,

  document.getElementById('root')
);
