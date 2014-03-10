<?php
session_start();
$_SESSION['userName']=$_GET['userName'];
echo "<script>self.location.href='chatRoomList.php'</script>";
?>
