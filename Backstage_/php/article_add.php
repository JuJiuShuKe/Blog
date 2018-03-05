<?php

include 'base.php';


$author= $_POST['author'];
$title= $_POST['title'];
$body= $_POST['body'];
$label= $_POST['label'];
$src=  $_POST['src'];
$time= $_POST['time'];
$abstract= $_POST['abstract'];
$display= $_POST['display'];
$recommend= $_POST['recommend'];


$sql2 = "SELECT title FROM lj_article ";
$res2 = mysqli_query($conn,$sql2);

$flage = 1;
if($res2){
	while ( $data = mysqli_fetch_array($res2) ) {
		if( "$title" == $data['title'] ){
		    $flage=0;
		}
	}
}

if($flage == 1){
    $sql = "INSERT INTO `lj_blog`.`lj_article` ( `author`, `title`, `body`, `label`, `src`, `time`, `abstract`, `display`, `recommend`) VALUES ( '$author', '$title', '$body', '$label', '$src', '$time', '$abstract', '$display', '$recommend')";
    $res = mysqli_query($conn,$sql);
    if($res){//若为真，则SQL语句正确
        echo 1 ;
    }else{
        echo -1;
    }
}else{
    echo -2 ;
}


//mysqli_free_result($res);//释放结果集
mysqli_close($conn);//关闭连接

