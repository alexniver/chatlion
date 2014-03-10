<?php
    $mysql = new SaeMysql();
    $roomName = $_POST['roomName'];
	$question = $_POST['question'];
	$answer = $_POST['answer'];
	trim($roomName);
	trim($question);
	trim($answer);
    if(!empty($roomName)) {
		$createRoom = "";
		if(!empty($question) && !empty($answer)) {
			$createRoom = $createRoom . "insert into chatroom (roomname, question, answer, create_time) values ('". $roomName . "', '" . $question . "', '" . md5($answer) . "', now())";		
		} else {
			$createRoom = $createRoom . "insert into chatroom (roomname) values ('". $roomName . "')";			
		}
		$mysql->runSql($createRoom);
		if( $mysql->errno() != 0 ) {
			die( "Error:" . $mysql->errmsg() );
		} else if($mysql->errno() == 0) {
			echo "OK!<br /> <a href='chatRoomList.php'>back!</a>";
		}
		$mysql->closeDb();
	}
?>
