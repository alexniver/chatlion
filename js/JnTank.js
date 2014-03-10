var PLAYGROUND_WIDTH = 940 ;
var PLAYGROUND_HEIGHT = 400;

var RESOURCE = "/JnGame/resource/JnTank";

var moveInterval;

var ANIMATE_TANK_H, ANIMATE_TANK_V, ANIMATE_BULLET_H, ANIMATE_BULLET_V;
var TANK_SPEED = 20, TANK_STEP = 2;
var SPRITES={};

$(function(){
	//set the playground
	$("#playground").playground({height: PLAYGROUND_HEIGHT, width: PLAYGROUND_WIDTH, refreshRate: 30, keyTracker: true});

	initAnimates();
	
	SPRITES.player = initTank("tank_player", 100, 300, "[id^=tank_enemy]");
	addAI(initTank("tank_enemy1", 300, 100, "#tank_player"));
	addAI(initTank("tank_enemy2", 350, 100, "#tank_player"));
	addAI(initTank("tank_enemy3", 400, 100, "#tank_player"));
	addAI(initTank("tank_enemy4", 450, 100, "#tank_player"));
	addAI(initTank("tank_enemy5", 500, 100, "#tank_player"));
	addAI(initTank("tank_enemy6", 550, 100, "#tank_player"));
	addAI(initTank("tank_enemy7", 600, 100, "#tank_player"));
	addAI(initTank("tank_enemy8", 650, 100, "#tank_player"));
	addAI(initTank("tank_enemy9", 700, 100, "#tank_player"));
	addAI(initTank("tank_enemy10", 750, 100, "#tank_player"));
	
	bindListener();
	$.playground().startGame();
});

function initAnimates(){
	ANIMATE_TANK_H = new $.gQ.Animation({ imageURL: RESOURCE + "/tank_h.png"});
	ANIMATE_TANK_V = new $.gQ.Animation({ imageURL: RESOURCE + "/tank_v.png"});
	ANIMATE_BULLET_H = new $.gQ.Animation({	imageURL: RESOURCE + "/bullet_h.png"});
	ANIMATE_BULLET_V = new $.gQ.Animation({	imageURL: RESOURCE + "/bullet_v.png"});
}

function initTank(tankId, x, y, enemy, direction){
	if(!direction)	{
		direction = "up";
	}
	var tank = new Sprite(tankId, x, y, 60, 24, ANIMATE_TANK_H, ANIMATE_TANK_V, direction);
	tank.bulletCount = 0;
	
	tank.shoot = function(){
		var x, y;
		if("left" == this.direction){
			x = plus(this.gQ.x(), -24);
			y = plus(this.gQ.y(), 24/2, -8/2);
		}else if("right" == this.direction){
			x = plus(this.gQ.x(), 60);
			y = plus(this.gQ.y(), 24/2, -8/2);
		}else if("up" == this.direction){
			x = plus(this.gQ.x(), 24/2, -8/2);
			y = plus(this.gQ.y(), -24);
		}else if("down" == this.direction){
			x = plus(this.gQ.x(), 24/2, -8/2);
			y = plus(this.gQ.y(), 60);
		}else{
			return;
		}
		var bulletId = tankId + "_bullet" + this.bulletCount++;
		var bullet = new Sprite(bulletId, x, y, 24, 8, ANIMATE_BULLET_H, ANIMATE_BULLET_V, this.direction);
		
		bullet.startMove(this.direction, 10, 4, function(){
			if(bullet.gQ.x() < 0 || bullet.gQ.x() > PLAYGROUND_WIDTH || bullet.gQ.y() < 0 || bullet.gQ.y() > PLAYGROUND_HEIGHT){
				bullet.remove();
				if(tank.bulletCount > 20){
					tank.bulletCount = 0;
				}
			}else{
				bullet.gQ.collision(enemy).each(function(){
					bullet.remove();
					if(tank.bulletCount > 20){
						tank.bulletCount = 0;
					}
					log("hit : " + this.id);
				});
			}
		});
	};
	return tank;
}

function tankMoveBefore(direction, gQ){
	if("left" == direction){
		return gQ.x() >= 0;
	}else if("up" == direction){
		return gQ.y() >= 0;
	}else if("right" == direction){
		return plus(gQ.x(), 60) <= PLAYGROUND_WIDTH;
	}else if("down" == direction){
		return plus(gQ.y(), 60) <= PLAYGROUND_HEIGHT;
	}else{
		return false;
	}
}

function addAI(tank){
	var directions = new Array("left", "up", "right", "down");
	tank.ai = setInterval(function(){
		if(getRandom(0, 10) > 7){
			tank.stopMove();
			var direction = directions[getRandom(0, 3)];
			tank.startMove(direction, TANK_SPEED, TANK_STEP, function(){
				return tankMoveBefore(direction, tank.gQ);
			});
		}
		if(getRandom(0, 10) > 7){
			tank.shoot();
		}
	}, 300);
}


