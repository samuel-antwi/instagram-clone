import { WebSocketLink } from 'apollo-link-ws';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloClient } from 'apollo-boost';

const headers = { 'x-hasura-admin-secret': 'godsent1' };

const client = new ApolloClient({
  link: new WebSocketLink({
    uri: 'wss://antwi-instagram-clone.herokuapp.com/v1/graphql',
    options: {
      reconnect: true,
      connectionParams: {
        headers,
      },
    },
  }),
  cache: new InMemoryCache(),
});

export default client;
