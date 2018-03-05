var tbodyHtml ;
tbodyHtml = '<header><nav class="navbar navbar-default navbar-fixed-top"><div class="container-fluid"><div class="navbar-header"><button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false"> <span class="sr-only">切换导航</span> <span class="icon-bar"></span> <span class="icon-bar"></span> <span class="icon-bar"></span> </button> <a class="navbar-brand" href="../_Reception/index.html">JjskCMS</a> </div>    <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">    <ul class="nav navbar-nav navbar-right">    <li class="dropdown"> <a class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false"></a></li> <li><a href="JavaScript:;" id="logoutLogin">退出登录</a></li>    </ul>    </div>    </div>    </nav></header>';
$('.container-fluid').prepend(tbodyHtml);

var leftHtml ;
leftHtml ='<aside class="col-sm-3 col-md-2 col-lg-2 sidebar">    <ul class="nav nav-sidebar">    <li><a href="listArticle.html">文111章</a></li>    <li><a href="label.html">标签</a></li>    <li><a href="message.html">留言</a></li>    </ul>    </aside>';

$('.row').append(leftHtml);