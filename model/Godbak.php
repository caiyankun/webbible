<?php

/*常量声明
 *  */
define('WEBROOT_PATH',$_SERVER['DOCUMENT_ROOT']);//整个站点的根目录,假定是后面不带\的
define('MODEL_PATH',__DIR__.'/');//模型库目录,命名空间的顶部空间
define('ENTRY_PATH',dirname($_SERVER['SCRIPT_FILENAME']).'/');//入口文件 Path,有的时候没入口文件呢?
define('FRAMEROOT_PATH',MODEL_PATH.'../');//框架根目录
define('VIEW_PATH',FRAMEROOT_PATH.'view/');//VIEW目录(旧工厂目录)
define('HTMLROOT_PATH',str_replace(WEBROOT_PATH,'',ENTRY_PATH)); //入口文件目录相对于站点目录的相对路径，因为站点目录不一定是部署在根目录
define('PATH_INFO',$_SERVER['PATH_INFO']);//截取Pathinfo信息
define('STATIC_PATH',HTMLROOT_PATH.'static/');
/*配置功能的实现：

*/
class Config
{
    protected static $config=[[]];
    public static function autoload(){
        self::load(MODEL_PATH.'config.php');//加载配置变量
        self::load(ENTRY_PATH.'config.php');//加载配置变量
        $cfg_userpath=ENTRY_PATH.self::get("cfg_userpath","","");
        $cfgfiles=self::get("CFG_AUTOLOAD","",[]);
        foreach ($cfgfiles as $cfgfile){
            self::load($cfg_userpath.$cfgfile.".cfg.php",$cfgfile);
        }                
    }
    public static function load($fullfilename,$domain='') {
    	if(!array_key_exists($domain,self::$config)){self::$config[$domain]=[];}
        if(file_exists($fullfilename)&&is_file($fullfilename)) {
            $tarr=include $fullfilename;
            if(is_array($tarr)) {
                self::$config[$domain]=array_merge(self::$config[$domain], array_change_key_case($tarr,CASE_UPPER));
                return true;
            } else {
            	return false;
            }
        } else {
           return false; 
        }
    }
    public static function exist($cfgname,$domain='') {    
        return array_key_exists($domain,self::$config)&&array_key_exists(strtoupper($cfgname),self::$config[$domain]);
    }
    public static function get($cfgname,$domain='',$valueifnotexist=null) {
         if(self::exist($cfgname,$domain)){
             return self::$config[$domain][strtoupper($cfgname)];
         } else {
             return $valueifnotexist;
         }
    }
    public static function dumpcfg(){
        var_dump(self::$config);
    }


    //array_merge(self::$config[$range], array_change_key_case($name,CASE_UPPER))
}



