//判断url中id是否存在
$.ajax({
        url: 'php/fullText.php',
        type:'post',
        data:{data:2},
        success:function(data) {
            var res = eval(data);
            var flage = false ;
            for(var j = 0 ; j < res.length ; j ++){
                if (res[j] == GetQueryString('id')){
                    flage = true;
                }
            }
            if (GetQueryString('id') && parseInt(GetQueryString('id')) && flage){
                isUrl();
                //console.log(flage)
            }else {
                window.location.href = 'newlist.html';
            }
        },
        error:function(err) {
            console.log('err');
        }
    });

//判断url
function isUrl() {
    var dataId = GetQueryString('id');
    $.ajax({
        url: 'php/fullText.php',
        type: 'post',
        data: {data: 0, id: dataId},
        success: function (data) {
            var res = JSON.parse(data);

            var next_article = res.next_article;
            var upper_article = res.upper_article;
            next_article ? next_article = res.next_article : next_article = '返回列表';
            upper_article ? upper_article = res.upper_article : upper_article = '返回列表';

            $('.next_article2').text(next_article);          //下一篇
            $('.upper_article2').text(upper_article);            //上一篇

            $('.next_article2').on('click', function () {
                if ($('.next_article2').text() == '返回列表') {
                    window.location.href = "newlist.html";
                } else {
                    window.location.href = "fullText.html?id=" + res.next_id + "";
                }
            });

            $('.upper_article2').on('click', function () {
                if ($('.upper_article2').text() == '返回列表') {
                    window.location.href = "newlist.html";
                } else {
                    window.location.href = "fullText.html?id=" + res.upper_id + "";
                }
            })


        },
        error: function (err) {
            console.log('err');
        }
    });
    $.ajax({
        url: 'php/fullText.php',
        type: 'post',
        data: {data: 1, id: dataId},
        success: function (data) {
            var res = eval(data);
            $('.articleBody').text(res[0].title);
            $('.c_titile').text(res[0].title);
            $('.d_time').text('发布时间：' + res[0].time);
            $('.d_author').text('编辑：' + res[0].author);
            $('.d_num').text('浏览（' + res[0].num + '）');
            $('.keybqP').text('：' + res[0].label);
            $('.infos').html(res[0].body);
        },
        error: function (err) {
            console.log('err');
        }
    });
}




//获取url参数
function GetQueryString(name) {
    var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if(r!=null) return  decodeURI (r[2]) ;
    return null;
}

