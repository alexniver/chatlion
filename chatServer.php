<?php session_start(); ?>
<?php

	$myWord = $_GET["myword"];
	$roomid = $_GET["id"];
	$msgid = $_GET["msgid"];
	$sendid = $_GET["sendid"];
	$username = $_SESSION["userName"];

	if(empty($username)) {
		echo "outofsession";
	} else {

		$mysql = new SaeMysql();
		$newestMsgId = "";//最新一条消息的id

		if(!empty($myWord)) {
			//如果用户插入一条信息, 则活动过, 重置session时间
			$lifeTime = 3600;
			setcookie(session_name(), session_id(), time() + $lifeTime, "/");

			$addChatRoomChat = "insert into chatroomcontent (roomid, username, content, time) values (". $roomid .", '". $username ."', '". $myWord . "', now())";
			$mysql->runSql($addChatRoomChat);
			
			//更新用户最新活动时间
			$queryUserActivityTimeSql = "select count(1) from online_status where username='". $username ."'";
			$userActivityTime = $mysql->getData($queryUserActivityTimeSql);
			
			$updateUserActivityTimeSql = "update online_status set last_activity_time=now() where username='". $username ."'";

			if($userActivityTime == 0) {
				$updateUserActivityTimeSql = "insert into online_status (username, last_activity_time) values ('". $username ."', now())";
			}
			
			$mysql->runSql($updateUserActivityTimeSql);
			
			if( $mysql->errno() != 0 ) {
				die( "Error:" . $mysql->errmsg());
			}else{
				//查出最新一条消息的id, newestMsgId = ??
			}


		}

		// if newestMsgId == msgid 就返回空，不用查询

		$queryTextContSql = "select * from chatroomcontent where roomid=". $roomid;
		if(!empty($msgid)) {
			$queryTextContSql = $queryTextContSql . " and time> (select time from chatroomcontent where id=". $msgid .")";
		}
		$queryTextContSql = $queryTextContSql ." order by time desc limit 0, 20 ";

		$textContArray = $mysql->getData($queryTextContSql);
		if(is_array($textContArray)) {
			$textCont = "";
			foreach ($textContArray as $value) {
				$nameColor = "purple";
				if($value[username] == $username){
					$nameColor = "orange";
				}
				$textCont = $textCont . "<span class= \"msg\" id=" . $value[id] . "><span class=\"shadow username\"><font color=\"" . $nameColor . "\">" . $value[username] ."</font></span>". $value[time] . ": <br/><br/>" . $value[content] . "<br/> <hr></span>";
			}
			//echo $textCont;
			$resultArr = array("message"=>$textCont, "sendid"=>$sendid);
			echo json_encode($resultArr);

		}
		$mysql->closeDb();
	}
?>