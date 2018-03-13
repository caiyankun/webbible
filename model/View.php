<?php

/*View类的实现：

*/
defined("CONTROLLERFILE_SUFFIX")||define("CONTROLLERFILE_SUFFIX",Config::get('CONTROLLERFILE_SUFFIX',"",".controller.php"));
define("CACHEFILE_SUFFIX",Config::get('CACHEFILE_SUFFIX',"",".cache.html"));
define("MAXIM_FILE",Config::get('MAXIM_FILE',"","include/maxim.include.php"));
define("GODBLESS_FILE",Config::get('GODBLESS_FILE',"","include/godbless.include.php"));
define("COMFILE_SUFFIX",Config::get('COMFILE_SUFFIX',"",".com.php"));
define("COMFILE_PATH",Config::get('COMFILE_PATH',"","coms/"));
define("DEFAULT_REFTYPE",Config::get('DEFAULT_REFTYPE',"",2));//0：分开引用；1:直接内嵌；2：组合成一个大的JS，CSS进行引用。前提是模板要同时重建
!defined("PAGE_404")&&define("PAGE_404",Config::get('PAGE_404',"","pages/pagenotfound.page.php"));

!defined("FACTORY_PATH")&&define("FACTORY_PATH",Config::get('FACTORY_PATH',"",ENTRY_PATH."factory/"));

class View
{
    public static $cachelist=[];
    public static $matchedparts=[];
    public static $cached=false;
    public static $disfilename="";
    public static $pagefile="";
    public static $failcod=null;
    public static $cacheid=0;
    public static $cachefile="";
    public static $toplayoutfile="";
    public static $topcachefile="";
    public static $reftype=null;//0,通过引用的方式链接外部js和css；1，通过内嵌的方式引用外部js和css
    
