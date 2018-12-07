import levels from './../data/levels';
import enemies from './../data/enemies';
import { Level, LevelEvent, LevelFinishConditionTypes, Enemy, Report } from './types';

export default class LevelManager {

  private _level: Level;
  private _levelIndex: number;
  private _event: LevelEvent;
  private _eventIndex: number;

  private _report: Report = null;

  constructor() {
    this._levelIndex = 0;
    this._loadLevel(levels[this._levelIndex]);
  }

  getFrameReport(enemies: Enemy[]): Report {
    if (this._report.check) {
      if (this._checkEventFinishCondition(enemies)) {
        this._nextEvent();
      }
    }

    return this._report;
  }

  private _loadLevel(level: Level) {
    this._level = level;
    this._eventIndex = 0;
    this._loadEvent(level.timeline[this._eventIndex]);
  }

  private _loadEvent(event: LevelEvent): void {
    this._event = event;
    this._report = {
      action: event.action,
      payload: event.payload,
      check: false
    }
  }

  private _checkEventFinishCondition(enemies: Enemy[]): boolean {
    switch (this._event.finish.conditionType) {
      case LevelFinishConditionTypes.ALL_ENEMIES_DEAD:
        return enemies.length === 0;
        break;
    }
  }

  private _nextEvent(): void {
    if (this._level.timeline.length < this._eventIndex + 1) {
      this._eventIndex++;
      this._loadEvent(this._level.timeline[this._eventIndex]);
    } else {
      this._nextLevel();
    }
  }

  private _nextLevel(): void {
    if (levels.length < this._levelIndex + 1) {
      this._levelIndex++;
      this._loadLevel(levels[this._levelIndex]);
    } else {
      this._report = {
        action: 'game_over',
        payload: null,
        check: false
      }
    }
  }
}