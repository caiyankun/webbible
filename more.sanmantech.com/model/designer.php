<?php
/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 2018/3/14
 * Time: 22:38
 */

namespace model;


class designer {
    /**
     * 添加作品
     * @param $productinfo
     */
    public function creatework(){
        $productinfo="";
        foreach ($_GET as $key => $value){
            if(empty($productinfo)){
                $productinfo=$productinfo.$key."=\"".$value."\"";
            } else {
                $productinfo=$productinfo.",".$key."=\"".$value."\"";
            }
        }
        \User::checkright(200)||\Response::returntaskfail("您还未登录，请先登录！！",2,"您还未登录，请先登录！");
        if(!\Db::simplecall("more.designercreatework", array(\User::uid(),$productinfo))){
            \Response::returntaskfail("存储过程调用失败！",\Db::$error,\Db::$info);
        } else {
            \Response::returntaskok('添加作品成功！');
        }
    }

    /**
     * 删除作品
     */
    public function delwork(){
        \User::checkright(200)||\Response::returntaskfail("您还未登录，请先登录！！",2,"您还未登录，请先登录！");
        if(!\Db::simplecall("more.designerdelwork", array(\User::uid(),$_GET[pid]))){
            \Response::returntaskfail("存储过程调用失败！",\Db::$error,\Db::$info);
        } else {
            \Response::returntaskok('删除作品成功！');
        }
    }

    /**
     * 修改作品
     */
    public function updwork(){
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
        \User::checkright(200)||\Response::returntaskfail("您还未登录，请先登录！！",2,"您还未登录，请先登录！");
        if(!\Db::simplecall("more.designerupdwork", array(\User::uid(),$pid,$content))){
            \Response::returntaskfail("存储过程调用失败！",\Db::$error,\Db::$info);
        } else {
            \Response::returntaskok('修改作品成功！');
        }
    }

    /**
     * 查询设计师所有作品
     */
    public function querywork(){
        \User::checkright(200)||\Response::returntaskfail("您还未登录，请先登录！！",2,"您还未登录，请先登录！");
        if(!\Db::simplecall("more.designerquerywork", array(\User::uid()))){
            \Response::returntaskfail("存储过程调用失败！",\Db::$error,\Db::$info);
        } else {
            \Response::returntaskok(\Db::tabledata());
        }
    }
}