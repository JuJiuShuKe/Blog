<?php

include 'base.php';


$id = $_POST['id'];

$sql = "SELECT * FROM lj_article WHERE id='$id'";
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

mysqli_free_result($res);//释放结果集
mysqli_close($conn);//关闭连接
