<?php
/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 2018/3/21
 * Time: 21:00
 */

namespace model;


class sharepic {

    /**
     * 晒图
     * @param $type
     * @param $attachstr
     * @param $textcontent
     */
    public function add($type,$attachstr,$textcontent){
        if(!\Db::simplecall("more.sharepicadd", array(\User::uid(),$type,$attachstr,$textcontent))){
            \Response::returntaskfail("存储过程调用失败！",\Db::$error,\Db::$info);
        } else {
            \Response::returntaskok(\Db::cubedatawithtitle());
        }
    }

    /**
     * 查询一条晒图
     */
    public function query($sid){
        if(!\Db::simplecall("more.sharepicquery", array($sid))){
            \Response::returntaskfail("存储过程调用失败！",\Db::$error,\Db::$info);
        } else {
            \Response::returntaskok(\Db::cubedatawithtitle());
        }
    }

    /**
     * 查询晒图列表
     */
    public function slist($uid,$page,$length){
        if(!\Db::simplecall("more.sharepiclist", array($uid,$page,$length))){
            \Response::returntaskfail("存储过程调用失败！",\Db::$error,\Db::$info);
        } else {
            \Response::returntaskok(\Db::cubedatawithtitle());
        }
    }

    /**
     * 删除晒图
     */
    public function del($sid){
        if(!\Db::simplecall("more.sharepicdel", array(\User::uid(),$sid))){
            \Response::returntaskfail("存储过程调用失败！",\Db::$error,\Db::$info);
        } else {
            \Response::returntaskok(\Db::cubedatawithtitle());
        }
    }
}