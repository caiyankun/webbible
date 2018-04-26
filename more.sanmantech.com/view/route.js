sm.route.watch({
    "#login.html":function(){
       sm.view.makeui("noname",["view/pages/login.html"]);
    },
    "#register.html":function(){
       sm.view.makeui("noname",["view/pages/register.html"]);
    },
    "^\#?$":function(hash){
       sm.route.to("#manage/home.html");
    },
    "^\#(manage\/(home|member|product|order|marketing|shop|finance|report|picture)\.html)$":function(hash){
        sm.user.checkright(801).success(function(){
           var path;
            hash.replace(/^\#(.*\.html)$/,function(t,v){path=v;});
            sm.view.setvar("layout.curpath",path.split("/"),"common");
            path="view/pages/"+path;
            sm.view.makeui("hadmin",["view/parts/navbar.hadmin.html@left","view/parts/toolbar.hadmin.html@toolbar",path+"@page"]);
            
       }).error(function(){
           sm.route.to("#login.html");
       });
    },

    "(.*)":function(hash){
       document.body.innerText="404";
    },
});
