
    //显示推荐文章
$.ajax({
    url: 'php/indexBlack.php',
    type:'post',
    data:{data:0},
    success:function(data) {
        var tbodyHtml = '';
        var res = eval(data);
        for (var i = 0; i < res.length; i++) {
            var itemData = res[i];
            tbodyHtml += '<div class="blogs" articleid="'+ itemData.id +'">';
            tbodyHtml += '    <h3><a href="JavaScript:;"    class="yueduquanwen">'+ itemData.title +'</a></h3>';
            tbodyHtml += '    <figure><img src='+ itemData.src +'></figure>';
            tbodyHtml += '    <ul>';
            tbodyHtml += '        <p>'+ itemData.abstract +'</p>';
            tbodyHtml += '        <a href="JavaScript:;" target="_blank" class="readmore yueduquanwen">阅读全文&gt;&gt;</a>';
            tbodyHtml += '    </ul>';
            tbodyHtml += '    <p class="autor"><span>作者：'+ itemData.author +'</span><span>分类：【<a href="/">'+ itemData.label +'</a>】</span><span>浏览（'+ itemData.num +'）</span></p>';
            tbodyHtml += '    <div class="dateview">'+ itemData.time +'</div>';
            tbodyHtml += '</div>';
        }

        $('.bloglist').append(tbodyHtml);
    },
    error:function(err) {
        console.log('err');
    }
});



indexAside(0,'.tj_t1_article');     //最新文章
indexAside(1,'.tj_t2_article');     //推荐文章

//阅读全文
$('.bloglist').on('click','.yueduquanwen',function(){
    fulltex($(this).parents('.blogs').attr('articleid'))
});

//跳转至点击文章页面
function fulltex(id) {
    window.location.href = "fullText.html?id=" + id + "";
}


function indexAside(num,cla){
    $.ajax({
        url:  'php/indexAside.php',
        type:'post',
        data:{data:num},
        success:function(data) {
            var tbodyHtml = '';
            var res = eval(data);
            for (var i = 0; i < res.length; i++) {
                var itemData = res[i];
                tbodyHtml += '<li><a href="JavaScript:;" class="article'+ i +'" onclick="fulltex('+itemData.id+')">'+ itemData.title +'</a></li>';

            }
            $(cla).append(tbodyHtml);
        },
        error:function(err) {
            console.log('err');
        }
    });
}
