var guns = {
	simple: {
		fire_rate: 10,
		life: 100,
		dmg: 1,
		channels: [
			{
				deviation: 0,
				offset: {
					x: 0,
					y: 0
				}
			}
		]
	},
	doble: {
		fire_rate: 0,
		life: 100,
		dmg: 1,
		channels: [
			{
				deviation: 0,
				offset: {
					x: -5,
					y: 0
				}
			},
			{
				deviation: 0,
				offset: {
					x: 5,
					y: 0
				}
			}
		]
	},
	v: {
		fire_rate: 10,
		life: 100,
		dmg: 1,
		channels: [
			{
				deviation: -5,
				offset: {
					x: 0,
					y: 0
				}
			},
			{
				deviation: 5,
				offset: {
					x: 0,
					y: 0
				}
			}
		]
	}
};
/*
var enemys = {
	test_cube: {
		width: 50,
		height: 50,
		hp: 2
	}
};

var levels = [{
	name: 'Level 1',

}];
*/