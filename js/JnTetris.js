var _row = 16;
var _col = 10;

var _container;
var _speed = 500;

var _block;
var _animate;

 var SHAPE = [// 共28种状态
 [ 0x0f00, 0x4444, 0x0f00, 0x4444 ], // 长条型的四种状态
 [ 0x04e0, 0x0464, 0x00e4, 0x04c4 ], // 'T'型的四种状态
 [ 0x4620, 0x6c00, 0x4620, 0x6c00 ], // 反'Z'型的四种状态
 [ 0x2640, 0xc600, 0x2640, 0xc600 ], // 'Z'型的四种状态
 [ 0x6220, 0x1700, 0x2230, 0x0740 ], // '7'型的四种状态
 [ 0x6440, 0x0e20, 0x44c0, 0x8e00 ], // 反'7'型的四种状态
 [ 0x0660, 0x0660, 0x0660, 0x0660 ], // 方块的四种状态
 ];



var Block = function(shape){
	shape = shape.toString(2);
	shape = (new Array(17 - shape.length)).join(0) + shape;
	this.shapeArr = shape.match(/\d{4}/g);
	
	this.row = -4, this.col = Math.floor((_col - 4) / 2);
//	this.row = 0, this.col = 0;
};

Block.prototype.move = function(direction) {
	switch (direction) {
	case "left":
		if(!_block.isTouched("left")){
			this.clear();
			this.col -= 1;
			this.draw();
		}
		break;
	case "up":
//		this.clear();
//		this.row -= 1;
//		this.draw();
		this.clear();
		this.rotate("CW");
		this.draw();
		break;
	case "right":
		if(!_block.isTouched("right")){
			this.clear();
			this.col += 1;
			this.draw();
		}
		break;
	case "down":
		if(_block.isTouched("down")){
			if($("td[row='0'][type='block']").length > 0){
				stopGame();
				alert("You lose !! hahaha !!");
			}else{
				_block.turnBase();
				_block = null;
				eraseLine();
				_block = newBlock();
			}
		}else{
			this.clear();
			this.row += 1;	
			this.draw();
		}
		break;
	default:
		break;
	}
};

Block.prototype.draw = function(){
	for(var i = 0 ; i <= 3; i ++){
		for(var j = 0; j <= 3; j ++){
			if(this.shapeArr[i].charAt(j) == "1"){
				var td = $("#td_" + plus(this.row, i) + "_" + plus(this.col, j));
				if(td.attr("type") == "blank"){
					td.removeClass("blank").addClass("block").attr("type", "block");
				}
			}
		}
	}
};
Block.prototype.clear = function(){
	for(var i = 0 ; i <= 3; i ++){
		for(var j = 0; j <= 3; j ++){
			var td = $("#td_" + plus(this.row, i) + "_" + plus(this.col, j));
			if(td.attr("type") == "block"){
				td.removeClass("block").addClass("blank").attr("type", "blank");
			}
		}
	}
};
/**
 * CW\CCW
 * @param direction
 */
Block.prototype.rotate = function(direction){
	var newShapeArr = ["","","",""];
	switch (direction) {
	case "CW":
		for(var i = 0 ; i <= 3; i ++){
			for(var j = 0; j <= 3; j ++){
				newShapeArr[i] += this.gridAt(3-j, i);
			}
		}
		break;
	case "CCW":
		for(var i = 0 ; i <= 3; i ++){
			for(var j = 0; j <= 3; j ++){
				newShapeArr[i] += this.gridAt(j, 3-i);
			}
		}
		break;
	default:
		break;
	}
	for(var i = 0; i <= 3; i ++){
		for(var j = 0; j <= 3; j ++){
			if(newShapeArr[i].charAt(j) == "1"){
				if(this.row + i >= _row || this.col + j >= _col || this.col + j < 0){
					log("Out of range");
					return;
				}
				if($("#td_" + plus(this.row, i) + "_" + plus(this.col, j)).attr("type") == "base"){
					log("Touch base");
					return;
				}
			}
		}
	}
	this.shapeArr = newShapeArr;
};

Block.prototype.turnBase = function(){
	for(var i = 0 ; i <= 3; i ++){
		for(var j = 0; j <= 3; j ++){
			if(this.gridAt(i, j) == "1"){
				$("#td_" + plus(this.row, i) + "_" + plus(this.col, j)).attr("type", "base").removeClass("block").addClass("base");
			}
		}
	}
};

Block.prototype.isTouched = function(direction){
	switch (direction) {
	case "left":
		for(var j = 0; j <= 3; j ++){
			for(var i = 0; i <= 3; i ++){
				if(this.gridAt(i, j) == "1" && (this.col + j == 0)){
					return true;
				}
			}
		}
		return false;
	case "up":
		break;
	case "right":
		for(var j = 3; j >= 0; j --){
			for(var i = 0; i <= 3; i ++){
				if(this.gridAt(i, j) == "1" && (this.col + j == _col - 1)){
					return true;
				}
			}
		}
		return false;
	case "down":
		for(var i = 3 ; i >= 0; i --){
			for(var j = 0; j <= 3; j ++){
				if(this.gridAt(i, j) == "1"){
					if(this.row + i == _row - 1){
						return true; //Touch bottom
					}
					var type = $("#td_" + plus(this.row, i, 1) + "_" + plus(this.col, j)).attr("type");
					if(type == "base"){
						return true;//Touch base
					}
				}
			}
		}
		break;
	default:
		break;
	}
	return false;
};
Block.prototype.gridAt = function(row, col){
	return this.shapeArr[row].charAt(col);
};

function stopGame(){
	clearInterval(_animate);
}

/**
 * 
 * @param container
 * @returns
 */
function initCanvas(container){
	this._container = container;
	
	createTable();
	
	bindListener();
	
	_block = newBlock();
	_block.draw();
	
	_animate = setInterval(function(){
		_block.move("down");
	}, _speed);
	
}

function bindListener(){
	$(document).keydown(function(e){
		var code = e.keyCode;
		switch (code) {
		case 37://left
			_block.move("left");
			break;
		case 38://up
			_block.move("up");
			break;
		case 39://right
			_block.move("right");
			break;
		case 40://down
			_block.move("down");
			break;
		default:
			break;
		}
	});
}

function newBlock(){
	var kind = getRandom(0, SHAPE.length - 1);
	var index = getRandom(0, 3);
	return new Block(SHAPE[kind][index]);
}

function eraseLine(){
	var lineArray = new Array();
	for(var i = 0; i < _row; i ++){
		var tdRow = $("td[row='" + i + "'][type='base']");
		if(tdRow.length == _col){
			tdRow.removeClass("base").addClass("blank").attr("type", "blank");
			lineArray.push(i);
		}
	}
	
	for(var i = 0; i < lineArray.length; i ++){
		for(var row = lineArray[i]; row > 0; row --){
			for(var col = 0; col < _col; col ++){
				var upTd = $("#td_" + plus(row, -1) + "_" + col);
				var thisTd = $("#td_" + row + "_" + col);
				if(upTd.attr("type") == "base"){
					upTd.removeClass("base").addClass("blank").attr("type", "blank");
					thisTd.removeClass("blank").addClass("base").attr("type", "base");
				}
			}
		}
	}
	
	$("#score").html(plus($("#score").html(), lineArray.length));
	
}

function createTable(){
	var table = $('<table />', {
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
				"class" : "blank",
				"type" : "blank",//blank\block\base
				"row" : i,
				"col" : j
			});
			tr.append(td);
		}
	}
}

function reset(){
	stopGame();
	$("#score").html("0");
	_container.empty();
	$(document).unbind("keyup");
	initCanvas(_container);
}