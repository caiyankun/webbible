<?php
namespace model;

!defined("FACTORY_PATH")&&define("FACTORY_PATH",\Config::get('FACTORY_PATH',"",ENTRY_PATH."factory/"));
class factory
{
    public function getmodel($modelname="blank"){
    	$modelfile=FACTORY_PATH."model/".$modelname.".model.html";
    	if(file_exists($modelfile)){
    		\Response::returntaskok(file_get_contents($modelfile),"远程获取的模版内容！");
    	}
    	\Response::returntaskfail($modelfile."模版不存在！",1,"模版不存在！");
    }
}