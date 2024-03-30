import type { Maybe } from "@/types";
import { GUI } from "dat.gui";

export default class Debug {
  public ui: Maybe<GUI>;
  constructor() {
    this.ui = null;
    this.active = window.location.hash.includes("#debug");
  }

  private set active(isActive: boolean) {
    if (!isActive || !!this.ui) return;
    else this.ui = new GUI();
  }

  get active() {
    return !!this.ui;
  }

  destroy() {
    this.ui?.destroy();
    this.ui = null;
  }
}
