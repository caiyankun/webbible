<?php

//define("MODELFAIL_BASEPATH",Config::get('MODELFAIL_BASEPATH',"",ENTRY_PATH));
define("DEFAULT_MODELRIGHT",Config::get('DEFAULT_MODELRIGHT',"",1));
define("LACKPARASTOP",Config::get('LACKPARASTOP',"",true));
define("LACKPARARETURN",Config::get('LACKPARARETURN',"",false));
define("NOMODELRIGHTSTOP",Config::get('NOMODELRIGHTSTOP',"",true));
define("NOMODELRIGHTRETURN",Config::get('NOMODELRIGHTRETURN',"",false));

!defined('NOMODELRIGHT_PAGE')&&define('NOMODELRIGHT_PAGE',Config::get('NOMODELRIGHT_PAGE',"","pages/nomodelright.page.php"));
!defined('LACKPARA_PAGE')&&define('LACKPARA_PAGE',Config::get('LACKPARA_PAGE',"","pages/lackpara.page.php"));
!defined('CALLFUNCFAIL_PAGE')&&define('CALLFUNCFAIL_PAGE',Config::get('CALLFUNCFAIL_PAGE',"","pages/callfuncfail.page.php"));



class Model
{
    public $accesslevel=null;
    public static $failcode=null;
    public static $result=null;
    function __construct() {
        
	is_null($this->accesslevel)&&($this->accesslevel=DEFAULT_MODELRIGHT);
        //\Response::returntaskok(\User::info());
        //exit(0);
	\User::checkright($this->accesslevel)||$this->noright();
   }

   public function noright(){
       if(empty(include ENTRY_PATH.NOMODELRIGHT_PAGE)) {Response::returntaskfail('',1,'您没有权限执行此Model!');}
       NOMODELRIGHTSTOP&&exit(0);
       return NOMODELRIGHTRETURN;
   }
   public static function isvalidfunc($classname,$funcname){
   	
       try {
            $obj=new ReflectionClass($classname);
        } catch (Exception $e){
            $obj=null;
        }
        if (!empty($obj)&&$obj->isInstantiable()) {
            //存在模块及方法，存在这个类
            if($obj->hasMethod ($funcname)) {
                //存在这个方法，就开始执行这个方法
            } else {
                //不存在这个方法
                //echo "<br>function not defined!";
                return false;
            }
        } else {
            //不存在这个类或者类不能实例化
            return false;
        }
        
       return true;
   }
   public static function callfunccontrol($classname, $funcname, &$runmode, &$arguments){
        try {
            $obj=new ReflectionClass($classname);
        } catch (Exception $e){
            $obj=null;
        }
	
        if (!empty($obj)&&$obj->isInstantiable()) {
            if($obj->hasMethod ($funcname)) {
                //
                
            } else {
                return false;
            }
        } else {
            return false;
        }
        //echo $runmode;
        //echo (Request::isrequest("failinfo")?Request::data("failinfo"):null);
        //exit(0);
        
        //Response::settype($runmode,Request::isrequest("failinfo")?Request::data("failinfo"):null);
        
        $oclass=$obj->newInstance();
        $omethod=$obj->getMethod($funcname);
        $paraarr=[];
        $i=0;
        foreach( $omethod->getParameters() as $param ){
            $lackpara=true;
            if($param->isDefaultValueAvailable()) {$paraarr[$param->name]=$param->getDefaultValue();$lackpara=false;}//获取默认值
            if(Request::isrequest($param->name)) {$paraarr[$param->name]=Request::data($param->name);$lackpara=false;}//获取Request值
            if(count($arguments)>$i) {$paraarr[$param->name]=$arguments[$i];$lackpara=false;}//获取用户定义值
            $i=$i+1;
            if($lackpara) {return self::lackpara($param->name);}
        }
        $paraarr=array_values($paraarr);
        
        $oc=count($paraarr);
        $dc=count($arguments);
        
        for ($i=$oc;$i<$dc;$i++){
        	$paraarr[]=$arguments[$i];
        }
        
        
        $arguments=$paraarr;
        //var_dump($arguments);
        //exit(0);
        return true;

   }
   public static function lackpara($paras){
   	if(empty(include ENTRY_PATH.LACKPARA_PAGE)) {echo "缺乏足够的参数:".$paras;}
       LACKPARASTOP&&exit(0);
       return LACKPARARETURN;
   }

   public static function callfuncfail($classname, $funcname, $runmode, $arguments){
       if(empty(include ENTRY_PATH.CALLFUNCFAIL_PAGE)) {echo "Model执行失败！";}
       return true;
   }
   public static function callfunc($classname,$funcname,$arguments){
       try {
            $obj=new ReflectionClass($classname);
        } catch (Exception $e){
            $obj=null;
        }
	
        if (!empty($obj)&&$obj->isInstantiable()) {
            //存在模块及方法，存在这个类
            if($obj->hasMethod ($funcname)) {
                //存在这个方法，就开始执行这个方法                
            } else {
                //不存在这个方法
                return false;
            }
        } else {
            return false;
        }
        
        
        call_user_func_array(array($obj->newInstance(), $funcname),$arguments);
        return true;
   }
   
    public static function funcparas($reffunc,$paras=null,$byasoc=false,$asoc=false)
    {
        if ($byasoc) {
            $defp=self::funcdefaultparas($reffunc);
            $f=array_merge($defp,$paras);
            if($asoc) {
                return array_slice($f,0,count($defp));
            } else {
                return array_values(array_slice($f,0,count($defp)));
            } 
        } else {
            $numparas=self::funcdefaultparas($reffunc,false);
            if (is_string($paras)){
                $paras=[$paras];
            }
            if(is_array($paras)){
                $paranums=count($paras);
                for($i=0;$i<$paranums;$i++){
                    $numparas[$i]=$paras[$i];
                }
            } 
            return $numparas;
        }
    }

    public static function funcdefaultparas($mixfunc,$asoc=true )
    {	
        $paraarr=[];
        if(is_string($mixfunc)&&function_exists($mixfunc)) {
            $mixfunc= new \ReflectionFunction($mixfunc);
        } elseif (!is_object($mixfunc)) {
            return [];
        }
        foreach( $mixfunc->getParameters() as $param ){
                    if ($param->isDefaultValueAvailable()) {
                        $paraarr[$param->name]=$param->getDefaultValue();
                    } else {
                        $paraarr[$param->name]=null;
                    }
        }
        return $asoc?$paraarr:array_values($paraarr);
    }
}
