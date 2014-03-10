<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>JnMine</title>
<link rel="stylesheet" type="text/css" href="../../framework/bootstrap/css/bootstrap.min.css" />
<link rel="stylesheet" type="text/css" href="../../css/JnMine.css" />
<script type="text/javascript" src="../../framework/jquery/jquery-1.9.1.min.js"></script>
<script type="text/javascript" src="../../framework/bootstrap/js/bootstrap.min.js"></script>
<script type="text/javascript" src="../../js/JnUtil.js"></script>
<script type="text/javascript" src="../../js/JnMine.js"></script>
<script type="text/javascript">
	$(document).ready(function(){
		initCanvas($("#JnMine"), 10, 10, 10);
	});
</script>
</head>
<body>
	<br/>
	<div class="container well">
		<i class="icon-arrow-left"></i>&nbsp;&nbsp;
		<a href="..">GO back</a>
		<h2 style="text-align: center;">Mine Sweeping Game</h2>
		<br/>
		<div id="JnMine"></div>
		<br/>
		<div id="size_choose">
			<label class="radio">
  				<input type="radio" name="canvasSize" id="or1" value="10x10" checked> 10 x 10
			</label>
			<label class="radio">
  				<input type="radio" name="canvasSize" id="or2" value="20x20"> 20 x 20
			</label>
			<label class="radio">
  				<input type="radio" name="canvasSize" id="or3" value="30x30"> 30 x 30
			</label>
		</div>
		<div>
			<div class="input-prepend">
  				<span class="add-on">Mine count</span>
				<input id="mineCount" class='input-mini' onkeypress="var key=window.event?event.keyCode:event.which;return (key>=48&&key<=57)||(key==8)" onpaste="return clipboardData.getData('text').match(/^\d+$/)!=null;" type='text' value='10' style='IME-MODE:disabled;' ondragenter="return false" maxlength=3  />
			</div>
		</div>
		<div>
			<button class="btn btn-success" onclick="reset()">Reset</button>
		</div>
		<br/><br/>
	</div>
	<div class="navbar navbar-fixed-bottom" style="margin-bottom:0;padding-bottom:0">
		<div class="navbar-inner">
			<div class="container">
				<br/>
				<div style="text-align: center;font-weight: bold;">Copyright 2013-2013 ???????.com Jinn all rights reserved.</div>
				<div style="text-align: center;"><a href="http://www.bootcss.com/" target="_blank">http://www.bootcss.com/</a></div>
				<br/>
			</div>
		</div>
	</div>
</body>
</html>