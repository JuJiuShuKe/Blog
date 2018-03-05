var number = 7;                    //每页显示数目

page();            //总页数 翻页

//总页数
function page(){
    $.ajax({
        url: 'php/listBlack2.php',
        type:'post',
        data:{number:number},
        success:function(data) {
            $('#box').paging({
                initPageNo: 1, // 初始页码
                totalPages: data, //总页数
                slideSpeed: 500, // 缓动速度。单位毫秒
                jump: false, //是否支持跳转
                callback: function(page) { // 回调函数
                    $('.bloglist').html('');
                    $('body,html').animate({scrollTop:0},0);    //页面置顶
                    pageClike(page);
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
function pageClike(num){
    var numm;
    num ? numm = num : numm = 1;
    $.ajax({
        url: 'php/listBlack.php',
        type:'post',
        data:{data:numm,number:number},
        success:function(data) {
            var tbodyHtml = '';
            var res = eval(data);
            for (var i = 0; i < res.length; i++) {
                var itemData = res[i];
                tbodyHtml += '<div class="newblog" >';
                tbodyHtml += '    <ul>';
                tbodyHtml += '        <h3><a  href="fullText.html?id='+ itemData.id +'"  class="readmore">'+ itemData.title +'</a></h3>';
                tbodyHtml += '       <div class="autor"><span>作者：'+ itemData.author +'</span><span>分类：[<a href="///">'+ itemData.label +'</a>]</span><span>浏览（'+itemData.num+'）</span></div>';
                tbodyHtml += '       <p>'+ itemData.abstract +'<a  href="fullText.html?id='+ itemData.id +'"  class="readmore">全文</a></p>';
                tbodyHtml += '   </ul>';
                tbodyHtml += '    <figure><img src="'+ itemData.src +'" ></figure>';
                tbodyHtml += '    <div class="dateview">'+ itemData.time +'</div>';
                tbodyHtml += '</div>';
            }
            $('.bloglist').append(tbodyHtml);
        },
        error:function(err) {
            console.log('err');
        }
    })
}