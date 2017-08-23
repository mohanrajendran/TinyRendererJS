import * as React from 'react';

import CanvasElement from './Canvas/CanvasElement';
import CanvasImage from './Canvas/CanvasImage';
import Color from './Canvas/Color';

export default class Intro extends React.Component {
  render() {
    const image = new CanvasImage(100, 100);
    image.setPixel(52, 41, Color.red);
    image.flipVertical();

    return (
      <CanvasElement image={image} />
    );
  }
}