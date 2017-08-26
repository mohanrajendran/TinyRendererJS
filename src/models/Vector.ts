export default class Vector {
  constructor(public x: number, public y: number, public z: number = 0) { 
  }

  add(that: Vector) {
    return new Vector(this.x + that.x, this.y + that.y, this.z + that.z);
  }

  scale(m: number) {
    return new Vector(this.x * m, this.y * m, this.z * m);
  }
}