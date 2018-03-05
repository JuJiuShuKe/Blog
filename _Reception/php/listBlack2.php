<?php
include 'base.php';

$number = $_POST['number'];

$sql2 = "SELECT COUNT(*)  FROM lj_article WHERE display=1";
$res2 = mysqli_query($conn,$sql2);
if($data2 = mysqli_fetch_array($res2)){
    $page = $data2[0];
}

$numPage = ceil($page/$number);
echo $numPage;


//mysqli_free_result($res);//释放结果集
mysqli_close($conn);//关闭连接
