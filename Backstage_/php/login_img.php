<?php


//echo phpinfo();	//查看gd（1-php.ini中将gd打开。2-extension_dir添加ext路径）
// var_dump(extension_loaded('gd'));	//打开gd（true）


ob_clean(); 
//指定头部
header('Content-type:image/jpeg');


session_start();
// function createCanvas ($width=80,$height=40){
function createCanvas ($width=80,$height=40,$type=1,$lence=4,$session='hell_num',$pixel=100,$line=2,$Arc=2){

	switch ($type) {
		case 1:
			$ldata='0123456789';
			break;
		case 2:
			$ldata='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
			break;
		case 3:
			$ldata='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
			break;
	}

	

	$image = imagecreatetruecolor($width, $height);//创建画布
	$bdColor = imagecolorallocate($image, 100, 100, 100);//边框颜色
	$bgColor = imagecolorallocate($image, 255, 255, 255);//背景颜色
	$black = imagecolorallocate($image, 0, 0, 0);//干扰颜色

	imagefilledrectangle($image, 0, 0, $width, $height, $bgColor);//填充背景颜色

 	imagerectangle($image, 0, 0, $width-1, $height-1, $bdColor);//边框

	$code = str_shuffle($ldata); //随机排列数据 
 	for ($i=0; $i < $lence ; $i++) {
 		$color = imagecolorallocate($image, rand(0,200), rand(0,200), rand(0,200));//画笔颜色
 		imagettftext($image,rand(15,22),rand(-20,20),($width/$lence)*$i+rand(0,5),rand(($height/2),($height/2)+10),$color,'../fonts/TTCongCongJ.ttf',substr($code, $i, 1));
 		$code .= substr($code, 0, 1);
 	}//输出数据
	$_SESSION[$session] = substr($code, 0, 4);

 	//----------------------------干扰
 	// 画点
 	for ($i = 0; $i < $pixel; $i++) {
		 imagesetpixel($image, rand(0, $width), rand(0, $height), $black);
	}
	//画线
	for ($i=0; $i < $line ; $i++) { 
		imageline($image, rand(0,80), rand(0,80), rand(0,80), rand(0,80), $black);
	}
	//画弧线
	for ($i=0; $i < $Arc; $i++) { 
		imagearc($image, rand(0,$width), rand(0,$height), rand(0,80), rand(0,80), rand(0,360), rand(0,360), $black);
	}


	imagejpeg($image);//输出图像
	imagedestroy($image);//销毁画布

}
createCanvas();
