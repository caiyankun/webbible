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
    public function query($key){
        if(!\Db::simplecall("more.dicquery", array($key))){
            \Response::returntaskfail("存储过程调用失败！",\Db::$error,\Db::$info);
        } else {
            \Response::returntaskok(\Db::cubedatawithtitle());
        }
    }

    /**
     * 查询别名
     */
    public function alias($key){
        if(!\Db::simplecall("more.dicgetalias", array($key))){
            \Response::returntaskfail("存储过程调用失败！",\Db::$error,\Db::$info);
        } else {
            \Response::returntaskok(\Db::cubedatawithtitle());
        }
    }

    /**
     * 查询关键字
     */
    public function keyof($nick){
        if(!\Db::simplecall("more.dicgetkey", array($nick))){
            \Response::returntaskfail("存储过程调用失败！",\Db::$error,\Db::$info);
        } else {
            \Response::returntaskok(\Db::cubedatawithtitle());
        }
    }

    /**
     * 修改关键字
     */
    public function upd($key,$cnnick,$ennick,$pvalue){
        if(!\Db::simplecall("more.dicupditem", array($key,$cnnick,$ennick,$pvalue))){
            \Response::returntaskfail("存储过程调用失败！",\Db::$error,\Db::$info);
        } else {
            \Response::returntaskok(\Db::cubedatawithtitle());
        }
    }
    public function del($key) {
         if(!\Db::simplecall("more.dicdelitem", array($key))){
            \Response::returntaskfail("存储过程调用失败！",\Db::$error,\Db::$info);
        } else {
            \Response::returntaskok(\Db::cubedatawithtitle());
        }
    }
}