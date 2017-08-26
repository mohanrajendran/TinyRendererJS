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

    return (
      <div>
        <h5>Triangle Drawing</h5>
        <CanvasElement image={triangles} />
      </div>
    );
  }
}