import Controller from './controller.interface';
import Renderer from './../renderers/renderer.interface';

export default class KeyboardController implements Controller {

  private _window: Window;
  private _grid: HTMLElement;
  private _status: any;

  constructor(window: Window, renderer: Renderer) {
    this._window = window;
    this._grid = renderer.getGrid();
    this._status = {
      c: false,
      e: null,
      ns: 0,
      mv: 0,
      mh: 0,
      mn: false,
      ma: false,
      ms: false,
      mw: false
    };

    this._bind();
  }

  getStatus(): any {
    return { ...this._status };
  }

  private _bind(): void {
    this._grid.addEventListener('mousedown', evt => {
      this._status.c = true;
      this._status.e = evt;
    });

    this._grid.addEventListener('mouseup', () => {
      this._status.c = false; 
    });

    this._grid.addEventListener('mousemove', evt => {
      if (this._status.c) {
        this._status.e = evt;
      }
    });

    this._window.addEventListener('keydown', ({ keyCode }) => {
      switch (keyCode) {
        case 38:
        case 87:
          this._status.mv = -1;
          this._status.mn = true;
          break;
        case 40:
        case 83:
          this._status.mv = 1;
          this._status.ms = true;
          break;
        case 37:
        case 65:
          this._status.mh = -1;
          this._status.mw = true;
          break;
        case 39:
        case 68:
          this._status.mh = 1;
          this._status.ma = true;
          break;
      }
    });

    this._window.addEventListener('keyup', ({ keyCode }) => {
      switch (keyCode) {
        case 38:
        case 87:
          this._status.mv = 0;
          this._status.mn = false;
          break;
        case 40:
        case 83:
          this._status.mv = 0;
          this._status.ms = false;
          break;
        case 37:
        case 65:
          this._status.mh = 0;
          this._status.mw = false;
          break;
        case 39:
        case 68:
          this._status.mh = 0;
          this._status.ma = false;
          break;
      }
    });
  }
}
