
var _row, _col;
var _mineArray;
var end = false;
var _container;
var _sweepedCount = 0;
var _mineCount = 0;


function initCanvas(container, row, col, mineCount) {
	this._container = container;
	this._row = row;
	this._col = col;
	this._mineCount = mineCount;
	
	this._mineArray = new Array(this._row);
	for(var i = 0; i < this._row; i ++){
		this._mineArray[i] = new Array(this._col);
		for(var j = 0; j < this._col; j ++){
			this._mineArray[i][j] = 0;
		}
	}
	
	
	var table = $('<table />', {
		"id" : "table",
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
				"class" : "grid normal",
				"sweeped" : "0",
				"row" : i,
				"col" : j
			});
			tr.append(td);
		}
	}
	
	plantMines(this._mineCount);
	
	calculateMines();
	
	
//	container.append("<br/>");
//	for(var i = 0; i < _row; i ++){
//		for(var j = 0; j < _col; j ++){
//			container.append(_mineArray[i][j]);
//			container.append("&nbsp;&nbsp;");
//		}
//		container.append("<br/>");
//	}
	
	bindEvent();
}


function calculateMines(){
	for(var i = 0; i < _row; i ++){
		for(var j = 0; j < _col; j ++){
			if(_mineArray[i][j] == "m"){
				continue;
			}
			_mineArray[i][j] 
				= hasMine(i - 1, j - 1) + hasMine(i - 1, j) + hasMine(i - 1, j + 1)
				+ hasMine(i, j - 1) + hasMine(i, j + 1)
				+ hasMine(i + 1, j - 1) + hasMine(i + 1, j) + hasMine(i + 1, j + 1);
		}
	}
}
function hasMine(row, col){
	if(row < 0 || row >= _row || col < 0 || col >= _col){
		return 0;
	}
	return _mineArray[row][col] == "m" ? 1 : 0;
}

function bindEvent(){
	$("td.grid").mouseover(function(){
		if($(this).attr("sweeped") == 0){
			$(this).removeClass("normal");
			$(this).addClass("focus");
		}
	});
	$("td.grid").mouseout(function(){
		if($(this).attr("sweeped") == 0){
			$(this).removeClass("focus");
			$(this).addClass("normal");
		}
	});
	_container.bind('contextmenu', function (e) {
        return false;
    });
	
	
	$("td.grid").mousedown(function(e){
		if(end){
			return;
		}
		
		if(3 == e.which){//right click
			if($(this).attr("sweeped") == 0){
				if($(this).html().length > 0){
					$(this).empty();
				}else{
					$(this).html("<i class='icon-screenshot'></i>");
				}
			}
			return false;
		}
		$(this).html("");
		
		var row = $(this).attr("row");
		var col = $(this).attr("col");
		if(hasMine(row, col) == 1){
			end = true;
			showMines(row, col);
			alert("You lose !!! Ha ha ha ha ha ha ...");
		}else{
			sweepAround(row, col);
		}
		if(plus(_sweepedCount, _mineCount) == _row * _col){
			alert("Congratulation !! You win !!");
			showMines(row, col);
			end = true;
		}
	});
}

function sweepAround(row, col){
	row = parseInt(row, 10);
	col = parseInt(col, 10);
	if(row < 0 || row >= _row || col < 0 || col >= _col){
		return;
	}
	if(hasMine(row, col) == 1){//is mine
		return;
	}
	var td = $("#td_" + row + "_" + col);
	if(td.attr("sweeped") == 1){//sweeped
		return;
	}
	td.removeClass("normal");
	td.removeClass("focus");
	td.addClass("sweeped");
	td.attr("sweeped", 1);
	td.empty();
	_sweepedCount ++;
	var mineCount = _mineArray[row][col];
	if(mineCount > 0){//has number
		td.html(mineCount);
	}else{//blank, sweep other blank
		sweepAround(row - 1, col - 1);
		sweepAround(row - 1, col);
		sweepAround(row - 1, col + 1);
		sweepAround(row, col - 1);
		sweepAround(row, col + 1);
		sweepAround(row + 1, col - 1);
		sweepAround(row + 1, col);
		sweepAround(row + 1, col + 1);
	}
}

function clearCanvas(){
	this._container.empty();
}

function reset(){
	var size = $('input[name="canvasSize"]:checked').val();
	var mineCount = $("#mineCount").val();
	var row = 0, col = 0;
	if(size == "10x10"){
		row = 10;
		col = 10;
	}else if(size == "20x20"){
		row = 20;
		col = 20;
	}else if(size == "30x30"){
		row = 30;
		col = 30;
	}
	if(mineCount <= 0 || mineCount >= row * col){
		alert("Are you kidding me ?");
		return;
	}
	_sweepedCount = 0;
	_mineCount = 0;
	end = false;
	clearCanvas();
	initCanvas(this._container, row, col, mineCount);
}

function showMines(row, col){
	for(var i = 0; i < _row; i ++){
		for(var j = 0; j < _col; j ++){
			var td = $("#td_" + i + "_" + j);
			if(hasMine(i, j) == 1){
				td.removeClass("normal");
				td.removeClass("focus");
				td.addClass("sweeped");
				td.empty();
				td.html("<i class='icon-certificate'></i>");
			}else{
				td.removeClass("normal");
				td.addClass("sweeped");
				td.attr("sweeped", 1);
				var mineCount = _mineArray[i][j];
				if(mineCount > 0){
					td.empty();
					td.html(mineCount);
				}
			}
		}
	}
	//focus last grid
	$("#td_" + row + "_" + col).removeClass("sweeped");
	$("#td_" + row + "_" + col).addClass("focus");
}

function plantMines(mineCount){
	if(mineCount > (_row+1)*(_col+1)){
		throw "Out of mines : " + mineCount;
	}
	var count = 0;
	while(count < mineCount){
		var randomRow = getRandom(0, _row - 1);
		var randomCol = getRandom(0, _col - 1);
		if(_mineArray[randomRow][randomCol] == 0){
			_mineArray[randomRow][randomCol] = "m";
			count ++;
		}
	}
}



