<?php
/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 2018/3/20
 * Time: 19:44
 */

namespace model;


class discount {

    /**
     * 添加折扣
     */
    public function upd(){
        $pid = $_GET[pid];
        $value = $_GET[discount];
        \User::checkright(801)||\Response::returntaskfail("您还未登录，请先登录！！",2,"您还未登录，请先登录！");
        if(!\Db::simplecall("more.discountupd", array($pid,$value))){
            \Response::returntaskfail("存储过程调用失败！",\Db::$error,\Db::$info);
        } else {
            \Response::returntaskok('添加折扣成功！');
        }
    }

    /**
     * 删除折扣
     */
    public function del(){
        $pid = $_GET[pid];
        \User::checkright(801)||\Response::returntaskfail("您还未登录，请先登录！！",2,"您还未登录，请先登录！");
        if(!\Db::simplecall("more.discountdel", array($pid))){
            \Response::returntaskfail("存储过程调用失败！",\Db::$error,\Db::$info);
        } else {
            \Response::returntaskok('删除折扣成功！');
        }
    }
}