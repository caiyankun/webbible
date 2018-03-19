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
    public function writeinfo(){
        $key = $_GET[key];
        $value=$_GET[value];
        \User::checkright(200)||\Response::returntaskfail("您还未登录，请先登录！！",2,"您还未登录，请先登录！");
        if(!\Db::simplecall("more.shopwriteinfo", array($key,$value))){
            \Response::returntaskfail("存储过程调用失败！",\Db::$error,\Db::$info);
        } else {
            \Response::returntaskok('添加成功！');
        }
    }

    /**
     * 删除商城信息
     */
    public function delinfo(){
        $key = $_GET[key];
        \User::checkright(200)||\Response::returntaskfail("您还未登录，请先登录！！",2,"您还未登录，请先登录！");
        if(!\Db::simplecall("more.shopdelinfo", array($key))){
            \Response::returntaskfail("存储过程调用失败！",\Db::$error,\Db::$info);
        } else {
            \Response::returntaskok('删除成功！');
        }
    }

    /**
     * 读取商城信息
     */
    public function readinfo(){
        $key = $_GET[key];
        \User::checkright(200)||\Response::returntaskfail("您还未登录，请先登录！！",2,"您还未登录，请先登录！");
        if(!\Db::simplecall("more.shopreadinfo", array($key))){
            \Response::returntaskfail("存储过程调用失败！",\Db::$error,\Db::$info);
        } else {
            \Response::returntaskok(\Db::tabledata());
        }
    }
}