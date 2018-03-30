<?php
/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 2018/3/19
 * Time: 21:14
 */

namespace model;


class comment
{

    /**
     * 添加评论
     * @param $target
     * @param $targetid
     * @param $content
     */
    public function add($target,$targetid,$content){
        \User::checkright(100)||\Response::returntaskfail("您还未登录，请先登录！！",2,"您还未登录，请先登录！");
        if(!\Db::simplecall("more.commentsadd", array(\User::uid(),$target,$targetid,$content))){
            \Response::returntaskfail("存储过程调用失败！",\Db::$error,\Db::$info);
        } else {
            \Response::returntaskok(\Db::cubedatawithtitle());
        }
    }

    /**
     * 根据用户ID查询评论
     */
    public function query($uid){
        if($uid==0 || empty($uid)) {
            $uid= \User::uid();
        }
        if(!\Db::simplecall("more.commentsquerybyuser", array($uid))){
            \Response::returntaskfail("存储过程调用失败！",\Db::$error,\Db::$info);
        } else {
            \Response::returntaskok(\Db::cubedatawithtitle());
        }
    }

    public function querybytarget($target,$targetid){
        if(!\Db::simplecall("more.commentsquerybytarget", array($target,$targetid))){
            \Response::returntaskfail("存储过程调用失败！",\Db::$error,\Db::$info);
        } else {
            \Response::returntaskok(\Db::cubedatawithtitle());
        }
    }
}