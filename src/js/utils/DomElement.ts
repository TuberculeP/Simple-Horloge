export default class DomElement {
  public id: string;
  public instance: HTMLElement;
  public width: number = 0;
  public height: number = 0;
  constructor(id: string) {
    this.id = id;
    const instance_ = document.getElementById(id);
    if (!instance_) throw new Error(`Element with id ${id} not found`);
    this.instance = instance_;
    this.getBoundingRect();
  }

  public getBoundingRect() {
    const rect_: DOMRect = this.instance.getBoundingClientRect();
    this.width = rect_.width;
    this.height = rect_.height;
  }
}
