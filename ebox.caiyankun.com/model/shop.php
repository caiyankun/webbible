<?php
/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 2018/3/17
 * Time: 16:15
 */

namespace model;


class shop {

    /**
     * 添加商城信息
     */
    public function writeinfo($key,$value){
        \User::checkright(800)||\Response::returntaskfail("您还未登录，请先登录！！",2,"您还未登录，请先登录！");
        if(!\Db::simplecall("more.shopwriteinfo", array($key,$value))){
            \Response::returntaskfail("存储过程调用失败！",\Db::$error,\Db::$info);
        } else {
            \Response::returntaskok(\Db::cubedatawithtitle());
        }
    }
    public function homestat() {
        \User::checkright(800)||\Response::returntaskfail("您还未登录，请先登录！！",2,"您还未登录，请先登录！");
        if(!\Db::simplecall("more.managehome", array())){
            \Response::returntaskfail("存储过程调用失败！",\Db::$error,\Db::$info);
        } else {
            $rs=[];
            $rs["jinri"]= \Db::arraydata();
            $rs["finstat"]= \Db::tabledata([[]],1);
            $rs["memstat"]= \Db::tabledata([[]],2);
            $rs["goodstat"]= \Db::tabledata([[]],3);
            $rs["orderstat"]= \Db::tabledata([[]],4);
            
            \Response::returntaskok($rs);
        }
    }
    /**
     * 删除商城信息
     */
    public function delinfo($key){
        \User::checkright(800)||\Response::returntaskfail("您还未登录，请先登录！！",2,"您还未登录，请先登录！");
        if(!\Db::simplecall("more.shopdelinfo", array($key))){
            \Response::returntaskfail("存储过程调用失败！",\Db::$error,\Db::$info);
        } else {
            \Response::returntaskok(\Db::cubedatawithtitle());
        }
    }
    public function attempjson($p) {
        try { 
            $rs=json_decode($p);
            if(!is_null($rs)){$p=$rs;}
        } catch(Exception $e) {
            //...
        }
        return $p;
    }
    /**
     * 读取商城信息
     */
    public function readinfo($key){
        if(!\Db::simplecall("more.shopreadinfo", array($key))){
            \Response::returntaskfail("存储过程调用失败！",\Db::$error,\Db::$info);
        } else {
            \Response::returntaskok($this->attempjson(\Db::vardata()));
        }
    }
}