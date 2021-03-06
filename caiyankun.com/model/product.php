<?php
/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 2018/3/15
 * Time: 22:34
 */

namespace model;


class product {
    public function staticupd($pid,$oldstat,$newstat,$qty) {
        if(!\Db::simplecall("more.productstatupd", array($pid,$oldstat,$newstat,$qty, \User::uid()))){
            \Response::returntaskfail("存储过程调用失败！",\Db::$error,\Db::$info);
        } else {
            \Response::returntaskok(\Db::cubedatawithtitle());
        }   
    }
    public function stat($filterinfo=""){
        if(is_string($filterinfo)){
            try {
                $filterinfo= json_decode($filterinfo);
            } catch (Exception $exc) {
            }
        }
       !is_object($filterinfo)&&!is_array($filterinfo)&&($filterinfo=[]);
        $filterstr="1=1";
        foreach ($filterinfo as $key => $value){
            if($filterstr=="1=1"){
                //$filterstr=$key;
                if(!empty($value)&&is_string($value)){
                        $filterstr=$key."=\'".$value."\'";
                } elseif (!empty ($value)&&is_array($value)){
                    $filterstr=$key." in (\'".implode("\',\'",$value)."\') ";
                }
            }else {
                if(!empty($value)&&is_string($value)){
                        $filterstr=$filterstr." AND ".$key."=\'".$value."\'";
                } elseif (!empty ($value)&&is_array($value)){
                    $filterstr=$filterstr." AND ".$key." in (\'".implode("\',\'",$value)."\') ";
                }                
            }
        }
        //filter 功能暂未在mysql中实现
        if(!\Db::simplecall("more.productstat", array($filterstr))){
            \Response::returntaskfail("存储过程调用失败！",\Db::$error,\Db::$info);
        } else {
            \Response::returntaskok(\Db::cubedatawithtitle());
        }    
    }
    public function query($filterinfo="{}",$orderinfo="",$page=1,$length=2) {
        if(is_string($filterinfo)){
            try {
                $filterinfo= json_decode($filterinfo);
            } catch (Exception $exc) {
            }
        }
       !is_object($filterinfo)&&!is_array($filterinfo)&&($filterinfo=[]);
        $filterstr="1=1";
        foreach ($filterinfo as $key => $value){
            if($filterstr=="1=1"){
                //$filterstr=$key;
                if(!empty($value)&&is_string($value)){
                        $filterstr=$key."=\'".$value."\'";
                } elseif (!empty ($value)&&is_array($value)){
                    $filterstr=$key." in (\'".implode("\',\'",$value)."\') ";
                }
            }else {
                if(!empty($value)&&is_string($value)){
                        $filterstr=$filterstr." AND ".$key."=\'".$value."\'";
                } elseif (!empty ($value)&&is_array($value)){
                    $filterstr=$filterstr." AND ".$key." in (\'".implode("\',\'",$value)."\') ";
                }                
            }
        }
        $orderstr="";
        !empty($orderinfo)&&($orderstr=" ORDER BY ".$orderinfo." DESC");
        if(!\Db::simplecall("more.productquery", array($filterstr,$orderstr,$page,$length))){
            \Response::returntaskfail("存储过程调用失败！",\Db::$error,\Db::$info);
        } else {
            \Response::returntaskok(\Db::cubedatawithtitle());
        }
    }
    /**
     * 添加商品
     * @param $proinfo
     */
   
    public function add(){
        $content="";
        \User::checkright(800)||\Response::returntaskfail("请用管理员身份登录！！",2,"请用管理员身份登录！");
        foreach ($_REQUEST as $key => $value){
            if(in_array($key, array(
                "brand",
                "name",
                "businesstype",
                "categry",
                "size",
                "onboard",
                "material",
                "uniprice",
                "saleprice",
                "tag",
                "quota",
                "occasion",
                "color",
                "additional",
                "smallpic",
                "midpic",
                "largepic",
                "option"
            ))){
                if(empty($content)){
                    $content=$content.$key."=\"".$value."\"";
                } else {
                    $content=$content.",".$key."=\"".$value."\"";
                }
            }

        }
        //var_dump($content);die;
        //
        if(!\Db::simplecall("more.productadd", array($content,"_a"))){
            \Response::returntaskfail("存储过程调用失败！",\Db::$error,\Db::$info);
        } else {
            \Response::returntaskok(\Db::cubedatawithtitle());
        }
    }

    /**
     * 修改产品
     * @param $pid 商品ID
     */
    public function upd($pid,$productinfo){
        $content="";
        \User::checkright(800)||\Response::returntaskfail("请用管理员身份登录！！",2,"请用管理员身份登录！");
        if(is_string($productinfo)){
            try {
                $productinfo= json_decode($productinfo);
            } catch (Exception $exc) {
               
            }     
        }
        if(!is_object($productinfo)){
            \Response::returntaskfail("业务执行失败！", 2, "更新字段格式不正确！");
        }
        foreach ($productinfo as $key => $value){
            
            if(in_array($key, array(
                "name",
                "businesstype",
                "categry",
                "size",
                "onboard",
                "material",
                "uniprice",
                "saleprice",
                "tag",
                "quota",
                "occasion",
                "color",
                "additional",
                "smallpic",
                "midpic",
                "largepic",
                "option"
            ))){
                if(empty($content)){
                    $content=$content.$key."=\"".$value."\"";
                } else {
                    $content=$content.",".$key."=\"".$value."\"";
                }
            }
        }
        
        if(!\Db::simplecall("more.productupd", array($pid,$content))){
            \Response::returntaskfail("存储过程调用失败！",\Db::$error,\Db::$info);
        } else {
            \Response::returntaskok(\Db::cubedatawithtitle());
        }
    }

    /**
     *删除产品
     * @param $pid
     */
    public function del($pid){
        if(!\Db::simplecall("more.productdel", array($pid))){
            \Response::returntaskfail("存储过程调用失败！",\Db::$error,\Db::$info);
        } else {
            \Response::returntaskok(\Db::cubedatawithtitle());
        }
    }

}