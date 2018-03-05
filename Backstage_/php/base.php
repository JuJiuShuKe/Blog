<?php
header('Content-type:text/html;charset=utf8');
define('MYSQL_SELECT', 'localhost');
define('MYSQL_USER', 'root');
define('MYSQL_PWD', '123456');
define('DATABASE', 'lj_blog');
$conn = mysqli_connect(MYSQL_SELECT,MYSQL_USER,MYSQL_PWD,DATABASE);
mysqli_query($conn,'set names utf8');


