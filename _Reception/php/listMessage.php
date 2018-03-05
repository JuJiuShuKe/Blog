<?php
include 'base.php';



$page = $_POST['num'];         //当前页数
$number = $_POST['number'];

$j = ( $page - 1 ) * $number ;
$sql = "select * from lj_message WHERE display=1 order by id desc limit $j,$number";
$res = mysqli_query($conn,$sql);

if($res){//若为真，则SQL语句正确
    if (mysqli_num_rows($res)) {
        $resul = [];
        while ( $data = mysqli_fetch_assoc($res) ) {
            array_push($resul, $data);
        }
        echo json_encode($resul);
    }
}


//mysqli_free_result($res);//释放结果集
mysqli_close($conn);//关闭连接