function bindListener(){
	$.playground().registerCallback(function(){});
	var player = SPRITES.player;
	var gQ = player.gQ;
	$(document).keydown(function(e) {
		var code = e.keyCode;
		switch (code) {
		case 37:// left
			player.startMove("left", TANK_SPEED, TANK_STEP, function(){
				return tankMoveBefore("left", gQ);
			});
			break;
		case 38:// up
			player.startMove("up", TANK_SPEED, TANK_STEP, function(){
				return tankMoveBefore("up", gQ);
			});
			break;
		case 39:// right
			player.startMove("right", TANK_SPEED, TANK_STEP, function(){
				return tankMoveBefore("right", gQ);
			});
			break;
		case 40:// down
			player.startMove("down", TANK_SPEED, TANK_STEP, function(){
				return tankMoveBefore("down", gQ);
			});
			break;
		default:
			break;
		}
	});
	$(document).keyup(function(e) {
		var code = e.keyCode;
		switch (code) {
		case 32:// Spacebar
			player.shoot();
			break;
		case 37:// left
			player.stopMove();
			break;
		case 38:// up
			player.stopMove();
			break;
		case 39:// right
			player.stopMove();
			break;
		case 40:// down
			player.stopMove();
			break;
		default:
			break;
		}
	});
}

/**
 * 
 */
var Sprite = function(id, x, y, w, h, animateH, animateV, direction) {
	this.id = id;
	this.width = w;
	this.height = h;
	this.animateH = animateH;
	this.animateV = animateV;

	this.direction = direction;
	this.moveInterval = null;
	$.playground().addSprite(id, {
		posx : x,
		posy : y,
		width : w,
		height : h,
		animation : this.animateH
	});
	this.gQ = $("#" + id);
	
	if(direction == "up" || direction == "down"){
		this.gQ.setAnimation(animateV);
		this.gQ.w(h);
		this.gQ.h(w);
	}
	if(direction == "down"){
		this.gQ.flipv(true);
	}else if(direction == "left"){
		this.gQ.fliph(true);
	}
};
/**
 * 
 * @returns
 */
Sprite.prototype.isMoving = function(){
	return !!this.moveInterval;
};
/**
 * 
 * @param direction
 * @param speed
 * @param step
 * @param before
 * @param after
 */
Sprite.prototype.startMove = function(direction, speed, step, before, after){
	if(this.isMoving()){
		return;
	}
	var sprite = this;
	var gQ = this.gQ;
	
	var moveHandler = null;
	
	switch (direction) {
	case "left":
		if(sprite.direction == "up" || sprite.direction == "down"){
			gQ.w(60);
			gQ.h(24);
			gQ.setAnimation(ANIMATE_TANK_H);
			gQ.fliph(true);
		}else if(sprite.direction == "right"){
			gQ.fliph(true);
		}
		moveHandler = function(){
			gQ.x(-step, true);
		};
		break;
	case "up":
		if(sprite.direction == "left" || sprite.direction == "right"){
			gQ.w(24);
			gQ.h(60);
			gQ.setAnimation(ANIMATE_TANK_V);
			gQ.flipv(false);
		}else if(sprite.direction == "down"){
			gQ.flipv(false);
			gQ.setAnimation(ANIMATE_TANK_V);
		}
		moveHandler = function(){
			gQ.y(-step, true);
		};
		break;
	case "right":
		if(sprite.direction == "up" || sprite.direction == "down"){
			gQ.w(60);
			gQ.h(24);
			gQ.setAnimation(ANIMATE_TANK_H);
			gQ.fliph(false);
		}else if(sprite.direction == "left"){
			gQ.fliph(false);
			gQ.setAnimation(ANIMATE_TANK_H);
		}
		moveHandler = function(){
			gQ.x(step, true);
		};
		break;
	case "down":
		if(sprite.direction == "left" || sprite.direction == "right"){
			gQ.w(24);
			gQ.h(60);
			gQ.setAnimation(ANIMATE_TANK_V);
			gQ.flipv(true);
		}else if(sprite.direction == "up"){
			gQ.setAnimation(ANIMATE_TANK_V);
			gQ.flipv(true);
		}
		moveHandler = function(){
			gQ.y(step, true);
		};
		break;
	default:
		break;
	}
	if(moveHandler){
		sprite.direction = direction;
		sprite.moveInterval = setInterval(function() {
			if(before){
				if(before.call() == false){
					return;
				}
			}
			moveHandler.call();
			if(after){
				after.call();
			}
		}, speed);
	}
};
/**
 * 
 */
Sprite.prototype.stopMove = function(){
	if(this.isMoving()){
		clearInterval(this.moveInterval);
		this.moveInterval = null;
	}
};
/**
 * 
 */
Sprite.prototype.remove = function(){
	this.stopMove();
	this.gQ.remove();
};



