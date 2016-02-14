var Renderer = function(window) {

	// specifics
	var dom_bullets = [];
	var dom_document = window.document;

	// api
	return {

		width: window.innerWidth,
		height: window.innerHeight,

		bullet: {
			create: function(bullet) {
				var dom = dom_document.createElement('div');
		        dom.className = 'bullet';
		        dom.style.left = bullet.now.x + 'px';
		        dom.style.top = bullet.now.y + 'px';

		        dom_bullets[bullet.index] = dom;
		        dom_document.body.appendChild(dom);
			},
			move: function(bullet) {
				var dom = dom_bullets[bullet.index];
				dom.style.left = bullet.now.x + 'px';
		        dom.style.top = bullet.now.y + 'px';
			},
			destroy: function(bullet) {
				var dom = dom_bullets[bullet.index];
				document.body.removeChild(dom);
				delete dom_bullets[bullet.index];
				//console.log(bullet.index);
			}
		}
	}
}