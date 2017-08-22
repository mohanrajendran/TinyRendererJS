import * as React from 'react';

import CanvasElement from '../Canvas/CanvasElement';
import CanvasImage from '../Canvas/CanvasImage';

export default class Ch1 extends React.Component {
  render() {
    const image = new CanvasImage(100, 100);

    return (
      <CanvasElement image={image} />
    );
  }
}