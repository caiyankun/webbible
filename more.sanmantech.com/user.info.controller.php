<?php
    \View::rolecheck(1,">=","","/user/login.php");
    \View::maxim();
    \View::createview(["godbless","bootstrap3.3.5","bt3table_userinfo"]);
?>
<script language="javascript" type="text/javascript">


//0-6 程序执行的开始，声明页面必须的变量，变量的要求，以及数据交换业务的定义,以及事件
!(typeof God==='undefined')&&!(typeof jQuery==='undefined')&&$(document).ready(function(){
    //1-6 定义页面中要使用的全部变量声明
    sm.datasource.extend({
        title:"用户信息！",//文档的标题
    }).mergemaxim();
    //2-6 定义页面中数据的校验
    sm.datavalidation.extend({

    });
    sm.datavalidation.fail=function(varname){

    }
    //3-6 定义页面数据用到的交换，
    sm.dataexchange.define("getuserinfo",{
        url:"/user/info.func",
        subdata:"#nothing",
        taskok:function(d){
        	alert("登录成功："+d);
        	
        },
        taskfail:function(d){
		alert("登录失败："+d);
        },
        
    });
    //4-6 定义页面中的事件地图
    sm.event.map("body *","click.button",{

    }).map("body *","change.input",{

    });
    //5-6 执行初始化
    
    sm.autoinit();
    $("#mainbody").append(sm.ui.makeout("bt3table_userinfo",sm.datasource.user));
    
    $$.autominheighttowindow();//这句话一定要放在最后，否则没有效果？？
});


//6-6 定义自定义变量，函数


</script>
