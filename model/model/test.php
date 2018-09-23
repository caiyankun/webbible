<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

namespace model;

/**
 * Description of test
 * @author Kevin
 */
class test {
    public function createtoken($param) {
        $userinfo=array("test"=>$param,"test2"=>"test2");
        $a= \Token::create($userinfo,1);
        echo $a;
    }
    public function checktoken($param){
        if(\Token::check($param)){
            var_dump(\Token::$userinfo);
        } else {
            echo \Token::$errorcode;
            echo \Token::$errorinfo;
        }
    }
    public function test(){
        if(\Db::simplecall("caiyankun.ebox_update", ["220", 'domain="测试",title="测试标题",content="测试内容222266"', "", 0, ""])){
            \Response::returntaskok("成功了啊！");
            \Response::returntaskok(\Db::cubedatawithtitle());
            
        } else {
            \Response::returntaskok("为什么失败？");
            \Response::returntaskfail(\Db::$info);
        }
        
    }
}
