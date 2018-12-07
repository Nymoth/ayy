import Renderer from './renderer.interface';
import { Bullet, Player, Size, Enemy } from '../core/types';

enum Layer {
  PLAYER,
  ENEMIES,
  BULLETS
}

export default class CanvasRenderer implements Renderer {

  private readonly _layerMap: { name: Layer, bg: string, extra?: [] }[] = [
    {
      name: Layer.PLAYER,
      bg: '#fff'
    },
    {
      name: Layer.ENEMIES,
      bg: '#f00'
    },
    {
      name: Layer.BULLETS,
      bg: '#fff',
      // extra: [
      //   [ 'shadowBlur', 2 ],
      //   [ 'shadowColor', "#fff" ]
      // ]
    }
  ];

  private _doc: Document;
  private _grid: HTMLDivElement;
  private _layers: CanvasRenderingContext2D[];
  private _size: Size;

  private _playerLastPos = { x: 0, y: 0 };
  private _enemiesLastPos = [];
  private _bulletsLastPos = [];


  constructor(window: Window, width: number = 800, height: number = 600) {
    this._doc = window.document;
    this._size = { width, height };
    this._layers = [];

    this._bootstrap();
  }

  getGrid(): HTMLElement {
    return this._grid;
  }

  getGridSize(): Size {
    return { ...this._size };
  }

  placePlayer(player: Player): void {
    this._drawPlayer(player.x, player.y);
  }

  movePlayer(player: Player): void {
    this._clearPlayer();
    this._drawPlayer(player.x, player.y);
  }

  placeEnemy(enemy: Enemy): void {
    this._drawEnemy(enemy);
  }

  moveEnemy(enemy: Enemy): void {
    this._clearEnemy(enemy);
    this._drawEnemy(enemy);
  }

  damageEnemy(enemy: Enemy): void {
    this._layers[Layer.ENEMIES].fillStyle = '#fff';
    this._drawEnemy(enemy);
    setTimeout(() => {
      this._layers[Layer.ENEMIES].fillStyle = '#f00';
      this._drawEnemy(enemy);
    }, 2);
  }

  destroyEnemy(enemy: Enemy): void {
    this._clearEnemy(enemy);
  }

  createBullet(bullet: Bullet): void {
    this._drawBullet(bullet.index, bullet.now.x, bullet.now.y);
  }

  moveBullet(bullet: Bullet): void {
    this._clearBullet(bullet.index);
    this._drawBullet(bullet.index, bullet.now.x, bullet.now.y);
  }

  destroyBullet(bullet: Bullet): void {
    this._clearBullet(bullet.index);
    this._bulletsLastPos[bullet.index] = undefined;
  }

  private _bootstrap() {
    const body = this._doc.getElementsByTagName('body')[0];
    const fragment = this._doc.createDocumentFragment();
    const grid = this._doc.createElement('div');
    grid.style.position = 'relative';
    grid.style.background = '#000';
    grid.style.width = `${this._size.width}px`;
    grid.style.height = `${this._size.height}px`;
    this._layerMap.forEach(({ name, bg, extra = [] }, order) => {
      const canvas = this._doc.createElement('canvas');
      canvas.setAttribute('width', `${this._size.width}`);
      canvas.setAttribute('height', `${this._size.height}`);
      canvas.style.zIndex = `${this._layerMap.length - order}`;
      canvas.style.position = 'absolute';
      grid.appendChild(canvas);
      const ctx = canvas.getContext('2d');
      ctx.fillStyle = bg;
      extra.forEach(([ prop, value ]) => ctx[prop] = value);
      this._layers.push(ctx);
    });
    body.appendChild(grid);
    this._grid = grid;
  }

  private _clearPlayer(): void {
    const { x, y } = this._playerLastPos;
    this._layers[Layer.PLAYER].clearRect(x, y, 10, 10);
  }

  private _drawPlayer(x: number, y: number): void {
    const layer = this._layers[Layer.PLAYER];
    layer.beginPath();
    layer.arc(x + 5, y + 5, 5, 0, Math.PI * 2);
    layer.fill();
    this._playerLastPos.x = x;
    this._playerLastPos.y = y;
  }

  private _clearEnemy(enemy: Enemy): void {
    this._enemiesLastPos[enemy.index]
    const { x, y } = this._enemiesLastPos[enemy.index];
    this._layers[Layer.ENEMIES].clearRect(x, y, enemy.size.width, enemy.size.height);
  }

  private _drawEnemy(enemy: Enemy) {
    if (enemy) {
      this._layers[Layer.ENEMIES].fillRect(enemy.x, enemy.y, enemy.size.width, enemy.size.height);
      this._enemiesLastPos[enemy.index] = { x: enemy.x, y: enemy.y };
    }
  }

  private _clearBullet(index: number): void {
    const { x, y } = this._bulletsLastPos[index];
    this._layers[Layer.BULLETS].clearRect(x - 3, y - 3, 6, 6);
  }

  private _drawBullet(index: number, x: number, y: number): void {
    this._layers[Layer.BULLETS].fillRect(Math.round(x), Math.round(y), 2, 2);
    this._bulletsLastPos[index] = { x, y };
  }
}
