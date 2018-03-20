<?php
/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 2018/3/20
 * Time: 21:57
 */

namespace model;


class chart {

    /**
     * 添加购物车
     */
    public function add(){
        $content="";
        foreach ($_GET as $key => $value){
            if($key=='uid'){
            } else {
                if(empty($content)){
                    $content=$content.$key."='".$value."'";
                } else {
                    $content=$content.",".$key."='".$value."'";
                }
            }
        }
        \User::checkright(100)||\Response::returntaskfail("您还未登录，请先登录！！",2,"您还未登录，请先登录！");
        if(!\Db::simplecall("more.chartadd", array(\User::uid(),$content))){
            \Response::returntaskfail("存储过程调用失败！",\Db::$error,\Db::$info);
        } else {
            \Response::returntaskok("添加购物车成功!");
        }
    }

    /*
     *删除购物车
     */
    public function del(){
        $pid = $_GET[pid];
        $qty = $_GET[qty];
        \User::checkright(100)||\Response::returntaskfail("您还未登录，请先登录！！",2,"您还未登录，请先登录！");
        if(!\Db::simplecall("more.chartdel", array(\User::uid(),$pid,$qty))){
            \Response::returntaskfail("存储过程调用失败！",\Db::$error,\Db::$info);
        } else {
            \Response::returntaskok("删除成功!");
        }
    }

    /**
     * 查看购物车
     */
    public function query(){
        $pid = $_GET[pid];
        \User::checkright(100)||\Response::returntaskfail("您还未登录，请先登录！！",2,"您还未登录，请先登录！");
        if(!\Db::simplecall("more.chartquery", array(\User::uid(),$pid))){
            \Response::returntaskfail("存储过程调用失败！",\Db::$error,\Db::$info);
        } else {
            \Response::returntaskok(\Db::tabledata());
        }
    }

    /**
     * 修改数量成功
     */
    public function upd(){
        $pid = $_GET[pid];
        $qty = $_GET[qty];
        \User::checkright(100)||\Response::returntaskfail("您还未登录，请先登录！！",2,"您还未登录，请先登录！");
        if(!\Db::simplecall("more.chartdel", array(\User::uid(),$pid,$qty))){
            \Response::returntaskfail("存储过程调用失败！",\Db::$error,\Db::$info);
        } else {
            \Response::returntaskok("修改数量成功!");
        }
    }
}