import { useQuery } from '@apollo/client';
import { useContext } from 'react';

import IcyContext from '~/context';

import {
  trendingCollectionsQuery,
  TrendingCollectionsQuery,
  TrendingCollectionsQueryVariables,
} from './query';

type Args = TrendingCollectionsQueryVariables;

function useTrendingCollections(args: Args) {
  const { apiKey } = useContext(IcyContext);

  const { data, loading } = useQuery<
    TrendingCollectionsQuery,
    TrendingCollectionsQueryVariables
  >(trendingCollectionsQuery, {
    context: {
      Headers: {
        'x-api-key': apiKey,
      },
    },
    variables: args,
  });

  const collections = (data?.contracts?.edges ?? []).map((e) => e.node);

  return {
    loading,
    collections,
  };
}

export default useTrendingCollections;
