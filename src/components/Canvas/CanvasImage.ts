import Color from './Color';

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
    this.data.fill(Color.black.rgba);
  }

  setPixel(x: number, y: number, color: Color) {
    if (x < 0 || x >= this.w || y < 0 || y >= this.h)
      return;

    this.data[y * this.w + x] = color.rgba;
  }

  flipVertical() {
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