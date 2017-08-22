import * as React from 'react';

export default class CanvasElement extends React.Component {
  private canvas: HTMLCanvasElement;

  componentDidMount() {
    this.canvas.height = 100;
    this.canvas.width = 100;
    this.canvas.style.height = "100px";
    this.canvas.style.width = "100px";

    const ctx = this.canvas.getContext('2d');
    const imageData = ctx.createImageData(100, 100);
    
    var buf = new ArrayBuffer(imageData.data.length);
    var buf8 = new Uint8ClampedArray(buf);
    var data = new Uint32Array(buf);

    for (let y = 0; y < 100; y++) {
      for (let x = 0; x < 100; x++) {
        data[y*100 + x] = (255 << 24);
      }
    }

    imageData.data.set(buf8);

    ctx.putImageData(imageData, 0, 0);
  }

  render() {
    return (
      <canvas ref={(canvas) => { this.canvas = canvas; }}></canvas>
    );
  }
}