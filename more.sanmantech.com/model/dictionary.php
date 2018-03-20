<?php
/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 2018/3/20
 * Time: 20:33
 */

namespace model;


class dictionary {

    /**
     * 查询字段信息
     */
    public function query(){
        $key = $_GET[key];
        \User::checkright(801)||\Response::returntaskfail("您还未登录，请先登录！！",2,"您还未登录，请先登录！");
        if(!\Db::simplecall("more.dicquery", array($key))){
            \Response::returntaskfail("存储过程调用失败！",\Db::$error,\Db::$info);
        } else {
            \Response::returntaskok(\Db::tabledata());
        }
    }

    /**
     * 查询别名
     */
    public function alias(){
        $key = $_GET[key];
        \User::checkright(801)||\Response::returntaskfail("您还未登录，请先登录！！",2,"您还未登录，请先登录！");
        if(!\Db::simplecall("more.dicgetalias", array($key))){
            \Response::returntaskfail("存储过程调用失败！",\Db::$error,\Db::$info);
        } else {
            \Response::returntaskok(\Db::tabledata());
        }
    }

    /**
     * 查询关键字
     */
    public function key(){
        $nick = $_GET[nick];
        \User::checkright(801)||\Response::returntaskfail("您还未登录，请先登录！！",2,"您还未登录，请先登录！");
        if(!\Db::simplecall("more.dicgetkey", array($nick))){
            \Response::returntaskfail("存储过程调用失败！",\Db::$error,\Db::$info);
        } else {
            \Response::returntaskok(\Db::tabledata());
        }
    }

    /**
     * 修改关键字
     */
    public function upd(){
        $key = $_GET[key];
        $content="";
        foreach ($_GET as $key => $value){
            if(empty($content)){
                if($key == 'key') continue;
                $content=$content.$key."=\"".$value."\"";
            } else {
                if($key == 'key') continue;
                $content=$content.",".$key."=\"".$value."\"";
            }
        }
        if(!\Db::simplecall("more.dicupditem", array($key,$content))){
            \Response::returntaskfail("存储过程调用失败！",\Db::$error,\Db::$info);
        } else {
            \Response::returntaskok('修改成功！');
        }
    }
}