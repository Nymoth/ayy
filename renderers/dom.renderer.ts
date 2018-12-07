import Renderer from './renderer.interface';
import { Bullet, Player, Size } from '../core/types';

export default class DomRenderer implements Renderer {

  private _doc: Document;
  private _grid: HTMLDivElement;
  private _size: Size;
  private _bullets: HTMLDivElement[];
  private _player: HTMLDivElement;

  constructor(window: Window, width: number = 800, height: number = 600) {
    this._doc = window.document;
    this._size = { width, height };
    this._bullets = [];

    this._bootstrap();
  }

  getGrid(): HTMLElement {
    return this._grid;
  }

  getGridSize(): Size {
    return { ...this._size };
  }

  placePlayer(player: Player): void {
    const dom = this._doc.createElement('div');
    dom.style.width = '10px';
    dom.style.height = '10px';
    dom.style.left = `${player.x - 5}px`;
    dom.style.top = `${player.y - 5}px`;
    dom.style.borderRadius = '100%';
    dom.style.background = '#fff';
    dom.style.position = 'absolute';
    this._player = dom;
    this._grid.appendChild(dom);
  }

  movePlayer(player: Player): void {
    this._player.style.left = `${player.x}px`;
    this._player.style.top = `${player.y}px`;
  }

  createBullet(bullet: Bullet): void {
    const dom = this._doc.createElement('div');
    dom.style.width = '1px';
    dom.style.height = '1px';
    dom.style.left = `${bullet.now.x}px`;
    dom.style.top = `${bullet.now.y}px`;
    dom.style.position = 'absolute';
    dom.style.background = '#fff';
    this._bullets[bullet.index] = dom;
    this._grid.appendChild(dom);
  }

  moveBullet(bullet: Bullet): void {
    const dom = this._bullets[bullet.index];
		dom.style.left = `${bullet.now.x}px`;
		dom.style.top = `${bullet.now.y}px`;
  }

  destroyBullet(bullet: Bullet): void {
    const dom = this._bullets[bullet.index];
		this._grid.removeChild(dom);
    // this._bullets.splice(bullet.index, 1);
    this._bullets[bullet.index] = undefined;
  }

  private _bootstrap() {
    const body = this._doc.getElementsByTagName('body')[0];
    const grid = this._doc.createElement('div');
    grid.style.position = 'relative';
    grid.style.background = '#000';
    grid.style.width = `${this._size.width}px`;
    grid.style.height = `${this._size.height}px`;
    body.appendChild(grid);
    this._grid = grid;
  }
}
