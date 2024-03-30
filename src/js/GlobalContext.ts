import type { Maybe } from "@/types";
import Debug from "./utils/Debug";
import Time from "./utils/Time";
import Scene from "./canvas2d/Scene";
import Size from "./utils/Size";

let instance: GlobalContext | null = null;

export default class GlobalContext {
  public debug: Maybe<Debug>;
  public time: Maybe<Time>;
  public scenes: Maybe<Scene[]>;
  public windowSize: Maybe<Size>;
  constructor() {
    if (instance) return instance;
    instance = this;

    // debug
    this.debug = new Debug();

    // time
    this.time = new Time();
    this.time.on("update", () => this.update());
    this.scenes = [];

    //size
    this.windowSize = new Size();
    this.windowSize.on("resize", () => this.resize());

    window.addEventListener("beforeunload", () => this.destroy());
  }

  pushScene(scene: Scene) {
    this.scenes?.push(scene);
  }

  update() {
    this.scenes?.forEach((s) => s.update());
  }

  resize() {
    this.scenes?.forEach((s) => s.resize());
  }

  destroy() {
    this.time?.off("update");
    this.debug?.destroy();
    this.scenes?.forEach((s) => s.destroy());
  }
}
