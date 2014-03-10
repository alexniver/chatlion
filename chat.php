<?php include("head.php"); ?>
<script type="text/javascript">
$(document).ready(function(){

  	$("#myWord").keyup(function (e) {
	    var value = $(this).val();
		if(e.which != 13) {
		    $("#cont").text(value);
			
		} else {
			$.get("chatServer.php", {myword:value}, function(result){
				$("#pMain").html(result);
			});
			$("#cont").html("");
			$(this).attr("value","");
		}

	}).keyup();
});
</script>

<!--
<form method="post" action="chat.php">
   <textarea id="chatArea" name="chatArea" rows="10" cols="30"></textarea>
   <input id="chatPriv" name="chatPriv" type="text" /> 
   <button>提交</button>
</form>
-->
<p id="pMain">
</p>
<p id="pSub">
Me:<span id="cont"></span>
</p>
<input id="myWord" name="myWord" type="text" />


<?php include("foot.php"); ?>
