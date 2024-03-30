import { Maybe } from "@/types";
import GlobalContext from "../GlobalContext";
import Debug from "../utils/Debug";
import DomElement from "../utils/DomElement";
import { GUI } from "dat.gui";

export default class Scene {
  public globalContext: GlobalContext;
  public debug: Maybe<Debug>;
  public debugFolder: Maybe<GUI>;
  public domElement: DomElement;
  public id = "canvas-scene";
  public canvas: Maybe<HTMLCanvasElement>;
  public context: Maybe<CanvasRenderingContext2D>;
  public params: any = {};

  constructor(id?: string) {
    this.globalContext = new GlobalContext();

    this.debug = this.globalContext.debug;
    this.debugFolder = this.debug?.ui?.addFolder(this.id);

    id && (this.id = id);
    this.domElement = new DomElement(this.id);

    this.canvas = this.domElement.instance as HTMLCanvasElement;
    this.canvas.width = this.domElement.width;
    this.canvas.height = this.domElement.height;

    this.context = this.canvas.getContext("2d");
    this.globalContext.pushScene(this);
    this.resize();
  }

  update() {
    // no global updates, to be overrided
  }

  get width() {
    return this.domElement.width;
  }
  get height() {
    return this.domElement.height;
  }

  resize() {
    if (!this.canvas) return;
    console.log("resizing scene");
    this.domElement.getBoundingRect();
    const { pixelRatio } = this.globalContext.windowSize ?? {};
    if (!pixelRatio) return;
    this.canvas.width = this.domElement.width * pixelRatio;
    this.canvas.height = this.domElement.height * pixelRatio;
    this.context?.scale(pixelRatio, pixelRatio);
  }

  destroy() {
    console.log("destroying scene");
  }
}
