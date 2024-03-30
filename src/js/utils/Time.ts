import { EventEmitter } from "./EventEmitter";

export default class Time extends EventEmitter {
  public start: number;
  public current: number;
  public elapsed: number;
  public delta: number;

  constructor() {
    super();

    this.start = Date.now();
    this.current = this.start;
    this.elapsed = 0;
    this.delta = 16;

    this.update();
  }

  update() {
    const current_ = Date.now();
    this.delta = current_ - this.current;
    this.elapsed = current_ - this.start;
    this.current = current_;

    // refresh
    this.trigger("update");
    window.requestAnimationFrame(() => this.update());
  }
}
