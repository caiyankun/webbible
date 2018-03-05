<?php
namespace model;


class ebox { 
	public function test(){
		echo "test is ok!!!";
	}
	public function domainstat($keyword=""){
	//echo $keyword;
	//exit(0);
		if(\Db::simplecall("quanwutong.ebox_domain_stat",["%".$keyword."%"])){
			\Response::returntaskok(\Db::tabledata());
		} else {
			\Response::returntaskfail("执行出错！",\Db::$error,\Db::$info);
		}
	}
	public function titlelist($keyword="",$domain="%"){
		if(\Db::simplecall("quanwutong.ebox_titlelist",["%".$keyword."%",$domain])){
			\Response::returntaskok(\Db::tabledata());
		} else {
			\Response::returntaskfail(\Db::$error,\Db::$info);
		}
	}
	public function content($id){
		if(\Db::simplecall("quanwutong.ebox_content",[$id])){
			\Response::returntaskok(\Db::tabledata());
		} else {
			\Response::returntaskfail(\Db::$error,\Db::$info);
		}
	}
	public function delete($id){
		if(\Db::simplecall("quanwutong.ebox_delete",[$id])){
			\Response::returntaskok(\Db::tabledata());
		} else {
			\Response::returntaskfail(\Db::$error,\Db::$info);
		}
	}
	public function updcontent($id,$content,$domain,$title){
		if(\Db::simplecall("quanwutong.ebox_updcontent",[$id,$content,$domain,$title])){
			\Response::returntaskok(\Db::tabledata());
		} else {
			\Response::returntaskfail(\Db::$error,\Db::$info);
		}
	}
	public function search($keyword,$domain="%"){
		if(\Db::simplecall("quanwutong.ebox_search ",["%".$keyword."%",$domain])){
			\Response::returntaskok(\Db::tabledata(),"返回的数据是二维数组");
		} else {
			\Response::returntaskfail(\Db::$error,\Db::$info);
		}
	}
	public function addcontent($content,$title,$domain){
		if(\Db::simplecall("quanwutong.ebox_add",[$domain,$title,$content])){
			\Response::returntaskok(\Db::tabledata());
		} else {
			\Response::returntaskfail(\Db::$error,\Db::$info);
		}
	}

}