<?php


defined("CONTROLLERFILE_SUFFIX")||define("CONTROLLERFILE_SUFFIX",Config::get('CONTROLLERFILE_SUFFIX',"",".controller.php"));
define("NOROUTERIGHTEXIT",Config::get('NOROUTERIGHTEXIT',"",true)); //当发现没有路由权限时是否要停止执行脚本
define("NOROUTERERIGHTTURN",Config::get('NOROUTERERIGHTTURN',"",false));//当发现没有路由权限时返回什么值
define("ROUTERULE_DOMAIN",Config::get('ROUTERULE_DOMAIN',"","routerule"));
!defined('FAILROUTE_PAGE')&&define('FAILROUTE_PAGE',Config::get('FAILROUTE_PAGE',"","pages/failroute.page.php"));
!defined('NOROUTERIGHT_PAGE')&&define('NOROUTERIGHT_PAGE',Config::get('NOROUTERIGHT_PAGE',"","pages/failroute.page.php"));


/*实现路由功能，拦截地址栏输入，实现访问任务的分发：
*（0）能直接访问到文件的有效地址不会到这里来;
*（1）到来以后现在入口目录下找相应的控制器文件
*（2）找不到控制器文件的时候，找PHP模型库中的相应模块->类->方法
*约定：不接受和处理？形式的参数传递
*/
class Router
{
    public static $pathinfo="";
    public static $result=null;
    public static $failcode=null;

    public static function beforedistribute($pathinfo){
        return true;
    }
    public static function faildistribute(){
    	if(empty(include ENTRY_PATH.FAILROUTE_PAGE)) {echo "找不到回家的路了！";}
       return false;
    }
    public static function distriutetomodel() {
        $pathinfo=self::$pathinfo;    
        $expara=[];
        //if(preg_match("/\/_model_(\/|$)/",$pathinfo)){
        //    $pathinfo= explode("/_model_", $pathinfo)[0];//先预留
        //} 
        if(preg_match("/\/([a-zA-Z_]+)\.func(?:\.([a-zA-Z_]+))?(\/|$)/",$pathinfo,$matches)){
            $splitstr= $matches[0];
            $funcname= $matches[1];
            $runmode= $matches[2];
            $infoarr=explode($splitstr,$pathinfo,2);
            $classname="\\model\\".join("\\", explode("/",$infoarr[0] ));
            if(count($infoarr)>1 && !empty($infoarr[1])) {$arguments=explode("/",$infoarr[1]);} else {$arguments=null;}
        } else {
          
                return false;

        
        }

       //echo $classname.$funcname;
   	//exit(0);
        //存在这个方法，就开始执行这个方法
        Model::isvalidfunc($classname,$funcname)&&
        Model::callfunccontrol($classname, $funcname, $runmode, $arguments)&&
        Model::callfunc($classname, $funcname, $arguments)||
        Model::callfuncfail($classname, $funcname, $runmode, $arguments);
        return true;      
    }
    public static function distriutetoview() {
        $pathinfo=self::$pathinfo;    
        $expara=[];
        //if(preg_match("/\/_model_(\/|$)/",$pathinfo)){
        //    return false; //如果强行指定是model，放弃解析为view
        //} 
        //if(preg_match("/\/_view_(\/|$)/",$pathinfo)){
        //    $pathinfo= explode("/_view_", $pathinfo,2)[0];//先预留
        //} 
        if(preg_match("/\.php(\/|$|\?)/",$pathinfo)){
            $pathinfoarr=explode(".php",$pathinfo,2);
            $pathinfo=$pathinfoarr[0];
            if (count($pathinfoarr)>1) {
                $exparainfo=$pathinfoarr[1];
            } 
        }  else {
            return false;//不符合解析为view的条件必须有.php作为文件名
        }
        $infoarr=explode("/",$pathinfo);
        $controlerfile= join(".", $infoarr).CONTROLLERFILE_SUFFIX;
        $controlerfile=ENTRY_PATH.$controlerfile;
        
        View::isvaliddisplay($controlerfile)&&
        View::displaycontrol($controlerfile,$expara)&&
        View::display($controlerfile)||
        View::displayfail($controlerfile,$expara);
        return true;
    }

    public static function distribute($pathinfo) {
    	    /*
            echo "go inside distribute";
    	    echo $_SERVER['PATH_INFO'];
    	    echo $pathinfo;
            echo "--------\r\n";
            echo ENTRY_PATH ."myindex.php";
            exit(0);//*/
            if(empty($pathinfo)){
		empty(include ENTRY_PATH ."myindex.php")&&empty(include ENTRY_PATH ."index.html");
		return "";
	    }
            $pathinfo=preg_replace("/^\//","",$pathinfo);
            self::$pathinfo=$pathinfo;
            
            
            
            
            (self::checkrouteright($pathinfo)||self::norouteright($pathinfo))&&
            self::beforedistribute($pathinfo)&&
            self::distriutetoview()||
            self::distriutetomodel()||
            self::faildistribute();
            return self::$result;
           
    }
    public static $routeright=0;
    public static function checkrouteright($pathinfo){
    	$rules=Config::get("rules",ROUTERULE_DOMAIN,[]);
	self::$routeright=Config::get("DEFAULT_RIGHT",ROUTERULE_DOMAIN,0);
	foreach ($rules as $rule=>$rightlevel){
		if(preg_match($rule,$pathinfo)){
			self::$routeright=$rightlevel;
			return User::checkright(self::$routeright);
		}
	}
        return User::checkright(self::$routeright);
    }
    public static function norouteright($pathinfo){
    	if(empty(include ENTRY_PATH.NOROUTERIGHT_PAGE)) {echo "没有买路钱休想从此过！";}
       NOROUTERIGHTEXIT&&exit(0);
       return NOROUTERIGHTRETURN;
    }
}
//echo "end load Router!";