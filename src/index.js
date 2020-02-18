import '@babel/polyfill';
import React from 'react';
import ReactDOM from 'react-dom';

import ApolloClient from 'apollo-boost';
import { ApolloProvider } from '@apollo/react-hooks';

import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

import HomePage from './pages/HomePage';
import ProductsPage from './pages/ProductsPage';

import './index.scss';

const client = new ApolloClient({
  uri: 'https://api.code-challenge.ze.delivery/public/graphql'
});

const App = () => {
  return (
    <ApolloProvider client={client}>
      <Router>
        <Switch>
          <Route path="/products" component={ProductsPage} />
          <Route path="/" component={HomePage} />
        </Switch>
      </Router>
    </ApolloProvider>
  );
};

ReactDOM.render(<App />, document.querySelector('#root'));
