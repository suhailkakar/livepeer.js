import {
  AudioSrc,
  Src,
  VideoSrc,
  addMediaMetrics,
  getMediaSourceType,
  parseArweaveTxId,
  parseCid,
} from 'livepeer/media';
import { ControlsOptions } from 'livepeer/media/controls';
import { AspectRatio, ThemeConfig } from 'livepeer/styling';
import { Asset } from 'livepeer/types';
import { isNumber } from 'livepeer/utils';
import * as React from 'react';

import { MediaControllerProvider, useTheme } from './context';

import {
  Container,
  ControlsContainer,
  FullscreenButton,
  PictureInPictureButton,
  PlayButton,
  Poster,
  Progress,
  TimeDisplay,
  Volume,
} from './controls';
import { Title } from './controls/Title';
import { AudioPlayer, HlsPlayer, VideoPlayer } from './players';
import { usePlaybackInfoOrImport } from './usePlaybackInfoOrImport';

export type PlayerObjectFit = 'cover' | 'contain';

export type PlayerProps = {
  /** The source(s) of the media (**required** if `playbackId` is not provided) */
  src?: string | string[] | null | undefined;
  /** The playback ID for the media (**required** if `src` is not provided) */
  playbackId?: string | null | undefined;

  /** The title of the media */
  title?: string;
  /** Shows/hides the title at the top of the media */
  showTitle?: boolean;

  /** Whether the media will loop when finished. Defaults to false. */
  loop?: boolean;

  /**
   * The aspect ratio of the media. Defaults to 16to9 (16 / 9).
   * This significantly improves the cumulative layout shift and is required for the player.
   *
   * @see {@link https://web.dev/cls/}
   * */
  aspectRatio?: AspectRatio;
  /**
   * Poster image to show when the content is either loading (when autoplaying) or hasn't started yet (without autoplay).
   * It is highly recommended to also pass in a `title` attribute as well, for ARIA compatibility.
   */
  poster?: string | React.ReactNode;
  /** Shows/hides the loading spinner */
  showLoadingSpinner?: boolean;

  /** Configuration for the event listeners */
  controls?: ControlsOptions;
  /**
   * Play media automatically when the content loads (if this is specified, you must also specify muted,
   * since this is required in browsers)
   */
  autoPlay?: boolean;
  /** Mute media by default */
  muted?: boolean;

  /** Theme configuration for the player */
  theme?: ThemeConfig;

  /** The object-fit property for the video element. Defaults to cover (contain is usually used in full-screen applications) */
  objectFit?: PlayerObjectFit;

  /** Custom controls passed in to override the default controls */
  children?: React.ReactNode;

  /** The refetch interval for the playback info hook (used with `playbackId` to query until there is a valid playback URL) */
  refetchPlaybackInfoInterval?: number;

  /** Whether to show the picture in picture button */
  showPipButton?: boolean;

  /** If a decentralized identifier (an IPFS CID/URL) should automatically be imported as an Asset if playback info does not exist. Defaults to true. */
  autoUrlUpload?: boolean;

  /** If a decentralized identifier (an IPFS CID/URL) should automatically be imported as an Asset if playback info does not exist. Defaults to true. */
  jwt?: string;

  /** Callback called when the metrics plugin cannot be initialized properly */
  onMetricsError?: (error: Error) => void;
} & (
  | {
      src: string | string[] | null | undefined;
    }
  | { playbackId: string | null | undefined }
);

