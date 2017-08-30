import * as React from 'react';

import CanvasElement from '../Canvas/CanvasElement';
import CanvasImage from '../Canvas/CanvasImage';
import { Color, Vector } from '../../models';

import { head } from '../Meshes';

export default class Ch3 extends React.Component {
  render() {
    const width = 800;
    const image = new CanvasImage(width, width, 0.5, true);
    const lightDir = new Vector(0, 0, -1);
    head.faces.forEach(face => {
      let v = [0,1,2].map(i => head.vertices[face[i] - 1]);
      let n = (v[2].sub(v[0])).cross(v[1].sub(v[0])).normalize();
      let i = n.dot(lightDir);

      if(i > 0) {
        let color = new Color(255*i, 255*i, 255*i);
        let d = v.map(vec => vec.add(new Vector(1,1)).scale(width/2));
        image.drawTriangle(d[0], d[1], d[2], color);
      }
    });

    image.flipVertical();

    return (
      <div>
        <h5>Mesh Drawing</h5>
        <CanvasElement image={image} />
      </div>
    );
  }
}