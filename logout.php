<?php
@session_start();
unset($_SESSION);
session_destroy();
$dest="http://".#_SERVER['HTTP_HOST'].dirname($_SERVER['PHP_SELF'])."/index.php";
//header("Location:".$dest);
header("Location:index.php");
//echo "<script>self.location.href='index.php'</script>";
?>
