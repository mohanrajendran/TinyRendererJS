import Vector from './Vector';

export default class Mesh {
  public vertices: Vector[];
  public faces: [number, number, number][];

  constructor(mesh: any) {
    this.vertices = mesh.vertices.map((v: number[]) => new Vector(v[0], v[1], v[2]));
    this.faces = mesh.faces;
  }
}