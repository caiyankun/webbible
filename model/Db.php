<?php

class Db { 
    
    private static $objInstance; 
    private static $config=[
        "dsn"=>"",//$dsn="$dbms:host=$host;dbname=$dbName";
        "host"=>"localhost",//数据库主机名
        "dbname"=>"test",//使用的数据库
        "uname"=>"root",//数据库连接用户名
        "upass"=>"",//对应的密码
        "dbtype"=>"mysql",//数据库类型
    ];
    public static $data=null;
    public static $datatitle=[];
    public static $outvars=null;
    public static $error=0;
    public static $info="";
    public static $setupcfg=[];
    private static $inited=false;
    /* 
     * 把构造函数声明成私有为了不让使用实例化的方式进行连接 
     */ 
    private function __construct() {} 
    
    /* 
     * 防止别人通过clone的方式拷贝连接实例
     */ 
    private function __clone() {} 
    
    private static function init(){
    	if(!self::$inited){
    		self::$config=array_merge(Config::get("defaultdb","db",[]));
    		self::$inited=true;	
    	}
    	
    	return true;
    }
    
    public static function setup($cfg=[]){
    	self::init();
        if(empty($cfg)){
            return self::$config;
        } else {
            if(empty($cfg["dsn"])){
                self::$config["dsn"]="";
            } 
            self::$config= array_merge(self::$config,$cfg);
        }
        return Db;
    }
    public static function ecodata($js1="|",$js2="<br>"){
    	echo json_encode(self::$data);
    	echo "<br>====================================<br>";
    	foreach (self::$data as $rowset){
	    		foreach($rowset as $row){
	    			echo implode ($js1,$row);
	    			echo $js2;
	    		}
    	}
    	echo "<br>====================================<br>";
    }
    public static function quote($str){
    	$conn=self::getInstance();
        if(is_null($conn)){
            return $conn->quote($str);
        } else {
            return "'".$str."'";
        }
    }
    public static function clear(){
        self::$data=[];
        self::$datatitle=[];
        self::$error=0;
        self::$info="";
        self::$outvars=[];        
    }
    public static function query($str,$assoc=0){
        $conn=self::getInstance();
        if(is_null($conn)){
            return false;
        } else {
            self::clear();
            try{
                $pdostate=$conn->query($str,$assoc?PDO::FETCH_ASSOC:PDO::FETCH_NUM);
                self::$data=[];
                self::$data[0]=$pdostate->fetchAll();
            } catch (PDOException $e) { 
                self::$error=$e->getCode();
                self::$info=$e->getMessage();
                return false;
            }
            return true;
        }
    }
    public static function vardata($valueiffail=""){
        if(is_array(self::$data)&&is_array(self::$data[0])&&is_array(self::$data[0][0])&&!empty(self::$data[0][0])){
            return reset(self::$data[0][0]);
        } else {
            return $valueiffail;
        }   
    }
    public static function arraydata($valueiffail=[]){
        if(is_array(self::$data)&&is_array(self::$data[0])&&is_array(self::$data[0][0])){
            return self::$data[0][0];
        } else {
            return $valueiffail;
        }   
    }
    public static function tabledata($valueiffail=[[]]){
        if(is_array(self::$data)&&is_array(self::$data[0])&&is_array(self::$data[0][0])){
            return self::$data[0];
        } else {
            return $valueiffail;
        }        
    }
    public static function cubedata($valueiffail=[[[]]]){
        if(is_array(self::$data)&&is_array(self::$data[0])&&is_array(self::$data[0][0])){
            return self::$data;
        } else {
            return $valueiffail;
        }
    }

/* 
     * 获取连接实例，如果没有初始化的话进行初始化
     * @param 
     * @return $objInstance; 
     */ 
    public static function getInstance(  ) {    
    	self::init();
        if(!self::$objInstance){ 
        
        
            if(empty(self::$config["dsn"])){
                self::$config["dsn"]=self::$config["dbtype"].":host=".self::$config["host"].";dbname=".self::$config["dbname"];
            } 
            $dsn=self::$config["dsn"];
            $uname=self::$config["uname"];
            $upass=self::$config["upass"];
            //echo json_encode(self::$config);
            //exit(0);
            try { 
              self::$objInstance = new PDO($dsn, $uname, $upass); 
              self::$objInstance->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION); 
              self::$objInstance->query("SET NAMES utf8");
            } catch (PDOException $e) { 
              self::$error=$e->getCode();
              self::$info=$e->getMessage();
              self::$objInstance=null;
            }  
        } 
        return self::$objInstance; 
    } 
    public static function ok(  ) {    
        return !is_null(self::getInstance());
    }     
    public static function simplecall($procname,$params){
    	$realparas=[];
    	$i=0;
    	
    	foreach($params as $v){
    		if(preg_match("/^_/",$v)){$realparas[$v]=$v;} else {$realparas[$i]=$v;}
    		$i++;
    	}
    	//echo $procname;
    	//var_dump($realparas);
    	//exit(0);
    	return self::callproc($procname,$realparas);
    }
    public static function dump(){
    			echo "datatitle:<br>";
    			var_dump(\Db::$datatitle);
			echo "<br>data:<br>";
			var_dump(\Db::$data);
			echo "<br>outvars:<br>";
			var_dump(\Db::$outvars);
			echo "<br>error:<br>";
			var_dump(\Db::$error);
			echo "<br>info:<br>";
			var_dump(\Db::$info);
    }
    public static function callproc ($procname,$params){
        $conn=self::getInstance();
        if(is_null($conn)){
            return false;
        } else {
            
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
            
            //echo $sqlstr_init."<br>";
            //echo $sqlstr_proc."<br>";
            //echo $sqlstr_outvar."<br>";
            //echo json_encode($bindparas);
            //exit(0);
            
            self::clear();

            try{

            	if(!empty($initvars)){ //初始化变量，如果有的话
            		$pdostate=$conn->query($sqlstr_init,PDO::FETCH_ASSOC);
                	$pdostate->columnCount()&&($pdostate->fetchAll());
            	}
                
                
                $pdostate=$conn->query($sqlstr_proc,PDO::FETCH_NUM);
                if(!$pdostate){self::$error=1;self::$info="调用query失败！";return false;}
                $maxcolumns=$pdostate->columnCount();
                
                for ($i=0;$i<$maxcolumns;$i++){
                	self::$datatitle[]=$pdostate->getColumnMeta($i)['name'];
                }
                if($maxcolumns>0){
                    do {
                        $pdostate->columnCount()&&(self::$data[] = $pdostate->fetchAll());
                    } while ($pdostate->nextRowset());
                }
                //self::$data=$pdostate->fetchAll(PDO::FETCH_NUM);
                
                if(!empty($outvars)){//给返回值赋值，如果有的话
                    $pdostate=$conn->query($sqlstr_outvar,PDO::FETCH_ASSOC);
                    $pdostate->columnCount()&&(self::$outvars=$pdostate->fetchAll());
                    !empty(self::$outvars)&&(self::$outvars=self::$outvars[0]);
                }
            } catch (PDOException $e) { 
                self::$error=$e->getCode();
                self::$info=$e->getMessage();
                //echo self::$error.":".self::$info;
                return false;
            }
            return true;
        }    	
    }
    
    /* 
     * 只有当执行到不可访问的静态函数（私有的或者不存在的静态函数）时先自动执行这个 暂时不需要这个！
     * @param $chrMethod, $arrArguments 
     * @return $mix 
     */ 
    //final public static function __callStatic( $chrMethod, $arrArguments ) { 
    //    $objInstance = self::getInstance(); 
    //    return call_user_func_array(array($objInstance, $chrMethod), $arrArguments); //不会有问题吗？   
    //} 
}