$('.siteIcon img').click(function() {
    window.location.reload();
});
$("#change").on("click",function() {
    $("#imgId").attr('src','php/login_img.php?random=' + Math.random());
});

var flage = 1,rememberPassword = 0,automaticLogon = 0;
$('#signinSubmit').click(function() {
    if ($('#userName').val() == '' || $('#userPwd').val() == '') {
        layer.msg('输入不能为空');
    }
    else {
        if ($('#rememberPassword').is(':checked')) {
            rememberPassword = 1 ;
//                console.log('自动登录');
        }
        $.ajax( {
            url: 'php/login.php',
            type: 'post',
            data: {userName:$('#userName').val(),pwd: $('#userPwd').val(), val: $("input[name='lval']").val(), flage: flage,rememberPassword:rememberPassword},
            success: function (data) {
                if (data == -1 || data == -3) {
                    flage = 0;
                    $(".yzm_p").css("display", "block");
                    layer.msg('用户名或密码输入有误！！！');
                }
                else if (data == -2) {
                    layer.msg('验证码输入有误！');
                }
                else {
                    window.location.href = 'listArticle.html';
                }
            },
            error: function (err) {
                console.log('err');
            }
        })
    }
});