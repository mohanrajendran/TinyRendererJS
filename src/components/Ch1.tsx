import * as React from 'react';

import CanvasElement from './Canvas/CanvasElement';
import CanvasImage from './Canvas/CanvasImage';
import Color from './Canvas/Color';

export default class Ch1 extends React.Component {
  render() {
    const image = new CanvasImage(100, 100);
    image.drawLine(13, 20, 80, 40, Color.white);
    image.flipVertical();

    return (
      <CanvasElement image={image} />
    );
  }
}