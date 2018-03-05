<?php
namespace model;
class view
{
    public function cache($items=["basic.layout"]){
    	if(func_num_args()<1) {
    		return "";
    	} elseif (func_num_args()==1){
    		is_string($items)&&($items=[$items]);
    	} else {
    		$items=func_get_args();
    	}
  	\View::createcache($items);
    }
}