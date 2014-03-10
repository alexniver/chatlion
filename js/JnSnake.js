var _container;
var _row, _col;
var _foodCount;
var _speed;

var _head, _tail;
var _direction;
var _laxtDirection;
var _end;

var _goTimeout;

function initCanvas(container, row, col, foodCount, speed){
	//init
	_container = container;
	_row = parseInt(row, 10);
	_col = parseInt(col, 10);
	_foodCount = parseInt(foodCount, 10);
	_speed = speed;
	_end = false;
	if(_row < 5 || _col < 5){
		throw "Too small ~";
	}
	if(_foodCount < 1){
		throw "Not enough food ~";
	}
	
	createTable();
	initSnake();
	addFood(_foodCount);
	initListener();
	_goTimeout = setTimeout(go, _speed);
}

function initListener(){
	$(document).keyup(function(e){
		var code = e.keyCode;
		var head = $("#td_" + _head.row + "_" + _head.col);
		switch (code) {
		case 37:
			if(_laxtDirection != "right"){
				_direction = "left";
				head.empty();
				drawDirection();
			}
			break;
		case 38:
			if(_laxtDirection != "down"){
				_direction = "up";
				head.empty();
				drawDirection();
			}
			break;
		case 39:
			if(_laxtDirection != "left"){
				_direction = "right";
				head.empty();
				drawDirection();
			}
			break;
		case 40:
			if(_laxtDirection != "up"){
				_direction = "down";
				head.empty();
				drawDirection();
			}
			break;
		default:
			break;
		}
	});
}

function go(){
	if(_end == true){
		return;
	}
	var beforeHead = $("#td_" + _head.row + "_" + _head.col);
	if("up" == _direction){
		_head.row --;
	}else if("down" == _direction){
		_head.row ++;
	}else if("left" == _direction){
		_head.col --;
	}else if("right" == _direction){
		_head.col ++;
	}else{
		throw "No Direction ?";
	}
	if(_head.row == _row){
		_head.row = 0;
	}
	if(_head.row == -1){
		_head.row = _row - 1;
	}
	if(_head.col == _col){
		_head.col = 0;
	}
	if(_head.col == -1){
		_head.col = _col - 1;
	}
	var head = $("#td_" + _head.row + "_" + _head.col);
	var tail = $("#td_" + _tail.row + "_" + _tail.col);
	beforeHead.attr("nextId", head.attr("id"));
	
	var type = head.attr("type");
	if("blank" == type){
		beforeHead.empty();//clear old head icon
		moveHead(head);
		clearTail(tail);
	}else if("food" == type){
		beforeHead.empty();//clear old head icon
		moveHead(head);
		addFood(1);
	}else if("snake" == type){
		stopGame();
		alert("You lose !! Ha ha ha ha ……");
	}else{
		throw "Unkonw grid type : " + type;
	}
	_goTimeout = setTimeout(go, _speed);
}

function drawDirection(){
	var head = $("#td_" + _head.row + "_" + _head.col);
	if("up" == _direction){
		head.append("<i class='icon-arrow-up icon-white'></i>");
	}else if("down" == _direction){
		head.append("<i class='icon-arrow-down icon-white'></i>");
	}else if("left" == _direction){
		head.append("<i class='icon-arrow-left icon-white'></i>");
	}else if("right" == _direction){
		head.append("<i class='icon-arrow-right icon-white'></i>");
	}else{
		throw "No Direction ?";
	}
}

function addFood(number){
	var count = 0;
	while(count < number){
		var randomRow = getRandom(0, _row - 1);
		var randomCol = getRandom(0, _col - 1);
		var td = $("#td_" + randomRow + "_" + randomCol);
		if(td.attr("type") == "blank"){
			td.attr("type", "food");
			td.append("<i class='icon-star'></i>");
			count ++;
		}
	}
}

function stopGame(){
	_end = true;
	clearTimeout(_goTimeout);
	_goTimeout = null;
}

function initSnake() {
	_head = {
		"row" : Math.floor(_row / 2),
		"col" : Math.floor(_col / 2)
	};
	_tail = {
		"row" : Math.floor(_row / 2) + 1,
		"col" : Math.floor(_col / 2)
	};
	_direction = "up";
	_laxtDirection = _direction;
	
	var tdHead = $("#td_" + _head.row + "_" + _head.col);
	var tdTail = $("#td_" + _tail.row + "_" + _tail.col);
	
	tdTail.attr("nextId", tdHead.attr("id"));
	
	tdHead.removeClass("blank");
	tdHead.addClass("snake");
	tdHead.attr("type", "snake");
	tdTail.removeClass("blank");
	tdTail.addClass("snake");
	tdTail.attr("type", "snake");
	
	tdHead.append("<i class='icon-arrow-up icon-white'></i>");
}

function moveHead(head){
	if(head.attr("type") == "food"){
		head.empty();
	}else{
		head.removeClass("blank");
	}
	head.addClass("snake");
	head.attr("type", "snake");
	_laxtDirection = _direction;
	drawDirection();
}

function clearTail(tail) {
	tail.removeClass("snake");
	tail.addClass("blank");
	tail.attr("type", "blank");
	var nextTail = $("#" + tail.attr("nextId"));
	_tail = {
		"row" : nextTail.attr("row"),
		"col" : nextTail.attr("col")
	};
}

function createTable(){
	var table = $('<table />', {
		"id" : "snakeTable",
		"style" : "margin:0 auto"
	});
	
	this._container.append(table);

	for(var i = 0; i < _row; i ++){
		var tr = $('<tr />', {
			"id" : "tr_" + i
		});
		table.append(tr);
		for(var j = 0; j < _col; j ++){
			var td = $('<td />', {
				"id" : "td_" + i + "_" + j,
				"class" : "grid blank",
				"type" : "blank",
				"nextId" : "null",
				"row" : i,
				"col" : j
			});
			tr.append(td);
		}
	}
}

function changeSpeed(value){
	var speed = plus(_speed, value);
	if(speed > 0){
		_speed = speed;
		$("#speed").html(_speed);
	}
}

function reset(){
	stopGame();
	_container.empty();
	$(document).unbind("keyup");
	initCanvas(_container, _row, _col, _foodCount, _speed);
}
