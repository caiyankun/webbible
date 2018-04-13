//如果路由中需要用到用户权限验证的功能，就必须重写框架中用户相关的函数：
sm.host="http://more.sanmantech.com/";
sm.user.extend({
    info:{"uid":0,"uname":"请登录","nickname":"请登录","ulevel":0,"token":""},//游客状态中的用户信息
}).extendproto({
    getinfo:function(remote=false){
        var me=this;
        if(sm.localStorage.getobj("userinfo")){
            me.info=sm.localStorage.getobj("userinfo");
            console.log(sm.user.info);
        }
        remote&&sm.ajax.url(sm.host+"user/showme.func").smpost().then(function(d){
            me.info=d;
            console.log(sm.user.info);
        });
        
    },
    logout:function(){
        sm.ajax.url(sm.host+"user/logout.func").post().then();
        this.info={"uid":0,"uname":"请登录","nickname":"请登录","ulevel":0,"token":""};//恢复用户信息为游客状态
        localStorage.removeItem("userinfo");
        console.log(sm.user.info);
    },
    login:function(uname,upass,vericode,keeplogin=false){
        var me=this;
        sm.ajax.url(sm.host+"user/login.func").smpost({uname:uname,upass:upass,vericode:vericode,keeplogin:keeplogin}).then(function(d){
        //sm.ajax.url(sm.host+"test/post.func").smpost({uname:uname,upass:upass,vericode:vericode,keeplogin:keeplogin}).then(function(d){
            me.info=d;
            sm.localStorage.setobj("userinfo",d);
            console.log(sm.user.info);
        },function(i){
            alert("登录失败："+i);
        });
    },
});
sm.user.getinfo();//获取一次本地登录状态