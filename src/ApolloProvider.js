import React from "react";
import App from "./App";
import {
  ApolloClient,
  InMemoryCache,
  createHttpLink,
  ApolloProvider,
} from "@apollo/client";
import { setContext } from '@apollo/client/link/context';

const httpLink = createHttpLink({
  uri: "https://polar-beyond-61386.herokuapp.com/"
});

const authLink = setContext(() => {
  const token = localStorage.getItem("jwtToken");
  
  return {
    headers: {
        authorization: token ? `Bearer ${token}` : "",
    },
  };
});
  
  const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache()
  });


export default (
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
);
