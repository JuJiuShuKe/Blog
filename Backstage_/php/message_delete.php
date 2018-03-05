<?php
include 'base.php';

$messageID = $_POST['messageID'];
$sql = "DELETE FROM lj_message WHERE id = $messageID";
$res = mysqli_query($conn,$sql);


if($res){//若为真，则SQL语句正确
	echo '删除成功。';
}

//mysqli_free_result($res);//释放结果集
mysqli_close($conn);//关闭连接
