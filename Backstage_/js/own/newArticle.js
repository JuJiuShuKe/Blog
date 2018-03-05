
$('.dropdown-toggle').text($.cookie("userName2") );
$('#time').val(new Date().toLocaleDateString());

//    获取标签
$.ajax({
    url: 'php/lable_block.php',
    type:'post',
    data:{data:0},
    success:function(data) {
        var tbodyHtml = '';
        var res = eval(data);
        for (var i = 0; i < res.length; i++) {
            var itemData = res[i];
            tbodyHtml += '<option value ="'+ itemData.lable +'">'+ itemData.lable +'</option>';
        }
        $('#addlable').append(tbodyHtml);
    },
    error:function(err) {
        console.log('err');
    }
});

//添加文章
$('#mybtn').on('click',function() {
    var visibility = $("input[name='visibility']");
    for(var i = 0;i < visibility .length; i++) {
        if ($("input[name='visibility']")[i].checked == true) {
            var display = $("input[name='visibility']")[i].value;
        }
    }

    var tuijian = $("input[name='tuijian']");
    for(i = 0;i < tuijian .length; i++) {
        if ($("input[name='tuijian']")[i].checked == true) {
            var recommend= $("input[name='tuijian']")[i].value;
        }
    }

    var author=  $('.dropdown-toggle').text();               //作者
    var title= removeHtmlTab($('#article-title').val());                    //标题
    var body=editor.getContent();                               //正文
    var label=removeHtmlTab($('#addlable').val());                             //标签
    var src=removeHtmlTab($('#pictureUpload').val());                          //图片地址
    var time=removeHtmlTab($('#time').val());                                      //发布时间
    var abstract=  removeHtmlTab($("textarea[name='describe']").val());            //摘要


    if (author&&title&&body&&label&&src&&time&&abstract&&display&&recommend) {
        $.ajax({
            url: 'php/article_add.php',
            type:'post',
            data:{author:author,title:title,body:body,label:label,src:src,time:time,abstract:abstract,display:display,recommend:recommend
            },
            success:function(data) {
                if(data==1){layer.msg('添加成功！', {icon: 6});
                    setTimeout(function() {
                        window.location.href = 'listArticle.html'
                    },500);
                }

                else if(data==-1)layer.msg('添加失败！', {
                    icon: 5
                });

                else if (data==-2)layer.msg('已有该文章名，请勿重复添加！！', {
                    icon: 5
                });
            },
            error:function(err) {
                console.log('err');
            }
        })
    }

    else {
        layer.msg('输入不能为空！', {icon: 0
        });
    }
});

function removeHtmlTab(tab) {
    return tab.replace(/<[^<>]+?>/g,'');//删除所有HTML标签
}

//退出登录
$("#logoutLogin").on("click",function() {
    layer.msg('确定退出吗？', {
        time: 3000 //3s后自动关闭
        , icon: 3
        , btn: ['确认', '取消']
        , yes: function (index) {
            layer.close(index);
            $.ajax({
                url: 'php/logoutLogin.php',
                type:'get',
                data:{data:0
                },
                success:function(data) {
//                        console.log('data');
                    window.location.href = 'login.html';
                },
                error:function(err) {
                    console.log('err');
                }
            })
        }
    });
});
