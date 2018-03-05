<?php

include 'base.php';



if($_POST['data'] == 1){
    $id = $_POST['id'];
    $sql = "SELECT * FROM lj_article WHERE id='$id' and display=1";
    $res = mysqli_query($conn,$sql);

    $sql2 = "UPDATE lj_article SET num=num+1 WHERE id='$id' and display=1";
    $res2 = mysqli_query($conn,$sql2);



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
}else if($_POST['data'] == 0){
    $id = $_POST['id'];
    $resul = [];

    $sql = "select * from lj_article where id = (select id from lj_article where id < '$id' AND display=1 order by id desc limit 1) ";
    $res = mysqli_query($conn,$sql);
    if($res){//若为真，则SQL语句正确
        if (mysqli_num_rows($res)) {
            $arr = mysqli_fetch_assoc($res);
            $title = $arr['title'];
            $next_id = $arr['id'];

            $resul['next_article']= $title ;        //下一篇
            $resul['next_id']= $next_id ;
        }else{
            $resul['next_article']= null;
        }
    }

    $sql2 = "select * from lj_article where id = (select id from lj_article where id > '$id' AND display=1 order by id asc limit 1) ";
    $res2 = mysqli_query($conn,$sql2);
    if($res2){//若为真，则SQL语句正确
        if (mysqli_num_rows($res2)) {
            $arr2 = mysqli_fetch_assoc($res2);
            $title2 = $arr2['title'];
            $upper_id = $arr2['id'];

            $resul['upper_article']= $title2 ;      //上一篇
            $resul['upper_id']= $upper_id ;
        }else{
             $resul['upper_article']= null;
         }
    }

    echo json_encode($resul);
    mysqli_free_result($res2);//释放结果集
    mysqli_close($conn);//关闭连接
}else if($_POST['data'] == 2){
    $sql = "SELECT id FROM lj_article WHERE display=1";
        $res = mysqli_query($conn,$sql);
        if($res){//若为真，则SQL语句正确
            if (mysqli_num_rows($res)) {
                $resul = [];
                while ( $data = mysqli_fetch_assoc($res) ) {
                    array_push($resul, $data['id']);
                }
                echo json_encode($resul);
            }
        }
        mysqli_free_result($res);//释放结果集
        mysqli_close($conn);//关闭连接
}