//添加留言
$(".fabu").on("click",function() {
    var title =$('#userName').val() ;
    var src = $('#people_img').attr('src') ;
    var message = $('#textArea').val() ;
    if(title&&src&&message){
        title = removeHtmlTab( $('#userName').val() );
        src = removeHtmlTab( $('#people_img').attr('src') );
        message = removeHtmlTab( $('#textArea').val() );
        $.ajax({
            url: 'php/messageBlack.php',
            type:'post',
            data:{title:title,src:src,message:message,time:new Date().toLocaleDateString(),display:1},
            success:function(data) {
                if(data==1){
                    displayMessage(1);
                    layer.msg('添加成功' , { icon: 6 });
                    $('#userName').val('') ;
                    $('#textArea').val('') ;
                }else{
                    layer.msg('添加失败！！！' , { icon: 5 });
                }
            },
            error:function(err) {
                console.log('err');
            }
        });

    }else {
        layer.msg('输入不能为空!' , { icon: 5 });
    }
});

var number = 7;                    //每页显示数目

page();            //总页数 翻页



//总页数
function page(){
    $.ajax({
        url: 'php/listMessage2.php',
        type:'post',
        data:{number:number},
        success:function(data) {
            $('#box').paging({
                initPageNo: 1, // 初始页码
                totalPages: data, //总页数
                slideSpeed: 500, // 缓动速度。单位毫秒
                jump: false, //是否支持跳转
                callback: function(page) { // 回调函数
                    $('#btnMessage').html('');
                    $('body,html').animate({scrollTop:0},0);    //页面置顶
                    displayMessage(page);
                }
            })
        },
        error:function(err) {
            console.log('err');
        }
    });
}


/**
 *                  显示文章内容
 * @param num       当前页数
 */
function displayMessage(num){
    var numm;
    num ? numm = num : numm = 1;
    $.ajax({
        url: 'php/listMessage.php',
        type:'post',
        data:{num:numm,number:number},
        success:function(data) {
            var tbodyHtml = '';
            if(num)$('#btnMessage').html(tbodyHtml);
            var res = eval(data);
            for (var i = 0; i < res.length; i++) {
                var itemData = res[i];
                tbodyHtml += '<div class="min_box">';
                tbodyHtml += '<img src=' + itemData.src	 + ' alt="" ondragstart="return false">';
                tbodyHtml += '<div>';
                tbodyHtml += '<h6>' + itemData.title	 + ' <span>' + itemData.time	 + '</span></h6>';
                tbodyHtml += '<p>' + itemData.message	 + '</p>';
                tbodyHtml += '</div>';
                tbodyHtml += '</div>';
            }
            $('#btnMessage').append(tbodyHtml);
        },
        error:function(err) {
            console.log('err');
        }
    });
}

function removeHtmlTab(tab) {
    return tab.replace(/<[^<>]+?>/g,'');//删除所有HTML标签
}