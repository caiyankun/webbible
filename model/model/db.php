<?php

namespace model;

class db {
    public function attempjson($p) {
        try { 
            $rs=json_decode($p);
            if(!is_null($rs)){$p=$rs;}
        } catch(Exception $e) {
            //...
        }
        return $p;
    }
    public function proc($procname,$paras=[],$id=0,$contents="",$witch="",$filterinfo="",$orderinfo="",$page=1,$length=100,$smproc=true,$key='',$value='',$option='',$multiset=""){
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
            $this->get($procname,$key,$option);
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
            if(!\Db::simplecall($name, $rs)){
                \Response::returntaskfail("存储过程调用失败！",\Db::$error,\Db::$info);
            } else {
                \Response::returntaskok(\Db::cubedatawithtitle());
            }
        } 
    }
    public function test($name,$paras=[]){
        if(empty($paras)){
            $rs=[];
        } else{
            $rs= is_array($paras)?$paras:split(",", $paras);
        }
        $arr= split(",", $paras);
        var_dump($arr);
    }
    public function detail($procname,$id,$witch="",$option=""){
        if(\Db::simplecall($procname, [$id,$witch, \User::uid(),$option])){
            $value=\Db::arraydata();
            $key=\Db::$datatitle;
            $rs=[];
            $rs["title"]=["key","value"];
            $rs["data"]=[];
            for($i=0;$i< sizeof($value);$i++){
                array_push($rs["data"], [$key[$i],$value[$i]]);
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
            $rs=[];
            $rs["data"]= \Db::tabledata();
            $rs["title"]= \Db::$datatitle;
            $rs["paging"]=\Db::arraydata([0,0,0],1);
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
    public function get($procname,$key,$option=""){
        $keys=explode(",",$key);
        if(sizeof($keys)<2){
            if(\Db::simplecall($procname, [$key,\User::uid(),$option])){
                \Response::returntaskok($this->attempjson(\Db::vardata()));
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
                $rs[$keyname]=$this->attempjson(\Db::vardata());
            } else {
                \Response::returntaskfail(\Db::$info);
            }
        }
        \Response::returntaskok($rs);
    }
}