export function Player({
  autoPlay,
  children,
  controls,
  muted,
  playbackId,
  refetchPlaybackInfoInterval = 5000,
  src,
  theme,
  title,
  poster,
  loop,
  showLoadingSpinner = true,
  showTitle = true,
  aspectRatio = '16to9',
  objectFit = 'cover',
  showPipButton,
  autoUrlUpload = true,
  onMetricsError,
  jwt,
}: PlayerProps) {
  const [mediaElement, setMediaElement] =
    React.useState<HTMLMediaElement | null>(null);

  const [uploadStatus, setUploadStatus] = React.useState<
    Asset['status'] | null
  >(null);

  const onAssetStatusChange = React.useCallback(
    (status: Asset['status']) => {
      setUploadStatus(status);
    },
    [setUploadStatus],
  );

  // check if the src or playbackId are decentralized storage sources (does not handle src arrays)
  const decentralizedSrcOrPlaybackId = React.useMemo(
    () =>
      playbackId
        ? parseCid(playbackId) ?? parseArweaveTxId(playbackId)
        : !Array.isArray(src)
        ? parseCid(src) ?? parseArweaveTxId(src)
        : null,
    [playbackId, src],
  );

  const playbackInfo = usePlaybackInfoOrImport({
    decentralizedSrcOrPlaybackId,
    playbackId,
    refetchPlaybackInfoInterval,
    autoUrlUpload,
    onAssetStatusChange,
  });

  const [playbackUrls, setPlaybackUrls] = React.useState<string[]>([]);

  React.useEffect(() => {
    const playbackInfoSources = playbackInfo?.meta?.source
      ?.map((s) => s?.url)
      ?.filter((s) => s);

    if (playbackInfoSources) {
      setPlaybackUrls(playbackInfoSources);
    }
  }, [playbackInfo]);

  const sourceMimeTyped = React.useMemo(() => {
    // cast all URLs to an array of strings
    const sources =
      playbackUrls.length > 0
        ? playbackUrls
        : typeof src === 'string'
        ? [src]
        : src;

    if (!sources) {
      return null;
    }

    const authenticatedSources = sources.map((source) => {
      // append the JWT to the query params
      if (jwt) {
        const url = new URL(source);
        url.searchParams.append('jwt', jwt);
        return url.toString();
      }

      return source;
    });

    const mediaSourceTypes = authenticatedSources
      .map((s) => (typeof s === 'string' ? getMediaSourceType(s) : s))
      .filter((s) => s) as Src[];

    // if there are multiple Hls sources, we take only the first one
    // otherwise we pass all sources to the video or audio player components
    if (
      mediaSourceTypes.every((s) => s.type === 'hls') &&
      mediaSourceTypes?.[0]?.type === 'hls'
    ) {
      return mediaSourceTypes[0];
    }

    // if the player is auto uploading, we do not play back the detected input file
    // e.g. https://arweave.net/84KylA52FVGLxyvLADn1Pm8Q3kt8JJM74B87MeoBt2w/400019.mp4
    if (decentralizedSrcOrPlaybackId && autoUrlUpload) {
      return null;
    }

    // we filter by the first source type in the array provided
    const mediaSourceFiltered =
      mediaSourceTypes?.[0]?.type === 'audio'
        ? (mediaSourceTypes.filter((s) => s.type === 'audio') as AudioSrc[])
        : mediaSourceTypes?.[0]?.type === 'video'
        ? (mediaSourceTypes.filter((s) => s.type === 'video') as VideoSrc[])
        : null;

    return mediaSourceFiltered;
  }, [decentralizedSrcOrPlaybackId, playbackUrls, src, autoUrlUpload, jwt]);

  const hidePosterOnPlayed = React.useMemo(
    () =>
      Array.isArray(sourceMimeTyped)
        ? sourceMimeTyped?.[0]?.type !== 'audio'
          ? true
          : undefined
        : undefined,
    [sourceMimeTyped],
  );

  const playerRef = React.useCallback((element: HTMLMediaElement | null) => {
    if (element) {
      setMediaElement(element);
    }
  }, []);

  React.useEffect(() => {
    const { destroy } = addMediaMetrics(
      mediaElement,
      Array.isArray(sourceMimeTyped)
        ? sourceMimeTyped?.[0]?.src
        : sourceMimeTyped?.src,
      (e) => {
        onMetricsError?.(e as Error);
        console.error('Not able to report player metrics', e);
      },
    );

    return destroy;
  }, [onMetricsError, mediaElement, sourceMimeTyped]);

  const contextTheme = useTheme(theme);

  const topLoadingText = React.useMemo(
    () =>
      uploadStatus?.phase === 'processing' && isNumber(uploadStatus?.progress)
        ? `Processing: ${(Number(uploadStatus?.progress) * 100).toFixed(0)}%`
        : uploadStatus?.phase === 'failed'
        ? 'Upload Failed'
        : null,
    [uploadStatus],
  );

  return (
    <MediaControllerProvider element={mediaElement} options={controls}>
      <Container className={contextTheme} aspectRatio={aspectRatio}>
        {sourceMimeTyped && !Array.isArray(sourceMimeTyped) ? (
          <HlsPlayer
            ref={playerRef}
            autoPlay={autoPlay}
            muted={autoPlay ? true : muted}
            src={sourceMimeTyped}
            poster={typeof poster === 'string' ? poster : undefined}
            loop={loop}
            objectFit={objectFit}
          />
        ) : sourceMimeTyped?.[0]?.type === 'audio' ? (
          <AudioPlayer
            ref={playerRef}
            autoPlay={autoPlay}
            muted={autoPlay ? true : muted}
            src={sourceMimeTyped as AudioSrc[]}
            loop={loop}
            objectFit={objectFit}
          />
        ) : (
          <VideoPlayer
            ref={playerRef}
            autoPlay={autoPlay}
            muted={autoPlay ? true : muted}
            src={sourceMimeTyped as VideoSrc[] | null}
            poster={typeof poster === 'string' ? poster : undefined}
            loop={loop}
            objectFit={objectFit}
          />
        )}

        {React.isValidElement(children) ? (
          children
        ) : (
          <>
            <ControlsContainer
              hidePosterOnPlayed={hidePosterOnPlayed}
              showLoadingSpinner={showLoadingSpinner}
              topLoadingText={topLoadingText}
              poster={poster && <Poster content={poster} title={title} />}
              top={<>{title && showTitle && <Title content={title} />}</>}
              middle={<Progress />}
              left={
                <>
                  <PlayButton />
                  <Volume />
                  <TimeDisplay />
                </>
              }
              right={
                <>
                  {showPipButton && <PictureInPictureButton />}
                  <FullscreenButton />
                </>
              }
            />
          </>
        )}
      </Container>
    </MediaControllerProvider>
  );
}
