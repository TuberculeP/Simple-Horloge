import { deg2rad } from "../utils/helpers";

export class Arc {
  constructor(
    public x: number,
    public y: number,
    public maxRadius: number,
    public ratio: number
  ) {}

  draw(ctx: CanvasRenderingContext2D) {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.maxRadius * this.ratio, 0, Math.PI * 2);
    ctx.stroke();
    ctx.closePath();
  }
}

export class Cursor {
  constructor(
    public x: number,
    public y: number,
    public radius: number,
    public size: number,
    public ref: "s" | "m"
  ) {}

  draw(ctx: CanvasRenderingContext2D) {
    let currentAngle =
      this.ref === "s"
        ? deg2rad(new Date().getSeconds() * 6)
        : deg2rad(new Date().getMinutes() * 6);
    ctx.beginPath();
    ctx.moveTo(this.x, this.y);
    ctx.lineTo(
      Math.cos(-Math.PI / 2 + currentAngle) * this.size * this.radius + this.x,
      Math.sin(-Math.PI / 2 + currentAngle) * this.size * this.radius + this.y
    );
    ctx.stroke();
    ctx.closePath();
  }
}

export class RomanNumber {
  constructor(
    public x: number,
    public y: number,
    public angle: number,
    public radius: number,
    public width: number,
    public height: number,
    public value: string,
    public accentColor: string = "red"
  ) {}

  draw(ctx: CanvasRenderingContext2D, isHour: boolean = false) {
    const length = this.value.length;
    const currentAngle = -Math.PI / 2 + deg2rad(+this.angle);

    const { width, height } = this;

    this.value
      .toLowerCase()
      .split("")
      .forEach((v, i) => {
        // move to based on i and length
        const x =
          Math.cos(currentAngle) * this.radius +
          this.x +
          (i - length / 2) * this.width;
        const y =
          Math.sin(currentAngle) * this.radius + this.y + this.height / 2;
        //draw letter
        ctx.beginPath();
        isHour
          ? (ctx.strokeStyle = this.accentColor)
          : (ctx.strokeStyle = "white");
        console.log(ctx.strokeStyle);
        if (v === "x") {
          ctx.moveTo(x, y);
          ctx.lineTo(x + width, y - height);
          ctx.moveTo(x, y - height);
          ctx.lineTo(x + width, y);
        } else if (v === "i") {
          ctx.moveTo(x + width / 2, y - height);
          ctx.lineTo(x + width / 2, y);
          ctx.moveTo(x, y);
          ctx.lineTo(x + width, y);
          ctx.moveTo(x, y - height);
          ctx.lineTo(x + width, y - height);
        } else if (v === "v") {
          ctx.moveTo(x, y - height);
          ctx.lineTo(x + width / 2, y);
          ctx.lineTo(x + width, y - height);
        }
        ctx.stroke();
        ctx.closePath();
      });
  }
}
