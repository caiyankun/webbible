sm.route.watch({
    "^\s*$":function(){
       sm.view.makeui("noname",["view/pages/index.html"]); 
    },
    "#index.html":function(){
        console.log("why!!!!!!!!!!!!!!!");
       sm.view.makeui("noname",["view/pages/index.html"]); 
    },
    
    
    /////更多的路由请插在这里之前    
    "(.*)":function(hash){
       document.body.innerText="404";
    },
});
console.log("router.js加载完成！");
