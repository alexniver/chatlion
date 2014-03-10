<?php include("head.php"); ?>
<?php
	if(empty($_SESSION['userName'])) {
        echo "<script>self.location.href='index.php'</script>";      
    }
	
	$id = $_REQUEST["id"];
	if(strlen($id) <= 0) {
		echo "<script>self.location.href='error.php?errMsg=". "id is null"  ."'</script>";
	}
	
	$mysql = new SaeMysql();
	$query = "select roomname from chatroom where id=". $id;
	$nameArray = $mysql->getData($query);
	echo "房间:". $nameArray[0][roomname]."";
	$mysql->closeDb();
?>
<style>
.msg{
	display:none;
}
.username{
	padding-left: 8px;
	padding-right: 8px;
	padding-top: 2px;
	padding-bottom: 2px;
	margin-right: 10px;
}
.shadow{
	background: #fff;
	color: #333;
	filter: progid : DXImageTransform.Microsoft.Shadow ( color = #909090,
		direction = 120, strength = 4 ); /*ie*/
	-moz-box-shadow: 2px 2px 8px #909090; /*firefox*/
	-webkit-box-shadow: 2px 2px px #909090; /*safari或chrome*/
	box-shadow: 2px 2px 8px #909090; /*opera或ie9*/
}
.shadow_focus{
	background: #fff;
	color: #333;
	filter: progid : DXImageTransform.Microsoft.Shadow ( color = orange,
		direction = 120, strength = 6 ); /*ie*/
	-moz-box-shadow: 2px 2px 12px orange; /*firefox*/
	-webkit-box-shadow: 2px 2px 12px orange; /*safari或chrome*/
	box-shadow: 2px 2px 12px orange; /*opera或ie9*/
}
</style>
<script type="text/javascript" src="js/navigatorUtil.js"></script>
<script type="text/javascript" src="js/colorEgg.js"></script>
<script type="text/javascript">

var msgFlag = false;//闪动标识
var isFocus = true;//页面是否获得焦点
var sendTimeInterval = 0;
var uniqueSendId = "";

var isRinged = false; //判断是否响过, 如果响过提示音, 则设为true. 并在查看过消息后再次设置为false

//以下变量用来处理定时刷新策略. 即在standardTime时间内, 固定的以freshTime秒进行刷新, 超过standardTime以后, 则以secondIncreaseBaseNum 的 outOfStandardTimes 次方 加上目前的freshTime, 来计算下一次的freshTime. freshTime 最大为freshTimeMax
var freshTime = 3 * 1000; //刷新的时间间隔
var freshTimeMax = 30 * 60 * 1000; // 最大刷新间隔.
var lastFreshTime = null; //最后一次刷新的时间
var loseFocusTimePoint; //丢失焦点的时间点
var standardTime = 60 * 1000; //标准时间, 标准时间之内都以freshTime来刷新消息 以毫秒计算
var outOfStandardTimes = 0; //超过standardTime后, 刷新的次数, 此变量获得焦点后需要重置
var secondIncreaseBaseNum = 2; //增加秒数的基本参数

//需替换消息中的字符串数组
var replaceArr = null;

$(document).ready(function(){

	replaceArr = initColorEgg();

	browserTip();
	
	audioRing = document.getElementById("media");
	audioRing.loop=false;
	audioRing.volume = 0.25;


	queryChatServer();
	lastFreshTime = new Date().getTime();
	$('body').everyTime('1s', "queryChatServer", function() {
		var now = new Date().getTime();
		
		//先计算刷新时间间隔
		var privateFreshTime = freshTime;
		
		
		//如果出现失去焦点的时间, 并且失去当前时间 - 焦点的时间 > standardTime
		if(loseFocusTimePoint && now - loseFocusTimePoint >=  standardTime) {
			privateFreshTime = privateFreshTime + Math.pow(secondIncreaseBaseNum, outOfStandardTimes) * 1000;
		}
	
		//不能超过最大的刷新时间间隔
		if(privateFreshTime > freshTimeMax) {
			privateFreshTime = freshTimeMax;
		}
		
		//如果当前时间-上次刷新的时间>刷新时间间隔, 则刷新, 并重置lastFreshTime
		if(lastFreshTime && now && (now - lastFreshTime) >= privateFreshTime) {
			queryChatServer();
			lastFreshTime = new Date().getTime();
			
			//如果privateFreshTime 与 freshTime不相等, 并且小于最大刷新时间长度, 则说明此次刷新为超过standardTime后的刷新 
			if(privateFreshTime != freshTime && privateFreshTime < freshTimeMax) {
				outOfStandardTimes ++;
			}
			//$("#test").append(outOfStandardTimes + "   " +  privateFreshTime +"<br />");
		}
		

	});
  	$("#myWord").keyup(function (e) {
	    var value = $(this).val();
		if(e.which != 13) {
		    $("#cont").text(value);
			
		} else {
			if(sendTimeInterval>0){
				$("#tipSpan").html("您输入太快啦～");
				return;
			}
			sendTimeInterval = 2;
			sendTimeFilter();
			value = value.replace(/<script>/g, "&lt;script&gt;");
			value = value.replace(/<\/script>/g, "&lt;\/script&gt;");
			queryChatServer(null, value);
			$("#cont").html("");
			$(this).attr("value","");
		}

	}).keyup();
});

