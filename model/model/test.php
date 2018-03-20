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
        var_dump($_REQUEST);
        var_dump($_GET);
        var_dump($_POST);
        \Request::picoutdata("token");
        var_dump($_REQUEST);
        var_dump($_GET);
        var_dump($_POST);
        
    }
}
