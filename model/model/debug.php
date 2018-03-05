<?php
namespace model;


class debug { 
	public function modellist(){
		$mfl=glob("/var/www/model/model/*.php");
		$rsarr=[];
		foreach ($mfl as $filename) {
		    $fn=preg_replace("/\/var\/www\/model\/model/", "", $filename);
		    $fn=preg_replace("/\.php$/", "", $fn);
		    //读取每个文件，并提取函数名称
		    $fc=file_get_contents($filename);
                    preg_match_all('/public function\s*([^\_]*?)\s*\(/m', $fc,$matches,PREG_SET_ORDER);
                    $i=0;
                    foreach ($matches as $match) {
                        $item=$fn."/".$match[1].".func";
                        array_push($rsarr,$item);
                    }
		    //array_push($rsarr,$fc);
		}
	
		\Response::returntaskok($rsarr,"测试信息！");
	}


}
