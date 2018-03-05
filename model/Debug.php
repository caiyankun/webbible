<?php

/*实现Debug功能，拦截地址栏输入，实现访问任务的分发：
*（0）记录程序的执行过程;
*（1）错误，调试帮助；
*（2）有开关可以控制；
*/

defined("DEBUG_ENABLE")||define("DEBUG_ENABLE",false);
defined("DEBUG_ON")||define("DEBUG_ON",false);
defined("LOG_GLUE")||define("LOG_GLUE","<br>\r\n");
class Debug
{
    public static $on=DEBUG_ON;//on：记录+输出；off：只记录；
    public static $log=[];
    public static $logcount=0;
    public static $logglue=LOG_GLUE;
    public static function turnon(){
        self::$on=true;
        return self::$on;
    }
    public static function turnoff(){
        self::$on=false;
        return self::$on;
    }
    public static function logglue($glue=null){
        if (is_null($glue)) {
            return self::$logglue;
        } else {
            self::$logglue=$glue;
            return $glue;
        }
    }
    public static function log($obj){//可以记录字符串，数组，对象，函数？；打上序号，时间戳，类型，当前文件
        self::$logcount=self::$logcount+1;
        //$logstr=$logstr=self::$logcount."-".date("h:i:sa")."-".gettype($obj)."-".__FILE__.":";
        $logstr=$logstr=self::$logcount."-".date("h:i:sa")."-".gettype($obj).":";
        if(empty($obj)){
            $logstr=$logstr."NULL";
        } else if (is_array($obj)||is_object($obj)){
            $logstr=$logstr.json_encode($obj,JSON_UNESCAPED_UNICODE+JSON_UNESCAPED_SLASHES);
        } else {
            $logstr=$logstr.$obj;
        }
        array_push(self::$log, $logstr);
        if(DEBUG_ON) {echo $logstr.self::$logglue;}
        return $logstr;
    }
    public static function dump($spliter="<br>\r\n"){
        echo implode($spliter, self::$log);
        return true;
    }
}

