<?php


/*实现模型类的权限控制：
*（0）Role类是给用户操作的，不涉及模型类;
*/
/**
 * 数组 转 对象
 *
 * @param array $arr 数组
 * @return object
 */
function array_to_object($arr) {
    if (gettype($arr) != 'array') {
        return;
    }
    foreach ($arr as $k => $v) {
        if (gettype($v) == 'array' || getType($v) == 'object') {
            $arr[$k] = (object)array_to_object($v);
        }
    }
 
    return (object)$arr;
}
 
/**
 * 对象 转 数组
 *
 * @param object $obj 对象
 * @return array
 */
function object_to_array($obj) {
    $obj = (array)$obj;
    foreach ($obj as $k => $v) {
        if (gettype($v) == 'resource') {
            return;
        }
        if (gettype($v) == 'object' || gettype($v) == 'array') {
            $obj[$k] = (array)object_to_array($v);
        }
    }
 
    return $obj;
}

class User
{
    public static $guestuser=["uid"=>0,"uname"=>"请登录","nickname"=>"请登录","role"=>0];
    public static $curuser=["uid"=>5,"uname"=>"cai_yankun@qq.com","nickname"=>"蔡艳坤","role"=>5];
    public static $data=null;
    public static $error=0;
    public static $info="";
    public static function getrole(){
        return self::info()['ulevel'];
    }
    public static function uid(){
        return self::info()['uid'];
    }
    public static function checkright($rightlevel){
    	return self::getrole()>=$rightlevel;
    }
    public static function info(){
        if(Session::has("_user")){
            return object_to_array(Session::get("_user"));
        } else {
            return Config::get("guestuser",'',self::$guestuser);
        }
    }
    public static function login($uname,$upass,$keeplogin=false){
        if(!Db::simplecall("user.login",array($uname,md5($upass)))){
        	self::$error=Db::$error;
        	self::$info=Db::$info;
        	return false;
        } 
        self::$curuser=array_combine (array('uid','uname','role','option'),Db::arraydata());
    	Session::set("_user", self::$curuser);
        Cookie::savesession($keeplogin?60*60*24*14:-3000);
        return true;
    }
    public static function register($uname,$upass){
        //操作数据库，返回状态
        if(!Db::simplecall("user.register",array($uname,md5($upass)))){
        	self::$error=Db::$error;
        	self::$info=Db::$info;
        	return false;
        } 
        return true;
    }
    public static function logout(){
        //删除Session，不更改Cookie
        Session::delete("_user");
        return true;
    }
}
