sm.route.watch({
    "#login.html":function(){
       sm.view.makeui("noname",["view/pages/login.html"]);
    },
    "#register.html":function(){
       sm.view.makeui("noname",["view/pages/register.html"]);
    },
    "^\#?$":function(hash){
       document.body.innerText="index.html";
    },
    "(.*)":function(hash){
       document.body.innerText="404";
    },
    
});
