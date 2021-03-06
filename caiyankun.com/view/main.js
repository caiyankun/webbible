/**这个文件是项目自定义的文件，是对框架中默认方法，数据的重定义，会覆盖掉框架中默认的数据值，函数方法**/

sm.coms.require(["less"]).then(function(){
    console.log("组件已经加载完成？"+sm.coms.loadedlist);
    //(1)项目中所有遇到的远程url建议都定义在这里，主机地址，方便后续更改：
    sm.server.extend({
        //host:"http://more.sanmantech.com/",
        //host:"http://local.more.com/",
        host:"/",
        adjustdata:function(){
            //每次请求之前会自动执行一下这个函数：对数据进行矫正，这里自动添加token
            if(!this.hasOwnProperty("token")&&sm.user.info.token){
                this["token"]=sm.user.info.token;
                console.log(this);
            }
        },
        urls:{
            //showme:"user/showme.func",
            //homestat:"shop/homestat.func"
        }
    });
    //(2)如果路由中需要用到用户权限验证的功能，就必须重写框架中用户登录相关的函数：
    sm.user.extend({
        info:{"uid":0,"uname":"请登录","nickname":"请登录","ulevel":0,"token":""},//游客状态中的用户信息
    }).extendproto({

    });
    //(3)自动获取一次本地保存的用户状态

    
    //(4)启动路由文件
    sm.document.ready(function(){
        console.log('document已经ready进行执行相关的路由操作？');
        sm.route.startup("view/route.js");
    });
},function(i){
    alert("程序终止运行，由于程序运行必要的插件加载失败："+i);
});
console.log("main.js加载完成！");