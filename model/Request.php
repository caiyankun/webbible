<?php


/*实现Request功能，负责解析Request请求：
*/

!defined("REQUEST_LIMIT")&&define("REQUEST_LIMIT",Config::get('REQUEST_LIMIT',"",false));
class Request
{
   public static function ispost($postdatas=null){
        if(empty($_POST)) {return false;}
        if(empty($postdatas)) {return true;}
        is_string($postdatas)&&($postdatas=[$postdatas]);
        foreach ($postdatas as $postdata) {
            if(!isset($_POST[$postdata])) {return false;}
        }
        return true;
    }
    public static function isrequest($postdatas){
        if(!isset($_REQUEST)) {return false;}
        is_string($postdatas)&&($postdatas=[$postdatas]);
        foreach ($postdatas as $postdata) {
            if(!isset($_REQUEST[$postdata])) {return false;}
        }
        return true;
    }
    public static function postlimit(){
       // var_dump(REQUEST_LIMIT);
        //var_dump(self::ispost());
        return REQUEST_LIMIT&&(!self::ispost());
    }
    public static function post($dataname=null){
        return is_null($dataname)?$_POST:$_POST[$dataname];
    }
    public static function data($dataname=null){
        return is_null($dataname)?$_REQUEST:$_REQUEST[$dataname];
    }
    public static function iscookie($name, $prefix = null){
        return Cookie::has($name, $prefix);
    }
    public static function cookie($dataname,$prefix = null){
        return Cookie::get($dataname,$prefix );
    }
    public static function picoutdata($dataname){
        $temp=self::data($dataname);
        self::delete($dataname);
        return $temp;
    }
    public static function delete($dataname) {
        unset($_POST[$dataname]);
        unset($_REQUEST[$dataname]);
        unset($_GET[$dataname]);
    }
}
