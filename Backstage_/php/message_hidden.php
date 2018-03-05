<?php
include 'base.php';

$datal = $_POST['data'];
$id = $_POST['id'];
$sql = "UPDATE lj_message SET display=$datal WHERE id=$id";
$res = mysqli_query($conn,$sql);


if($res){//若为真，则SQL语句正确
	echo '修改成功！';
}

//mysqli_free_result($res);//释放结果集
mysqli_close($conn);//关闭连接
