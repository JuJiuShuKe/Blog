
$('.dropdown-toggle').text($.cookie("userName2") );
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

displayLable();     /* 显示文章*/

/**
 * @param num   若有则重新显示文章一次
 */
function displayLable(num) {
    $.ajax({
        url: 'php/article_block.php',
        type:'post',
        data:{data:0
        },
        success:function(data) {
            var tbodyHtml = '';
            if(num)$('#my_tbody').html(tbodyHtml);
            var res = eval(data);
            for (var i = 0; i < res.length; i++) {
                var itemData = res[i];
                tbodyHtml += '<tr>';
                tbodyHtml += '<td class="hidden-sm"><input type="checkbox" id="my_lable' + i + '" class="input-control" name="checkbox[]" value="" /><label for="my_lable' + i + '" >' + itemData.id + '</label></td>';
                tbodyHtml += '<td class="hidden-sm">' + itemData.author + '</td>';
                tbodyHtml += '<td class="hidden-sm">' + itemData.title	 + '</td>';
                tbodyHtml += '<td class="hidden-sm">' + itemData.abstract	 + '</td>';
                tbodyHtml += '<td class="hidden-sm">' + itemData.label  + '</td>';
                tbodyHtml += '<td class="hidden-sm">' + itemData.src	 + '</td>';
                tbodyHtml += '<td class="hidden-sm">' + itemData.time	 + '</td>';
                tbodyHtml += '<td class="hidden-sm">' + itemData.num	 + '</td>';
                parseInt(itemData.display) ? tbodyHtml += ' <td class="hidden-sm isArticle1"><input type="radio" name="article_isdis' + i + '" value="1" checked="">是 <input type="radio" name="article_isdis' + i + '" value="0">否</td>': tbodyHtml += ' <td  class="hidden-sm isArticle1"><input type="radio" name="article_isdis' + i + '" value="1" >是 <input type="radio" name="article_isdis' + i + '" value="0"  checked="">否</td>';
                parseInt(itemData.recommend) ? tbodyHtml += ' <td class="hidden-sm isArticle2"><input type="radio" name="article_isrecom' + i + '" value="1" checked="">是 <input type="radio" name="article_isrecom' + i + '" value="0">否</td>': tbodyHtml += ' <td  class="hidden-sm isArticle2"><input type="radio" name="article_isrecom' + i + '" value="1" >是 <input type="radio" name="article_isrecom' + i + '" value="0"  checked="">否</td>';
                tbodyHtml += '<td class="hidden-sm"><a class="modify" href="editArticle.html?id='+ itemData.id +'">修改</a></td>';
                tbodyHtml += '</tr>';
            }
            $('#my_tbody').append(tbodyHtml);
        },
        error:function(err) {
            console.log('err');
        }
    });
}

$("#my_tbody").on("click",'.isArticle1',function() {
    isDisplayReommend('isDisplay',$(this) );       //是否显示
});
$("#my_tbody").on("click",'.isArticle2',function() {
    isDisplayReommend('isRecommend',$(this) );       //是否推荐
});


//是否显示,是否推荐
function isDisplayReommend(isDisplay,obj) {
    var thisurl = isDisplay ;
    isDisplay = obj.find('input');
    var id = obj.parents('tr').find('label').text();
    for(var i = 0;i < isDisplay .length; i++) {
        if (obj.find('input')[i].checked == true) {
            var btnVal= obj.find('input')[i].value;
            $.ajax({
                url: 'php/article_' + thisurl +'.php',
                type:'post',
                data:{data:btnVal,id:id
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
}


