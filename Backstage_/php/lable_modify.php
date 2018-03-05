<?php
include 'base.php';

$lableID = $_POST['lableID'];
$modifyVal = $_POST['modifyVal'];
$sql = "select * from lj_lable where id <> $lableID";
$res = mysqli_query($conn,$sql);

if($res){//若为真，则SQL语句正确
    $flage = 1;
    while ( $data = mysqli_fetch_assoc($res) ) {
        if( $modifyVal == $data['lable']){
            $flage = 0;
        };
    }
}

$sql3 = "select * from lj_lable where id = $lableID";
$res3 = mysqli_query($conn,$sql3);
if($res3){//若为真，则SQL语句正确
    while ( $data = mysqli_fetch_assoc($res3) ) {
        $yuanLable = $data['lable'];
    }
}


if($flage == 1){
    $sql2 = "UPDATE lj_lable SET lable = '$modifyVal'  WHERE id=$lableID AND lable = '$yuanLable'";
    $res2 = mysqli_query($conn,$sql2);

    $sql3 = "UPDATE lj_article SET label = '$modifyVal'  WHERE  label = '$yuanLable'";
    $res3 = mysqli_query($conn,$sql3);

    echo 1;

}else{
    echo 0;
}


//mysqli_free_result($res);//释放结果集
mysqli_close($conn);//关闭连接
