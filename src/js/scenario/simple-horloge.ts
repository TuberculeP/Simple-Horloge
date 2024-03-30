import Scene from "../canvas2d/Scene";
import { Arc, Cursor, RomanNumber } from "../canvas2d/Shapes";
import { deg2rad } from "../utils/helpers";

export default class SimpleHorlogeScenario extends Scene {
  private arcs: Arc[] = [];
  private cursors: Cursor[] = [];
  private romanNumbers: RomanNumber[] = [];
  constructor(id?: string) {
    super(id);

    if (!this.context) return;
    this.params["line-width"] = 4;
    this.params["color"] = [255, 0, 0, 1];
    this.params["radius"] = 200;
    this.debugFolder?.add(this.params, "line-width", 1, 10);
    this.debugFolder?.addColor(this.params, "color");
    this.debugFolder?.add(this.params, "radius", 50, 400);
    this.context.lineWidth = this.params["line-width"];
    this.context.fillStyle = "white";
    this.context.strokeStyle = "white";
    this.context.textAlign = "center";
    this.context.textBaseline = "middle";
    this.context.font = "20px Arial";
    this.context.save();
    this.arcs.push(
      new Arc(this.width / 2, this.height / 2, this.params["radius"], 1),
      new Arc(this.width / 2, this.height / 2, this.params["radius"], 1.3)
    );
    [
      "XII",
      "I",
      "II",
      "III",
      "IV",
      "V",
      "VI",
      "VII",
      "VIII",
      "IX",
      "X",
      "XII",
    ].forEach((value, index) => {
      this.romanNumbers.push(
        new RomanNumber(
          this.width / 2,
          this.height / 2,
          index * 30,
          this.params["radius"] * 1.15,
          10,
          15,
          value
        )
      );
    });
    this.cursors.push(
      new Cursor(
        this.width / 2,
        this.height / 2,
        this.params["radius"],
        0.7,
        "s"
      ),
      new Cursor(
        this.width / 2,
        this.height / 2,
        this.params["radius"],
        0.5,
        "m"
      )
    );
  }
  update() {
    if (!this.context) return;
    this.context.restore();
    this.context.clearRect(0, 0, this.width, this.height);
    this.context.fillStyle = "white";
    this.context.strokeStyle = "white";

    this.arcs.forEach((arc) => {
      arc.maxRadius = this.params["radius"];
      arc.draw(this.context as CanvasRenderingContext2D);
    });

    const nGraduations = 12;
    const length = 0.1 * this.params["radius"];
    for (let i = 0; i < nGraduations; i++) {
      const isBig = i % 3 === 0;
      this.context.lineWidth = isBig ? 6 : 1;
      const angle = deg2rad((i * 360) / nGraduations);
      const x = Math.cos(angle) * this.params["radius"] + this.width / 2;
      const y = Math.sin(angle) * this.params["radius"] + this.height / 2;
      this.context.beginPath();
      this.context.moveTo(x, y);
      this.context.lineTo(
        Math.cos(angle) *
          (this.params["radius"] - (isBig ? length * 2 : length)) +
          this.width / 2,
        Math.sin(angle) *
          (this.params["radius"] - (isBig ? length * 2 : length)) +
          this.height / 2
      );
      this.context.stroke();
      this.context.closePath();
    }

    //roman numbers
    const hour = new Date().getHours() % 12;
    this.romanNumbers.forEach((number, i) => {
      number.radius = this.params["radius"] * 1.15;
      number.accentColor = `rgba(${
        this.params["color"].join(",") ?? "255,0,0,1"
      })`;
      number.draw(this.context as CanvasRenderingContext2D, i === hour);
    });

    //cursors
    this.context.strokeStyle = `rgba(${
      this.params["color"].join(",") ?? "255,0,0,1"
    })`;
    this.context.lineWidth = this.params["line-width"] ?? 1;
    this.cursors.forEach((cursor) => {
      cursor.radius = this.params["radius"];
      cursor.draw(this.context as CanvasRenderingContext2D);
    });
    this.context.beginPath();
    this.context.arc(this.width / 2, this.height / 2, 5, 0, Math.PI * 2);
    this.context.fill();
  }

  resize(): void {
    super.resize();
    this.arcs?.forEach((arc) => {
      arc.x = this.width / 2;
      arc.y = this.height / 2;
    });
    this.cursors?.forEach((cursor) => {
      cursor.x = this.width / 2;
      cursor.y = this.height / 2;
    });
    this.romanNumbers?.forEach((number) => {
      number.x = this.width / 2;
      number.y = this.height / 2;
    });
  }
}
