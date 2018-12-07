import { Size, Bullet, Player, Enemy } from '../core/types';

export default interface Renderer {
  getGrid(): HTMLElement;
  getGridSize(): Size;

  placePlayer(player: Player): void;
  movePlayer(player: Player): void;

  placeEnemy(enemy: Enemy): void;
  moveEnemy(enemy: Enemy): void;
  destroyEnemy(enemy: Enemy): void;
  damageEnemy(enemy: Enemy): void;

  createBullet(bullet: Bullet): void;
  moveBullet(bullet: Bullet): void;
  destroyBullet(bullet: Bullet): void;
}
