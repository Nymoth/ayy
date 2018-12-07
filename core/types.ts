export class Coords {
  x: number;
  y: number;
}

export class Size {
  width: number;
  height: number;
}

export class Bullet {
  now: Coords;
  mov: Coords;
  life: number;
  dmg: number;
  index: number;
}

export class Player {
  x: number;
  y: number;
  gun: Gun;
  speed: number;
  hp: number;
}

export class EnemyType {
  size: Size;
  gun: Gun;
  hp: number;
  speed: any;
}

export class Enemy extends EnemyType {
  x: number;
  y: number;
  index: number;
}

export class Gun {
  fire_rate: number;
  speed: number;
  dmg: number;
  life: number;
  channels: GunChannel[];
}

export class GunChannel {
  deviation: number;
  offset: Coords;
}

export class Level {
  name: string;
  timeline: LevelEvent[]
}

export class LevelEvent {
  action: string;
  payload: any;
  finish: {
    conditionType: LevelFinishConditionTypes;
    amount?: number;
  }
}

export enum LevelFinishConditionTypes {
  ALL_ENEMIES_DEAD
}

export class Report {
  action: string;
  payload: any;
  check: boolean;
}