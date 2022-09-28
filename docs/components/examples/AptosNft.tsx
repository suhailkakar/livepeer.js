import { Box, Button, Flex, Text, TextField } from '@livepeer/design-system';
import { useAsset, useUpdateAsset } from '@livepeer/react';

import { AptosClient, TokenClient, Types } from 'aptos';
import { useRouter } from 'next/router';
import { Callout } from 'nextra-theme-docs';

import { useEffect, useMemo, useState } from 'react';

import { Spinner } from '../core';

declare global {
  interface Window {
    aptos: any;
  }
}

// Create an AptosClient to interact with devnet.
const client = new AptosClient('https://fullnode.devnet.aptoslabs.com/v1');

export const AptosNft = () => {
  // Retrieve aptos.account on initial render and store it.
  const [address, setAddress] = useState<string | null>(null);
  useEffect(() => {
    (async () => {
      if (typeof window !== 'undefined' && window?.aptos) {
        const account: { address: string } = await window.aptos.account();

        setAddress(account.address);
      }
    })();
  }, []);

  // Use the AptosClient to retrieve details about the account.
  const [account, setAccount] = useState<Types.AccountData | null>(null);
  useEffect(() => {
    (async () => {
      if (address) {
        const account = await client.getAccount(address);

        setAccount(account);
      }
    })();
  }, [address]);

  useEffect(() => {
    (async () => {
      if (account) {
        // Create client for working with the token module.
        // :!:>section_1b
        const tokenClient = new TokenClient(client);

        const txnHash2 = await tokenClient.createToken.createToken(
          account,
          collectionName,
          tokenName,
          "Alice's simple token",
          1,
          'https://aptos.dev/img/nyan.jpeg',
        ); // <:!:section_5
        await client.waitForTransaction(txnHash2, { checkSuccess: true });

        setAccount(account);
      }
    })();
  }, [account]);

  console.log({ account });

  const router = useRouter();

  const assetId = useMemo(
    () => (router?.query?.id ? String(router?.query?.id) : undefined),
    [router?.query],
  );

  const {
    data: asset,
    error,
    status: assetStatus,
  } = useAsset({
    assetId,
    enabled: assetId?.length === 36,
    refetchInterval: (asset) =>
      asset?.storage?.status?.phase !== 'ready' ? 5000 : false,
  });
  const { mutate: updateAsset, status: updateStatus } = useUpdateAsset();

  const isLoading = useMemo(
    () =>
      assetStatus === 'loading' ||
      updateStatus === 'loading' ||
      (asset && asset?.status?.phase !== 'ready') ||
      (asset?.storage && asset?.storage?.status?.phase !== 'ready'),
    [asset, assetStatus, updateStatus],
  );

  return !router?.query?.id ? (
    <Box css={{ my: '$4' }}>
      <Callout type="error" emoji="⚠️">
        <p>
          This is an extension of the{' '}
          <a href="/examples/react/view-asset">Create Asset</a> example. Please
          be sure to go through that example before trying this one -{' '}
          <strong>
            you will need an asset ID from that example in this demo.
          </strong>
        </p>
      </Callout>
    </Box>
  ) : (
    <Box css={{ my: '$4' }}>
      {/* <ConnectKitButton /> */}
      {address && (
        <>
          <Box
            css={{
              my: '$3',
              width: '100%',
            }}
          >
            <Text css={{ mb: '$1' }} variant="gray">
              Asset ID
            </Text>
            <TextField disabled size="3" value={assetId} />

            {asset?.storage?.ipfs?.nftMetadata?.url && (
              <>
                <Text css={{ my: '$1' }} variant="gray">
                  Metadata IPFS CID
                </Text>
                <TextField
                  disabled
                  size="3"
                  value={asset?.storage?.ipfs?.nftMetadata?.url}
                />
              </>
            )}

            {error?.message && (
              <Box>
                <Text variant="red">{error.message}</Text>
              </Box>
            )}
          </Box>
          <Flex css={{ jc: 'flex-end', mt: '$4', ai: 'center' }}>
            {asset?.status?.phase === 'ready' &&
            asset?.storage?.status?.phase !== 'ready' ? (
              <Button
                css={{ display: 'flex', ai: 'center' }}
                onClick={() => {
                  updateAsset({
                    assetId: asset.id,
                    storage: { ipfs: true },
                  });
                }}
                size="2"
                disabled={
                  !assetId || isLoading || Boolean(asset?.storage?.ipfs?.cid)
                }
                variant="primary"
              >
                {isLoading && <Spinner size={16} css={{ mr: '$1' }} />}
                Upload to IPFS
              </Button>
            ) : contractWriteData?.hash && isSuccess ? (
              <a
                target="_blank"
                href={`https://mumbai.polygonscan.com/tx/${contractWriteData.hash}`}
              >
                <Button
                  css={{ display: 'flex', ai: 'center' }}
                  size="2"
                  variant="primary"
                >
                  View Mint Transaction
                </Button>
              </a>
            ) : contractWriteError ? (
              <Box>
                <Text variant="red">{contractWriteError.message}</Text>
              </Box>
            ) : asset?.storage?.status?.phase === 'ready' && write ? (
              <Button
                css={{ display: 'flex', ai: 'center' }}
                onClick={() => {
                  write();
                }}
                size="2"
                disabled={isLoading}
                variant="primary"
              >
                {isLoading && <Spinner size={16} css={{ mr: '$1' }} />}
                Mint NFT
              </Button>
            ) : (
              <></>
            )}
          </Flex>
        </>
      )}
    </Box>
  );
};
