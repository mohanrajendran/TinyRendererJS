export default class Mesh {
  public vertices: [number, number, number][];
  public faces: [number, number, number][];

  constructor(mesh: any) {
    this.vertices = mesh.vertices;
    this.faces = mesh.faces;
  }
}