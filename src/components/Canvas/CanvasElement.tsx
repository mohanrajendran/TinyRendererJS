import * as React from 'react';

import CanvasImage from './CanvasImage';

export interface CanvasElementProps { image: CanvasImage };

export default class CanvasElement extends React.Component<CanvasElementProps, undefined> {
  private canvas: HTMLCanvasElement;

  componentDidMount() {
    this.props.image.writeToCanvas(this.canvas);
  }

  render() {
    return (
      <canvas ref={(canvas) => { this.canvas = canvas; }}></canvas>
    );
  }
}