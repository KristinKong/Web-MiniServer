/*注册页面*/
$(function () {
    var name = $('#u_name').val();
    if(name!="")
        checkCookie(name);
    $('#btn_sign').click(function () {
        var ac = $('#u_account').val();
        var ps = $('#u_password').val();
        var req1 = new RegExp(/^(user[0-9]{5})$/); //检测用户名的正则表达式
        var req2 = new RegExp(/^[0-9]*[a-zA-Z]+[0-9]+[A-Za-z]*$/); //检测登录密码的正则表达式
        if(req1.test(ac)){
            if(ps.length>=6&&req2.test(ps)){
                $('#sign_info').html("<table><h4>用户注册页面</h4><tr><td>用户名：</td><td>"+
                   ac+"</td></tr><tr><td>用户姓名：</td><td>"+name+ "</td></tr><tr><td>密码:</td><td>"+
                    ps+"</td></tr><tr><td>出生日期：</td><td>" +$("#u_date").val()+
                    "</td></tr><tr><td>电话：</td><td>"+$('#u_tel').val()+
                    "</td></tr><tr><td>email:</td><td>"+$('#u_email').val()+"</td></tr></table>"
                );
                $('#showSignDlg').modal();
                 setCookie(name,0,3);     //第一次输入信息需要设置cookie,3天有效
            }
            else{
                alert('密码强度不够！');
            }
        }
        else{
            alert('用户名错误！');
        }
    });
});


// 设置cookies,用户姓名+时间的键值对
function setCookie(u_name,u_time, exdays)
{
    var exdate = new Date();
    exdate.setTime(exdate.getTime()+(exdays*24*60*60*1000));
    var expires = "expires=" + exdate.toTimeString();
    document.cookie = u_name + "="+ u_time+ ";" + expires;
}

//获得cookie
function getCookie(u_name){
	var name = u_name + "=";
	var ca = document.cookie.split(';');
	for(var i=0; i<ca.length; i++) {
		var c = ca[i].trim();    // 去除两端空白字符，返回name最先出现的位置
		if (c.indexOf(name)==0)  //找到用户名出现的下标，加入返回数组
		    return c.substring(name.length,c.length);
	}
	return -1;
}

//检查cookie
function checkCookie(name){
	var count = parseInt(getCookie(name));
	if (count!=-1){
	    setCookie(name, count+1);
		alert(name+",欢迎您第"+(count+1)+"次访问本站！");
	}
}