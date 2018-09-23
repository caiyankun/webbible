<?php


/*常量声明
 */
define('WEBROOT_PATH',$_SERVER['DOCUMENT_ROOT']);//整个站点的根目录,假定是后面不带\的
define('ENTRY_PATH',dirname($_SERVER['SCRIPT_FILENAME']).'/');//入口文件 Path,有的时候没入口文件呢?
define('PATH_INFO',$_SERVER['PATH_INFO']);//截取Pathinfo信息
define('MODEL_PATH',__DIR__.'/');//模型库目录,命名空间的顶部空间
define('FRAMEROOT_PATH',MODEL_PATH.'../');//框架根目录
define('VIEW_PATH',FRAMEROOT_PATH.'view/');//VIEW目录(旧工厂目录)
define('CONTROL_PATH',FRAMEROOT_PATH.'control/');//VIEW目录(旧工厂目录)
define('STATIC_PATH',ENTRY_PATH.'static/'); 
define('COMMON_PATH',FRAMEROOT_PATH.'common/');
define('3COM_PATH',COMMON_PATH.'3com/');
define('CACHE_PATH',ENTRY_PATH.'cache/');


define('HTMLROOT_PATH',str_replace(WEBROOT_PATH,'',ENTRY_PATH)); //入口文件目录相对于站点目录的相对路径，因为站点目录不一定是部署在根目录
define('HTMLSTATIC_PATH',HTMLROOT_PATH."static/"); //入口文件目录相对于站点目录的相对路径，因为站点目录不一定是部署在根目录
define('HTML3COM_PATH',HTMLROOT_PATH."static/"); //入口文件目录相对于站点目录的相对路径，因为站点目录不一定是部署在根目录
define('HTMLCACHE_PATH',HTMLROOT_PATH."cache/"); //入口文件目录相对于站点目录的相对路径，因为站点目录不一定是部署在根目录

//实现类的自动加载功能，通过spl_autoload_register
class Loader
{
        /* 路径映射 */
        public static $namespaceroot = MODEL_PATH;
        public static $usermodelroot = ENTRY_PATH;
        public static $loadlog =[];
        /**
        * 自动加载器
        */
        public static function autoload($class)
        {
            //echo "<br>Request class:".$class;
            $file = self::findFile($class);
            $userfile=self::finduserfile($class);
            //echo "<br>class file should be:".$file ;
            if(file_exists($userfile)){
                self::includeFile($userfile);
            } else if (file_exists($file)) {
                self::includeFile($file);
                //echo "<br>loaded:".$file ;
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
        private static function finduserfile($class){
            if(preg_match("/^model\\\\/",$class)){
                $rsv=self::$usermodelroot.$class.".php";
                $rsv=strtr($rsv,"\\",DIRECTORY_SEPARATOR);
                return $rsv; // 文件标准路径
            } else {
                return null;
            }
            
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

/*
扩展函数的定义
*/

function sm(){return new God();}
function startup(){
    DEBUG_ENABLE && Debug::log("Start Up ok(index.php[entry file]->God.php[auto load]->startup())! ");
    DEBUG_ENABLE && Debug::log('pathinfo'.PATH_INFO);
    return \Router::distribute(PATH_INFO);
}

/*执行语句*/
spl_autoload_register(__NAMESPACE__ .'\Loader::autoload'); // 注册自动加载函数
//echo __NAMESPACE__;
//echo "end load God!";