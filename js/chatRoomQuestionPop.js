//初始化：是否开启DIV弹出窗口功能

//0 表示开启; 1 表示不开启;
var popupStatus = 0;

//弹窗背景id
var backGroundId = "#backgroundPopup";

//使用Jquery加载弹窗
function loadPopup(popup){
	popup = "#" + popup;
	//仅在开启标志popupStatus为0的情况下加载
	if(popupStatus==0){
		$(backGroundId).css({
		"opacity": "0.7"
		});
		$(backGroundId).fadeIn("slow");
		$(popup).fadeIn("slow");
		popupStatus = 1;
	}
}


//使用Jquery去除弹窗效果
function disablePopup(popup){
	popup = "#" + popup;
	//仅在开启标志popupStatus为1的情况下去除
	if(popupStatus==1){
		$(backGroundId).fadeOut("slow");
		$(popup).fadeOut("slow");
		popupStatus = 0;
	}
}

//将弹出窗口定位在屏幕的中央
function centerPopup(popup){
	popup = "#" + popup;
	//获取系统变量
	var windowWidth = document.documentElement.clientWidth;
	var windowHeight = document.documentElement.clientHeight;
	var popupHeight = $(popup).height();
	var popupWidth = $(popup).width();
	//居中设置
	$(popup).css({
	"position": "absolute",
	"top": windowHeight/2-popupHeight/2,
	"left": windowWidth/2-popupWidth/2
	});
	//以下代码仅在IE6下有效

	$(backGroundId).css({
	"height": windowHeight
	});
}

