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
        //put your code here
    public function help(){
        return $this->para();
    }
    public function para(){
        echo "您还有如下测试函数:nopara();twopara($a,$b);twoparawithdefault($a=1,$b=2)<br>";
        echo "参数传递方式示例1：xxx.com/类/函数.func/值1/值2.. (参数个数不能少于函数定义的没有默认参数的个数)<br>";
        echo "参数传递方式示例2：xxx.com/类/函数.func/?参数1=值1&参数2=值2.. (参数个数不能少于函数定义的没有默认参数的个数，顺序不限)<br>";
        echo "参数取值优先级：Pathinfo方式优先-->Get方式其次-->默认参数兜底 如果缺少参数的话会报错";
    }
    public function nopara(){
        echo "You have success enter nopara function: nopara()<br>";
        echo "参数传递方式示例1：xxx.com/类/函数.func/值1/值2.. (参数个数不能少于函数定义的没有默认参数的个数)<br>";
        echo "参数传递方式示例2：xxx.com/类/函数.func/?参数1=值1&参数2=值2.. (参数个数不能少于函数定义的没有默认参数的个数，顺序不限)<br>";
        echo "参数取值优先级：Pathinfo方式优先-->Get方式其次-->默认参数兜底 如果缺少参数的话会报错";
        echo "您还有如下测试函数:nopara();twopara($a,$b);twoparawithdefault($a=1,$b=2)<br>";
    }
    public function twopara($a,$b){
        echo "You have success enter two para function:twopara($a,$b)<br>";
        echo $a.$b;
        echo "<br>参数传递方式示例1：xxx.com/类/函数.func/值1/值2.. (参数个数不能少于函数定义的没有默认参数的个数)<br>";
        echo "参数传递方式示例2：xxx.com/类/函数.func/?参数1=值1&参数2=值2.. (参数个数不能少于函数定义的没有默认参数的个数，顺序不限)<br>";
        echo "参数取值优先级：Pathinfo方式优先-->Get方式其次-->默认参数兜底 如果缺少参数的话会报错";
        echo "您还有如下测试函数:nopara();twopara($a,$b);twoparawithdefault($a=1,$b=2)<br>";
        
    }
    public function twoparawithdefault($a=1,$b=2){
        echo "You have success enter two para with default function!\r\n";
        echo $a.$b;
        echo "<br>参数传递方式示例1：xxx.com/类/函数.func/值1/值2.. (参数个数不能少于函数定义的没有默认参数的个数)<br>";
        echo "参数传递方式示例2：xxx.com/类/函数.func/?参数1=值1&参数2=值2.. (参数个数不能少于函数定义的没有默认参数的个数，顺序不限)<br>";
        echo "参数取值优先级：Pathinfo方式优先-->Get方式其次-->默认参数兜底 如果缺少参数的话会报错";
        
    }
}
