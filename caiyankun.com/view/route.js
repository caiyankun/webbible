sm.route.watch({
    "^\s*$":function(){
       sm.coms.require(["less"]).then(function(){
            sm.view.makeui("noname",["view/pages/index.html"]); 
        });
    },
    "#test.html":function(){
        console.log("已经过来了啊!");
        sm.coms.require(["less"]).then(function(){
            sm.view.makeui("noname",["view/pages/test.html"]); 
        });
    },
    "#date.html":function(){

        sm.coms.require(["less"]).then(function(){
            sm.view.makeui("noname",["view/pages/date.html"]); 
        });
    },
    "#user.html":function(){
        console.log("已经过来了啊!");
        sm.coms.require(["less"]).then(function(){
            sm.view.makeui("noname",["view/pages/user.html"]); 
        });
        
    },
    "#notes.html":function(){
        sm.coms.require(["less","calendar"]).then(function(){
            sm.user.islogin(100).then(function(){
                sm.view.makeui("noname",["view/pages/notes.html"]); 
            },function(){
                sm.view.makeui("noname",["view/pages/user.html"]); 
            });
        });
    },
    "#editor.html":function(){
        sm.coms.require(["less","calendar"]).then(function(){
            sm.user.islogin(100).then(function(){
                sm.view.makeui("noname",["view/pages/editor.html"]); 
            },function(){
                sm.view.makeui("noname",["view/pages/user.html"]); 
            });
        });
    },
    "#task.html":function(){
        sm.coms.require(["less","calendar"]).then(function(){
            sm.user.islogin(100).then(function(){
                sm.view.makeui("noname",["view/pages/task.html"]); 
            },function(){
                sm.view.makeui("noname",["view/pages/user.html"]); 
            });
        });
    },
    "#index.html":function(){
       sm.coms.require(["less"]).then(function(){
            sm.view.makeui("noname",["view/pages/index.html"]); 
        });
    },

    /////更多的路由请插在这里之前    
    "(.*)":function(hash){
       document.body.innerText="404";
    },
});
console.log("router.js加载完成！");
