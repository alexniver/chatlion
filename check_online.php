<?php session_start(); ?>
<?php

	$mysql = new SaeMysql();
	
	$queryTextContSql = "select username from online_status where last_activity_time between SUBTIME(CURTIME(), '00:05:00') and CURTIME()";
	$textContArray = $mysql->getData($queryTextContSql);
	if(is_array($textContArray)) {
		$textCont = "";
		foreach ($textContArray as $value) {
		}
		//echo $textCont;
		$resultArr = array("message"=>$textCont, "sendid"=>$sendid);
		echo json_encode($resultArr);

	}
	$mysql->closeDb();

?>