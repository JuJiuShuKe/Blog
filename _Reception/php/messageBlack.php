<?php
include 'base.php';


$title = $_POST['title'];
$src = $_POST['src'];
$message = $_POST['message'];
$time = $_POST['time'];
$display = $_POST['display'];
$sql = "INSERT INTO lj_message (title,src,message,time,display) VALUES ('$title','$src','$message','$time','$display')";

$res = mysqli_query($conn,$sql);
if($res){
    echo 1;
//        echo '添加成功。';
}else{
    echo 0;
//        echo '添加失败！！！';
}
//mysqli_free_result($res);//释放结果集
mysqli_close($conn);//关闭连接
