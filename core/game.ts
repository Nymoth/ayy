import Victor from 'victor';
import guns from './../data/guns';
import enemies from './../data/enemies';
import Renderer from './../renderers/renderer.interface';
import Controller from './../controllers/controller.interface';
import LevelManager from './levelManager';
import { Player, Bullet, Level, Report, Enemy } from './types';

export default class Game {

  private _r: Renderer;
  private _c: Controller;
  private _levelManager: LevelManager;

  private _player: Player;
  private _bullets: Bullet[] = [];
  private _cadence: number;
  private _gameOver = false;

  private _enemies: Enemy[] = [];

  constructor(renderer: Renderer, controller: Controller) {
    this._r = renderer;
    this._c = controller;
  }

  start(): void {
    this._initPlayer();
    this._levelManager = new LevelManager();
    this._flow();
  }

  private _initPlayer(): void {
    const { width, height } = this._r.getGridSize();
    this._player = {
      x: Math.round(width / 2) - 5,
      y: Math.round(height / 2) - 5,
      gun: guns.simple,
      speed: 5,
      hp: 1000
    }
    this._r.placePlayer(this._player);
    this._cadence = 0;
  }

  private _flow() {
    const { mn, ma, ms, mw, c, e } = this._c.getStatus();
    if (mn || ma || ms || mw) {
      this._handlePlayerMovement();
    }

    this._handleEnemies();
    
    if (c && this._cadence === 0) {
      this._shoot(e.clientX, e.clientY);
    }

    this._handleBullets();

    if (this._cadence > 0) this._cadence--;

    this._parseReport(this._levelManager.getFrameReport(this._enemies.filter(e => e !== undefined)));

    if (!this._gameOver) {
      requestAnimationFrame(() => this._flow());
    } else {
      alert('Game Over');
    }
  }

  private _shoot(mouseX, mouseY) {
    this._player.gun.channels.map(src => {

      let dx = mouseX - this._player.x;
      let dy = mouseY - this._player.y;
      let fx, fy, bmh, bmv, bnx, bny;
      const dv = new Victor(dx, dy);
      const bsv = new Victor(src.offset.x, src.offset.y);

      if (src.deviation !== 0) {
        dv.rotate(src.deviation * ((Math.PI * 2) / 360));
        dx = dv.x;
        dy = dv.y;
      }                

      if (dx < 0) {
        bmh = -1;
      } else {
        bmh = 1;
      }

      if (dy < 0) {
        bmv = -1;
      } else {
        bmv = 1;
      }
      
      if (Math.abs(dx) > Math.abs(dy)) {
        fx = 1;
        fy = Math.abs(dy) / Math.abs(dx);
      } else {
        fx = Math.abs(dx) / Math.abs(dy);
        fy = 1;
      }

      bsv.rotate((180 - dv.verticalAngleDeg()) * ((Math.PI * 2) / 360));
      bnx = this._player.x + 5 + bsv.x;
      bny = this._player.y + 5 + bsv.y;

      const bullet = {
        index: this._bullets.length,
        now: {
          x: bnx,
          y: bny
        },
        mov: {
          x: fx * bmh,
          y: fy * bmv
        },
        life: this._player.gun.life,
        dmg : this._player.gun.dmg
      };

      this._bullets.push(bullet);

      this._r.createBullet(bullet);
    });
    this._cadence = this._player.gun.fire_rate;
  }

  private _handleBullets() {
    const { width, height } = this._r.getGridSize();
    this._bullets
      .filter(bullet => bullet !== undefined)
      .map(bullet => {
        bullet.now.x += bullet.mov.x * this._player.gun.speed;
        bullet.now.y += bullet.mov.y * this._player.gun.speed;

        if (bullet.now.x > width) {
            bullet.now.x = 0;
        }
        if (bullet.now.x < 0) {
            bullet.now.x = width;
        }
        if (bullet.now.y > height) {
            bullet.now.y = 0;
        }
        if (bullet.now.y < 0) {
            bullet.now.y = height;
        }

        if (this._checkBulletCollision(bullet)) {
          bullet.life = 0;
        } else {
          this._r.moveBullet(bullet);
        }

        bullet.life--;
        if (bullet.life <= 0) {
          this._bullets[bullet.index] = undefined;
          this._r.destroyBullet(bullet);
        }
      });
  }

  private _checkBulletCollision(bullet: Bullet): boolean {
    const { x, y } = bullet.now;
    for (let i = 0; i < this._enemies.length; i++) {
      const e = this._enemies[i];
      if (e === undefined) {
        continue;
      }
      if ((y >= e.y) && (y <= e.y + e.size.height) && (x >= e.x) && (x <= e.x + e.size.width)) {
        this._damageEnemy(e, bullet.dmg);
        return true;
      }
    }
    return false;
  }

  private _damageEnemy(enemy: Enemy, damage: number): void {
    enemy.hp -= damage;
    if (enemy.hp <= 0) {
      this._r.destroyEnemy(enemy);
      this._enemies[enemy.index] = undefined;
    } else {
      this._r.damageEnemy(enemy);
    }
  }

  private _handleEnemies(): void {
    // TODO .. AI
    // this._enemies.forEach(enemy => {

    // });
  }

  private _handlePlayerMovement(): void {
    const { width, height } = this._r.getGridSize();
    const { mh, mv } = this._c.getStatus();
    this._player.x += mh * this._player.speed;
    this._player.y += mv * this._player.speed;

    if (this._player.x > width) {
        this._player.x = 0;
    }
    if (this._player.x < 0) {
        this._player.x = width - 5;
    }
    if (this._player.y > height) {
        this._player.y = 0;
    }
    if (this._player.y < 0) {
        this._player.y = height - 5;
    }

    this._r.movePlayer(this._player);
  }

  private _parseReport(report: Report): void {
    if (report.check) {
      return;
    }

    switch (report.action) {
      case 'spawn_enemies':
        this._spawnEnemies(report.payload);
        break;
      case 'game_over':
        this._gameOver = true;
        break;
    }

    report.check = true;
  }

  private _spawnEnemies(_enemies: { type: string, x: number, y: number }[]): void {
    _enemies.forEach(({ type, x, y }) => {
      const enemyType = enemies[type];
      if (!enemyType) {
        throw Error(`Core:Game | Tried to spawn unknown enemy type "${type}"`);
      }
      const enemy = {
        ...enemyType,
        index: this._enemies.length,
        x,
        y
      };
      this._enemies.push(enemy);
      this._r.placeEnemy(enemy);
    });
  }

}
