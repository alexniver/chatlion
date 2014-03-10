<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>JnTetris</title>
<link rel="stylesheet" type="text/css" href="../../framework/bootstrap/css/bootstrap.min.css" />
<link rel="stylesheet" type="text/css" href="../../css/JnTetris.css" />
<script type="text/javascript" src="../../framework/jquery/jquery-1.9.1.min.js"></script>
<script type="text/javascript" src="../../framework/bootstrap/js/bootstrap.min.js"></script>
<script type="text/javascript" src="../../js/JnUtil.js"></script>
<script type="text/javascript" src="../../js/JnTetris.js"></script>
<script type="text/javascript">
	$(document).ready(function(){
		initCanvas($("#JnTetris"));
	});
</script>
</head>
<body>
	<br/>
	<div class="container well">
		<i class="icon-arrow-left"></i>&nbsp;&nbsp;
		<a href="..">GO back</a>
		<h2 style="text-align: center;">Tetris Game</h2>
		<br/>
		<div id="JnTetris"></div>
		<br/>
		<div style="text-align:center">
			<div class="alert">Score : <span id="score">0</span></div>
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