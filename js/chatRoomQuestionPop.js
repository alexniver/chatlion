//��ʼ�����Ƿ���DIV�������ڹ���

//0 ��ʾ����; 1 ��ʾ������;
var popupStatus = 0;

//��������id
var backGroundId = "#backgroundPopup";

//ʹ��Jquery���ص���
function loadPopup(popup){
	popup = "#" + popup;
	//���ڿ�����־popupStatusΪ0������¼���
	if(popupStatus==0){
		$(backGroundId).css({
		"opacity": "0.7"
		});
		$(backGroundId).fadeIn("slow");
		$(popup).fadeIn("slow");
		popupStatus = 1;
	}
}


//ʹ��Jqueryȥ������Ч��
function disablePopup(popup){
	popup = "#" + popup;
	//���ڿ�����־popupStatusΪ1�������ȥ��
	if(popupStatus==1){
		$(backGroundId).fadeOut("slow");
		$(popup).fadeOut("slow");
		popupStatus = 0;
	}
}

//���������ڶ�λ����Ļ������
function centerPopup(popup){
	popup = "#" + popup;
	//��ȡϵͳ����
	var windowWidth = document.documentElement.clientWidth;
	var windowHeight = document.documentElement.clientHeight;
	var popupHeight = $(popup).height();
	var popupWidth = $(popup).width();
	//��������
	$(popup).css({
	"position": "absolute",
	"top": windowHeight/2-popupHeight/2,
	"left": windowWidth/2-popupWidth/2
	});
	//���´������IE6����Ч

	$(backGroundId).css({
	"height": windowHeight
	});
}

