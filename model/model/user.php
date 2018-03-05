<?php
namespace model;

class user
{
	public function info()
	{
		\Response::returntaskok(\User::info());
		//echo json_encode($_SESSION);
	}
	public function login($uname,$upass,$vericode,$keeplogin=-3600)
	{
		if(!\model\captcha::staticcheck($vericode)){\Response::returntaskfail("验证码不正确！",1,"验证码不正确！");}
		if(\User::login($uname,$upass,$keeplogin)){
			\Response::returntaskok(\User::$curuser);
		} else {
			\Response::returntaskfail(\User::$error,\User::$info);
		}
	}
	public function register($uname,$upass,$vericode)
	{
		if(!\model\captcha::staticcheck($vericode)){\Response::returntaskfail("验证码不正确",1,"验证码不正确！");}
		if(\User::register($uname,$upass)){
			\Response::returntaskok("注册成功！");
		} else {
			\Response::returntaskfail(\User::$info,\User::$error,\User::$info);
		}
	}
	public function logout($delcookie=false)
	{
		if(\User::logout()){
			\Response::returntaskok("退出登录成功！");
			//echo json_encode($_SESSION);
		} else {
			\Response::returntaskfail("退出登录失败！",3,"退出登录失败！");
		}
	}	
	public function iplocation ($queryIP){
	
	    $url = 'http://int.dpool.sina.com.cn/iplookup/iplookup.php?format=json&ip='.$queryIP; 
	    $ch = curl_init($url); 
	    curl_setopt($ch,CURLOPT_ENCODING ,'gb2312'); 
	    curl_setopt($ch, CURLOPT_TIMEOUT, 10); 
	    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true) ; // 获取数据返回 
	    $result = curl_exec($ch); 
	    //$result = mb_convert_encoding($result, "utf-8", "gb2312"); // 编码转换，否则乱码 
	    curl_close($ch); 
	    var_dump(json_decode($result)) ; 
	
	}

}