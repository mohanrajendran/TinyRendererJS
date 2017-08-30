import { Color, Vector } from '../../models';

export default class CanvasImage {
  // pixel information
  private buf8: Uint8ClampedArray;
  private data: Uint32Array;
  private bytespp: number = 4; // Bytes per pixel
  private zbuffer: number[][];

  constructor(private w: number, private h: number, private scale: number = 1, enableZbuffer = false) {
    var buf = new ArrayBuffer(w * h * this.bytespp);

    this.buf8 = new Uint8ClampedArray(buf);
    this.data = new Uint32Array(buf);

    if (enableZbuffer) {
      this.zbuffer = [];
      for (let i = 0; i < h; i++) {
        let row = [];
        for (let j = 0; j < w; j++) {
          row.push(Number.NEGATIVE_INFINITY);
        }
        this.zbuffer.push(row);
      }
    }

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
    let xMin = Math.min(v0.x, v1.x, v2.x) >>> 0;
    let xMax = Math.max(v0.x, v1.x, v2.x) >>> 0;
    let yMin = Math.min(v0.y, v1.y, v2.y) >>> 0;
    let yMax = Math.max(v0.y, v1.y, v2.y) >>> 0;

    for (let x = xMin; x <= xMax; x++) {
      for (let y = yMin; y <= yMax; y++) {
        let [u, v] = this.barycentricCoordinates(v0, v1, v2, new Vector(x, y));
        if (u >= 0 && v >= 0 && (u + v) <= 1) {
          let zLoc = v0.z + u * (v1.z - v0.z) + v * (v2.z - v0.z);
          if (this.zbuffer) {
            if (this.zbuffer[y][x] < zLoc) {
              this.zbuffer[y][x] = zLoc;
              this.setPixel(x, y, color);
            }
          } else {
            this.setPixel(x, y, color);
          }
        }
      }
    }
  }

  private barycentricCoordinates(v0: Vector, v1: Vector, v2: Vector, point: Vector): [number, number] {
    let AB = v1.sub(v0);
    let AC = v2.sub(v0);
    let PA = v0.sub(point);

    let vX = new Vector(AB.x, AC.x, PA.x);
    let vY = new Vector(AB.y, AC.y, PA.y);

    let cross = vX.cross(vY);
    cross = cross.scale(1 / cross.z);

    return [cross.x, cross.y];
  }

  writeToCanvas(canvas: HTMLCanvasElement) {
    canvas.height = this.h
    canvas.width = this.w;
    canvas.style.height = this.h * this.scale + 'px';
    canvas.style.width = this.w * this.scale + 'px';

    const ctx = canvas.getContext('2d');
    const imageData = ctx.createImageData(this.w, this.h);
    imageData.data.set(this.buf8);
    ctx.putImageData(imageData, 0, 0);
  }
}