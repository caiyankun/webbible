<?php

//header('content-type:application:json;charset=utf8');  
header('Access-Control-Allow-Origin:*');  
//header('Access-Control-Allow-Methods:POST');  
//header('Access-Control-Allow-Headers:x-requested-with,content-type');  

define("DEBUG_ENABLE", false);
define("DEBUG_ON", true);
defined("LOG_GLUE")||define("LOG_GLUE","<br>\r\n");
define('ENTRY_PATH',dirname($_SERVER['SCRIPT_FILENAME']).'/');//入口文件 Path,有的时候没入口文件呢?

if(empty($_SERVER['PATH_INFO'])){
    include ENTRY_PATH ."index.html";
    exit(0);
} //如果Pathinfo为空，直接跳转到前台主页，节省效率


require __DIR__ . '/../model/God.php';

startup();  //前台界面的组装等都是异步的，因此