    public static function dynamicjsref(){
        $comlist=self::$cachelist;
        $jslist=[];
        DEBUG_ENABLE && Debug::log(['自动识别布局数组中的js文件，View::dynamicjsref：',$comlist]);
        foreach ($comlist as $item){
            if(!self::ispart($item)){
                array_push($jslist, 'sm.'.$item.'.js');
            }
        }
        DEBUG_ENABLE && Debug::log(['识别出的JS文件：',$jslist]);
        return self::jsref($jslist);
    }
    public static function dynamiccssref(){
        $comlist=self::$cachelist;
        $csslist=[];
        DEBUG_ENABLE && Debug::log(['自动识别布局数组中的css文件，View::dynamiccssref：',$comlist]);
        foreach ($comlist as $item){
            if(!self::ispart($item)){
                array_push($csslist, 'sm.'.$item.'.css');
            }
        }
        DEBUG_ENABLE && Debug::log(['识别出的css文件：',$csslist]);
        return self::cssref($csslist);
    }
    public static function pages($pagename=null){
        if(is_null($pagename)){
            if(file_exists(self::$pagefile)){
                include self::$pagefile;
                return true;
            }
        } else {
            $pagename=ENTRY_PATH.$pagename."page.html";
            if(file_exists($pagename)){
                include $pagename;
                return true;
            }
        }
        return false;
    }
    public static function jsref($items,$reftype=null){ //0，每个文件单独引入,非0：将文件合成一个大文件进行引用！
        is_null($reftype)&&($reftype=self::$reftype);
        is_null($reftype)&&($reftype=DEFAULT_REFTYPE);//默认为合并成一个大文件进行引用
        if(empty($items)) {return false;}//如果为空则不进行任何操作
        is_string($items)&&($items=[$items]);//确保items为数组
        DEBUG_ENABLE && Debug::log('开始加载js文件 $reftype'.$reftype);
        
        if($reftype==0){
            //将js文件一个个引入
            foreach ($items as $item){
                $htmpath=HTMLSTATIC_PATH."js/".$item;
                $phppath=STATIC_PATH."js/".$item;
                if(file_exists($phppath)&&is_file($phppath)) {
                    echo '<script language="javascript" src="'.$htmpath.'"></script>';
                    DEBUG_ENABLE && Debug::log('逐个引用加载js:'.$htmpath);
                }
            }
            return true;
        } 
        //确保生成缓存文件
        if(!self::hasvalidjscache($items, $cachefile)){
            //如果已经有缓存了，则直接调用缓存，如果还没有缓存，则先生成缓存再调用
            ob_start();
            foreach ($items as $item){
                $phppath=STATIC_PATH."js/".$item;
                if(file_exists($phppath)&&is_file($phppath)) {
                    echo file_get_contents($phppath);
                }
            }
            $cachefile=$cachefile.".".time().".cache.js";
            $cachefilephp= STATIC_PATH."js/".$cachefile;
            DEBUG_ENABLE && Debug::log('重建缓存文件:'.$cachefilephp);
            file_put_contents($cachefilephp, ob_get_clean());
        } 
        
        
        //引用缓存文件
        $cachefilehtm=HTMLSTATIC_PATH."js/".$cachefile;
        DEBUG_ENABLE && Debug::log('打包加载:'.'<script language="javascript" src="'.$cachefilehtm.'"></script>');
        echo '<script language="javascript" src="'.$cachefilehtm.'"></script>';
        return true;
    }
    public static function cssref($items,$reftype=null){
        is_null($reftype)&&($reftype=self::$reftype);
        is_null($reftype)&&($reftype=DEFAULT_REFTYPE);//默认为合并成一个大文件进行引用
        if(empty($items)) {return false;}//如果为空则不进行任何操作
        is_string($items)&&($items=[$items]);//确保items为数组
        DEBUG_ENABLE && Debug::log('开始加载css文件 $reftype'.$reftype);
        
        if($reftype==0){
            //将css文件一个个引入
            foreach ($items as $item){
                $htmpath=HTMLSTATIC_PATH."css/".$item;
                $phppath=STATIC_PATH."css/".$item;
                if(file_exists($phppath)&&is_file($phppath)) {
                    echo '<link rel="stylesheet" type="text/css" href="'.$htmpath.'" />';
                    DEBUG_ENABLE && Debug::log('逐个加载css文件 $reftype'.$htmpath);
                }
            }
            return true;
        } 
        
        //确保生成缓存文件
        if(!self::hasvalidcsscache($items, $cachefile)){
            //如果已经有缓存了，则直接调用缓存，如果还没有缓存，则先生成缓存再调用
            ob_start();
            foreach ($items as $item){
                $phppath=STATIC_PATH."css/".$item;
                if(file_exists($phppath)&&is_file($phppath)) {
                    echo file_get_contents($phppath);
                }
            }
            $cachefile=$cachefile.".".time().".cache.css";
            $cachefilephp= STATIC_PATH."css/".$cachefile;
            DEBUG_ENABLE && Debug::log('重建缓存文件:'.$cachefilephp);
            file_put_contents($cachefilephp, ob_get_clean());
        }  
        //引用缓存文件
        $cachefilehtm=HTMLSTATIC_PATH."css/".$cachefile;
      
        echo '<link rel="stylesheet" type="text/css" href="'.$cachefilehtm.'" />';
	DEBUG_ENABLE && Debug::log('打包加载css文件 '.'<link rel="stylesheet" type="text/css" href="'.$cachefilehtm.'" />');
        return true;  
    }
    public static function hasvalidjscache($items,&$cachefile){
        array_multisort($items, SORT_ASC, SORT_STRING);
        $cachefile=md5(implode ($items));
        $cachefilephp=STATIC_PATH."js/".$cachefile.".*.cache.js";
        $cachelist=glob($cachefilephp);
        if($cachelist==false || empty($cachelist)) {
        	DEBUG_ENABLE && Debug::log('没有缓存文件');
        	return false;
        }
        if(count($cachelist)>1) {
            //不允许有多余一个的缓存文件存在，如果是这样的话，判定为false，并将所有的缓存文件删除
            DEBUG_ENABLE && Debug::log('有多个缓存文件，进行删除');
            foreach ($cachelist as $cache){
                unlink($cache);
            }
            return false;
        }
        
        foreach ($cachelist as $cache){
            $maxupdtime= filemtime($cache);
            foreach($items as $item){
                $itemfilephp=STATIC_PATH."js/".$item;
                if(file_exists($itemfilephp)&&(filemtime($itemfilephp)>$maxupdtime)) {
                    unlink($cache);
                    DEBUG_ENABLE && Debug::log('缓存文件已经过期，需要 重建');
                    return false;
                }
            }
            $cachefile= basename($cache);
        }
        DEBUG_ENABLE && Debug::log('有缓存文件，且缓存文件为最新');
        return true;
    }
    
