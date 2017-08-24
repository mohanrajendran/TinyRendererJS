export default class Color {
  rgba: number;

  constructor(red: number, green: number, blue: number, alpha: number = 255) {
    const r = this.processValue(red);
    const g = this.processValue(green);
    const b = this.processValue(blue);
    const a = this.processValue(alpha);

    this.rgba = r | (g << 8) | (b << 16) | (a << 24);
  }

  private processValue(d: number): number {
    if (d < 0)
      return 0;
    else if (d > 255)
      return 255;
    else
      return d >>> 0;
  }
  
  static black: Color = new Color(0, 0, 0);
  static red: Color = new Color(255, 0, 0);
  static green: Color = new Color(0, 255, 0);
  static blue: Color = new Color(0, 0, 255);
  static white: Color = new Color(255, 255, 255);
}