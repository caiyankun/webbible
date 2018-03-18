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
    public function getpart($partname="blank"){
        $partname=str_replace(".","/",$partname);
    	$partfile=FACTORY_PATH."part/".$partname.".part.html";
    	if(file_exists($partfile)){
    		\Response::returntaskok(file_get_contents($partfile),"远程获取的模版内容！");
    	}
    	\Response::returntaskfail($partname."模版不存在！",1,"模版不存在！");
    }
}