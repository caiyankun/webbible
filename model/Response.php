<?php

/*实现Response功能，负责向浏览器输出内容：
*/
class Response
{
    //public static $responsetype="sm";
    public static $code=0;
    public static $info="";
    public static $data=null;
    public static $responseobj= [];
    public static $_taskstat=[];
    public static $_taskresult=[];
    /*code=0为成功，<0为本地错误，>0为服务器错误*/
    /*
    public static function settype($newtype="sm",$failinfo=null){
        self::$responsetype=$newtype;
    }*/
    public static function returntaskok($data="",$info=""){
    
        self::$code=0;
        self::$info=$info;
        self::$data=$data;    
        self::$_taskstat["code"]=self::$code;
        self::$_taskstat["info"]=self::$info;
	self::$responseobj["data"]=self::$data;
        self::$responseobj["stat"]=self::$_taskstat;
        echo json_encode(self::$responseobj,JSON_UNESCAPED_UNICODE|JSON_UNESCAPED_SLASHES);
        exit(0);
    }
    public static function returntaskfail($data="",$code=1,$info=""){
        self::$code=$code;
        self::$info=$info;
        self::$data=$data;    
        self::$_taskstat["code"]=self::$code;
        self::$_taskstat["info"]=self::$info;
	self::$responseobj["data"]=self::$data;
        self::$responseobj["stat"]=self::$_taskstat;
        echo json_encode(self::$responseobj,JSON_UNESCAPED_UNICODE);
        exit(0);
    }
    public static function returnnoright($info){
        self::$code=100;  //约定100为没有权限？？
        self::$info=$info;
        self::$data=null;    
        self::$_taskstat["code"]=self::$code;
        self::$_taskstat["info"]=self::$info;
	self::$responseobj["data"]=self::$data;
        self::$responseobj["stat"]=self::$_taskstat;
        echo json_encode(self::$responseobj,JSON_UNESCAPED_UNICODE);
        exit(0);
    }
    public static function irregrequest($info) {
        self::$code=99;  //约定99为访问方式不正确
        self::$info=$info;
        self::$data=null;    
        self::$_taskstat["code"]=self::$code;
        self::$_taskstat["info"]=self::$info;
	self::$responseobj["data"]=self::$data;
        self::$responseobj["stat"]=self::$_taskstat;
        echo json_encode(self::$responseobj,JSON_UNESCAPED_UNICODE);
        exit(0);
    }
    public static function returnresult($data=""){
        self::$data=$data;    
	if(is_object(self::$data)||is_array(self::$data)){
        	echo json_encode(self::$data,JSON_UNESCAPED_UNICODE);
        } else {
        	echo self::$data;
        }
        exit(0);
    }
}

