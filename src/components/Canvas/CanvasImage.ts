import { Color, Vector } from '../../models';

export default class CanvasImage {
  // pixel information
  private buf8: Uint8ClampedArray;
  private data: Uint32Array;
  private bytespp: number = 4; // Bytes per pixel

  constructor(private w: number, private h: number, private scale: number = 1) {
    var buf = new ArrayBuffer(w * h * this.bytespp);

    this.buf8 = new Uint8ClampedArray(buf);
    this.data = new Uint32Array(buf);

    this.clear();
  }

  private clear() {
    this.data.fill(Color.black.rgba);
  }

  setPixel(x: number, y: number, color: Color) {
    x >>>= 0;
    y >>>= 0;

    if (x < 0 || x >= this.w || y < 0 || y >= this.h)
      return;

    this.data[y * this.w + x] = color.rgba;
  }

  flipVertical(): void {
    let start = 0;
    let end = this.h - 1;

    while (start < end) {
      for (let i = 0; i < this.w; i++) {
        let pos1 = start * this.w + i;
        let pos2 = end * this.w + i;

        this.data[pos1] ^= this.data[pos2];
        this.data[pos2] ^= this.data[pos1];
        this.data[pos1] ^= this.data[pos2];
      }

      start++;
      end--;
    }
  }

  drawLine(v0: Vector, v1: Vector, color: Color) {
    let steep = false;
    let x0 = v0.x;
    let y0 = v0.y;
    let x1 = v1.x;
    let y1 = v1.y;

    if (Math.abs(x0 - x1) < Math.abs(y0 - y1)) {
      let temp = x0;
      x0 = y0;
      y0 = temp;

      temp = x1;
      x1 = y1;
      y1 = temp;

      steep = true;
    }

    if (x0 > x1) {
      let temp = x0;
      x0 = x1;
      x1 = temp;

      temp = y0;
      y0 = y1;
      y1 = temp;
    }

    let dx = x1 - x0;
    let dy = y1 - y0;
    let error = 0;
    let derror = Math.abs(dy) * 2;
    let y = y0;
    for (let x = x0; x <= x1; x++) {
      if (steep)
        this.setPixel(y, x, color);
      else
        this.setPixel(x, y, color);

      error += derror;
      if (error > dx) {
        y += (y1 > y0 ? 1 : -1);
        error -= (dx * 2);
      }
    }
  }

  drawTriangle(v0: Vector, v1: Vector, v2: Vector, color: Color) {
    let xMin = Math.min(v0.x, v1.x, v2.x);
    let xMax = Math.max(v0.x, v1.x, v2.x);
    let yMin = Math.min(v0.y, v1.y, v2.y);
    let yMax = Math.max(v0.y, v1.y, v2.y);

    for (let x = xMin; x <= xMax; x++) {
      for (let y = yMin; y <= yMax; y++) {
        if (this.pointInTriangle(v0, v1, v2, new Vector(x, y)))
          this.setPixel(x, y, color);
      }
    }
  }

  private pointInTriangle(v0: Vector, v1: Vector, v2: Vector, point: Vector): boolean {
    let AB = v1.neg(v0);
    let AC = v2.neg(v0);
    let PA = v0.neg(point);

    let vX = new Vector(AB.x, AC.x, PA.x);
    let vY = new Vector(AB.y, AC.y, PA.y);

    let cross = vX.cross(vY);
    cross = cross.scale(1/cross.z);

    return (cross.x > 0 && cross.y > 0 && (cross.x + cross.y <= 1));
  }

  writeToCanvas(canvas: HTMLCanvasElement) {
    canvas.height = this.h;
    canvas.width = this.w;
    canvas.style.height = this.h * this.scale + 'px';
    canvas.style.width = this.w * this.scale + 'px';

    const ctx = canvas.getContext('2d');
    const imageData = ctx.createImageData(this.w, this.h);
    imageData.data.set(this.buf8);
    ctx.putImageData(imageData, 0, 0);
  }
}