//实现类的自动加载功能，通过spl_autoload_register
class Loader
{
        /* 路径映射 */
        public static $namespaceroot = MODEL_PATH;
        public static $loadlog =[];
        /**
        * 自动加载器
        */
        public static function autoload($class)
        {
            //echo "<br>Request class:".$class;
            $file = self::findFile($class);
            //echo "<br>class file should be:".$file ;
            if (file_exists($file)) {
                self::includeFile($file);
            }
        }
        /**
        * 解析文件路径
        */
        private static function findFile($class)
        {
        	$rsv=self::$namespaceroot.$class.".php";
        	$rsv=strtr($rsv,"\\",DIRECTORY_SEPARATOR);
            return $rsv; // 文件标准路径
        }
        /**
        * 引入文件
        */
        private static function includeFile($file)
        {
            if (is_file($file)) {
                include $file;
                //echo "<br>loaded file:".$file;
            }
        }
}
//实现页面的布局管理功能（模板替换功能）
class God 
{
    //put your code here
    public function page($pagemodelname){
        echo ($pagemodelname);
        return $this;
    }
    public function title($titlestr) {
        echo ($titlestr);
        return $this;
    }
    public function layout($param) {
        echo ($param);
        return $this;
    }
    public function requirecom($param) {
        echo ($param);
        return $this;
    }
    public function requirefile($param) {
        echo ($param);
        return $this;
    }
}


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
        echo "Failed to distribute your request！";
        return true;
    }
    public static function distriutetomodel() {
        $pathinfo=self::$pathinfo;    
        $expara=[];
        if(preg_match("/\/_model_(\/|$)/",$pathinfo)){
            $pathinfo= explode("/_model_", $pathinfo)[0];//先预留
        } 
        if(preg_match("/\/([a-zA-Z_]+)\.func(?:\.([a-zA-Z_]+))?(\/|$)/",$pathinfo,$matches)){
            $splitstr= $matches[0];
            $funcname= $matches[1];
            $runmode= $matches[2];
            $infoarr=explode($splitstr,$pathinfo,2);
            $classname="\\model\\".join("\\", explode("/",$infoarr[0] ));
            if(count($infoarr)>1 && !empty($infoarr[1])) {$arguments=explode("/",$infoarr[1]);} else {$arguments=null;}
        } else {
            $infoarr=explode("/",$pathinfo);
            if(count($infoarr)>2) {
                $modelname=array_shift($infoarr);
                $filename=array_shift($infoarr);
                $funcname=array_shift($infoarr);
                $arguments=$infoarr;
                $runmode="sm";
                $classname="\\model\\".$modelname."\\".$filename;
            } else {
                //调用不明确
                return false;
            }
        
        }
        
        
        //存在这个方法，就开始执行这个方法
        Model::isvalidfunc($classname,$funcname)&&Model::callfunccontrol($classname, $funcname, $runmode, $arguments)&&Model::callfunc($classname, $funcname, $arguments)||Model::callfuncfail($classname, $funcname, $runmode, $arguments);
        return true;      
    }
    public static function distriutetoview() {
        $pathinfo=self::$pathinfo;    
        $expara=[];
        if(preg_match("/\/_model_(\/|$)/",$pathinfo)){
            return false; //如果强行指定是model，放弃解析为view
        } 
        if(preg_match("/\/_view_(\/|$)/",$pathinfo)){
            $pathinfo= explode("/_view_", $pathinfo,2)[0];//先预留
        } 
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
        $controlerfile= join(".", $infoarr).".controller.php";
        $controlerfile=ENTRY_PATH.$controlerfile;
        
        View::isvaliddisplay($controlerfile)&&view::displaycontrol($controlerfile,$expara)&&View::display($controlerfile)||View::displayfail($controlerfile,$expara);
        return true;
    }

    public static function distribute($pathinfo) {
            $pathinfo=preg_replace("/^\//","",$pathinfo);
            self::$pathinfo=$pathinfo;
            (self::checkrouteright($pathinfo)||self::norouteright($pathinfo))&&self::beforedistribute()&&self::distriutetoview()||self::distriutetomodel()||self::faildistribute();
            return self::$result;
           
    }
    public static $routeright=0;
    public static function checkrouteright($pathinfo){
    	$rules=Config::get("rules","routerule",[]);
	self::$routeright=Config::get("DEFAULT_RIGHT","routerule",0);
	foreach ($rules as $rule=>$rightlevel){
		if(preg_match($rule,$pathinfo)){
			self::$routeright=$rightlevel;
			return Role::check(self::$routeright);
		}
	}
        return Role::check(self::$routeright);
    }
    public static function norouteright($pathinfo){
        echo "您没有该地址的路由权限！";
        exit(0);
        return false;
    }
    
}

/*实现模型类的权限控制：
*（0）Role类是给用户操作的，不涉及模型类;
*（1）Right类是给Model类调用的，用户不可访问
*/
class Role
{
    protected static $rolelevel=0;
    public static function set($newlevel){
        self::$rolelevel=$newlevel;
    }
    public static function get(){
        return self::$rolelevel;
    }
    public static function check($right){
    	return self::$rolelevel>=$right;
    }
}
class Right
{
    protected $rightlevel=0;
    public function check(){
        return Role::get()>=$this->rightlevel;
    }
    public function set($newlevel){
        $this->rightlevel=$newlevel;
    }
    public function get(){
        return $this->rightlevel;
    }
}
class Model
{
    public $accesslevel=1;
    protected $right=null;
    public static $failcode=null;
    public static $result=null;
            function __construct() {
       $this->right=new Right();
       $this->right->set($this->accesslevel);
       if($this->right->check()){
           //有权限
       } else {
           //没权限
           $this->noright();
       }
   }
   
