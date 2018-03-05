<?php


/*实现Request功能，负责解析Request请求：
*/
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
    public static function post($dataname){
        return $_POST[$dataname];
    }
    public static function data($dataname){
        return $_REQUEST[$dataname];
    }
    public static function iscookie($name, $prefix = null){
        return Cookie::has($name, $prefix);
    }
    public static function cookie($dataname,$prefix = null){
        return Cookie::get($dataname,$prefix );
    }
}
