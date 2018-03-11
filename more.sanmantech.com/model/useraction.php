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
    public function add(){
        \User::checkright(100)||\Response::returntaskfail("您还未登录，请先登录！！",2,"您还未登录，请先登录！");
        $content="";
        foreach ($_GET as $key => $value){
            if($key=='uid'){
            } else {
                if(empty($content)){
                    $content=$content.$key."='".$value."'";
                } else {
                    $content=$content.",".$key."='".$value."'";
                }
            }
        }
        if(!\Db::simplecall("more.useractionadd", array(\User::uid(),$content))){
            \Response::returntaskfail("存储过程调用失败！",\Db::$error,\Db::$info);
        } else {
            \Response::returntaskok(\Db::arraydata());
        }
    }
}