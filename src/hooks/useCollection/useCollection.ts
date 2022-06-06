import { useQuery } from '@apollo/client';
import { useContext } from 'react';

import {
  collectionQuery,
  CollectionQuery,
  CollectionWithStatsQuery,
  CollectionQueryVariables,
} from './query';
import IcyContext from '../../context';

interface WithStatsArgs {
  address: string;
  includeStats: true;
}

interface WithoutStatsArgs {
  address: string;
  includeStats: false;
}

type Args = WithStatsArgs | WithoutStatsArgs;

function useCollection<T extends Args>(args: T) {
  const { apiKey } = useContext(IcyContext);

  const { data, loading } = useQuery<
    T extends WithStatsArgs ? CollectionWithStatsQuery : CollectionQuery,
    CollectionQueryVariables
  >(collectionQuery, {
    context: {
      Headers: {
        'x-api-key': apiKey,
      },
    },
    variables: args,
  });

  return {
    loading,
    collection: data?.contract ?? null,
  };
}

export default useCollection;
