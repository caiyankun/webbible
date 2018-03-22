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
            \Response::returntaskok(\Db::arraydata());
        }
    }

    /**
     * 查询一条晒图
     */
    public function query(){
        $sid = $_GET[sid];
        if(!\Db::simplecall("more.sharepicquery", array($sid))){
            \Response::returntaskfail("存储过程调用失败！",\Db::$error,\Db::$info);
        } else {
            \Response::returntaskok(\Db::arraydata());
        }
    }

    /**
     * 查询晒图列表
     */
    public function lst(){
        $uid = $_GET[uid];
        $start = $_GET[start];
        $length = $_GET[length];
        if(!\Db::simplecall("more.sharepiclist", array($uid,$start,$length))){
            \Response::returntaskfail("存储过程调用失败！",\Db::$error,\Db::$info);
        } else {
            \Response::returntaskok(\Db::arraydata());
        }
    }

    /**
     * 删除晒图
     */
    public function del(){
        $sid = $_GET[sid];
        if(!\Db::simplecall("more.sharepicdel", array($sid))){
            \Response::returntaskfail("存储过程调用失败！",\Db::$error,\Db::$info);
        } else {
            \Response::returntaskok("删除晒图成功");
        }
    }
}