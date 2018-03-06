<?php


class Config
{
    protected static $config=[[]];
    public static function autoload(){
        self::load(MODEL_PATH."config/config.cfg.php");//加载配置变量
        self::load(ENTRY_PATH."config/config.cfg.php");//加载用户配置变量
        //echo MODEL_PATH.MODELCFG_FILE;
        //echo ENTRY_PATH."config/config.cfg.php";
        $cfg_userpath=self::get("CFG_BASEPATH","",MODEL_PATH).self::get("cfg_userpath","","");
        $cfgfiles=self::get("CFG_AUTOLOAD","",[]);
        $cfgsuffix=self::get("CFGSUFFIX","",'.cfg.php');
        foreach ($cfgfiles as $cfgfile){
            self::load($cfg_userpath.$cfgfile.$cfgsuffix,$cfgfile);
            //echo $cfg_userpath.$cfgfile.$cfgsuffix;
        }                
        //exit(0);
    }
    public static function load($fullfilename,$domain='') {
    	if(!array_key_exists($domain,self::$config)){self::$config[$domain]=[];}
        if(file_exists($fullfilename)&&is_file($fullfilename)) {
            $tarr=include $fullfilename;
            if(is_array($tarr)) {
                self::$config[$domain]=array_merge(self::$config[$domain], array_change_key_case($tarr,CASE_UPPER));
                return true;
            } else {
            	return false;
            }
        } else {
           return false; 
        }
    }
    public static function exist($cfgname,$domain='') {    
        return array_key_exists($domain,self::$config)&&array_key_exists(strtoupper($cfgname),self::$config[$domain]);
    }
    public static function get($cfgname,$domain='',$valueifnotexist=null) {
         if(self::exist($cfgname,$domain)){
             return self::$config[$domain][strtoupper($cfgname)];
         } else {
             return $valueifnotexist;
         }
    }
    public static function dumpcfg($domain=''){
        var_dump(self::$config[$domain]);
    }
    //array_merge(self::$config[$range], array_change_key_case($name,CASE_UPPER))
}

Config::autoload();

