import * as React from 'react';

import CanvasElement from '../Canvas/CanvasElement';
import CanvasImage from '../Canvas/CanvasImage';

export default class Ch1 extends React.Component {
  render() {
    const image = new CanvasImage(100, 100);
    image.setPixel(52, 41, [255, 0, 0, 255]);
    image.flipVertical();

    return (
      <CanvasElement image={image} />
    );
  }
}