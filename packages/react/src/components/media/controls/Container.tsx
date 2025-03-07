import { MediaControllerState } from 'livepeer/media/controls';
import { AspectRatio, styling } from 'livepeer/styling';
import * as React from 'react';

import { useMediaController } from '../context';

const mediaControllerSelector = ({
  fullscreen,
}: MediaControllerState<HTMLMediaElement>) => ({
  fullscreen,
});

export type ContainerProps = {
  aspectRatio: AspectRatio;
  children: React.ReactNode;
  className?: string;
};

export const Container = React.forwardRef<HTMLDivElement, ContainerProps>(
  (props, ref) => {
    const { children, className, aspectRatio } = props;

    const { fullscreen } = useMediaController(mediaControllerSelector);

    return (
      <div
        style={{
          display: 'contents',
        }}
        className={className}
      >
        <div
          className={styling.container({
            aspectRatio,
            size: fullscreen ? 'fullscreen' : 'default',
          })}
          ref={ref}
          tabIndex={0}
        >
          {children}
        </div>
      </div>
    );
  },
);

Container.displayName = 'Container';