    //由于css文件需要用相对路径引用图片，因此css的缓存文件和css的原始路径是一致的
    public static function hasvalidcsscache($items,&$cachefile){
        
        array_multisort($items, SORT_ASC, SORT_STRING);
        $cachefile=md5(implode ($items));
        $cachefilephp=STATIC_PATH."css/".$cachefile.".*.cache.css";
        $cachelist=glob($cachefilephp);
        if($cachelist==false || empty($cachelist)) {
        	DEBUG_ENABLE && Debug::log('没有缓存文件:');
        	return false;
        }
        if(count($cachelist)>1) {
            //不允许有多余一个的缓存文件存在，如果是这样的话，判定为false，并将所有的缓存文件删除
            DEBUG_ENABLE && Debug::log('不允许有多余的缓存文件');
            foreach ($cachelist as $cache){
                unlink($cache);
            }
            return false;
        }
        
        foreach ($cachelist as $cache){
            $maxupdtime= filemtime($cache);
            foreach($items as $item){
                $itemfilephp=STATIC_PATH."css/".$item;
                if(file_exists($itemfilephp)&&(filemtime($itemfilephp)>$maxupdtime)) {
                    unlink($cache);
                    DEBUG_ENABLE && Debug::log('缓存文件已经过期，需要 重建');
                    return false;
                }
            }
            $cachefile= basename($cache);
        }
        DEBUG_ENABLE && Debug::log('找到了可用的缓存文件并且为最新');
        return true;    
    }

