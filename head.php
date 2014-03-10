<?php
session_start();
$lifeTime = 3600; //设置session周期为一小时
setcookie(session_name(), session_id(), time() + $lifeTime, "/");
?>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html>
<head>
  <meta http-equiv="Content-Type" content="text/html;charset=UTF-8">
  <title>ChatLion</title>
  <script src="js/jquery.tools.min.js" type="text/javascript"></script>
  <script src="js/jquery.timers.js" type="text/javascript"></script>
  <script src="js/chatRoomQuestionPop.js" type="text/javascript"></script>
  <link rel="stylesheet" href="css/standalone.css" type="text/css" />
  <link rel="stylesheet" href="css/tabs-flowplayer-v2.css" type="text/css" />
  <link rel="stylesheet" href="css/chatRoomQuestionPop.css" type="text/css" />
  <link rel="stylesheet" href="css/base.css" type="text/css" />
  
</head>
<body>
<center>
	<!--<span style="font-style:italic;font-size:36px;font-weight:bold;font-family:微软雅黑">ChatLion</span>-->
	<img src="http://chatlion-newbe.stor.sinaapp.com/c_h_a_t_l_i_o_n.png" />
</center>
<?php
	if(!empty($_SESSION["userName"])){
?>
		<span style="float:right">
			[<a href="chatRoomList.php">RoomList</a>]
			&nbsp;&nbsp;&nbsp;
			[<a href="logout.php">Logout</a>]
		</span>
<?php
	}
?>
