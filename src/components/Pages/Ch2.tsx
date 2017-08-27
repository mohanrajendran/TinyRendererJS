import * as React from 'react';

import CanvasElement from '../Canvas/CanvasElement';
import CanvasImage from '../Canvas/CanvasImage';
import { Color, Vector } from '../../models';

import { head } from '../Meshes';

export default class Ch1 extends React.Component {
  render() {
    const triangles = new CanvasImage(200, 200);
    triangles.drawTriangle(new Vector(10, 70), new Vector(50, 160), new Vector(70, 80), Color.red); 
    triangles.drawTriangle(new Vector(180, 50), new Vector(150, 1), new Vector(70, 180), Color.white);
    triangles.drawTriangle(new Vector(180, 150), new Vector(120, 160), new Vector(130, 180), Color.green);
    triangles.flipVertical();

    const image = new CanvasImage(800, 800, 0.75);
    head.faces.forEach(face => {
      let color = new Color(Math.random()*255 >>> 0, Math.random()*255 >>> 0, Math.random()*255 >>> 0);
      let v = [0,1,2].map(i => head.vertices[face[i] - 1].add(new Vector(1,1)).scale(400));
      image.drawTriangle(v[0], v[1], v[2], color);
/*
      for (let i = 0; i < 3; i++) {
        let v0 = head.vertices[face[i] - 1];
        let v1 = head.vertices[face[(i + 1) % 3] - 1];

        v0 = v0.add(new Vector(1, 1)).scale(400);
        v1 = v1.add(new Vector(1, 1)).scale(400);

        image.drawLine(v0, v1, color);
      }
      */
    });

    image.flipVertical();

    return (
      <div>
        <h5>Triangle Drawing</h5>
        <CanvasElement image={triangles} />
        <h5>Mesh Drawing</h5>
        <CanvasElement image={image} />
      </div>
    );
  }
}