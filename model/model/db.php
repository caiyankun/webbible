<?php

namespace model;

class db extends \Model {
    public function attempjson($p) {
        try { 
            $rs=json_decode($p);
            if(!is_null($rs)){$p=$rs;}
        } catch(Exception $e) {
            //...
        }
        return $p;
    }
    
    public function proc($procname,$paras=[],$id=0,$contents="",$witch="",$filterinfo="",$orderinfo="",$page=1,$length=100,$smproc=true,$key='',$value='',$option='',$multiset="",$type="jsonarray"){
        //校验权限，后续扩展为权限表形式
        //\User::checkright(800)||\Response::returntaskfail("您还未登录，请先登录！！",2,"您还未登录，请先登录！");
        
        //分类执行
        if($smproc&&preg_match('/_list$/', $procname)){
            $this->querylist($procname,$filterinfo,$orderinfo,$page,$length,$option,$multiset);
        } elseif ($smproc&&preg_match('/_detail$/', $procname)){
            $this->detail($procname,$id,$witch,$option);
        } elseif ($smproc&&preg_match('/_add$/', $procname)){
            $this->add($procname,$contents,$option);
        } elseif ($smproc&&preg_match('/_update$/', $procname)){
            $this->update($procname,$id,$contents,$witch,$option);
        } elseif ($smproc&&preg_match('/_delete$/', $procname)){
            $this->delete($procname,$id,$option);
        } elseif ($smproc&&preg_match('/_get$/', $procname)){
            $this->get($procname,$key,$option,$type);
        } elseif ($smproc&&preg_match('/_set$/', $procname)){
            $this->set($procname,$key,$value,$option);
        } elseif ($smproc&&preg_match('/_stat$/', $procname)){
            $this->stat($procname,$option);
        } else {
            if(empty($paras)){
                $rs=[];
            } else{
                $rs= is_array($paras)?$paras:split(",", $paras);
            }
            if(!\Db::simplecall($procname, $rs)){
                \Response::returntaskfail("存储过程调用失败！",\Db::$error,\Db::$info);
            } else {
                \Response::returntaskok(\Db::cubedatawithtitle());
            }
        } 
    }
    public function test($procname,$paras=[]){
        $rs=json_decode($paras);
        
        var_dump(json_decode($paras));
        if(empty($paras)){
            $rs=[];
        } else{
            
            $rs= is_array($paras)?$paras:explode(",", $paras);
            
        }
        //$arr= explode(",", $paras);
        
        
    }
    public function callprochascache($procname,$paras=[]){
        //if(strcmp($procname,"caiyankun.taskplant_update")==0){
           // \Response::returntaskfail("存储过程调用失败！",\Db::$error,\Db::$info);
        //}
        
        $parasarray=json_decode($paras);
        $newpara=array();
        if(is_array($parasarray)){
        } else{
            $parasarray= explode(",", $paras);
        }
       $cache=\File::getsessioncache();
       
       //$i=0;
       foreach($parasarray as $k => $v){
           $nv= str_replace("cache..cache", $cache, $v);
           //array_push($newpara,array($k=>$nv));
           array_push($newpara,$nv);
           //array_splice($parasarray, $i,1,array($k => $nv));
           //$i++;
        }
        if(!\Db::simplecall($procname, $newpara)){
            \Response::returntaskfail("存储过程调用失败！",\Db::$error,\Db::$info);
        } else {
            \Response::returntaskok(\Db::cubedatawithtitle());
        }
    }
    public function callproc($procname,$paras=[]){
        //if(strcmp($procname,"caiyankun.taskplant_update")==0){
           // \Response::returntaskfail("存储过程调用失败！",\Db::$error,\Db::$info);
        //}
        
        $parasarray=json_decode($paras);
        if(is_array($parasarray)){
        } else{
            $parasarray= explode(",", $paras);
        }
        
        if(!\Db::simplecall($procname, $parasarray)){
            \Response::returntaskfail("存储过程调用失败！",\Db::$error,\Db::$info);
        } else {
            \Response::returntaskok(\Db::cubedatawithtitle());
        }
    }
    public function manycallproc($procname,$paras=[]){
        $parasarray=json_decode($paras);
        if(is_array($parasarray)){
        } else{
            $parasarray= [explode(",", $paras)];
        }
        $error=false;
        $totalinfo="";
        $ii=1;
        foreach($parasarray as $k => $v){
            if(!\Db::simplecall($procname, $v)){
                $error=true;
            } 
            $totalinfo=$ii.$totalinfo.\Db::$info;
            $ii++;
        }
        if($error){
            \Response::returntaskfail("存储过程调用失败！",\Db::$error,$totalinfo);
        } else {
            \Response::returntaskok(\Db::cubedatawithtitle());
        }
    }
    public function detail($procname,$id,$witch="",$option=""){
        if(\Db::simplecall($procname, [$id,$witch, \User::uid(),$option])){
            $value=\Db::arraydata();
            $key=\Db::$datatitle;
            $rs=[];
            $rs["title"]=["key","value"];
            $rs["data"]=[];
            for($i=0;$i< sizeof($key);$i++){
                array_push($rs["data"], [$key[$i],$value[$key[$i]]]);
            }
            \Response::returntaskok($rs);
        } else {
            \Response::returntaskfail(\Db::$info);
        }
    }
    public function querylist($procname,$filterinfo="",$orderinfo="",$page=1,$length=0,$option="",$multiset=""){
        //var_dump([$filterinfo,$orderinfo,$page,$length]);
        if(\Db::simplecall($procname, [$filterinfo,$orderinfo,$page,$length,\User::uid(),$option])){
        //if(\Db::simplecall("more.user_list", ["","",1,100])){
        //echo json_encode(\Db::cubedata());
        //exit(0);
            $rs=[];
            $rs["data"]= \Db::tabledata();
            $rs["title"]= \Db::$datatitle;
            $rs["paging"]=\Db::arraydata([0,0,0],1);
            if($multiset!=""){
                $rssets= split(",", $multiset);
                foreach ($rssets as $key => $value) {  
                    if($key==0){
                        $rs[$value]=\Db::tabledata();
                        unset($rs["data"]);
                    } else {
                        $rs[$value]=\Db::tabledata([[]],$key+1);
                    }
                }
            }
            \Response::returntaskok($rs);
        } else {
            \Response::returntaskfail(\Db::$info);
        }
    }
    public function add($procname,$contents,$option=""){
        if(\Db::simplecall($procname, [$contents,\User::uid(),$option])){
            \Response::returntaskok(\Db::cubedatawithtitle());
        } else {
            \Response::returntaskfail(\Db::$info);
        }
    }
    public function update($procname,$id,$contents,$witch="",$option=""){
        //\Response::returntaskok([$procname,$id,$contents,$witch,\User::uid(),$option]);
        if(\Db::simplecall($procname, [$id,$contents,$witch,\User::uid(),$option])){
            \Response::returntaskok(\Db::cubedatawithtitle());
            
        } else {
            \Response::returntaskfail(\Db::$info);
        }
    }
    public function delete($procname,$id,$option=""){
        if(\Db::simplecall($procname, [$id,\User::uid(),$option])){
            \Response::returntaskok(\Db::cubedatawithtitle());
        } else {
            \Response::returntaskfail(\Db::$info);
        }
    }
    public function stat($procname,$option=""){
        if(\Db::simplecall($procname, [\User::uid(),$option])){
            \Response::returntaskok(\Db::cubedatawithtitle());
        } else {
            \Response::returntaskfail(\Db::$info);
        }
    }
    public function set($procname,$key,$value,$option=""){
        if(\Db::simplecall($procname, [$key,$value,\User::uid(),$option])){
            \Response::returntaskok(\Db::cubedatawithtitle());
        } else {
            \Response::returntaskfail(\Db::$info);
        }
    }
    public function get($procname,$key,$option="",$type="jsonarray"){
        $keys=explode(",",$key);
        if(sizeof($keys)<2){
            if(\Db::simplecall($procname, [$key,\User::uid(),$option])){
                $rs=$this->attempjson(\Db::vardata());
                if($type=="json"){
                    if(is_array($rs)){
                        if(sizeof($rs)>0){
                            $rs=$rs[0];
                        } else {
                            $rs= json_decode("{}");
                        }
                    }
                }
                \Response::returntaskok($rs);
            } else {
                \Response::returntaskfail(\Db::$info);
            }
        }
        $rs=[];
        foreach ($keys as $k) {
            $keynames=explode("=>",$k);
            $curkey=$keynames[0];
            if(sizeof($keynames)>1){$keyname=$keynames[1];}else{$keyname=$keynames[0];}
            if(\Db::simplecall($procname, [$curkey,\User::uid(),$option])){
                $trs=$this->attempjson(\Db::vardata());
                if($type=="json"){
                    if(is_array($trs)){
                        if(sizeof($rs)>0){
                            $trs=$trs[0];
                        } else {
                            $trs= json_decode("{}");
                        }
                    }
                }
                $rs[$keyname]=$rs;
            } else {
                \Response::returntaskfail(\Db::$info);
            }
        }
        \Response::returntaskok($rs);
    }
}