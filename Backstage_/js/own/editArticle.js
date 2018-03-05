
$('.dropdown-toggle').text($.cookie("userName2") );
//显示数据
if( GetQueryString('id') && parseInt(GetQueryString('id'))) {
    var dataId = GetQueryString('id');
    $.ajax({
        url: 'php/article_modify.php',
        type:'post',
        data:{id:dataId
        },
        success:function(data) {
            var res = eval(data);
            $('#time').val(res[0].time);
            $('#article-title').val(res[0].title);
            $(function(){
                var content =$('#daily_content').val();
                //判断ueditor 编辑器是否创建成功
                editor.addListener("ready", function () {
                    // editor准备好之后才可以使用
                    editor.setContent(res[0].body);
                });
            });
            setTimeout(function(){$('#addlable')[0].value = res[0].label;},2);

            $('#pictureUpload').val(res[0].src);
            $("textarea[name='describe']").val(res[0].abstract);

            parseInt(res[0].display) ? $('.isblock1').attr("checked","checked") : $('.isblock11').attr("checked","checked") ;
            parseInt(res[0].recommend) ? $('.isblock2').attr("checked","checked") : $('.isblock22').attr("checked","checked") ;
        },
        error:function(err) {
            console.log('err');
        }
    });
}
else {
    window.location.href = 'listArticle.html';
}

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

    var author=  $('.dropdown-toggle').text();                                 //作者
    var title= removeHtmlTab($('#article-title').val());                       //标题
    var body=editor.getContent();                                               //正文
    var label=removeHtmlTab($('#addlable').val());                             //标签
    var src=removeHtmlTab($('#pictureUpload').val());                         //图片地址
    var time=removeHtmlTab($('#time').val());                                  //发布时间
    var abstract=  removeHtmlTab($("textarea[name='describe']").val());      //摘要


    if (author&&title&&body&&label&&src&&time&&abstract&&display&&recommend) {
        $.ajax({
            url: 'php/article_modify2.php',
            type:'post',
            data:{id:GetQueryString('id'),author:author,title:title,body:body,label:label,src:src,time:time,abstract:abstract,display:display,recommend:recommend
            },
            success:function(data) {
                if(data==1) {
                    layer.msg('修改成功！', {icon: 6});
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
//删除所有HTML标签
function removeHtmlTab(tab) {
    return tab.replace(/<[^<>]+?>/g,'');
}
//获取url参数
function GetQueryString(name) {
    var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if(r!=null) return  decodeURI (r[2]) ;
    return null;
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
