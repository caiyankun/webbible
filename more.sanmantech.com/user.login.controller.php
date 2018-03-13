<?php
    \View::rolecheck(0,"<=","","/user/info.php");
    \View::maxim();
    \View::createview(["godbless","bootstrap3.3.5"]);
?>
<script language="javascript" type="text/javascript">


//0-6 程序执行的开始，声明页面必须的变量，变量的要求，以及数据交换业务的定义,以及事件
!(typeof God==='undefined')&&!(typeof jQuery==='undefined')&&$(document).ready(function(){
    //1-6 定义页面中要使用的全部变量声明
    sm.datasource.extend({
        title:"欢迎登录！",//文档的标题
        uname:"",
        upass:"",
        vericode:"",
        keeplogin:-3600,
    }).mergemaxim();
    //2-6 定义页面中数据的校验
    sm.datavalidation.extend({
        uname:/@/,
        upass:/.{8,}/,
        vericode:/^.{4}$/,
        keeplogin:function(){
        	//alert(JSON.stringify(this));
        	if($$.htmlvar("keeplogin")){
        		this.keeplogin=60*60*24*7;
        		//alert(this.keeplogin);
        	} else {
        		this.keeplogin=-3600;
        		//alert(this.keeplogin);
        	}
        	
        	return true;
        },
    });
    sm.datavalidation.fail=function(varname){
    	$$.jqhtmlvar(varname).addClass("alert alert-danger");
    	$(".validfailinfo").html("数据校验不通过："+varname).show();
    }
    //3-6 定义页面数据用到的交换，
    sm.dataexchange.define("login",{
        url:"/user/login.func",
        subdata:".form.login",
        taskok:function(d){
        	//alert("登录成功："+d);
        	sm.page.reload();
        },
        taskfail:function(d,s){
        	alert("登录失败:"+d+"\r\n错误类型："+JSON.stringify(s));
        	var newsrc=$("#vericode")[0].src+"?"+Math.random();
        	$("#vericode")[0].src=newsrc;
        	//$("#vericode").attr("src",$("#vericode").attr("src")+"?"+Math.random());
        },
        
    });
    //4-6 定义页面中的事件地图
    sm.event.map("body *","click.button",{
        'text:登录':function(){
        	sm.dataexchange.login();
        },
        
        'text:没有账户?点击注册':function(){
        	sm.page.reload("/user/register.php");
        },
    }).map("body *","change.input",{
    	'input.form':function(){
    		$(this).removeClass("alert alert-danger");
    		$(".validfailinfo").html("").hide();
    	},
    
    });
    //5-6 执行初始化
    $$.autominheighttowindow();
    sm.autoinit();
	
});


//6-6 定义自定义变量，函数


</script>
