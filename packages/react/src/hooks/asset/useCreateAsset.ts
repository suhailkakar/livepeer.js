import { createAsset } from 'livepeer/actions';
import {
  Asset,
  CreateAssetArgs,
  CreateAssetProgress,
  CreateAssetSourceType,
  LivepeerProvider,
  MirrorSizeArray,
} from 'livepeer/types';
import { useState } from 'react';

import { UseInternalMutationOptions, useInternalMutation } from '../../utils';
import { useLivepeerProvider } from '../providers';

export function useCreateAsset<
  TLivepeerProvider extends LivepeerProvider,
  TSource extends CreateAssetSourceType,
>(
  options: UseInternalMutationOptions<
    MirrorSizeArray<TSource, Asset>,
    Omit<CreateAssetArgs<TSource>, 'onUploadProgress'>
  >,
) {
  const livepeerProvider = useLivepeerProvider<TLivepeerProvider>();

  const [progress, setProgress] = useState<
    CreateAssetProgress<TSource> | undefined
  >(undefined);

  const internalQuery = useInternalMutation(
    options,
    async (args: Omit<CreateAssetArgs<TSource>, 'onUploadProgress'>) =>
      createAsset<TSource, TLivepeerProvider>({
        ...args,
        onProgress: (progress) => setProgress(progress),
      }),
    [{ entity: 'createAsset', livepeerProvider }],
  );

  return {
    ...internalQuery,
    progress,
  } as const;
}
