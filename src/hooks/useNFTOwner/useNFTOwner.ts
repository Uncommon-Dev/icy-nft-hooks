import { useQuery } from '@apollo/client';
import { useContext } from 'react';

import { nftOwnerQuery, NFTOwnerQuery, NFTOwnerQueryVariables } from './query';
import IcyContext from '../../context';

interface Args {
  contractAddress: string;
  tokenId: string;
}

function useNFTOwner(args: Args) {
  const { apiKey } = useContext(IcyContext);

  const { data, loading } = useQuery<NFTOwnerQuery, NFTOwnerQueryVariables>(
    nftOwnerQuery,
    {
      context: {
        Headers: {
          'x-api-key': apiKey,
        },
      },
      variables: args,
    }
  );

  return {
    loading,
    owner: data?.token?.owner ?? null,
  };
}

export default useNFTOwner;
