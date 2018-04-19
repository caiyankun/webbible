/**这个文件是项目自定义的文件，是对框架中默认方法，数据的重定义，会覆盖掉框架中默认的数据值，函数方法**/

sm.coms.require(["hadmin.global"]).then(function(){
    
    //(1)项目中所有遇到的远程url建议都定义在这里，主机地址，方便后续更改：
    sm.server.extend({
        host:"http://more.sanmantech.com/",
        adjustdata:function(){
            //每次请求之前会自动执行一下这个函数：对数据进行矫正，这里自动添加token
            if(!this.hasOwnProperty("token")&&sm.user.info.token){
                this["token"]=sm.user.info.token;
            }
        },
        urls:{
            login:"user/login.func",
            showme:"user/showme.func",
            logout:"user/logout.func",
        }
    });
    //(2)如果路由中需要用到用户权限验证的功能，就必须重写框架中用户登录相关的函数：
    sm.user.extend({
        info:{"uid":0,"uname":"请登录","nickname":"请登录","ulevel":0,"token":""},//游客状态中的用户信息
    }).extendproto({
        getinfo:function(remote=false){
            var me=this;
            if(sm.localStorage.getobj("userinfo")){
                me.info=sm.localStorage.getobj("userinfo");
                console.log(sm.user.info);
            }
            remote&&sm.ajax.smurl("showme").smpost().then(function(d){
                me.info=d;//后台showme函数故意没有返回token，这里会有问题！当token失效时
                if(me.info.uid!==d.uid){
                    me.logout();
                }
            });
            return me.info;
        },
        logout:function(){
            sm.ajax.smurl("logout").smpost().then();
            this.info={"uid":0,"uname":"请登录","nickname":"请登录","ulevel":0,"token":""};//恢复用户信息为游客状态
            localStorage.removeItem("userinfo");
            console.log(sm.user.info);
        },
        login:function(uname,upass,vericode,keeplogin=false,successcb=function(){},failcb=function(){}){
            var me=this;
            sm.ajax.smurl("login").smpost({uname:uname,upass:upass,vericode:vericode,keeplogin:keeplogin}).then(function(d){
            //sm.ajax.url(sm.host+"test/post.func").smpost({uname:uname,upass:upass,vericode:vericode,keeplogin:keeplogin}).then(function(d){
                me.info=d;
                sm.localStorage.setobj("userinfo",d);
                successcb.apply(me,[d]);
            },function(i){
                failcb.apply(me,[i]);
            });
        },
    });
    //(3)自动获取一次本地保存的用户状态
    sm.user.getinfo();//获取一次本地登录状态
    
    //(4)启动路由文件
    sm.document.ready(function(){
        sm.route.startup("view/route.js");
    });
},function(i){
    alert("程序终止运行，由于程序运行必要的插件加载失败："+i);
});
