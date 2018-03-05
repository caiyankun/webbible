<?php
namespace model;

class db
{
	public function query($str,$assoc=0){
		if(\Db::query($str,$assoc)){
			echo "数据库查询成功:<br>";
			//echo json_encode(\Db::$data);
			\Db::ecodata();
			//echo "为什么呢";
		} else {
			echo "数据库查询失败:<br>";
			echo \Db::$error.":".\Db::$info;
		}
	}
	public function call($procname){
		 $varArray = func_get_args();
		 array_shift($varArray);
		 if(\Db::simplecall($procname,$varArray)){
			echo "数据库查询成功:<br>";
			//echo json_encode(\Db::$data);
			\Db::ecodata();
			//echo "为什么呢";
		} else {
			echo "数据库查询失败:<br>";
			echo \Db::$error.":".\Db::$info;
		}
	}

}