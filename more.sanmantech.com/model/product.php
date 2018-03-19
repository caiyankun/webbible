<?php
/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 2018/3/15
 * Time: 22:34
 */

namespace model;


class product {
    /**
     * 添加商品
     * @param $proinfo
     */
    public function add(){
        $content="";
        foreach ($_GET as $key => $value){
            if(empty($content)){
                $content=$content.$key."=\"".$value."\"";
            } else {
                $content=$content.",".$key."=\"".$value."\"";
            }
        }
        //var_dump($content);die;
        //\User::checkright(100)||\Response::returntaskfail("您还未登录，请先登录！！",2,"您还未登录，请先登录！");
        if(!\Db::simplecall("more.productadd", array($content))){
            \Response::returntaskfail("存储过程调用失败！",\Db::$error,\Db::$info);
        } else {
            \Response::returntaskok('添加产品成功！');
        }
    }

    /**
     * 修改产品
     * @param $pid 商品ID
     */
    public function upd(){
        $pid = $_GET[pid];
        $content="";
        foreach ($_GET as $key => $value){
            if(empty($content)){
                if($key == 'pid') continue;
                $content=$content.$key."=\"".$value."\"";
            } else {
                if($key == 'pid') continue;
                $content=$content.",".$key."=\"".$value."\"";
            }
        }
        if(!\Db::simplecall("more.productupd", array($pid,$content))){
            \Response::returntaskfail("存储过程调用失败！",\Db::$error,\Db::$info);
        } else {
            \Response::returntaskok('修改产品成功！');
        }
    }

    /**
     *删除产品
     * @param $pid
     */
    public function del($pid){
        if(!\Db::simplecall("more.productdel", array($pid))){
            \Response::returntaskfail("存储过程调用失败！",\Db::$error,\Db::$info);
        } else {
            \Response::returntaskok('删除产品成功！');
        }
    }

}