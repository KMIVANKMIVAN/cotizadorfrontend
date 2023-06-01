// Importing the Bootstrap 5 CSS


import "bootstrap/dist/css/bootstrap.min.css";

import { Provider } from 'react-redux';

import React from "react";
import ReactDOM from "react-dom";
import "./styles/index.css";
import App from "./components/App";
import { BrowserRouter } from "react-router-dom";

import { setContext } from "@apollo/client/link/context";

import {
  ApolloProvider,
  ApolloClient,
  createHttpLink,
  InMemoryCache,
} from "@apollo/client";
import { AUTH_TOKEN } from "./constants";


// import { Provider } from "react-redux";
import { createStore } from "redux";
import reducer from "./components/reducer";

const httpLink = createHttpLink({
  uri: "http://localhost:2000/graphql",
  // uri: "http://server02.lavitalicia.bo:2000/graphql",
  // uri: "",
  // cache: new InMemoryCache(),
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem(AUTH_TOKEN);
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const defaultOptions = {
  watchQuery: {
    fetchPolicy: 'network-only',
    errorPolicy: 'ignore',
  },
  query: {
    fetchPolicy: 'network-only',
    errorPolicy: 'all',
  },
}

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
  defaultOptions: defaultOptions,
});

const rootElement = document.getElementById("root");
if (!rootElement) throw new Error("Failed to find the root element");
const root = ReactDOM.createRoot(document.getElementById("root"));

const store = createStore(reducer);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <ApolloProvider client={client}>
          <App />
          <br/>
          <br/>
          <br/>
        </ApolloProvider>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);

// i369chcr@gmail.com
// 8433318Van
// admin@admin.com
// VITALICIAAdmin