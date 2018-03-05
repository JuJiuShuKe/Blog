
$('.dropdown-toggle').text($.cookie("userName2") );
displaymessage();     /* 显示留言*/
//显示留言
function displaymessage(num) {
    $.ajax({
        url: 'php/message_display.php',
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
                tbodyHtml += ' <td><input type="checkbox" id="my_message' + i + '" class="input-control" name="checkbox[]" value="" /><label for="my_message' + i + '" >' + itemData.id + '</label></td>';
                tbodyHtml += ' <td class="article-title">' + itemData.title + '</td>';
                tbodyHtml += ' <td><img src="'+ itemData.src +'" style="width: 70px; height: 70px;" ></td>';
                tbodyHtml += ' <td>' + itemData.message + '</td>';
                tbodyHtml += ' <td>' + itemData.time + '</td>';
                parseInt(itemData.display) ? tbodyHtml += ' <td class="display_td"><input type="radio" name="message' + i + '" value="1" checked="">是 <input type="radio" name="message' + i + '" value="0">否</td>': tbodyHtml += ' <td  class="display_td"><input type="radio" name="message' + i + '" value="1" >是 <input type="radio" name="message' + i + '" value="0"  checked="">否</td>';
                tbodyHtml += ' <td><a rel="JavaScript:;" class="deleteMessage">删除</a></td> ';
                tbodyHtml += '</tr>';
            }
            $('#my_tbody').append(tbodyHtml);
        },
        error:function(err) {
            console.log('err');
        }
    });
}

//  删除标签
$("#my_tbody").on("click",'.deleteMessage',function() {
//                    $(this).parents('tr').remove();
    var messageID = $(this).parents('tr').find('label').text();
    $.ajax({
        url: 'php/message_delete.php',
        type:'post',
        data:{messageID:messageID
        },
        success:function(data) {
            layer.msg(data , {icon: 6
            });//删除成功
            displaymessage(1);
        },
        error:function(err) {
            console.log('err');
        }
    })
});

//编辑是否显示
$("#my_tbody").on("click",'.display_td',function() {
    var tuijian = $(this).find('input');
    var id = $(this).parents('tr').find('label').text();
    for(var i = 0;i < tuijian .length; i++) {
        if ($(this).find('input')[i].checked == true) {
            var display_message= $(this).find('input')[i].value;
            $.ajax({
                url: 'php/message_hidden.php',
                type:'post',
                data:{data:display_message,id:id
                },
                success:function(data) {
                    layer.msg(data , {icon: 6
                    });//修改成功
                },
                error:function(err) {
                    console.log('err');
                }
            })
        }
    }
});
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
