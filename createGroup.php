<?php include("head.php"); ?>


<?php
    $groupName = $_POST["groupName"];
	$mysql = new SaeMysql();
	
		echo "目前已经有的群组：<br />";
	$queryGroup = "select groupname from usergroup limit 0, 10";
	$groupData = $mysql->getData($queryGroup);
	foreach ($groupData as $value) {
		echo $value['groupname'];
		echo "<br />";
	}
	
	
	if(strlen(trim($groupName)) > 0) {
		
		$createGroup = "insert into usergroup (groupname) values ('". $groupName . "')";
		$mysql->runSql($createGroup);
		if( $mysql->errno() != 0 ) {
			die( "Error:" . $mysql->errmsg() );
		} else if($mysql->errno() == 0) {
			echo "创建成功! <br />";
		}
		$mysql->closeDb();
	}

	
?>

<form method="post" action="createGroup.php">
    <input type="text" name="groupName" />
    <input type="submit" value="提交" />
</form>
<?php include("foot.php"); ?>
