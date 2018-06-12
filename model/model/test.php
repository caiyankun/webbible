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
    public function test($str=""){
        //$str="sale.cat,sale.hotbrand,sale.hotlist,sale.post";
        $rs=explode(",",$str);
        foreach ($rs as $k) {
            $keynames=explode("=>",$k);
            if(sizeof($keynames)>1){$keyname=$keynames[1];}else{$keyname=$keynames[0];}
            echo $keyname;
        }
        
    }
}
