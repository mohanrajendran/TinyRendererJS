import * as React from 'react';

import CanvasElement from '../Canvas/CanvasElement';
import CanvasImage from '../Canvas/CanvasImage';
import Color from '../Canvas/Color';

import { head } from '../Meshes';

export default class Ch1 extends React.Component {
  render() {
    const line = new CanvasImage(100, 100);
    line.drawLine(13, 20, 80, 40, Color.white);
    line.drawLine(20, 13, 40, 80, Color.white);
    line.flipVertical();

    const image = new CanvasImage(800, 800, 0.75);
    head.faces.forEach(face => {
      for(let i = 0; i < 3; i++) {
        let v0 = head.vertices[face[i] - 1];
        let v1 = head.vertices[face[(i+1)%3] - 1];

        let x0 = (v0[0] + 1) * 400;
        let y0 = (v0[1] + 1) * 400;
        let x1 = (v1[0] + 1) * 400;
        let y1 = (v1[1] + 1) * 400;

        //console.log(x0 >>> 0, y0 >>> 0, x1 >>> 0, y1 >>> 0);

        image.drawLine(x0, y0, x1, y1, Color.white);
      }
    });

    image.flipVertical();

    return (
      <div>
        <h5>Line Drawing</h5>
        <CanvasElement image={line} />
        <h5>Mesh image</h5>
        <CanvasElement image={image} />
      </div>
    );
  }
}