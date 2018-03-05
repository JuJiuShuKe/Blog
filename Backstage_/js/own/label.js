
$('.dropdown-toggle').text($.cookie("userName2") );
displayLable();     /* 显示标签*/

/**
 * @param num   若有则重新显示标签一次
 */
function displayLable(num) {
    $.ajax({
        url: 'php/lable_block.php',
        type:'post',
        data:{data:0
        },
        success:function(data) {
            var tbodyHtml = '';
            if(num)$('#my_tbody').html(tbodyHtml);
            var res = eval(data);
//                console.log(res);
            for (var i = 0; i < res.length; i++) {
                var itemData = res[i];
                tbodyHtml += '<tr>';
                tbodyHtml += ' <td><input type="checkbox" id="my_lable'+ i +'" class="input-control" name="checkbox[]" value="" /><label for="my_lable'+ i +'" >'+ itemData.id +'</label></td>';
                tbodyHtml += ' <td class="article-title">' + itemData.lable + '</td>';
                tbodyHtml += ' <td><a href="JavaScript:;" class="modify">修改</a> <a href="JavaScript:;" class="deleteLable">删除</a></td>';
                tbodyHtml += '</tr>';
            }
            $('#my_tbody').append(tbodyHtml);
        },
        error:function(err) {
            console.log('err');
        }
    });
}


//  添加标签
$('#mybtn').on('click',function() {
    var lable= $('#addlable').val();
    if (lable) {
        $.ajax({
            url: 'php/lable_add.php',
            type:'post',
            data:{lable:removeHtmlTab(lable)
            },
            success:function(data) {
                switch (data) {
                    case '-1': layer.msg('标签已存在,请勿重复添加。' , {icon: 5
                    });

                        break;
                    case '1':layer.msg('添加成功。' , {
                        icon: 6
                    });

                        displayLable(1);
                        break;
                    default:layer.msg('添加失败！！！' , {
                        icon: 5
                    });

                        break;
                }
            },
            error:function(err) {
                console.log('err');
            }
        })
    }

    else {
        layer.msg('输入不能为空', {icon: 0
        });
    }
});


//  删除标签
$("#my_tbody").on("click",'.deleteLable',function() {
//                    $(this).parents('tr').remove();
    var lableID = $(this).parents('tr').find('label').text();
    $.ajax({
        url: 'php/lable_delete.php',
        type:'post',
        data:{lableID:lableID,val:$(this).parents('tr').find('.article-title').text()
        },
        success:function(data) {
            parseInt(data) ? layer.msg('删除成功。', {icon: 6
            }): layer.msg('该标签正在使用，删除失败。' , {
                icon: 5
            });

            displayLable(1);
        },
        error:function(err) {
            console.log('err');
        }
    })
});


//  编辑标签
$("#my_tbody").on("click",'.modify',function() {
    var lableID = $(this).parents('tr').find('label').text();
    layer.prompt({
        title: '修改为',
        value:  $(this).parents('tr').find('.article-title').text()
    },function(value, index, elem) {
        layer.close(index);
        var modifyVal = value ;
        $.ajax({
            url: 'php/lable_modify.php',
            type:'post',
            data:{modifyVal:modifyVal,lableID:lableID},
            success:function(data) {
                parseInt(data) ? layer.msg('修改成功', {
                    icon: 6
                }) : layer.msg('已有此标签，修改失败。', {
                    icon: 5
                });

                displayLable(1);
            },
            error:function(err) {
                console.log('err');
            }
        })

    });
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
