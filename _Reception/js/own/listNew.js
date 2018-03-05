indexAside(2,'.ph_n');     //文章排行
indexAside(1,'.tj_t2_article');     //推荐文章


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
                if(num == 2){
                    if(i<3){
                        tbodyHtml += '<li><span class="num'+ (i+1) +'">'+ (i+1) +'</span><a href="JavaScript:;" class="article'+ i +'" onclick="fulltex('+itemData.id+')">'+ itemData.title +'</a></li>';
                    }else {
                        tbodyHtml += '<li><span>'+ (i+1)+'</span><a href="JavaScript:;" class="article'+ i +'" onclick="fulltex('+itemData.id+')">'+ itemData.title +'</a></li>';
                    }
                }else {
                    tbodyHtml += '<li><a href="JavaScript:;" class="article'+ i +'" onclick="fulltex('+itemData.id+')">'+ itemData.title +'</a></li>';
                }

            }
            $(cla).append(tbodyHtml);
        },
        error:function(err) {
            console.log('err');
        }
    });
}
