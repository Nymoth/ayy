import { Level, LevelFinishConditionTypes } from './../core/types';

const levels: Level[] = [
  {
    name: 'Level 1',
    timeline: [
      {
        action: 'spawn_enemies',
        payload: [
          {
            type: 'test_cube',
            x: 20,
            y: 20
          },
          {
            type: 'test_cube',
            x: 200,
            y: 20
          }
        ],
        finish: {
          conditionType: LevelFinishConditionTypes.ALL_ENEMIES_DEAD
        }
      }
    ]
  }
];

export default levels;
