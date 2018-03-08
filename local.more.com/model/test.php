<?php
namespace model;


class test { 
	public function para($arg1,$arg2=2,$arg3=3){
		//var_dump(func_get_args());
		echo $arg1;
		echo $arg2;
		echo $arg3;
	}
	public function role(){
            \Response::returntaskok("我是数据", "我是信息");
	}
        public function fe(){
            echo "我是用户fe";
        }

        public function testwarehouse(){
		\Response::returntaskok(\View::warehouse(["test","bt3table"]),"这是测试信息！");
	}
	public function testglob(){
		var_dump(glob("/var/www/quanwutong.com/*.controller.php"));
	}
	public function post(){
		\Response::returntaskok($_REQUEST,"这是测试信息！");
	}
        public function testpost(){
            \Request::postlimit()&&\Response::irregrequest("只有Post方式访问才可以！");
        }
	public function callproc($procname,$params){
	
		//if(\Db::callproc("user.login_check",["uname"=>"test@test.com","upass"=>md5("123456"),"_error"=>"3"])){
		echo json_encode(json_decode($params));
		exit(0);
		if(\Db::callproc($procname,$params)){
			var_dump(\Db::$datatitle);
			echo "<br>";
			var_dump(\Db::$data);
			echo "<br>";
			var_dump(\Db::$outvars);
		} else {
			echo \Db::$error.":".\Db::$info;
		
		}
		exit(0);
		$procname="user.login_check";
		$params=["uname"=>"test@test.com","upass"=>md5("123456"),"_error"=>"3"];
		echo $procname."<br>";
		echo $params."<br>";
		$sqlstr_init="select __initvars__;";
		$sqlstr_proc="CALL ".$procname."(__qms__);";
		$sqlstr_outvar="select __outvars__;";
		$i=0;
		$j=0;
		$qms="";
		$initvars="";
		$bindparas=[];
		$parastr="";
		$outvars="";
		
		foreach ($params as $k=>$v){
			if($i<1) {$qms="?";} else {$qms=$qms.",?";}
			if(preg_match("/^_/",$k)){
				array_push($bindparas,"@".$k);
				if($i<1) {$parastr="@".$k;} else {$parastr=$parastr.",@".$k;}
				if($j<1) {$initvars="@".$k.":=".\Db::quote($v);} else {$initvars=$initvars.",@".$k.":=".\Db::quote($v);}
				if($j<1) {$outvars="@".$k." as ".$k;} else {$outvars=$outvars.",@".$k." as ".$k;}
				$j=$j+1;
			} else {
				array_push($bindparas,$v);
				if($i<1) {$parastr=\Db::quote($v);} else {$parastr=$parastr.",".\Db::quote($v);}
			}
			$i=$i+1;
		}
		
		$sqlstr_init=preg_replace("/__initvars__/",$initvars,$sqlstr_init);
		//$sqlstr_proc=preg_replace("/__qms__/",$qms,$sqlstr_proc);
		$sqlstr_proc=preg_replace("/__qms__/",$parastr,$sqlstr_proc);
		
		$sqlstr_outvar=preg_replace("/__outvars__/",$outvars,$sqlstr_outvar);
		
		echo $sqlstr_init."<br>";
		echo $sqlstr_proc."<br>";
		echo $sqlstr_outvar."<br>";
		echo json_encode($bindparas);
		
		\DB::query($sqlstr_init,1);
		//\DB::query("select @_error:=3",1);
		\Db::ecodata();
		\DB::query($sqlstr_proc,1);
		//\DB::query("call user.login_check('test@test.com','123456',@_error)",1);
		//\Db::ecodata();
		\DB::query($sqlstr_outvar,1);
		//\DB::query("select @_error as _error",1);
		\Db::ecodata();
		
	}
}