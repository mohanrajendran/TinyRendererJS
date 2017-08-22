export default class CanvasImage {
  // pixel information
  private buf8: Uint8ClampedArray;
  private data: Uint32Array;
  private bytespp: number = 4; // Bytes per pixel

  constructor(private w: number, private h: number) {
    var buf = new ArrayBuffer(w * h * this.bytespp);

    this.buf8 = new Uint8ClampedArray(buf);
    this.data = new Uint32Array(buf);

    this.clear();
  }

  private clear() {
    this.data.fill(255 << 24);
  }

  setPixel(x: number, y: number, value: number[]) {
    if (x < 0 || x >= this.w || y < 0 || y >= this.h)
      return;

    this.data[y * this.w + x] =
      value[0] +
      (value[1] << 8) +
      (value[2] << 16) +
      (value[3] << 24);
  }

  flipVertical() {
    let a = 0;
    let b = this.h - 1;

    while (a < b) {
      for (let i = 0; i < this.w; i++) {
        let c = this.data[a * this.w + i];
        let d = this.data[b * this.w + i];

        this.data[a * this.w + i] = d;
        this.data[b * this.w + i] = c;
      }

      a++;
      b--;
    }
  }

  writeToCanvas(canvas: HTMLCanvasElement) {
    canvas.height = this.h;
    canvas.width = this.w;
    canvas.style.height = this.h + 'px';
    canvas.style.width = this.w + 'px';

    const ctx = canvas.getContext('2d');
    const imageData = ctx.createImageData(100, 100);
    imageData.data.set(this.buf8);
    ctx.putImageData(imageData, 0, 0);
  }
}