var me = {
    dom: document.createElement('div'),
    x: Math.round(window.innerWidth / 2) - 5,
    y: Math.round(window.innerHeight / 2) - 5,
    gun: guns.simple,
    speed: 5
};
document.body.appendChild(me.dom);
me.dom.className = 'me';
me.dom.style.left = me.x + 'px';
me.dom.style.top = me.y + 'px';

var c = false;
var e;
var ns = 0;
var mv = 0, mh = 0;
var mn = false, ma = false, ms = false, mw = false;

var bullets = [];

window.onmousedown = function(evt) {
   c = true;
   e = evt;
}

window.onmouseup = function() {
   c = false; 
}

window.onmousemove = function(evt) {
    if (c) e = evt;
}

window.onkeydown = function(evt) {
    switch (evt.keyCode) {
        case 38:
        case 87:
            mv = -1;
            mn = true;
            break;
        case 40:
        case 83:
            mv = 1;
            ms = true;
            break;
        case 37:
        case 65:
            mh = -1;
            mw = true;
            break;
        case 39:
        case 68:
            mh = 1;
            ma = true;
            break;
    }
}

window.onkeyup = function(evt) {
    switch (evt.keyCode) {
        case 38:
        case 87:
            mv = 0;
            mn = false;
            break;
        case 40:
        case 83:
            mv = 0;
            ms = false;
            break;
        case 37:
        case 65:
            mh = 0;
            mw = false;
            break;
        case 39:
        case 68:
            mh = 0;
            ma = false;
            break;
    }
}

/*
(2 * Math.PI * c * 5 / 360) = lon arco
*/

// controller api?
// ...
// ...

function flow() {

    if (mn || ma || ms || mw) {
        handle_mov_me();
    }
    
    if (c && !+ns) {
        shoot();
    }

    handle_bullets();

    if (ns > 0) ns--;

    requestAnimationFrame(flow);
}
flow();

function shoot() {
    me.gun.channels.map(function(src) {

        var dom = document.createElement('div');
        dom.className = 'bala';

        var dx = e.clientX - me.x;
        var dy = e.clientY - me.y;
        var dv = new Victor(dx, dy);

        if (src.deviation !== 0) {
            dv.rotate(src.deviation * ((Math.PI * 2) / 360));
            dx = dv.x;
            dy = dv.y;
        }                

        var fx, fy, bmh, bmv;

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

        /*
        var bsv = new Victor(me.x + 5 + src.offset.x, me.y + 5 + src.offset.y); // vector a src
        var angulo = bsv.verticalAngleDeg();
        bsv.rotate((90 - Math.abs(bsv.verticalAngleDeg())) * ((Math.PI * 2) / 360));
        */

        var bala = {
            dom: dom,
            now: {
                //x: bsv.x,
                //y: bsv.y
                x: me.x + 5 + src.offset.x,
                y: me.y + 5 + src.offset.y
            },
            mov: {
                x: fx * bmh,
                y: fy * bmv
            },
            life: me.gun.life
        };

        bala.dom.style.left = bala.now.x + 'px';
        bala.dom.style.top = bala.now.y + 'px';
        document.body.appendChild(bala.dom);

        bullets.push(bala);
    });
    ns = me.gun.fire_rate;
}

function handle_bullets() {
    bullets.map(function(b) {
        b.now.x += b.mov.x * me.gun.speed;
        b.now.y += b.mov.y * me.gun.speed;

        if (b.now.x > window.innerWidth) {
            b.now.x = 0;
        }
        if (b.now.x < 0) {
            b.now.x = window.innerWidth;
        }
        if (b.now.y > window.innerHeight) {
            b.now.y = 0;
        }
        if (b.now.y < 0) {
            b.now.y = window.innerHeight;
        }

        b.dom.style.left = b.now.x + 'px';
        b.dom.style.top = b.now.y + 'px';

        b.life--;
        if (b.life === 0) {
            document.body.removeChild(b.dom);
            bullets.splice(bullets.indexOf(b), 1);
        }
    });
}

function handle_mov_me() {

    me.x += mh * me.speed;
    me.y += mv * me.speed;

    if (me.x > window.innerWidth) {
        me.x = 0;
    }
    if (me.x < 0) {
        me.x = window.innerWidth - 5;
    }
    if (me.y > window.innerHeight) {
        me.y = 0;
    }
    if (me.y < 0) {
        me.y = window.innerHeight - 5;
    }

    me.dom.style.left = me.x + 'px';
    me.dom.style.top = me.y + 'px';
}