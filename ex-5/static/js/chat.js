//获得发言人姓名，保证姓名不空
$(function () {
    $('#btn_NameConfirm').click(function () {   //点击开始聊天时需要输入有效的聊天人的姓名才可以开始
        var name = $('#sendName').val();
        if(name!=""){
            $('#nameModal').modal('hide');
            $('#startName').html("<h4>欢迎"+name+"光临聊天室，现在你可以开始聊天了！</h4>")
            get_chat_info();
        }
        else{
            alert("姓名为空！");
        }
    });
})

//将聊天信息存到服务器端的数据库，下次还能查看
function SendMes() {
      var name = $('#sendName').val();
      var content = $('#chat_info').val();
      if(name!=""){
          if(content!=""){
              $.ajax({
                url: '/add_chat_info',
                data: {
                    Name:name,
                    Content:content
                },
                type: 'POST',
                success: function (res) {
                    var chatObj = JSON.parse(res); //添加入无序列表
                    $('#list_chat').empty();
                    $('#list_chat_Temp').tmpl(chatObj).appendTo('#list_chat');
                },
                error: function (error) {
                    console.log(error);
                }
            });
          }
          else{
              alert("输入内容为空！");
          }
      }
      else{
          alert("请点击开始聊天按钮并输入姓名！");
      }
}

//获得聊天室中当前所有的聊天记录
function get_chat_info() {
    $.ajax({
        url: '/get_chat_info',
        type: 'GET',
        success: function (res) {
            var chatObj = JSON.parse(res); //添加入无序列表
            $('#list_chat').empty();
            $('#list_chat_Temp').tmpl(chatObj).appendTo('#list_chat');
        },
        error: function (error) {
            console.log(error);
        }
    });
}