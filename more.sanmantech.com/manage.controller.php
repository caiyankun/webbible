<?php
    \View::rolecheck(101,">=","","/user/login.php");
    \View::maxim();
    \View::createview(["godbless","bootstrap3.3.5"]);
?>

<script language="javascript" type="text/javascript">


//0-6 程序执行的开始，声明页面必须的变量，变量的要求，以及数据交换业务的定义,以及事件
!(typeof God==='undefined')&&!(typeof jQuery==='undefined')&&$(document).ready(function(){
    //1-6 定义页面中要使用的全部变量声明
    sm.datasource.extend({
        title:"摩尔衣橱后台管理平台！",//文档的标题
    }).mergemaxim();
    //2-6 定义页面中数据的校验
    sm.datavalidation.extend({
    });
    sm.datavalidation.fail=function(varname){
    }
    //3-6 定义页面数据用到的交换，
    sm.dataexchange.define("login",{
        url:"/user/login.func",
        subdata:".form.login",
        taskok:function(d){

        },
        taskfail:function(d,s){

        },
    });
    //4-6 定义页面中的事件地图
    sm.event.map("body *","click.button",{
        'text:登录':function(){

        },
        
        'text:没有账户?点击注册':function(){

        },
    }).map("body *","change.input",{
    	'input.form':function(){

    	},
    
    });
    //5-6 执行初始化
    $$.autominheighttowindow();
    sm.autoinit();
	
});


//6-6 定义自定义变量，函数


</script>