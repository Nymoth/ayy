var guns = {
	simple: {
		fire_rate: 10,
		speed: 10,
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
	double: {
		fire_rate: 1,
		speed: 10,
		life: 50,
		dmg: 1,
		channels: [
			{
				deviation: 0,
				offset: {
					x: -10,
					y: 0
				}
			},
			{
				deviation: 0,
				offset: {
					x: 10,
					y: 0
				}
			}
		]
	},
	quad: {
		fire_rate: 1,
		speed: 10,
		life: 50,
		dmg: 1,
		channels: [
			{
				deviation: 0,
				offset: {
					x: -15,
					y: 3
				}
			},
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
			},
			{
				deviation: 0,
				offset: {
					x: 15,
					y: 3
				}
			}
		]
	},
	v3: {
		fire_rate: 10,
		speed: 10,
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
				deviation: 0,
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
	},
	v5: {
		fire_rate: 10,
		speed: 10,
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
				deviation: -2.5,
				offset: {
					x: 0,
					y: 0
				}
			},
			{
				deviation: 0,
				offset: {
					x: 0,
					y: 0
				}
			},
			{
				deviation: 2.5,
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
var enemies = {
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