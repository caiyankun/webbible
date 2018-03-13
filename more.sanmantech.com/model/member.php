<?php
/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 2018/3/13
 * Time: 20:04
 */

namespace model;


class member
{
    /**
     * 查询会员信息
     */
    public function query(){
        \User::checkright(100)||\Response::returntaskfail("您还未登录，请先登录！！",2,"您还未登录，请先登录！");
        if(!\Db::simplecall("more.memberquery", array(\User::uid()))){
            \Response::returntaskfail("存储过程调用失败！",\Db::$error,\Db::$info);
        }else{
            \Response::returntaskok(\Db::arraydata());
        }
    }

}