/*进行在线的成绩测评*/
$(function () {
    //当点击提交按钮后，对用户提交答案进行检查，返回得分
    $('#btn_Score').click(function () {
        var score1,score2,score3,score4;
        if($('#id_js').prop('checked')&&$('#id_php').prop('checked')&&$('#id_python').prop('checked')){
            score1=25;
        }
        else{
            score1 = 0;
        }
        if($('#id_email').prop('checked')&&$('#id_reg').prop('checked')){
            score2=25;
        }
        else{
            score2 = 0;
        }
        if($('#id_getval1').prop('checked')){
            score3=25;
        }
        else{
            score3 = 0;
        }
        if($('#id_getval3').prop('checked')){
            score4=25;
        }
        else{
            score4 = 0;
        }
        var all = score1+score2+score3+score4;
        //把用户得分情况输出到bootstrap模态框里
        $('#score_info').html("<table><h4>用户得分情况</h4><tr><td>总分：</td><td>"+all+
                    "</td></tr><tr><td>第一题：</td><td>"+ score1+"</td></tr><tr><td>第二题：</td><td>"+
                    score2+ "</td></tr><tr><td>第三题:</td><td>"+ score3+
                    "</td></tr><tr><td>第四题：</td><td>" +score4+"</td></tr></table>");
        $('#showScoreDlg').modal();
    });
})
