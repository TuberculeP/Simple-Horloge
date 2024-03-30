import { EventEmitter } from "./EventEmitter";

export default class Size extends EventEmitter {
  constructor(
    public width: number = window.innerWidth,
    public height: number = window.innerHeight,
    public pixelRatio: number = window.devicePixelRatio
  ) {
    super();
    window.addEventListener("resize", () => this.setSize());
  }

  setSize() {
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    this.pixelRatio = Math.min(window.devicePixelRatio, 2);
    this.trigger("resize");
  }
}
