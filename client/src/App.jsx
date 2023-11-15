import Nav from './components/Nav';
import './App.css'
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from '@apollo/client';

import { setContext } from '@apollo/client/link/context';
import { Outlet } from 'react-router-dom';


// Construct our main GraphQL API endpoint
const httpLink = createHttpLink({
  uri: '/graphql',
});

// Construct request middleware that will attach the JWT token to every request as an `authorization` header
const authLink = setContext((_, { Nav }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem('id_token');
  // return the headers to the context so httpLink can read them
  return {
    Nav: {
      ...Nav,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  // Set up our client to execute the `authLink` middleware prior to making the request to our GraphQL API
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

// Pass users array to the List component as a prop
export default function App() {
  return (
    <ApolloProvider client={client}>
    <>
    <video autoPlay muted loop id="bgVideo">
      <source src="/Waterfall.webm" type="video/webm"/>
      Your browser does not support HTML5 video.
    </video>
    <div>
      <Nav />
      <Outlet />
    </div>
    </>
    </ApolloProvider>
  );
}



