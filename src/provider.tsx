import {
  createHttpLink,
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
} from '@apollo/client';
import React from 'react';

import IcyContext from './context';

const link = createHttpLink({
  uri: 'https://graphql.icy.tools/graphql',
  headers: {
    'x-api-key': '58fb170f-0578-4164-971d-686af1a7c0bc',
  },
});

const client = new ApolloClient({
  link,
  cache: new InMemoryCache({
    typePolicies: {
      ERC721Token: {
        keyFields: ['tokenId', 'contract', ['address']],
      },
      ERC721Contract: {
        keyFields: ['address'],
      },
      Wallet: {
        keyFields: ['address'],
      },
    },
  }),
});

interface IcyProviderProps {
  apiKey: string;
  children: React.ReactNode;
}

function IcyProvider(props: IcyProviderProps) {
  return (
    <IcyContext.Provider value={{ apiKey: props.apiKey }}>
      <ApolloProvider client={client}>{props.children}</ApolloProvider>
    </IcyContext.Provider>
  );
}

export default IcyProvider;
