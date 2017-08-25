import * as React from 'react';

import CanvasElement from '../Canvas/CanvasElement';
import CanvasImage from '../Canvas/CanvasImage';
import Color from '../Canvas/Color';
import Mesh from './mesh';

import { head } from '../Meshes';

export default class Ch1 extends React.Component {
  render() {
    const image = new CanvasImage(100, 100);
    image.drawLine(13, 20, 80, 40, Color.white);
    image.flipVertical();

    console.log(head);

    return (
      <CanvasElement image={image} />
    );
  }
}