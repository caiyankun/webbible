sm.route.watch({
    "^\s*$":function(){
       sm.view.makeui("noname",["view/pages/index.html"]); 
    },
    "#test.html":function(){
        console.log("已经过来了啊!");
        sm.coms.require(["less"]).then(function(){
            sm.view.makeui("noname",["view/pages/test.html"]); 
        });
        
    },
    "#notes.html":function(){
        sm.coms.require(["layui"]).then(function(){
            sm.view.makeui("noname",["view/pages/notes.html"]); 
        });
        
    },
    "#editor.html":function(){
        sm.coms.require(["less"]).then(function(){
            sm.view.makeui("noname",["view/pages/editor.html"]); 
        });
    },
    "#task.html":function(){
        sm.coms.require(["less","calendar"]).then(function(){
            sm.view.makeui("noname",["view/pages/task.html"]); 
        });
    },
    "#index.html":function(){
       sm.coms.require(["jquery","bootstrap.v3"]).then(function(){
            sm.view.makeui("noname",["view/pages/index.html"]); 
        });
       
    },

    /////更多的路由请插在这里之前    
    "(.*)":function(hash){
       document.body.innerText="404";
    },
});
console.log("router.js加载完成！");