var browserTip = function() {
	if(isIE()){
		$("#browserTip").html("<img src=\"http:\/\/chatlion-newbe.stor.sinaapp.com\/ie.jpg\" \/> is SHIT! Please use Chrome.");
	}else if(isChrome()){
		$("#browserTip").html("<img src=\"http:\/\/chatlion-newbe.stor.sinaapp.com\/chrome.jpg\" \/>  is great!");
	}else if(isFirefox()){
		$("#browserTip").html("Firefox is great!");
	}else{
		$('#tipBar').html('');
	}
}

/**
  *播放指定路径的音频文件, PS:chrome不支持短音频文件
  */
var ringBell = function() {
	if(!isRinged) {
		audioRing.play();
		isRinged = true;
	}
}

var sendTimeFilter = function(){
	if(sendTimeInterval>0){
		sendTimeInterval--;
		setTimeout(sendTimeFilter, 1000);
	}else{
		$("#tipSpan").html("");
	}
}

window.onfocus = function(){
	document.getElementById("myWord").focus();
	msgFlag = false;
	isFocus = true;
	isRinged = false;//初始化是否响过铃声
	
	loseFocusTimePoint = null; //重置失去焦点的时间
	outOfStandardTimes = 0; //重置失去焦点后刷新的次数
}
window.onblur = function(){
	isFocus = false;
	loseFocusTimePoint = new Date().getTime(); // 设定失去焦点的时间
}

/**
 *提示新信息
 */
var gotNewMessage = function(){
	if(!msgFlag){
		document.title="ChatLion";
		return;
	}
	if(document.title=="You got message!"){
		document.title="ChatLion";
	}else{
		document.title="You got message!";
	}
	setTimeout(gotNewMessage,500);
}

/*对于输入做一些处理, 如菊花文*/
var processWord = function(word) {
	//菊花文
	if(word.substr(0,4) == "***:") {
		var str1 = word.substr(4);
		var str2 = "";
		var i=0;
		while(i<str1.length){
			str2 += String.fromCharCode(1161) + str1.charAt(i);
			i++;
		}
		word = str2;
	}
	return word;
}

/*
* 异步请求服务器, 插入数据并返回数据
*/
var queryChatServer = function(times, word) {

	var oldMsgArr = $(".msg");//旧消息span数组
	var oldTopMsgId = "";//旧消息中最新一条的id
	if(null != oldMsgArr && oldMsgArr.length > 0){
		oldTopMsgId = oldMsgArr[0].id;
	}
	if(word) {
		word = processWord(word);
	}

	uniqueSendId = new Date().getTime();//唯一发送标识 zhul : getMilliseconds 只能拿到毫秒数, 即0-999的一个数,会重复, 这里改为使用 getTime(), 即真正的从1970年到现在的毫秒数;
	$.get("chatServer.php", {myword:word, id:<?php echo $id;?>, msgid: oldTopMsgId, sendid: uniqueSendId}, function(result){
		if(null != result && "" != result){
			//首先判断session是否超时
			if(result == "outofsession") {
				self.location.href='index.php';
				return;
			}
			
			var jsonResult = JSON.parse(result);
			if(null != jsonResult.message && "" != jsonResult.message && jsonResult.sendid == uniqueSendId){
				
				//替换制定字符串
				var message = jsonResult.message;
				for(var i = 0; i < replaceArr.length; i = i + 2){
					message = message.replace(replaceArr[i], replaceArr[i+1]);
				}
				
				$("#pMain").after(message);
				if(!msgFlag && !isFocus){//当前不在闪动而且没有焦点
					msgFlag = true;//设置闪动标识
					gotNewMessage();//闪动
					ringBell();//声音提示
				}
				
				var msgArr = $(".msg");
				var msgLength = msgArr.length;//新消息列表长度
				var newMsgCount = msgLength - oldMsgArr.length;//此次新增加的消息数量
				
				for(var i = 0; i < newMsgCount; i ++){//新消息动态显示
					var spanId = msgArr[i].id;
					$("#"+spanId).show("slow");
				}
				
				if(msgLength > 20){
					for(var i = 20; i < msgLength; i ++){//多于20调的消息动态remove
						var spanId = msgArr[i].id;
						$("#"+spanId).hide("slow", function(){
							$("#"+spanId).remove();
						});
					}
				}
				
				$(".username").mouseover(function(e){
					//$(e.target).attr("class", "shadow_focus username");
				});
				$(".username").mouseout(function(e){
					//$(e.target).attr("class", "shadow username");
				});
				
			}
		}
	});
	
}


</script>

<!--
<form method="post" action="chat.php">
   <textarea id="chatArea" name="chatArea" rows="10" cols="30"></textarea>
   <input id="chatPriv" name="chatPriv" type="text" /> 
   <button>提交</button>
</form>


<div>
<p id="test">
test<br/>
</p>
</div>
-->


<p id="pSub">
<span id="tipBar" style="font-size:12px;font-weight:bold;">
	<span id="browserTip" style="color:red;"></span>
	<span style="cursor:pointer;" onclick="javascript:$('#tipBar').hide('slow');">&nbsp;X</span>
</span>
<br/>
Me:<span id="cont"></span>
</p>

<input id="myWord" name="myWord" type="text" />&nbsp;&nbsp;&nbsp;&nbsp;
<span id="tipSpan" style="color:red;font-size:10px;font-weight:bold"></span>
<p id="pMain">
</p>
<div style= "display:none">
	<audio id="media" src="http://chatlion-newbe.stor.sinaapp.com/sound/%E4%B9%8C%E9%B8%A6.wav" controls></audio>
</div> 
<div id="backgroundChatRoom"></div>

<?php include("foot.php"); ?>
