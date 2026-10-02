import type { Decorator, Preview } from '@storybook/react';

import '../src/index.css';
import '../src/App.css';

const withMobileLayout: Decorator = Story => (
  <div
    style={{
      display: 'flex',
      justifyContent: 'center',
      minHeight: '100dvh',
      backgroundColor: '#efefef',
    }}
  >
    <div
      style={{
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        maxWidth: 393,
        minHeight: '100dvh',
        backgroundColor: 'white',
      }}
    >
      <Story />
    </div>
  </div>
);

const preview: Preview = {
  decorators: [withMobileLayout],
  parameters: {
    layout: 'fullscreen',
  },
};

export default preview;
