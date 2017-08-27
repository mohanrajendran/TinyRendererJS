export default class Vector {
  constructor(public x: number, public y: number, public z: number = 0) {
  }

  add(that: Vector): Vector {
    return new Vector(this.x + that.x, this.y + that.y, this.z + that.z);
  }

  neg(that: Vector): Vector {
    return new Vector(this.x - that.x, this.y - that.y, this.z - that.z);
  }

  scale(m: number): Vector {
    return new Vector(this.x * m, this.y * m, this.z * m);
  }

  dot(that: Vector): number {
    return this.x * that.x + this.y * that.y + this.z * that.z;
  }

  cross(that: Vector): Vector {
    let x = this.y * that.z - this.z * that.y;
    let y = this.z * that.x - this.x * that.z;
    let z = this.x * that.y - this.y * that.x;

    return new Vector(x, y, z);
  }
}