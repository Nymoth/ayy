import { EnemyType } from './../core/types';

const enemies: { [key: string]: EnemyType } = {
	test_cube: {
    size: {
      width: 50,
      height: 50
    },
    gun: null,
		hp: 5,
    speed: 5
	}
};

export default enemies;
