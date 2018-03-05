<?php
include 'base.php';

$lableID = $_POST['lableID'];
$val = $_POST['val'];

$sql2 = "SELECT label FROM lj_article";
$res2 = mysqli_query($conn,$sql2);

$flage = 1;
if($res2){
	while ( $data = mysqli_fetch_array($res2) ) {
		if( "$val" == $data['label'] ){
		    $flage=0;
		}
	}
}

if($flage==1){
    $sql = "DELETE FROM lj_lable WHERE id = $lableID";
    $res = mysqli_query($conn,$sql);
    if($res){//若为真，则SQL语句正确
        echo 1;
    }
}else{
    echo 0;
}

//mysqli_free_result($res);//释放结果集
mysqli_close($conn);//关闭连接
