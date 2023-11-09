import Nav from './components/Nav';
import Createdtrips from './components/Createdtrips';
import Destinations from "./components/Destinations"

import React from 'react';
import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client';
import CityInput from './CityInput';

const client = new ApolloClient({
  uri: '/graphql', // Assuming your GraphQL server endpoint is at /graphql
  cache: new InMemoryCache(),
});

// Pass users array to the List component as a prop
export default function App() {
  return (
    <div>
      <Nav />
      <Createdtrips />
      <Destinations />
      <ApolloProvider client={client}>
      <div>
        <h1>ChatGPT City Explorer</h1>
        <CityInput />
      </div>
      </ApolloProvider>
    </div>
  );
}