<?php
include 'base.php';

if($_POST['data'] == 0){
        $sql2 = "SELECT * FROM lj_article WHERE display=1 order by id desc limit 0,10";
        $res2 = mysqli_query($conn,$sql2);

        if($res2){//若为真，则SQL语句正确
            if (mysqli_num_rows($res2)) {
                $resul2 = [];
                while ( $data2 = mysqli_fetch_assoc($res2) ) {
                    array_push($resul2, $data2);
                }
                echo json_encode($resul2);
            }
        }
        mysqli_free_result($res2);//释放结果集
}
else if($_POST['data'] == 1){
        $sql = "SELECT * FROM lj_article WHERE recommend=1 and display=1 order by id desc limit 0,10";
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
}
else if($_POST['data'] == 2){
        $sql3 = "SELECT * FROM lj_article WHERE display=1 order by num desc limit 0,10";
        $res3 = mysqli_query($conn,$sql3);

        if($res3){//若为真，则SQL语句正确
            if (mysqli_num_rows($res3)) {
                $resul3 = [];
                while ( $data3 = mysqli_fetch_assoc($res3) ) {
                    array_push($resul3, $data3);
                }
                echo json_encode($resul3);
            }
        }
        mysqli_free_result($res3);//释放结果集
}

mysqli_close($conn);//关闭连接
