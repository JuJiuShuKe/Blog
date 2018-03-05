<?php

include 'base.php';


$sql = "SELECT user_name FROM account_numbers";
$res = mysqli_query($conn,$sql);

session_start();
$yuanData = strtolower( $_SESSION['hell_num'] );
$pwd = sha1(md5(strtolower( $_POST['pwd'] )));
$userName = $_POST['userName'];



$flage = $_POST['flage'] ;
if($flage==1){
    $xianData = $yuanData;
}else{
    $xianData = strtolower( $_POST['val'] );
}


$signIn = $_POST['rememberPassword'] ;   //记住密码

//判断输入用户名
$flageNum = 0;
if($res){//若为真，则SQL语句正确
	while ( $data = mysqli_fetch_array($res,MYSQLI_ASSOC) ) {
		foreach ($data as $admin){
           if($admin == $userName){
               $flageNum = 1 ;//用户名正确
           }
       }
	}
}

//获取数据库密码
if($flageNum == 1){
   $sql2 = "SELECT user_pwd FROM account_numbers WHERE user_name='$userName'";
   $res2 = mysqli_query($conn,$sql2);
   while ( $data = mysqli_fetch_array($res2,MYSQLI_ASSOC) ) {
        $mima = $data['user_pwd'];
   }
}


if ($xianData == $yuanData) {
    if($flageNum != 1){
        echo -3;        //用户名或密码码错误
    }else{
        if ($pwd == $mima && $flageNum == 1) {
            setcookie("signIn2",'zidongdenglu',0,'/');
            setcookie("userName2","$userName",0,'/');
            if($signIn==1){
                 setcookie("signIn",'zidongdenglu', time()+3600*24*7 ,'/');
                 setcookie("userName","$userName", time()+3600*24*7 ,'/');
             }
            echo 1; //用户名，密码正确,验证码正确
        }else {
            echo -1;        //用户名或密码码错误
        }
    }
}else {
    echo -2;//验证码错误
}



mysqli_free_result($res);//释放结果集
mysqli_close($conn);//关闭连接