    public static function maxim($maximarr=[]){
    	DEBUG_ENABLE && Debug::log('View::maxim：'.ENTRY_PATH.MAXIM_FILE);
        $omaxim=include ENTRY_PATH.MAXIM_FILE;
    	if(empty($omaxim)&&empty($maximarr)||!is_array($omaxim)||!is_array($maximarr)) {
	        return false;
        } else{
            $omaxim= array_merge($omaxim,$maximarr);
            echo '<script language="javascript" type="text/javascript">';
            echo 'jsonmaxim=\''.json_encode($omaxim,JSON_UNESCAPED_UNICODE).'\';';
            echo '</script>';
            return true;
        }
    }
    public static function godbless() {
    	DEBUG_ENABLE && Debug::log('View::godbless：'.ENTRY_PATH.GODBLESS_FILE);
    	include ENTRY_PATH.GODBLESS_FILE;
        return true;
    }
    public static function dynamicgodbless() {
        $parts=self::$cachelist;
        foreach ($parts as $part){
            if($part=="godbless"){
                self::godbless();
                return true;
            }
        }
        return true;
    }
    public static function createview($items=["default.layout"],$usecache=1,$reftype=null){
        !is_null($reftype)&&(self::$reftype=$reftype);
        is_null($reftype)&&(self::$reftype=DEFAULT_REFTYPE);
        //内容是在isvaliddisplay时初始化的，已经初始化了
        DEBUG_ENABLE && Debug::log([
        	"View::createview:"=>"=====================================",
        	"items"=>$items,
        	"usecache"=>$usecache,
        	"self::reftype"=>self::$reftype,
        	"self::disfilename"=>self::$disfilename,
        	"self::cachefile"=>self::$cachefile,
        	"self::toplayoutfile"=>self::$toplayoutfile,
                "self::topcachefile"=>self::$topcachefile,
        
        ]);
        //当存在xxx.yyy.html时，不执行布局组装，而直接调用之
        $topcachefile=self::$topcachefile;
        if(file_exists($topcachefile)&&(is_file($topcachefile))) {
            DEBUG_ENABLE && Debug::log('直接打开Topcache用户自定义界面文件：'.$topcachefile);
            include $topcachefile;
            self::$cached=true;
            return true;
        }
        
        if(($usecache==1)&&self::hascache()&&!self::cacheoutofdate()&&!Request::isrequest("forcenewcache")){
        	DEBUG_ENABLE && Debug::log('有有效的缓存文件，执行缓存！');
            self::cache();
        } elseif($usecache<1) {
        	DEBUG_ENABLE && Debug::log('usecache<1，重新缓存但不保存创建的缓存文件！');
            self::createcache($items);
        } else {
        	DEBUG_ENABLE && Debug::log('usecache>1，重建缓存并保存文件！');
            echo self::createcachefile($items);
        }
    
    }
    public static function cache() {
        if(file_exists(self::$cachefile)&&(is_file(self::$cachefile))){
        	DEBUG_ENABLE && Debug::log('有缓存文件，直接include它');
            include self::$cachefile;
            self::$cached=true;
        } 
        return true;
    }
    public static function parts($partname,$patten="/\.part\.php$/"){
        if(empty($partname)) {return false;}
        is_string($partname)&&($partname=[$partname]);
        foreach ($partname as $pn){
            $fpn=FACTORY_PATH."part/".$pn;
            if(preg_match($patten,$fpn)&&file_exists($fpn)&&is_file($fpn)) {
                include $fpn;
            }
        }
        return true;
    }
    public static function rolecheck($rightlevel=1,$formula=">=",$redirectfileiffail="user.login.controller.php",$rewriteurl="/user/login.php"){
    		$hasright=	(($formula==">=")&&(User::getrole()>=$rightlevel))||
    				(($formula=="<=")&&(User::getrole()<=$rightlevel));
    		DEBUG_ENABLE && Debug::log([
	            	'执行控制器需要的权限：'.$formula.$rightlevel,
	            	'当前用户权限：'.User::getrole(),
	            	'是否有权限执行：'.$hasright           
	            ]); 
    		if(!$hasright){
    				if(!empty($redirectfileiffail)){
    					self::$disfilename=ENTRY_PATH.$redirectfileiffail;
                                        self::$topcachefile=str_replace( CONTROLLERFILE_SUFFIX, ".html",self::$disfilename);
    					self::$cachefile= str_replace( CONTROLLERFILE_SUFFIX, ".cache.html",self::$disfilename);
                                        self::$toplayoutfile=str_replace( CONTROLLERFILE_SUFFIX, ".layout.php",self::$disfilename);
                                        self::$pagefile=str_replace( CONTROLLERFILE_SUFFIX,".page.html",self::$disfilename);
    					DEBUG_ENABLE && Debug::log('没有权限执行，加载转向文件：'.self::$disfilename);
    					self::display();
    				} else {
    					if(!empty($rewriteurl)){
    						DEBUG_ENABLE && Debug::log('没有权限执行，没有定义加载转向文件，将进行地址重写：'.$rewriteurl);
    						self::redirecturl($rewriteurl);
    					}
    				}
    				
    				DEBUG_ENABLE && Debug::log('没有权限执行，没有定义加载转向文件和地址重写，程序终止');
    				exit(0);
    		} 
    }
    public static function dynamicparts($pattern=null,$partname="",$needdel=true){
        $matched=false;
    	if(!empty($pattern)) {
            $parts=self::$cachelist;
            foreach ($parts as $part){
                preg_match($pattern, $part)&&($matched=true)&&self::parts($part.".php")&& (self::$matchedparts[$part]=true);
            }
    	}
        $matched||self::parts($partname.".php");
    }
    public static function matchedpart($part){
        return isset(self::$matchedparts[$part]);
    }
    public static function ispart($partname){
        return preg_match("/\.part\.php$/", $partname);
    }
    public static function coms($comname=""){
        empty($comname)&&($comname=self::$cachelist);
        is_string($comname)&&($comname=[$comname]);
        foreach ($comname as $item){
            if(!self::ispart($item)){
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
    }
    public static function warehouse($comname=""){
        empty($comname)&&($comname=self::$cachelist);
        is_string($comname)&&($comname=[$comname]);
        $allparts="";
        foreach ($comname as $item){
            $comfile=FACTORY_PATH."model/".$item.".model.html";
            $viewcomfile=VIEW_PATH."model/".$item.".model.html";
            if(file_exists($comfile)&&is_file($comfile)) {
                $partstr= file_get_contents($comfile);
                $allparts=$allparts.$partstr;
            } else if(file_exists($viewcomfile)&&is_file($viewcomfile)) {
                $partstr= file_get_contents($viewcomfile);
                $allparts=$allparts.$partstr;
            }
        } 
        $warestr="<div id='_warehouse_'  style='display:none'>".$allparts."</div>";
        echo $warestr;
    }
    public static function hascache(){
        //$cachefilename= str_replace( CONTROLLERFILE_SUFFIX, CACHEFILE_SUFFIX,self::$disfilename);
        return file_exists(self::$cachefile)&&(is_file(self::$cachefile));
    }
    public static function redirecturl($newurl){
    	$newurl='Location: http://'.$_SERVER['HTTP_HOST'].$newurl;
    	header($newurl);
    	exit(0);
    }
    public static function cachefail(){
        if(!self::$cached){
        }
        return true;
    }
    public static function createcachefile($items){
	//echo "<br>CONTROLLERFILE_SUFFIX:".CONTROLLERFILE_SUFFIX;
	//echo "<br>CACHEFILE_SUFFIX:".CACHEFILE_SUFFIX;
	//echo "<br>self::$disfilename:".self::$disfilename;
	//echo $cachefilename;
	//exit(0);
        ob_start();
        self::createcache($items);
        $rsval= ob_get_clean();
        empty($rsval)||file_put_contents(self::$cachefile, $rsval);
        DEBUG_ENABLE && Debug::log('已创建缓存文件：'.self::$cachefile);
        return $rsval;
    }
    public static function createcache($items){
    	DEBUG_ENABLE && Debug::log('开始创建缓存：');
        is_string($items)&&($items=[$items]);
        if(is_array($items)&&preg_match("/\.layout$/", $items[0])) {
            $layoutname= array_shift($items);
        } else {
            $layoutname=Config::get('DEFAULTLAYOUT',"","default.layout");
        }
        $fulllayoutname=self::$toplayoutfile;
        !file_exists($fulllayoutname)&&($fulllayoutname=FACTORY_PATH."layout/".$layoutname.".php");
        !file_exists($fulllayoutname)&&($fulllayoutname=VIEW_PATH."layout/".$layoutname.".php");

        self::$cachelist=$items;
          
        if(file_exists($fulllayoutname)&&(is_file($fulllayoutname))) {
            DEBUG_ENABLE && Debug::log('使用用户定义的布局文件创建缓存：'.$fulllayoutname);
            include $fulllayoutname;
            self::$cached=true;
            return true;
        } 
        DEBUG_ENABLE && Debug::log('找不到布局文件：'.$fulllayoutname);
        return false;
    }
    public static function cacheoutofdate(){
        return filemtime(self::$disfilename)>filemtime(self::$cachefile);
    }

    public static function isvaliddisplay($controlerfile){
    	DEBUG_ENABLE && Debug::log('View::isvaliddisplay:检查控制器文件是否存在：'.$controlerfile); 
        self::$disfilename=$controlerfile;
        self::$topcachefile=str_replace( CONTROLLERFILE_SUFFIX, ".html",self::$disfilename);
        if(file_exists($controlerfile)&&(is_file($controlerfile))) {
            self::$cachefile= str_replace( CONTROLLERFILE_SUFFIX, ".cache.html",self::$disfilename);
            self::$toplayoutfile=str_replace( CONTROLLERFILE_SUFFIX, ".layout.php",self::$disfilename);
            self::$pagefile=str_replace( CONTROLLERFILE_SUFFIX,".page.html",self::$disfilename);
            DEBUG_ENABLE && Debug::log([
            	'控制器文件存在：'.$controlerfile,
            	'缓存文件为：'.self::$cachefile,
            	'超级布局文件为：'.self::$toplayoutfile,
                '超级缓存文件为：'.self::$topcachefile    
            ]); 
            return true;
        } else {
            //如果没有控制器文件，也要显示超级缓存文件
            DEBUG_ENABLE && Debug::log('控制器文件不存在'.$controlerfile); 
            $htmldisfile= self::$topcachefile;
            if(file_exists($htmldisfile)){
                DEBUG_ENABLE && Debug::log('存在现成的静态文件，直接显示！'.$htmldisfile); 
                include $htmldisfile;
                exit(0);
            }
            return self::pagenotfound($controlerfile);
        }
    }
    public static function pagenotfound($controlerfile){
    	if(empty(include ENTRY_PATH.PAGE_404)) {echo "文件没找到！";}
       return PAGE_404_RETURN;
    }
    public static function displaycontrol($controlerfile,$expara){
    	DEBUG_ENABLE && Debug::log('View::displaycontrol:'.$controlerfile."+expara:".$expara); 
        return true;
    }
    public static function displayfail($controlerfile,$expara){
    	DEBUG_ENABLE && Debug::log('View::displayfail');
        return true;
    }
    public static function display($filename=null){
    	is_null($filename)&&($filename=self::$disfilename);
    	DEBUG_ENABLE && Debug::log('View::display:'.$filename); 
        include $filename;//执行.controller.php     
	return true;
    }
    public static function displayhtml($comlist=[],$ifgodbless=true,$ifmaxim=true){
        $htmldisfile= preg_replace("/\.controller\.php$/", ".html", self::$disfilename);
        if(file_exists($htmldisfile)){
            DEBUG_ENABLE && Debug::log('存在现成的静态文件，直接显示！'.$htmldisfile); 
            $ifgodbless&&self::godbless();
            $ifmaxim&&self::maxim();
            self::$cachelist=$comlist;
            self::dynamicjsref();
            self::dynamiccssref();
            include $htmldisfile;
        } else {
            DEBUG_ENABLE && Debug::log('静态文件不存在！'.$htmldisfile); 
        }
        
    }
    public static function cacheidmark(){
        echo '<script language="javascript" type="text/javascript">';
        echo 'maxim.cacheid="'.self::$cacheid.'";';
        echo '</script>';
        return true;
    }
}
