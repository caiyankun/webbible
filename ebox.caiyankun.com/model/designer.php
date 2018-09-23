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
        foreach ($_REQUEST as $key => $value){
            if(in_array($key, array(
                "name",
                "businesstype",
                "categry",
                "size",
                "onboard",
                "material",
                "uniprice",
                "saleprice",
                "tag",
                "quota",
                "occasion",
                "color",
                "additional",
                "smallpic",
                "midpic",
                "largepic",
                "option"
            ))){
                if(empty($productinfo)){
                    $productinfo=$productinfo.$key."=\"".$value."\"";
                } else {
                    $productinfo=$productinfo.",".$key."=\"".$value."\"";
                }
            }

        }
        \User::checkright(200)||\Response::returntaskfail("您还未登录，请先登录！！",2,"您还未登录，请先登录！");
        if(!\Db::simplecall("more.designercreatework", array(\User::uid(),$productinfo))){
            \Response::returntaskfail("存储过程调用失败！",\Db::$error,\Db::$info);
        } else {
            \Response::returntaskok(\Db::cubedatawithtitle());
        }
    }

    /**
     * 删除作品
     */
    public function delwork($pid){
        \User::checkright(200)||\Response::returntaskfail("您还未登录，请先登录！！",2,"您还未登录，请先登录！");
        if(!\Db::simplecall("more.designerdelwork", array(\User::uid(),$pid))){
            \Response::returntaskfail("存储过程调用失败！",\Db::$error,\Db::$info);
        } else {
            \Response::returntaskok(\Db::cubedatawithtitle());
        }
    }

    /**
     * 修改作品
     */
    public function updwork($pid,$productinfo){
        $content="";
        
        if(is_string($productinfo)){
            try {
                $productinfo= json_decode($productinfo);
            } catch (Exception $exc) {
               
            }
                    
        }
        if(!is_object($productinfo)){
            \Response::returntaskfail("业务执行失败！", 2, "更新字段格式不正确！");
        }
        foreach ($productinfo as $key => $value){
            
            if(in_array($key, array(
                "name",
                "businesstype",
                "categry",
                "size",
                "onboard",
                "material",
                "uniprice",
                "saleprice",
                "tag",
                "quota",
                "occasion",
                "color",
                "additional",
                "smallpic",
                "midpic",
                "largepic",
                "option"
            ))){
                if(empty($content)){
                    $content=$content.$key."=\"".$value."\"";
                } else {
                    $content=$content.",".$key."=\"".$value."\"";
                }
            }
            
            
            
            
        }
        \User::checkright(200)||\Response::returntaskfail("您还未登录，请先登录！！",2,"您还未登录，请先登录！");
        if(!\Db::simplecall("more.designerupdwork", array(\User::uid(),$pid,$content))){
            \Response::returntaskfail("存储过程调用失败！",\Db::$error,\Db::$info);
        } else {
            \Response::returntaskok(\Db::cubedatawithtitle());
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
            \Response::returntaskok(\Db::cubedatawithtitle());
        }
    }
}