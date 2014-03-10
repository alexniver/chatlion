function initColorEgg(){
               

    var storage_url = "http:\/\/chatlion-newbe.stor.sinaapp.com\/";
    var storage_head_url = "http:\/\/chatlion-newbe.stor.sinaapp.com\/head\/";

	var replaceArr = new Array();//初始化需替换消息中的字符串数组

    replaceArr.push(/yangshh大魔王/g);
	replaceArr.push(makeDmw("yangshh"));
	replaceArr.push(/yangshh永垂不朽/g);
	replaceArr.push(makeYcbx("yangshh"));
    replaceArr.push(/yangshhgif/g);
	replaceArr.push("<img src=\"" + storage_head_url  + "y_s_h.gif\"  \/>");

	replaceArr.push(/yangshhhuge/g);
	replaceArr.push("<img src=\"" + storage_head_url  + "y_s_h.jpg\" width=800 height=800 \/>");	
	replaceArr.push(/yangshhbig/g);
	replaceArr.push("<img src=\"" + storage_head_url  + "y_s_h.jpg\" width=200 height=200 \/>");
	replaceArr.push(/yangshh/g);
	replaceArr.push("<img src=\"" + storage_head_url  + "y_s_h.jpg\" width=50 height=50 \/>");
	
	replaceArr.push(/yingkhhuge/g);
	replaceArr.push("<img src=\"" + storage_head_url  + "y_k_h.gif\" width=800 height=800 \/>");	
	replaceArr.push(/yingkhbig/g);
	replaceArr.push("<img src=\"" + storage_head_url  + "y_k_h.gif\" width=200 height=200 \/>");
	replaceArr.push(/yingkh/g);
	replaceArr.push("<img src=\"" + storage_head_url  + "y_k_h.gif\" width=50 height=50 \/>");
	
    replaceArr.push(/（）大魔王/g);
	replaceArr.push(makeDmw("（）"));	
    replaceArr.push(/（）永垂不朽/g);
	replaceArr.push(makeYcbx("（）"));	
	replaceArr.push(/（）huge/g);
	replaceArr.push("<img src=\"" + storage_head_url  + "y_k_h.gif\" width=800 height=800 \/>");	
	replaceArr.push(/（）big/g);
	replaceArr.push("<img src=\"" + storage_head_url  + "y_k_h.gif\" width=200 height=200 \/>");
	replaceArr.push(/（）/g);
	replaceArr.push("<img src=\"" + storage_head_url  + "y_k_h.gif\" width=50 height=50 \/>");

    replaceArr.push(/zhul大魔王/g);
	replaceArr.push(makeDmw("zhul"));	
	replaceArr.push(/zhul永垂不朽/g);
	replaceArr.push(makeYcbx("zhul"));
	replaceArr.push(/zhulinlin永垂不朽/g);
	replaceArr.push(makeYcbx("zhulinlin"));
	replaceArr.push(/zhulgif/g);
	replaceArr.push("<img src=\"" + storage_head_url  + "z_h_u_l.gif\"  \/>");
	replaceArr.push(/zhulinlin/g);
	replaceArr.push("<img src=\"" + storage_head_url  + "z_h_u_l_2.gif\"  \/>");
	replaceArr.push(/朱琳琳/g);
	replaceArr.push("<img src=\"" + storage_head_url  + "z_h_u_l_2.gif\"  \/>");
	replaceArr.push(/zhulhuge/g);
	replaceArr.push("<img src=\"" + storage_head_url  + "z_h_u_l.jpg\" width=800 height=800 \/>");	
	replaceArr.push(/zhulbig/g);
	replaceArr.push("<img src=\"" + storage_head_url  + "z_h_u_l.jpg\" width=200 height=200 \/>");
	replaceArr.push(/zhul/g);
	replaceArr.push("<img src=\"" + storage_head_url  + "z_h_u_l.jpg\" width=50 height=50 \/>");
	
	replaceArr.push(/Alexniverhuge/g);
	replaceArr.push("<img src=\"" + storage_head_url  + "z_h_u_l.jpg\" width=800 height=800 \/>");	
	replaceArr.push(/Alexniverbig/g);
	replaceArr.push("<img src=\"" + storage_head_url  + "z_h_u_l.jpg\" width=200 height=200 \/>");
	replaceArr.push(/Alexniver/g);
	replaceArr.push("<img src=\"" + storage_head_url  + "z_h_u_l.jpg\" width=50 height=50 \/>");
	
	replaceArr.push(/jinnhuge/g);
	replaceArr.push("<img src=\"" + storage_head_url  + "j_i_n_n.jpg\" width=800 height=800 \/>");	
	replaceArr.push(/jinnbig/g);
	replaceArr.push("<img src=\"" + storage_head_url  + "j_i_n_n.jpg\" width=200 height=200 \/>");
	replaceArr.push(/jinn/g);
	replaceArr.push("<img src=\"" + storage_head_url  + "j_i_n_n.jpg\" width=50 height=50 \/>");	
	
	replaceArr.push(/Jinngoohuge/g);
	replaceArr.push("<img src=\"" + storage_head_url  + "j_i_n_n.jpg\" width=800 height=800 \/>");	
	replaceArr.push(/Jinngoobig/g);
	replaceArr.push("<img src=\"" + storage_head_url  + "j_i_n_n.jpg\" width=200 height=200 \/>");
	replaceArr.push(/Jinngoo/g);
	replaceArr.push("<img src=\"" + storage_head_url  + "j_i_n_n.jpg\" width=50 height=50 \/>");
	
	replaceArr.push(/liudwhuge/g);
	replaceArr.push("<img src=\"" + storage_head_url  + "l_d_w.jpg\" width=860 height=800 \/>");	
	replaceArr.push(/liudwbig/g);
	replaceArr.push("<img src=\"" + storage_head_url  + "l_d_w.jpg\" width=260 height=200 \/>");
	replaceArr.push(/liudw/g);
	replaceArr.push("<img src=\"" + storage_head_url  + "l_d_w.jpg\" width=60 height=50 \/>");
	
    replaceArr.push(/dingjsh大魔王/g);
	replaceArr.push(makeDmw("dingjsh"));
    replaceArr.push(/dingjsh/g);
	replaceArr.push("<img src=\"" + storage_head_url  + "d_j_sh.jpg\" width=60 height=50 \/>");
	
    replaceArr.push(/huashd大魔王/g);
	replaceArr.push(makeDmw("huashd"));
    replaceArr.push(/huashd/g);
	replaceArr.push("<img src=\"" + storage_head_url  + "huashd.jpg\" width=60 height=50 \/>");
	replaceArr.push(/huashdhuge/g);
	replaceArr.push("<img src=\"" + storage_head_url  + "huashd.jpg\" width=860 height=800 \/>");	
	replaceArr.push(/huashdbig/g);
	replaceArr.push("<img src=\"" + storage_head_url  + "huashd.jpg\" width=260 height=200 \/>");
              
	replaceArr.push(/chrome/g);
	replaceArr.push("<img src=\"" + storage_url  + "chrome.jpg\" width=24 height=24 \/>");

	replaceArr.push(/google/g);
	replaceArr.push("<img src=\"" + storage_url  + "g_o_o_g_l_e.png\" width=138 height=55 \/>");
	replaceArr.push(/谷歌/g);
	replaceArr.push("<img src=\"" + storage_url  + "g_o_o_g_l_e.png\" width=138 height=55 \/>");
	
	replaceArr.push(/CHATLION/g);
	replaceArr.push("<img src=\"" + storage_url  + "c_h_a_t_l_i_o_n.png\"  \/>");	
	
	replaceArr.push(/肉山大魔王/g);
	replaceArr.push("<img src=\"" + storage_head_url  + "roushandamowang.png\" \/>");
	
	replaceArr.push(/大粑粑/g);
	replaceArr.push("<img src=\"" + storage_url  + "baba.gif\" width=48 height=48 \/>");
	replaceArr.push(/粑粑/g);
	replaceArr.push("<img src=\"" + storage_url  + "baba.gif\" \/>");


	return replaceArr;
}

function makeDmw(name){
    var dmw_head = "|_（";
    var dmw_foot = "）_|<br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; [&nbsp;&nbsp;&nbsp;]<br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; [&nbsp;&nbsp;&nbsp;]<br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; [&nbsp;&nbsp;&nbsp;]<br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;\/&nbsp;&nbsp;&nbsp;&nbsp;\\";
    return dmw_head + name + dmw_foot;
}

function makeYcbx(name){
    var ycbx_head = "❀❀";
    var ycbx_foot = "❀❀<br/>❀❀❀❀❀❀❀";
    return ycbx_head + name + ycbx_foot;
}