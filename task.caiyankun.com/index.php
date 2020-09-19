<?php

//header('content-type:application:json;charset=utf8');  
header('Access-Control-Allow-Origin:*');  
//header('Access-Control-Allow-Methods:POST');  
//header('Access-Control-Allow-Headers:x-requested-with,content-type');  

define("DEBUG_ENABLE", false);
define("DEBUG_ON", true);
defined("LOG_GLUE")||define("LOG_GLUE","<br>\r\n");

require __DIR__ . '/../model/God.php';

startup();