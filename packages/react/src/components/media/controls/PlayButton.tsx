import { MediaControllerState } from 'livepeer/media/controls';
import { styling } from 'livepeer/styling';
import * as React from 'react';

import { PropsOf, useConditionalIcon } from '../../system';
import { useMediaController } from '../context';

const DefaultPlayIcon = () => (
  <svg
    width="100%"
    height="100%"
    viewBox="0 0 36 36"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M 12,26 18.5,22 18.5,14 12,10 z M 18.5,22 25,18 25,18 18.5,14 z"
      fill="currentColor"
    />
  </svg>
);

const DefaultPauseIcon = () => (
  <svg width="100%" height="100%" viewBox="0 0 36 36" fill="none">
    <path
      // fillRule="evenodd"
      // clipRule="evenodd"
      d="M 12,26 16,26 16,10 12,10 z M 21,26 25,26 25,10 21,10 z"
      fill="currentColor"
    />
  </svg>
);

export type PlayButtonProps = Omit<PropsOf<'button'>, 'children'> & {
  /**
   * The play icon to be used for the button.
   * @type React.ReactElement
   */
  playIcon?: React.ReactElement;
  /**
   * The pause icon to be used for the button.
   * @type React.ReactElement
   */
  pauseIcon?: React.ReactElement;
} & (
    | {
        playIcon: React.ReactElement;
        pauseIcon: React.ReactElement;
      }
    | Record<string, never>
  );

const mediaControllerSelector = ({
  togglePlay,
  playing,
}: MediaControllerState<HTMLMediaElement>) => ({
  togglePlay,
  playing,
});

export const PlayButton = React.forwardRef<HTMLButtonElement, PlayButtonProps>(
  (props, ref) => {
    const { togglePlay, playing } = useMediaController(mediaControllerSelector);

    const { playIcon, pauseIcon, onClick, ...rest } = props;

    const onClickComposed = async (
      e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    ) => {
      await onClick?.(e);
      await togglePlay();
    };

    const _children = useConditionalIcon(
      playing,
      pauseIcon,
      <DefaultPauseIcon />,
      playIcon,
      <DefaultPlayIcon />,
    );

    const title = React.useMemo(
      () => (playing ? 'Pause (k)' : 'Play (k)'),
      [playing],
    );

    return (
      <button
        {...rest}
        className={styling.iconButton()}
        title={title}
        aria-label={title}
        ref={ref}
        onClick={onClickComposed}
      >
        {_children}
      </button>
    );
  },
);
