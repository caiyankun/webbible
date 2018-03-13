<?php
/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 2018/3/11
 * Time: 19:33
 */

namespace model;


class useraction
{
    /**
     * 添加行为
     * @param $action
     * @param $target
     */
    public function add($action,$target){
        \User::checkright(100)||\Response::returntaskfail("您还未登录，请先登录！！",2,"您还未登录，请先登录！");
        if(!\Db::simplecall("more.useractionadd", array(\User::uid(),$action,$target))){
            \Response::returntaskfail("存储过程调用失败！",\Db::$error,\Db::$info);
        } else {
            \Response::returntaskok(\Db::tabledata());
        }
    }

    /**
     * 查询行为
     * @param $action
     */
    public function query($action){

        \User::checkright(100)||\Response::returntaskfail("您还未登录，请先登录！！",2,"您还未登录，请先登录！");
        if(!\Db::simplecall("more.useractionquery", array(\User::uid(),$action))){
            \Response::returntaskfail("存储过程调用失败！",\Db::$error,\Db::$info);
        }else{
            \Response::returntaskok(\Db::arraydata());
        }
    }

    public function del($action,$target){
        \User::checkright(100)||\Response::returntaskfail("您还未登录，请先登录！！",2,"您还未登录，请先登录！");
        if(!\Db::simplecall("more.useractiondel", array(\User::uid(),$action,$target))){
            \Response::returntaskfail("存储过程调用失败！",\Db::$error,\Db::$info);
        }else{
            \Response::returntaskok("取消成功！");
        }
    }
}