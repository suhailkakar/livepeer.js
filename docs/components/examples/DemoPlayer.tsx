import { Player } from '@livepeer/react';

import Image from 'next/image';

const playbackId =
  'bafybeida3w2w7fch2fy6rfvfttqamlcyxgd3ddbf4u25n7fxzvyvcaegxy';

import blenderPoster from '../../public/images/blender-poster.png';

const PosterImage = () => {
  return (
    <Image
      src={blenderPoster}
      layout="fill"
      objectFit="cover"
      priority
      placeholder="blur"
    />
  );
};

export const DemoPlayer = () => {
  return (
    <Player
      title="Waterfalls"
      playbackId={playbackId}
      autoPlay
      muted
      showTitle={false}
      aspectRatio="16to9"
      poster={<PosterImage />}
      controls={{
        autohide: 3000,
      }}
      theme={{
        borderStyles: { containerBorderStyle: 'hidden' },
        radii: { containerBorderRadius: '30px' },
        space: {
          controlsTopMarginX: '20px',
          controlsTopMarginY: '15px',
          controlsBottomMarginX: '15px',
          controlsBottomMarginY: '10px',
        },
      }}
    />
  );
};
