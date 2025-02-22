# livepeer

## 1.4.0

### Minor Changes

- [#102](https://github.com/livepeer/livepeer.js/pull/102) [`0ea4ec7`](https://github.com/livepeer/livepeer.js/commit/0ea4ec7fc7f2fa2e1504c7e976cbcf55d335981d) Thanks [@suhailkakar](https://github.com/suhailkakar)! - **Feature:** Add support for multiple files at once using useCreateAsset.

  You can upload multiple assets at once by passing an array of files to the `mutate` function. In return you will get an array of uploaded assets.

### Patch Changes

- [#141](https://github.com/livepeer/livepeer.js/pull/141) [`dc79b20`](https://github.com/livepeer/livepeer.js/commit/dc79b20f9f95a5082934be24b0a56ea590f2d086) Thanks [@0xcadams](https://github.com/0xcadams)! - **Fix:** fixed the prerendering query when `undefined` is return in `getStaticProps`.

## 1.3.0

### Minor Changes

- [#93](https://github.com/livepeer/livepeer.js/pull/93) [`f19779f`](https://github.com/livepeer/livepeer.js/commit/f19779f321fdd44b5c6a63b379f5d722e71a46e9) Thanks [@0xcadams](https://github.com/0xcadams)! - **Feature:** added JWT handling in Player, with `livepeer/crypto` subpackage with JWT helpers for NodeJS access control on Assets and Streams.

  The Player has a new prop, `jwt`, which takes a base64Url-encoded signed JWT payload and passes it as a query parameter with the stream playlist request. The livepeer provider will evaluate the JWT and determine if it is valid, before returning a response.

  _Note: this currently only works for Streams! Assets will be supported in the future._

  ```diff
  + import { importPKCS8, signAccessJwt, type SignAccessJwtOptions } from 'livepeer';
  ```

  ```tsx
  <Player
    title="Agent 327: Operation Barbershop"
    playbackId="6d7el73r1y12chxr"
    jwt={jwt}
  />
  ```

### Patch Changes

- [#135](https://github.com/livepeer/livepeer.js/pull/135) [`61ce2dc`](https://github.com/livepeer/livepeer.js/commit/61ce2dc733e97216cb5ca3cc3066a489a796f7ca) Thanks [@clacladev](https://github.com/clacladev)! - **Fix:**
  Fixed misbehaviour of the player controls on Safari macOS, by adjusting the controls' default z-index

- [#131](https://github.com/livepeer/livepeer.js/pull/131) [`118c262`](https://github.com/livepeer/livepeer.js/commit/118c262d7d1bc4a05d7eadf7f5445598a08320ce) Thanks [@0xcadams](https://github.com/0xcadams)! - **Feature:** added handling of paths in IPFS and Arweave URLs for both auto-upload and Player playback.

## 1.2.2

### Patch Changes

- [#122](https://github.com/livepeer/livepeer.js/pull/122) [`f5b370c`](https://github.com/livepeer/livepeer.js/commit/f5b370cfb94f57c1075dbd9f211b6881bb0da017) Thanks [@suhailkakar](https://github.com/suhailkakar)! - Fix: updated the fingerprint for Tus upload. This should fix the issue with the resumable uploads.

- [#120](https://github.com/livepeer/livepeer.js/pull/120) [`86d9a69`](https://github.com/livepeer/livepeer.js/commit/86d9a69d82c32f841fc4e460c59267146ecf754c) Thanks [@0xcadams](https://github.com/0xcadams)! - **Fix:** updated the Player metrics endpoint to use the correct ports for staging and canary environments.

- [#129](https://github.com/livepeer/livepeer.js/pull/129) [`543560c`](https://github.com/livepeer/livepeer.js/commit/543560c6b9bb25352c4cdfce4dc56d0405592f6d) Thanks [@0xcadams](https://github.com/0xcadams)! - **Feature:** Added automatic fetching/importing of Arweave URLs to the Player.

  An Arweave URL (such as `ar://<HASH>`, `https://<SUBDOMAIN>.arweave.dev/<HASH>` or `https://arweave.net/<HASH>`, _but cannot be a directory_) can be passed as the `src` or `playbackID` to the Player, and it will automatically detect if it is a valid Arweave URL and attempt to fetch the playback info. If the API does not have an Asset with the corresponding Arweave transaction hash, the Player will automatically attempt to import the Arweave content, and then play the transcoded content back.

## 1.2.1

### Patch Changes

- [#113](https://github.com/livepeer/livepeer.js/pull/113) [`488bdcd`](https://github.com/livepeer/livepeer.js/commit/488bdcd31396be770190530b0f608fead01deb15) Thanks [@0xcadams](https://github.com/0xcadams)! - **Refactor:** moved metrics addition to be a single function which handles fetching the reporting URL internally.

- [#107](https://github.com/livepeer/livepeer.js/pull/107) [`8aeb0b9`](https://github.com/livepeer/livepeer.js/commit/8aeb0b9a8f35407521f373f006bc8dc5482d303d) Thanks [@0xcadams](https://github.com/0xcadams)! - **Feature:** Added automatic fetching/importing of IPFS URLs to the Player.

  An IPFS [v0 or v1 CID](https://docs.ipfs.tech/concepts/content-addressing/) or URL (such as `ipfs://<CID>`, `https://<CID>.ipfs.dweb.link/` or `https://cloudflare-ipfs.com/ipfs/<CID>`, _but cannot be a directory_) can be passed as the `src` or `playbackID` to the Player, and it will automatically detect if it is a valid CID and attempt to fetch the playback info for the CID. If the API does not have an Asset with the corresponding CID, the Player will automatically attempt to import the CID from IPFS, and then play the transcoded content back.

- [#115](https://github.com/livepeer/livepeer.js/pull/115) Thanks [@clacladev](https://github.com/clacladev)! - **Fix:** changed the z-index to hide browser controls on the Player to only be applied on fullscreen.

## 1.2.0

### Minor Changes

- [#104](https://github.com/livepeer/livepeer.js/pull/104) [`39d277f`](https://github.com/livepeer/livepeer.js/commit/39d277f6147bae605e97d64a0f56c0a3f4651f28) Thanks [@0xcadams](https://github.com/0xcadams)! - **Breaking:** removed the `meta` field on an Asset (which is a custom field stored in the Studio provider and not replicated to IPFS) to reduce confusion around metadata fields.

## 1.1.0

### Minor Changes

- [#98](https://github.com/livepeer/livepeer.js/pull/98) [`5fc44a5`](https://github.com/livepeer/livepeer.js/commit/5fc44a56e9e5ee5790bb05e76e1e430c44aee02a) Thanks [@suhailkakar](https://github.com/suhailkakar)! - **Feature:** added picture in picture support to the Livepeer player.

  We support both the [w3c](https://w3c.github.io/picture-in-picture/) standard (which most modern browsers support), as well as the [older Safari/iOS spec](https://developer.apple.com/documentation/webkitjs/adding_picture_in_picture_to_your_safari_media_controls). See the browsers which support Picture-in-Picture on [caniuse](https://caniuse.com/picture-in-picture).

  ```tsx
  <Player playbackId="6d7el73r1y12chxr" showPipButton />
  ```

- [#92](https://github.com/livepeer/livepeer.js/pull/92) [`e7348f4`](https://github.com/livepeer/livepeer.js/commit/e7348f4c16fbcd5448147516c086c182d842a552) Thanks [@0xcadams](https://github.com/0xcadams)! - **Fix:** updated dependencies and fixed exporting to have individual paths for smaller bundle size.

### Patch Changes

- [#95](https://github.com/livepeer/livepeer.js/pull/95) [`0b02851`](https://github.com/livepeer/livepeer.js/commit/0b02851ed86e4c6ab0e28b5f575181d62c8dc629) Thanks [@0xcadams](https://github.com/0xcadams)! - **Fix:** further changes to imports to change build config to be smaller.

- [#98](https://github.com/livepeer/livepeer.js/pull/98) [`5fc44a5`](https://github.com/livepeer/livepeer.js/commit/5fc44a56e9e5ee5790bb05e76e1e430c44aee02a) Thanks [@suhailkakar](https://github.com/suhailkakar)! - **Fix:** fixed fullscreen state updating properly when entering/exiting fullscreen.

## 1.1.0-next.2

### Minor Changes

- [#98](https://github.com/livepeer/livepeer.js/pull/98) [`5fc44a5`](https://github.com/livepeer/livepeer.js/commit/5fc44a56e9e5ee5790bb05e76e1e430c44aee02a) Thanks [@suhailkakar](https://github.com/suhailkakar)! - **Feature:** added picture in picture support to the Livepeer player.

  We support both the [w3c](https://w3c.github.io/picture-in-picture/) standard (which most modern browsers support), as well as the [older Safari/iOS
  spec](https://developer.apple.com/documentation/webkitjs/adding_picture_in_picture_to_your_safari_media_controls).
  See the browsers which support Picture-in-Picture on
  [caniuse](https://caniuse.com/picture-in-picture).

  ```tsx
  <Player playbackId="6d7el73r1y12chxr" showPipButton />
  ```

### Patch Changes

- [#98](https://github.com/livepeer/livepeer.js/pull/98) [`5fc44a5`](https://github.com/livepeer/livepeer.js/commit/5fc44a56e9e5ee5790bb05e76e1e430c44aee02a) Thanks [@suhailkakar](https://github.com/suhailkakar)! - **Fix:** fixed fullscreen state updating properly when entering/exiting fullscreen.

## 1.1.0-next.1

### Patch Changes

- [#95](https://github.com/livepeer/livepeer.js/pull/95) [`0b02851`](https://github.com/livepeer/livepeer.js/commit/0b02851ed86e4c6ab0e28b5f575181d62c8dc629) Thanks [@0xcadams](https://github.com/0xcadams)! - **Fix:** further changes to imports to change build config to be smaller.

## 1.1.0-next.0

### Minor Changes

- [#92](https://github.com/livepeer/livepeer.js/pull/92) [`e7348f4`](https://github.com/livepeer/livepeer.js/commit/e7348f4c16fbcd5448147516c086c182d842a552) Thanks [@0xcadams](https://github.com/0xcadams)! - **Fix:** updated dependencies and fixed exporting to have individual paths for smaller bundle size.

## 1.0.4

### Patch Changes

- [#90](https://github.com/livepeer/livepeer.js/pull/90) [`c61dff7`](https://github.com/livepeer/livepeer.js/commit/c61dff7fcaa58ebeb2c00c0cc03934a7fe7a894d) Thanks [@0xcadams](https://github.com/0xcadams)! - **Fix:** added fixes for Safari live streaming - live streams should now show the "live" indicator and bad playlists/media errors
  will now retry loading with backoff.

- [#84](https://github.com/livepeer/livepeer.js/pull/84) [`f014cfa`](https://github.com/livepeer/livepeer.js/commit/f014cfa1f1cd6d7ea026c615a60b5350c80b48e1) Thanks [@0xcadams](https://github.com/0xcadams)! - **Feature:** added metadata customization to storage to allow for customizing the metadata which is saved when an Asset
  is uploaded to IPFS.

## 1.0.3

### Patch Changes

- [#85](https://github.com/livepeer/livepeer.js/pull/85) [`adf52c5`](https://github.com/livepeer/livepeer.js/commit/adf52c5e0fb43676eb89db7244f896a41f4a5760) Thanks [@0xcadams](https://github.com/0xcadams)! - **Fix:** fixed Safari flex not taking up entire parent container.

## 1.0.2

### Patch Changes

- [`d43c04a`](https://github.com/livepeer/livepeer.js/commit/d43c04ade7cfaf18800508a7da31d99b9989f931) Thanks [@0xcadams](https://github.com/0xcadams)! - **Fix**: added `PlayerObjectFit` type to exports.

## 1.0.1

### Patch Changes

- [#75](https://github.com/livepeer/livepeer.js/pull/75) [`73f37ad`](https://github.com/livepeer/livepeer.js/commit/73f37ad8ec312e949fb3420b48113896580f16de) Thanks [@0xcadams](https://github.com/0xcadams)! - **Fix:** fixed too strict types on `<Player />`, background play/pause click handler not working without a poster element, theme overrides without a global theme, and styling for the container to take up the parent width and maintain aspect ratio.

## 1.0.0

### Major Changes

- [#42](https://github.com/livepeer/livepeer.js/pull/42) [`ea9d083`](https://github.com/livepeer/livepeer.js/commit/ea9d083869acf571af4cdc22a97b540f5c440f11) Thanks [@0xcadams](https://github.com/0xcadams)! - **Fix:** moved all contract interactions to a separate subpackage, to remove the need for the `ethers`/`wagmi` peer dependencies.

  ```diff
  +import {
  +  ArbRetryableTxABI,
  +  BondingManagerABI,
  +  ControllerABI,
  +  InboxABI,
  +  L1BondingManagerABI,
  +  L1MigratorABI,
  +  L2LPTGatewayABI,
  +  L2MigratorABI,
  +  LivepeerTokenABI,
  +  LivepeerTokenFaucetABI,
  +  MerkleSnapshotABI,
  +  MinterABI,
  +  NodeInterfaceABI,
  +  PollABI,
  +  PollCreatorABI,
  +  RoundsManagerABI,
  +  ServiceRegistryABI,
  +  TicketBrokerABI,

  +  allChainId,
  +  arbitrumOneAddress,
  +  arbitrumRinkebyAddress,
  +  mainnetAddress,
  +  mainnetChainId,
  +  rinkebyAddress,
  +  testnetChainId,

  +  getBondingManager,
  +  getContractAddressFromController,
  +  getController,
  +  getL1Migrator,
  +  getL2Migrator,
  +  getLivepeerToken,
  +  getLivepeerTokenFaucet,
  +  getMerkleSnapshot,
  +  getMinter,
  +  getPollCreator,
  +  getRoundsManager,
  +  getServiceRegistry,
  +  getTicketBroker,

  +  ArbRetryableTxFactory,
  +  BondingManagerFactory,
  +  ControllerFactory,
  +  InboxFactory,
  +  L1BondingManagerFactory,
  +  L1MigratorFactory,
  +  L2LPTGatewayFactory,
  +  L2MigratorFactory,
  +  LivepeerTokenFactory,
  +  LivepeerTokenFaucetFactory,
  +  MerkleSnapshotFactory,
  +  MinterFactory,
  +  NodeInterfaceFactory,
  +  PollCreatorFactory,
  +  PollFactory,
  +  RoundsManagerFactory,
  +  ServiceRegistryFactory,
  +  TicketBrokerFactory,
  +} from 'livepeer/contracts';

  +import type {
  +  L1Address,
  +  L1LivepeerChain,
  +  L1LivepeerChainId,
  +  L2Address,
  +  L2LivepeerChain,
  +  L2LivepeerChainId,
  +  LivepeerAddress,
  +  LivepeerChain,
  +  LivepeerChainId,
  +  MainnetLivepeerChain,
  +  MainnetLivepeerChainId,
  +  TestnetLivepeerChain,
  +  TestnetLivepeerChainId,

  +  ArbRetryableTx,
  +  BondingManager,
  +  Controller,
  +  Inbox,
  +  L1BondingManager,
  +  L1Migrator,
  +  L2LPTGateway,
  +  L2Migrator,
  +  LivepeerToken,
  +  LivepeerTokenFaucet,
  +  MerkleSnapshot,
  +  Minter,
  +  NodeInterface,
  +  Poll,
  +  PollCreator,
  +  RoundsManager,
  +  ServiceRegistry,
  +  TicketBroker,
  +} from 'livepeer/contracts';
  ```

### Minor Changes

- [#42](https://github.com/livepeer/livepeer.js/pull/42) [`ea9d083`](https://github.com/livepeer/livepeer.js/commit/ea9d083869acf571af4cdc22a97b540f5c440f11) Thanks [@0xcadams](https://github.com/0xcadams)! - **Feature:** added styling for media player components using `@stitches/core` and polyfilling using `core-js`.

  Added a core vanilla JS store based on Zustand, w/ state propagated to/from a media element (see `MediaControllerState` and `MediaControllerStore`). Also added more helper functions for validating/constructing media sources and mime types, theming, and browser interactions.

  The following updates were made to `package.json`:

  ```diff
     },
     "peerDependenciesMeta": {},
     "dependencies": {
  +    "@stitches/core": "^1.2.8",
  +    "core-js": "^3.25.2",
       "cross-fetch": "^3.1.5",
       "hls.js": "^1.2.1",
       "tus-js-client": "^3.0.0",
  ```

  The following updates were made to the exports from `livepeer`:

  ```diff
     TestnetLivepeerChainId,
   } from './constants';
   export { HttpError, IncorrectChainIdError } from './errors';
  +export {
  +  addEventListeners,
  +  canPlayMediaNatively,
  +  createControllerStore,
  +  createNewHls,
  +  createPlayerTheme,
  +  defaultTheme,
  +  getCssText,
  +  getMediaSourceType,
  +  getMetricsReportingUrl,
  +  isHlsSupported,
  +  MetricsStatus,
  +  PlaybackMonitor,
  +  reportMediaMetrics,
  +  styling,
  +} from './media';
  +export type {
  +  AspectRatio,
  +  AudioSrc,
  +  ControlsOptions,
  +  HlsSrc,
  +  HlsVideoConfig,
  +  MediaControllerState,
  +  MediaControllerStore,
  +  PlaybackRecord,
  +  RawMetrics,
  +  Src,
  +  ThemeConfig,
  +  VideoSrc,
  +} from './media';
   export { createStorage, noopStorage } from './storage';
   export type { ClientStorage as Storage } from './storage';

   ...

     UpdateStreamArgs,
     ViewsMetrics,
   } from './types';
  -export { pick } from './utils';
  -export {
  -  createNewHls,
  -  getMetricsReportingUrl,
  -  isHlsSupported,
  -  MetricsStatus,
  -  PlaybackMonitor,
  -  reportVideoMetrics,
  -} from './video';
  -export type { HlsVideoConfig, PlaybackRecord, RawMetrics } from './video';
  +export { deepMerge, pick } from './utils';
  ```

### Patch Changes

- [#73](https://github.com/livepeer/livepeer.js/pull/73) [`55a9b81`](https://github.com/livepeer/livepeer.js/commit/55a9b81ebdd524a42da0fb7679ca75d11c4c91a9) Thanks [@0xcadams](https://github.com/0xcadams)! - **Fix:** added media element duration to the metrics reporting plugin.

## 0.5.1

### Patch Changes

- [#68](https://github.com/livepeer/livepeer.js/pull/68) [`8f5e4a3`](https://github.com/livepeer/livepeer.js/commit/8f5e4a3118458b0b01b667ab81f98382eae7dc5d) Thanks [@victorges](https://github.com/victorges)! - Allow configuring base URL of Livepeer Studio provider

  You can now configure more parameters of the the Livepeer Studio provider,
  including specifically the `baseUrl` for the API calls.

  ```ts
  const livepeer = createReactClient({
    provider: studioProvider({
      baseUrl: 'https://studio.my-domain.com/root/api',
      apiKey: '123-abcd',
    }),
  });
  ```

## 0.5.0

### Minor Changes

- [#44](https://github.com/livepeer/livepeer.js/pull/44) [`648ddf5`](https://github.com/livepeer/livepeer.js/commit/648ddf528e9bc9250458e0c5f5140aa3f41878f0) Thanks [@0xcadams](https://github.com/0xcadams)! - **Feature:** Asset Metrics

  There is now support for asset metrics, with start views count being returned
  when metrics have been reported to the correct reporting URL (this is handled in
  `@livepeer/react`'s `VideoPlayer`).

  ```typescript
  const metrics = getAssetMetrics({ assetId });

  const viewCount = metrics?.metrics?.[0]?.startViews ?? 0;
  ```

### Patch Changes

- [`416951d`](https://github.com/livepeer/livepeer.js/commit/416951d03c42e7bba1bbfa535a91e5f277130e5f) Thanks [@0xcadams](https://github.com/0xcadams)! - **Fix:** @victorges added default chunk size of 5mb to tus upload, if the input is a stream.

## 0.4.0

### Minor Changes

- [#27](https://github.com/livepeer/livepeer.js/pull/27) [`6635d96`](https://github.com/livepeer/livepeer.js/commit/6635d964912654a4056bace416bc315ef5f18e2d) Thanks [@victorges](https://github.com/victorges)! - **Fix:** Improve LivepeerProvider types

  Types are now all documented and extensive for the current version of the Studio
  API which is the base for the LivepeerProvider interface.

  Storage API has also changed slightly, to allow storing an asset in multiple
  different storages in the future. Right now it still only supports IPFS, but the
  interface is now compatible with adding more storages in the future.

  **Feature:** Multistream

  The LivepeerProvider now supports the multistream feature. To use it simply add
  a `multistream` field with the desired configuration when creating or updating a
  `Stream` object.

  ```typescript
  const { mutate: createStream } = useCreateStream();
  createStream({
    name,
    multistream: {
      targets: [
        {
          url: 'rtmp://ingest.example.com/rtmp/myStreamKey',
        },
      ],
    },
  });
  ```

  **Feature:** Upload progress

  Track and show upload progress when creating assets through the `uploadProgress` field in the `useCreateAsset` hook.

  ```typescript
  function App() {
    const createAsset = useCreateAsset();
    return (
      <Button onClick={() => createAsset.mutate({ name, file })}>Create</Button>
      <Text>Upload progress: {100 * createAsset?.uploadProgress ?? 0}%</Text>
    );
  }
  ```

## 0.3.0

### Minor Changes

- [#26](https://github.com/livepeer/livepeer.js/pull/26) [`94fd2c8`](https://github.com/livepeer/livepeer.js/commit/94fd2c8c7b2d8d0b37f4ee074ecd23be8296bd35) Thanks [@clacladev](https://github.com/clacladev)! - **Feature:** added hls.js as a dependency and the creation of an HLS instance to manage a video element and provide HLS and LLHLS support.

  See below for the API changes:

  ```diff
  + export { createNewHls, isHlsSupported } from './video';
  + export type { HlsVideoConfig } from './video';
  ```

  The `createNewHls` can be used to instantiate a new `Hls` class which connects
  to the provided `HTMLMediaElement` to stream HLS video.

  ```typescript
  if (mediaElement && typeof window !== 'undefined' && isHlsSupported()) {
    const { destroy } = createNewHls(src, mediaElement, hlsConfig);
  }
  ```

  The `createNewHls` function also instantiates reporting to the provider to provide viewership/general metrics.

  This allows a user to build their own custom video player using different frameworks other than React, with easy integration with metrics and HLS out of the box.

### Patch Changes

- [#34](https://github.com/livepeer/livepeer.js/pull/34) [`d3aa654`](https://github.com/livepeer/livepeer.js/commit/d3aa654e8f7cd486ebedf481fec398a268fd4597) Thanks [@0xcadams](https://github.com/0xcadams)! - **Chore:** updated `zustand` and `ethers` to latest versions.

  ```diff
       "cross-fetch": "^3.1.5",
       "hls.js": "^1.2.1",
       "tus-js-client": "^3.0.0",
  -    "zustand": "^4.0.0"
  +    "zustand": "^4.1.1"
     },
     "devDependencies": {
  -    "@ethersproject/abi": "^5.6.4",
  -    "ethers": "^5.6.9"
  +    "@ethersproject/abi": "^5.7.0",
  +    "ethers": "^5.7.0"
     },
  ```

## 0.2.2

### Patch Changes

- [#5](https://github.com/livepeer/livepeer.js/pull/5) [`97c56f6`](https://github.com/livepeer/livepeer.js/commit/97c56f64b18f62c6b417e35ac27834747b7a0c20) Thanks [@0xcadams](https://github.com/0xcadams)! - Updated the default studio API key to use a new, tracked (and rate-limited) version.

  ```diff
  -export const defaultStudioApiKey = '182188f3-3ddf-4dc2-9889-79ecb17a26c9';
  +export const defaultStudioApiKey = '4991930c-f9ae-46a0-a2a8-488c466da778';
  ```

  Updated the types on `CreateAssetArgs` to include `ReadStream` for node.js environments.

  ```diff
  export type CreateAssetArgs = {
    name: string;

  - file: File;
  + file: File | ReadStream;
    };
  ```

## 0.2.1

### Patch Changes

- [#3](https://github.com/livepeer/livepeer.js/pull/3) [`1c38dcd`](https://github.com/livepeer/livepeer.js/commit/1c38dcde2a7abce7a7785bcd6880ab6f71f0e0e4) Thanks [@0xcadams](https://github.com/0xcadams)! - **Breaking:** removed the term "LPMS" from the library and replaced a "LPMS Provider" with a "Livepeer Provider".

  See below for the API changes:

  ```diff
  import {
    getL2Migrator,
    getLivepeerToken,
    getLivepeerTokenFaucet,
  - getLPMSProvider,
  + getLivepeerProvider,
    getMerkleSnapshot,
    getMinter,
    ...
    updateAsset,
    updateStream,
  - watchLPMSProvider,
  + watchLivepeerProvider,
    ...
  - GetLPMSProviderResult,
  - WatchLPMSProviderCallback,
  + GetLivepeerProviderResult,
  + WatchLivepeerProviderCallback,
    ...
    allChainId,
  - allLPMS,
    arbitrumOneAddress,
    arbitrumRinkebyAddress,
    ArbRetryableTxABI,
    BondingManagerABI,
    ControllerABI,
  - defaultLPMS,
  + defaultStudioApiKey,
    defaultTranscodingProfiles,
    InboxABI,
    L1BondingManagerABI,
    ...
    L2MigratorABI,
    LivepeerTokenABI,
    LivepeerTokenFaucetABI,
  + lpms,
    mainnetAddress,
    mainnetChainId,
    MerkleSnapshotABI,
    ...
    LivepeerAddress,
    LivepeerChain,
    LivepeerChainId,
  - LPMSName,
  + LivepeerProviderName,
    MainnetLivepeerChain,
    MainnetLivepeerChainId,
    TestnetLivepeerChain,
    ...
    L1Migrator,
    L2LPTGateway,
    L2Migrator,
  + LivepeerProvider,
  + LivepeerProviderConfig,
    LivepeerToken,
    LivepeerTokenFaucet,
  - LPMS,
  - LPMSProvider,
    MerkleSnapshot,
    Minter,
    ...
  } from "livepeer";
  ```

## 0.2.0

### Minor Changes

- [`ebd1587`](https://github.com/livepeer/livepeer.js/commit/ebd15872cf7ac48a092ad88ea3a470a1c788e223) Thanks [@0xcadams](https://github.com/0xcadams)! - The `livepeer` package is now comprised of five main groups:

  - **actions:** functions to write/read from Livepeer Media Server (LPMS) providers and the Livepeer protocol smart contracts
  - **client:** the singleton LPMS provider with persistence to local storage and global state management
  - **constants:** constants for the Studio LPMS provider (and future providers) and protocol contract addresses/ABIs/chain IDs
  - **errors:** custom errors for livepeer.js
  - **types:** Typescript typings for the LPMS provider interface, Typechain-generated types for protocol contracts, and utility types

  ### Actions

  ```diff
  + import {
  +   createAsset,
  +   createStream,
  +   getAsset,
  +   getBondingManager,
  +   getContractAddressFromController,
  +   getController,
  +   getL1Migrator,
  +   getL2Migrator,
  +   getLivepeerToken,
  +   getLivepeerTokenFaucet,
  +   getLPMSProvider,
  +   getMerkleSnapshot,
  +   getMinter,
  +   getPollCreator,
  +   getRoundsManager,
  +   getServiceRegistry,
  +   getStream,
  +   getStreamSession,
  +   getStreamSessions,
  +   getTicketBroker,
  +   updateAsset,
  +   updateStream,
  +   watchLPMSProvider,
  + } from 'livepeer';
  +
  + import type {
  +   GetLPMSProviderResult,
  +   WatchLPMSProviderCallback,
  + } from 'livepeer';
  ```

  ### Client

  ```diff
  + import { Client, createClient } from 'livepeer';
  + import type { ClientConfig } from 'livepeer';
  ```

  ### Constants

  ```diff
  + import {
  +   allChainId,
  +   allLPMS,
  +   arbitrumOneAddress,
  +   arbitrumRinkebyAddress,
  +   ArbRetryableTxABI,
  +   BondingManagerABI,
  +   ControllerABI,
  +   defaultLPMS,
  +   defaultTranscodingProfiles,
  +   InboxABI,
  +   L1BondingManagerABI,
  +   L1MigratorABI,
  +   L2LPTGatewayABI,
  +   L2MigratorABI,
  +   LivepeerTokenABI,
  +   LivepeerTokenFaucetABI,
  +   lpms,
  +   mainnetAddress,
  +   mainnetChainId,
  +   MerkleSnapshotABI,
  +   MinterABI,
  +   NodeInterfaceABI,
  +   PollABI,
  +   PollCreatorABI,
  +   rinkebyAddress,
  +   RoundsManagerABI,
  +   ServiceRegistryABI,
  +   studio,
  +   testnetChainId,
  +   TicketBrokerABI,
  + } from 'livepeer';
  +
  + import type {
  +   L1Address,
  +   L1LivepeerChain,
  +   L1LivepeerChainId,
  +   L2Address,
  +   L2LivepeerChain,
  +   L2LivepeerChainId,
  +   LivepeerAddress,
  +   LivepeerChain,
  +   LivepeerChainId,
  +   LPMSName,
  +   MainnetLivepeerChain,
  +   MainnetLivepeerChainId,
  +   TestnetLivepeerChain,
  +   TestnetLivepeerChainId,
  + } from 'livepeer';
  ```

  ### Types

  ```diff
  + import {
  +   ArbRetryableTxFactory,
  +   BondingManagerFactory,
  +   ControllerFactory,
  +   InboxFactory,
  +   L1BondingManagerFactory,
  +   L1MigratorFactory,
  +   L2LPTGatewayFactory,
  +   L2MigratorFactory,
  +   LivepeerTokenFactory,
  +   LivepeerTokenFaucetFactory,
  +   MerkleSnapshotFactory,
  +   MinterFactory,
  +   NodeInterfaceFactory,
  +   PollCreatorFactory,
  +   PollFactory,
  +   RoundsManagerFactory,
  +   ServiceRegistryFactory,
  +   TicketBrokerFactory,
  + } from 'livepeer';
  +
  + import type {
  +   Address,
  +   ArbRetryableTx,
  +   Asset,
  +   BondingManager,
  +   Controller,
  +   CreateAssetArgs,
  +   CreateStreamArgs,
  +   GetAssetArgs,
  +   GetStreamArgs,
  +   GetStreamSessionArgs,
  +   GetStreamSessionsArgs,
  +   Hash,
  +   Inbox,
  +   Ipfs,
  +   L1BondingManager,
  +   L1Migrator,
  +   L2LPTGateway,
  +   L2Migrator,
  +   LivepeerToken,
  +   LivepeerTokenFaucet,
  +   LPMS,
  +   LPMSProvider,
  +   MerkleSnapshot,
  +   Minter,
  +   NodeInterface,
  +   Poll,
  +   PollCreator,
  +   RoundsManager,
  +   ServiceRegistry,
  +   Stream,
  +   StreamSession,
  +   TicketBroker,
  +   TranscodingProfile,
  +   UpdateAssetArgs,
  +   UpdateStreamArgs,
  + } from 'livepeer';
  ```
