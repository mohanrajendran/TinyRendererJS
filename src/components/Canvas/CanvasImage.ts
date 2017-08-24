import Color from './Color';

export default class CanvasImage {
  // pixel information
  private buf8: Uint8ClampedArray;
  private data: Uint32Array;
  private bytespp: number = 4; // Bytes per pixel

  constructor(private w: number, private h: number) {
    var buf = new ArrayBuffer(w * h * this.bytespp);
    console.log(buf.byteLength);

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

  drawLine(x0: number, y0: number, x1: number, y1: number, color: Color): void {
    if (x0 > x1)
      return this.drawLine(x1, y1, x0, y0, color);

    let steep: boolean = false;

    if (Math.abs(x0 - x1) < Math.abs(y0 - y1)) {
      let temp = x0;
      x0 = y0;
      y0 = x0;

      temp = x1;
      x1 = y1;
      y1 = x1;

      steep = true;
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
        error -= dx * 2;
      }
    }
  }

  writeToCanvas(canvas: HTMLCanvasElement) {
    canvas.height = this.h;
    canvas.width = this.w;
    canvas.style.height = this.h + 'px';
    canvas.style.width = this.w + 'px';

    const ctx = canvas.getContext('2d');
    const imageData = ctx.createImageData(this.w, this.h);
    imageData.data.set(this.buf8);
    ctx.putImageData(imageData, 0, 0);
  }
}