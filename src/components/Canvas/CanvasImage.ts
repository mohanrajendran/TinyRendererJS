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