<?php
include 'base.php';


$flage = 0;
$lable= $_POST['lable'];

$sql2 = "SELECT id, lable FROM lj_lable";
$res2 = mysqli_query($conn,$sql2);
if($res2){
 	while ( $data = mysqli_fetch_array($res2 , MYSQLI_ASSOC) ) {
 		if($lable == $data['lable']){
 		    $flage = -1;
 		}
 	}
 }

$sql = "INSERT INTO lj_lable (lable) VALUES ('$lable')";



if($flage == -1){
    echo -1;
//    echo '标签已存在,请勿重复添加。';
}else{
    $res = mysqli_query($conn,$sql);
    if($res){
        echo 1;
//      echo '添加成功。';
    }else{
        echo 0;
//        echo '添加失败！！！';
    }
}







//mysqli_free_result($res);//释放结果集
mysqli_close($conn);//关闭连接

