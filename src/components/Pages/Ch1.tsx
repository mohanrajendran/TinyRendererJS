import * as React from 'react';

import CanvasElement from '../Canvas/CanvasElement';
import CanvasImage from '../Canvas/CanvasImage';
import { Color, Vector } from '../../models';

import { head } from '../Meshes';

export default class Ch1 extends React.Component {
  render() {
    const line = new CanvasImage(100, 100);
    line.drawLine(new Vector(13, 20), new Vector(80, 40), Color.white);
    line.drawLine(new Vector(20, 13), new Vector(40, 80), Color.white);
    line.flipVertical();

    const image = new CanvasImage(800, 800, 0.75);
    head.faces.forEach(face => {
      for (let i = 0; i < 3; i++) {
        let v0 = head.vertices[face[i] - 1];
        let v1 = head.vertices[face[(i + 1) % 3] - 1];

        v0 = v0.add(new Vector(1, 1)).scale(400);
        v1 = v1.add(new Vector(1, 1)).scale(400);

        image.drawLine(v0, v1, Color.white);
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