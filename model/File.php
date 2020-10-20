<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of File
 *
 * @author Administrator
 */
class File {
    //put your code here
    public static function isdir($path){
        if(file_exists($path)&& is_dir($path)){
            return true;
        } else {
            return false;
        }
    }
    public static function mkdir($path){
        /*
        echo "enter mkdir".$path;
        if(empty($path)) {return "";}
        if(!File::isdir($path)){
            $pa= explode("/", $path) ;
            $cp= array_pop($pa);
            $pp= implode("/", $pa);
            echo $cp;
            echo $pp;
            //File::mkdir(File::mkdir($pp).$cp);
        }
         */
        return mkdir($path,"0777",true);
    }
    public static function cachefilepath($prefix=""){
        $fp=CACHE_PATH.\Session::id().".cache".$prefix;
        if(!File::isdir(CACHE_PATH)){
            self::mkdir(CACHE_PATH);
        }
        return $fp;
    }
    public static function putsessioncache($str,$prefix=""){
        $fp=self::cachefilepath($prefix);
        $t=file_put_contents($fp, $str);
        return $t;
    }
    public static function getsessioncache($prefix=""){
        $fp=self::cachefilepath($prefix);
        return file_get_contents($fp);
    }
    public static function appendsessioncache($str,$prefix=""){
        $fp=self::cachefilepath($prefix);
        $t=file_put_contents($fp, $str,FILE_APPEND );
        return $t;
    }
    public static function deletesessioncache($prefix=""){
        $fp=self::cachefilepath($prefix);
        $t=file_put_contents($fp, "");
        return true;
    }
    public static function savecacheas($path,$prefix=""){
        return rename(self::cachefilepath($prefix), $path);
    }
}