   public function checkright(){
       return $this->right->check();
   }
   public function noright(){
       echo "对不起您没有权限运行所访问的代码！请检查是否需要登录，谢谢！";
       exit(0);
       echo "运行没有终止吗？";
   }
   public static function isvalidfunc($classname,$funcname){
       try {
            $obj=new ReflectionClass($classname);
        } catch (Exception $e){
            //echo "<br>error occur!<br>";
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
                //存在这个方法，就开始执行这个方法
                
            } else {
                return false;
            }
        } else {
            return false;
        }
        
        
        $oclass=$obj->newInstance();
        $omethod=$obj->getMethod($funcname);
        $paraarr=[];
        $i=0;
        foreach( $omethod->getParameters() as $param ){
            $lackpara=true;
            if($param->isDefaultValueAvailable()) {$paraarr[$param->name]=$param->getDefaultValue();$lackpara=false;}//获取默认值$lackpara=false;
            if(Request::isrequest($param->name)) {$paraarr[$param->name]=Request::data($param->name);$lackpara=false;}//获取Request值
            if(count($arguments)>$i) {$paraarr[$param->name]=$arguments[$i];$lackpara=false;}//获取用户定义值
            $i=$i+1;
            if($lackpara) {return self::lackpara($param->name);}
        }
        $arguments=$paraarr;
	//$arguments=self::funcparas($omethod,$arguments);
        return true;

   }
   public static function lackpara($paras){
       echo "Lacking parameters:".$paras;
       return false;
   }

   public static function callfuncfail($classname, $funcname, $runmode, $arguments){
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
        
        
        return call_user_func_array(array($obj->newInstance(), $funcname),$arguments);
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
                //$paranums=count($paras)<count($numparas)?count($paras):count($numparas);
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
/*实现Log功能，拦截地址栏输入，实现访问任务的分发：
*（0）记录程序的执行过程;
*（1）错误，调试帮助；
*（2）有开关可以控制；
*/

class Log
{
    
}
/*实现Response功能，负责向浏览器输出内容：
*/
class Response
{
    
}

/*实现Request功能，负责解析Request请求：
*/
class Request
{
   public static function ispost($postdatas){
        if(!isset($_POST)) {return false;}
        is_string($postdatas)&&($postdatas=[$postdatas]);
        foreach ($postdatas as $postdata) {
            if(!isset($_POST[$postdata])) {return false;}
        }
        return true;
    }
    public static function isrequest($postdatas){
        if(!isset($_REQUEST)) {return false;}
        is_string($postdatas)&&($postdatas=[$postdatas]);
        foreach ($postdatas as $postdata) {
            if(!isset($_REQUEST[$postdata])) {return false;}
        }
        return true;
    }
    public static function post($dataname){
        return $_POST[$dataname];
    }
    public static function data($dataname){
        return $_REQUEST[$dataname];
    }
}

/*View类的实现：

*/
class View
{
    public static $cachelist=[];
    public static $cached=false;
    public static $disfilename="";
    public static $failcod=null;

    public static function maxim($maximarr){
        echo '<script language="javascript" type="text/javascript">';
        echo 'maxim='.json_encode($maximarr).";";
        echo '</script>';
        return true;
    }
    public static function godbless() {
        include VIEW_PATH."godbless.php";
        return true;
    }
    public static function cache() {
        $cachefilename= str_replace( ".controller.php", ".html",self::$disfilename);
        if(file_exists($cachefilename)&&(is_file($cachefilename))){
            include $cachefilename;
            self::$cached=true;
        } 
        return true;
    }
    public static function parts($partname=""){
        is_string($partname)&&($partname=[$partname]);
        foreach ($partname as $pn){
            $fpn=VIEW_PATH.$pn;
            if(file_exists($fpn)&&is_file($fpn)) {
                include $fpn;
            }
        }
    }
    public static function coms($comname=""){
        empty($comname)&&($comname=self::$cachelist);
        is_string($comname)&&($comname=[$comname]);
        foreach ($comname as $item){
            $comjs=STATIC_PATH."js/sm.".$item.".js";
            $comcss=STATIC_PATH."css/sm.".$item.".css";
            $cachejs='<script language="javascript" src="'.$comjs.'"></script>';
            $cachecss='<link rel="stylesheet" type="text/css" href="'.$comcss.'" />';
            if(file_exists(WEBROOT_PATH.$comjs)&&is_file(WEBROOT_PATH.$comjs)) {
                echo $cachejs;
            }
            if(file_exists(WEBROOT_PATH.$comcss)&&is_file(WEBROOT_PATH.$comcss)) {
                echo $cachecss;
            }
        }   	
    }
    public static function warehouse($comname=""){
        empty($comname)&&($comname=self::$cachelist);
        is_string($comname)&&($comname=[$comname]);
        $allparts="";
        foreach ($comname as $item){
            $comfile=VIEW_PATH."coms/".$item.".com.php";
            $comid="_warehouse_".preg_replace("/\./","_",$item);
            if(file_exists($comfile)&&is_file($comfile)) {
                $comcontent= file_get_contents($comfile);
                $partstr="<div id='".$comid."'>".$comcontent."</div>";
                $allparts=$allparts.$partstr;
            }
        } 
        $warestr="<div id='_warehouse'  style='display:none'>".$allparts."</div>";
        echo $warestr;
    }
    public static function hascache(){
        $cachefilename= str_replace( ".controller.php", ".html",self::$disfilename);
        return file_exists($cachefilename)&&(is_file($cachefilename));
    }

    public static function cachefail(){
        if(!self::$cached){
        }
        return true;
    }
    public static function createcachefile($items){
        $cachefilename= str_replace( ".controller.php", ".html",self::$disfilename);
        ob_start();
        self::createcache($items);
        $rsval= ob_get_clean();
        empty($rsval)||file_put_contents($cachefilename, $rsval);
        return $rsval;
    }
    public static function createcache($items){
        is_string($items)&&($items=[$items]);
        if(is_array($items)&&preg_match("/\.layout$/", $items[0])) {
            $layoutname= array_shift($items);
            $layoutname=VIEW_PATH.$layoutname.".php";
            self::$cachelist=$items;
            if(file_exists($layoutname)&&(is_file($layoutname))) {
                include $layoutname;
            } else {
                return "";
            }
        } else {
            return "";
        }
    }
    public static function isvaliddisplay($controlerfile){
        if(file_exists($controlerfile)&&(is_file($controlerfile))) {
            return true;
        } else {
            return false;
        }
    }
    public static function displaycontrol($controlerfile,$expara){
        if(Request::ispost(["cacheid","cachelist"])){
            if(!self::hascache()&&Request::ispost("forcecache")){
                echo self::createcachefile(Request::post("cachelist"));
            } else {
                self::cache();
            }
            exit(0);
            return false;
        }
        return true;
    }
    public static function displayfail($controlerfile,$expara){
        return true;
    }
    public static function display($filename){
        self::$disfilename=$filename;
        if(file_exists($filename)&&(is_file($filename))) {
            self::maxim()&&self::godbless()&&self::cache();
            include $filename;//执行.controller.php     
            self::cachefail();
        } else {
            self::pagenotfound($filename);
        }
    }
    public static function pagenotfound($filename=""){
        return true;
    }
}

/*
扩展函数的定义
*/

function sm(){return new God();}
function startup($rolelevel=0){
    Role::set($rolelevel);
    return Router::distribute(PATH_INFO);
}

/*执行语句*/
spl_autoload_register(__NAMESPACE__ .'\Loader::autoload'); // 注册自动加载函数
Config::autoload();
