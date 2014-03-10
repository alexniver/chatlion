<?php include("head.php"); ?>

<script type="text/javascript">
$(document).ready(function(){
	
	$("#answer").keydown(function(e) {
		if(e.which == 13) {
			checkAnswer();
		}
	}).keyup();
});



	var theChooseRoomId;
	//弹出窗口按钮事件
	var popWindow = function(popup){
		//调用函数居中窗口
		centerPopup(popup);
		//调用函数加载窗口
		loadPopup(popup);
		$("#answer").focus();
	}
	
	//关闭窗口
	var buttonCloseClick = function(popup) {
		disablePopup(popup);
	}
	
	/**
	//点击窗口以外背景所触发的关闭窗口事件!
	var backGroundClick = function() {
		disablePopup();
	}
	
	
	//键盘按下ESC时关闭窗口!
	$(document).keypress(function(e){
		if(e.keyCode==27 && popupStatus==1){
			disablePopup();
		}
	});
	*/
	

	
	//检察此房间id是否需要回答问题
	var knockRoomDoor = function(roomId) {
		theChooseRoomId = roomId; //记录用户选择的房间编号
		$.post("roomKnocker.php",{roomId:roomId,mode:"isNeedAnswer"}, function(result){
			if(result && result != "") {
				$("#questionArea").text(result+"?");
				popWindow("popupContact");
			} else {
				directToChatRoom();
			}
		});
	}
	
	//检察答案
	var checkAnswer = function() {
		$.post("roomKnocker.php",{roomId:theChooseRoomId, answer:$("#answer").val(), mode:"checkAnswer"}, function(result){
			if(result && (result == "true" || result == true)) {
				directToChatRoom();
			} else {
				$("#wrongMessage").show();
			}
		});
	}
	
	//隐藏错误信息
	var wrongMessageHide = function() {
		$("#wrongMessage").hide();
	}
	
	//显示错误信息
	var wrongMessageShow = function() {
		$("#wrongMessage").show();
	}
	
	
	//跳转到聊天页面
	var directToChatRoom = function() {
		$("#roomId").val(theChooseRoomId);
		$("#directToChatRoom").submit();
	}
</script>



<?php
    if(empty($_SESSION['userName'])) {
        echo "<script>self.location.href='index.php'</script>";
    } else {
		echo $_SESSION['userName'] . "!来聊天啊! <br />";
        echo "聊天室们：<br />";
        $mysql = new SaeMysql();
        $queryRoom = "select * from chatroom limit 0, 10";
        $roomData = $mysql->getData($queryRoom);
		if(is_array($roomData)) {
			foreach ($roomData as $value) {
				echo "<a href='javascript:void(0);' onclick='javascript:knockRoomDoor(". $value['id'] .");return false;'>".$value['roomname']." </a>";
				echo "<br />";
			}
		}
		$mysql->closeDb();
    }
?>

<div id="createChatRoomBlock">
	<div>
	或者你可以创建自己的聊天室, 房间问题和答案任意一项为空, 则表示此房间进入不需要回答问题.
	</div>
	<form method="post" action="createChatroom.php">
		<input type="text" name="roomName" autocomplete="off"/>房间名<br />
		<input type="question" name="question" autocomplete="off" />房间问题<br />
		<input type="answer" name="answer" autocomplete="off" />房间答案<br />
		<input type="submit" value="提交" />
	</form>
</div>

<div id="popupContact">
	<a id="popupContactClose" onclick="buttonCloseClick('popupContact')" style="cursor:pointer">X</a>
	<h1>需要回答问题哦, 亲~!</h1>
	<p id="contactArea">
		<span id="questionArea"></span><span id="wrongMessage" style="display:none">答案不对哦, 亲~!</span><br />
		<input id="answer" type="answer" name="answer" onfocus="wrongMessageHide()" autocomplete="off" /> <!--<button id="answerSubmit" onclick="checkAnswer();">我答的对不?</button>-->
	</p>
</div>

<div id="backgroundPopup"></div>

<div style="display:none">
	<form id="directToChatRoom" method="post" action="chatRoom.php">
    <input id="roomId" type="hidden" name="id" />
    <input type="submit" value="提交" />
</form>
</div>
<?php include("foot.php"); ?>