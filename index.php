<?php include("head.php"); ?>

<?php
	if(empty($_SESSION['userName'])) {
?>
<form action="login.php" type="get">
Name:<input id="userName" name="userName" type="text" />
<input type='submit' value='提交' />
</form>
<?php
	} else {
		echo "<script>self.location.href='chatRoomList.php'</script>";
	}
?>

  
<?php include("foot.php"); ?>