<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html lang="en">
<head>
  <meta http-equiv="Content-Type" content="text/html;charset=UTF-8">
  <title>ChatLion</title>
  <script src="js/jquery.tools.min.js" type="text/javascript"></script>
  <link rel="stylesheet" href="css/standalone.css" type="text/css" />
  <link rel="stylesheet" href="css/tabs-flowplayer-v2.css" type="text/css" />
</head>
<body>
  
<?php include("head.php"); ?>
<!-- tabs -->


<ul id="flowtabs">
	<li><a id="t1" href="#player_tab">The Player</a></li>
	<li><a id="t2" href="#plugins_tab">Plugins</a></li>
	<li><a id="t3" href="#streaming_tab">Streaming</a></li>
	<li><a id="t4" href="#scripting_tab">Scripting</a></li>
</ul>

<!-- panes -->
<div id="flowpanes">

	<!-- remove the space between tabs and panes -->
	<br clear="all" />

	<div>
		<h2>Lorem ipsum dolor sit amet</h2>

		<img src="http://static.flowplayer.org/img/title/screens.png" alt="Flying screens" style="float:left;margin:0 30px 200px 0" />

		<p style="font-weight:bold">
			Consectetur adipiscing elit. Duis viverra, leo sit amet auctor fermentum, risus lorem posuere tortor, in accumsan purus magna imperdiet sem.
		</p>

		<p>
			Suspendisse enim. Pellentesque facilisis aliquam enim. Maecenas facilisis molestie lectus. Sed ornare ultricies tortor. Vivamus nibh metus, faucibus quis, semper ut, dignissim id, diam.
		</p>

		<p>
			Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis viverra, leo sit amet auctor fermentum, risus lorem posuere tortor, in accumsan purus magna imperdiet sem.
		</p>

		<br clear="all" />

	</div>

	<div>

		<h2>Lorem ipsum dolor sit amet</h2>

		<img src="http://static.flowplayer.org/img/title/eye192.png" alt="Flying screens" style="float:left;margin:0 30px 200px 0" />

		<p>
			Suspendisse enim. Pellentesque facilisis aliquam enim. Maecenas facilisis molestie lectus. Sed ornare ultricies tortor. Vivamus nibh metus, faucibus quis, semper ut, dignissim id, diam.
		</p>

		<p>
			Mauris ultricies. Nam feugiat egestas nulla. Donec augue dui, molestie sed, tristique sit amet, blandit eu, turpis. Mauris hendrerit, nisi et sodales tempor, orci tellus laoreet elit, sed molestie dui quam vitae dui.
		</p>
		<p>
			Pellentesque nisl. Ut adipiscing vehicula risus. Nam eget tortor. Maecenas id augue. Vivamus interdum nulla ac dolor. Fusce metus. Suspendisse eu purus. Maecenas quis lacus eget dui volutpat molestie.
		</p>

		<br clear="all" />

	</div>

	<div>

		<h2>Title for the third tab pane</h2>

		<p>
			Mauris ultricies. Nam feugiat egestas nulla. Donec augue dui, molestie sed, tristique sit amet, blandit eu, turpis. Mauris hendrerit, nisi et sodales tempor, orci tellus laoreet elit, sed molestie dui quam vitae dui.
		</p>
		<p>
			Pellentesque nisl. Ut adipiscing vehicula risus. Nam eget tortor. Maecenas id augue. Vivamus interdum nulla ac dolor. Fusce metus. Suspendisse eu purus. Maecenas quis lacus eget dui volutpat molestie.
		</p>

		<img src="http://static.flowplayer.org/img/title/eye192.png" alt="Flying screens" />

	</div>

	<div>

		<h2>Fourth pane is here</h2>

		<p>
			Maecenas at odio. Nunc laoreet lectus vel ante. Nullam imperdiet. Sed justo dolor, mattis eu, euismod sed, tempus a, nisl. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.
		</p>

		<p>
			In sed dolor. Etiam eget quam ac nibh pharetra adipiscing. Nullam vitae ligula. Sed sit amet leo sit amet arcu mollis ultrices. Vivamus rhoncus sapien nec lorem. In mattis nisi. Vivamus at enim. Integer semper imperdiet massa. Vestibulum nulla massa, pretium quis, porta id, vestibulum vitae, velit.
		</p>
	</div>
</div>


<!-- activate tabs with JavaScript -->
<script>
$(function() {
	$("#flowtabs").tabs("#flowpanes > div");
});
</script>	
  
<?php include("foot.php"); ?>

</body>
</html>
