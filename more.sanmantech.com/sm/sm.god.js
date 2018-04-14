!window.onerror&&(window.onerror=function(m,u,l){alert ('神码加载出错:\r\n【文件】:'+u+"\r\n【行】:"+l+"\r\n【信息】:"+m);});

//---------------God.js Core 开始：sm及原型定义，链式操作--------------------

if (true){
    
//原型定义-开始:--sm及God原型定义，链式操作
if(true){
if (typeof God==='undefined') {God={};}//定义分开是为了方便弱化对js文件的加载顺序的要求
if (typeof sm==='undefined') { //减少内存消耗以及区隔不同组件的自定义值的关联
    sm=function(comname){
        this.__proto__=God;
        this.whoami=comname;
    };
    sm.__proto__=God;
    sm.whoami="sm";
}
God.whoami='God';
God.sm=sm;//完善链式操作-自身
God.run=function(func){func.apply(this);return this;};//完善链式操作-自身与普通函数代码
}
//原型定义-结束:--sm及God原型定义，链式操作

//组件机制-开始：组件的定义，成员添加，定义快捷别名等
if(true) {
God.coms=function(comname){//简化组件的定义原型连链：sm.xx->God.xx->sm->God
    if (sm.hasOwnProperty(comname)){return sm[comname];}
    God[comname]={__proto__:sm,whoami:'God.'+comname};
    sm[comname]={__proto__:God[comname],whoami:'sm.'+comname};
   return sm[comname];
};
God.define=function(func){func.apply(this);return this;};//简化组件成员添加 - 函数方式
God.extend=function(o){for (x in o) {this[x]=o[x];} return this;};//简化组件成员添加-对象方式
God.extendproto=function(o){for (x in o) {this.__proto__[x]=o[x];} return this;};//简化组件成员添加-对象方式
God.alias=function(newname){window[newname]=this;return this;};//为组件生成别名，简化组件的调用方式
}
//组件机制-结束：组件的定义，成员添加，定义快捷别名等

//组件的公共方法：设置，显示自己，程序执行错误状态，回调
if(true){
God.setup=function (os){
    if(!this.hasOwnProperty("_setup")){this._setup={};}
    if(arguments.length<1){
        return this._setup;
    } else {
        $$.merge.apply(this._setup,[os]);//为了考虑链式操作，这样好不？
        return this;
    }
};
God.showme=function(){alert(this.whoami);return this;}
God.clearstat=function(){this._stat={error:0,info:""};return this;}
God.error=function(e,i){
    if($$.isfunction(e)){
        if(this._stat.error!==0){
            e.apply(this,[this._stat.error,this._stat.info]);
        }
    } else {
        this._stat.error=e;this._stat.info=i;
    }
    return this;
};
God.stat=function(){return this._stat;}
God.taskfail=function(cb){return this.error.apply(this,arguments);}
God.success=function(cb){
    var me=this;
    if($$.isfunction(cb)){
        if(me._stat.error==0){
            cb.apply(me);
        }
    } 
    return this;
}
God.taskok=function(cb){return this.success.apply(this,arguments);}
God.new=function(){
    var newist=new function(){};
    newist.__proto__=this.__proto__;
    return newist;
}//创建一个新实例
God.merge=function(o){for (x in o) {this[x]=o[x];} return this;}//把给定的对象的全部属性融合到自身中
God.safemerge=function(o){for (x in o) {this.hasOwnProperty(x)&&(this[x]=o[x]);} return this;}//把给定的对象中与自身相交的属性值更新到自身中
}
//组件的公共方法：设置，显示自己，程序执行错误状态，回调

}

//----------------God.js Core 结束：sm及原型定义，链式操作--------------------


if (true){


(function () {
   var ie = !!(window.attachEvent && !window.opera);
   var wk = /webkit\/(\d+)/i.test(navigator.userAgent) && (RegExp.$1 < 525);
   var fn = [];
   var run = function () { for (var i = 0; i < fn.length; i++) fn[i](); };
   var d = document;
   d.ready = function (f) {
      if (!ie && !wk && d.addEventListener)
      return d.addEventListener('DOMContentLoaded', f, false);
      if (fn.push(f) > 1) return;
      if (ie)
         (function () {
            try { d.documentElement.doScroll('left'); run(); }
            catch (err) { setTimeout(arguments.callee, 0); }
         })();
      else if (wk)
      var t = setInterval(function () {
         if (/^(loaded|complete)$/.test(d.readyState))
         clearInterval(t), run();
      }, 0);
   };
})();//增加document.ready功能

}

//-----------------------基础组件定义:-----------------------------------------------

if(true){
window.varfuns=[];//{varstr:[{node:node,attr:attr,updatecb:updatecb},{node:node,attr:attr,updatecb:updatecb}]}
window.domevent_cb=[];//这里存储所有的whatch DOM相关的回调函数
window.domevent_listener=[];//这里存储所有的whatch DOM相关的回调函数

God.coms("func").extendproto({
isempty:function(varname){return !varname;},
isnull:function(varname){return  (!varname&& typeof(varname)!="undefined" && varname!=0);},
isobj:function(varname){return Object.prototype.toString.call(varname) === '[object Object]'; },
isarray:function(varname){return Object.prototype.toString.call(varname) === '[object Array]'; },
isna:function(varname){return isNaN(varname);},
isundefined:function(varname){return typeof(varname) == "undefined";},
isdefined:function(varname){return !(typeof(varname) == "undefined");},
isfunction:function(varname){return (typeof(varname) == "function");},
merge:function(o){for (x in o) {this[x]=o[x];} return this;},//把给定的对象的全部属性融合到自身中
safemerge:function(o){for (x in o) {this.hasOwnProperty(x)&&(this[x]=o[x]);} return this;},//把给定的对象中与自身相交的属性值更新到自身中
rndid:function(prix){prix=arguments[0]?(arguments[0]+"_"):"";return prix+parseInt(1000000*Math.random());},
foreach:function(obj,cb){
    if($$.isobj(obj)){
        Object.keys(obj).forEach(function(k){
            cb(k,obj[k]);
        });
    } else {
        if(!$$.isarray()){obj=[obj];}
        obj.forEach(function(k){
            cb(k,obj[k])
        });
    }
},
});
window.$$=God.$$=God.func;//方便对全局函数的引用，位置不能改
God.coms("document").extendproto({//目的是定义页面跳转，页面信息，用户界面刷新等一系列操作
ready:function(){document.ready.apply(this,arguments);return this;},//请注意This指针无法传递到函数内部
reload:function(newurl){
    if(arguments[0]) {
        window.location.href=newurl;
    } else {
    	location.reload();
    }
    return this;
},
open:function(newurl){
    window.open(newurl);
    return this;
},
href:function(){
    return window.location.href;
},
title:function(newtitle=""){document.title=newtitle==""?document.title:newtitle;return this;},
create:function(str){
    var t=document.createElement("div");
    t.innerHTML=str;
    var rs=[];
    var nodes=t.childNodes;
    var n=nodes.length;
    for (var i=0;i<n;i++){rs.push(nodes[i]);}
    return rs;
},
});
God.coms("ajax").extend({
    _setup:{
        data:{},
        type:"POST",
        async:true,
        url:"#",
    },   
}).extendproto({
type:function(newtype){this.setup({type:newtype});return this;},
data:function(newdata){this.setup({data:newdata});return this;},
url:function(newurl){this.setup({url:newurl});return this;},
smurl:function(su){return this.url(sm.server.url(su));},
async:function(b){this.setup({async:b});return this;},
post:function(data,url,async){
    arguments.length>2&&(this.async(async));
    arguments.length>1&&(this.url(url));
    arguments.length>0&&(this.data(data));
    return this.type("POST").clearstat().doxhr();
},
smpost:function(data,url,async){
    arguments.length>2&&(this.async(async));
    arguments.length>1&&(this.url(url));
    arguments.length>0&&(this.data(data));
    return this.type("POST").clearstat().doxhr({},true);
},
doxhr:function(paraobj,smfcheck=false){
    var me=this;
    const promise = new Promise(function(resolve, reject) {
        //请求的5个阶段，对应readyState的值
        //0: 未初始化，send方法未调用；
        //1: 正在发送请求，send方法已调用；
        //2: 请求发送完毕，send方法执行完毕；
        //3: 正在解析响应内容；
        //4: 响应内容解析完毕；
        me.setup(paraobj);
        var data = me.setup().data;
        var xhr = new XMLHttpRequest();        //创建一个ajax对象
        xhr.onreadystatechange = function(event){    //对ajax对象进行监听
            if(xhr.readyState == 4){    //4表示解析完毕
                if(xhr.status == 200){    //200为正常返回
                    if(smfcheck){
                        if(me.smfcheck(xhr.responseText)){
                            return resolve(JSON.parse(xhr.responseText).data);
                        } else {
                            try {
                                var errorinfo=JSON.parse(xhr.responseText).stat.info;
                            } catch(e){
                                errorinfo=xhr.responseText;
                            }
                            return reject(errorinfo);
                        }
                    } else {
                        return resolve(xhr.responseText);
                    }
                } else {
                    me.error(1,xhr.status);
                    return reject(xhr.status);
                }
            }
        };
        xhr.open(me.setup().type,me.setup().url,me.setup().async);    //建立连接，参数一：发送方式，二：请求地址，三：是否异步，true为异步
        xhr.setRequestHeader('Content-type','application/x-www-form-urlencoded');    //可有可无
        //post参数要转换格式啊-_-!!!
        //console.log(me.formatdata(data));
        xhr.send(me.formatdata(data)); 
        me.setup().data={};
    });
    return promise;
},
formatdata:function(obj){
    sm.server.adjustdata.apply(obj);
    if(!obj) {return null;}
    if(typeof obj!=="object"){return obj;}
    var rs="";
    for(var k in obj){
        if(rs!==""){rs=rs+"&";}
        rs=rs+k+"="+obj[k];
    }
    if(rs==""){
        return null;
    }
    return rs;
},
loadhtml:function(htmlfile,target="body",cb=function(){},cleartarget=false,remote=true){
    if(target.nodeType!==1){
        target=document.querySelector(target);
        if(!target){return this;}
    }
    var me=this;
    if(remote){
        me.load(htmlfile).then(function(d){
            me.loadhtml(d,target,cb,cleartarget,false);
        });
    }else {
        cleartarget&&(target.innerHTML="");
        cleartarget=false;
        //难点在于js的加载是异步的
        var htmldiv =document.createElement("div");
        var bash=document.createElement("div");
        htmldiv.innerHTML=htmlfile;
        var scriptstr="";
        var scripts=htmldiv.getElementsByTagName('script');
        var newscripts=[];
        var sl=scripts.length;
        for(var i=0;i<sl;i++){
            var script=document.createElement("script");
            script.text=scripts.item(0).text;
            scripts.item(0).src&&(script.src=scripts.item(0).src);
            newscripts.push(script);
            bash.appendChild(scripts.item(0));
        }//剥离Script,约定script必须在html之后，没有顺序

        var cnodes=htmldiv.childNodes;
        var nodenum=cnodes.length;
        for(var i=0;i<nodenum;i++){
            target.appendChild(cnodes[0]);
        }
        
      if(sl>0){
          var script=newscripts[0];
          bash.getElementsByTagName('script').item(0).remove();
          if(script.src){
              me.loadjs(script.src,function(){me.loadhtml(bash.innerHTML,target,cb,false,false);},target);
          } else {
              target.appendChild(script);
              me.loadhtml(bash.innerHTML,target,cb,false,false);
          }
      } else {
          cb();
      }  
    }
},
loadjs:function(jsfile,cb=function(){},target="body"){
    if(target.nodeType!==1){
        target=document.querySelector(target);
        if(!target){target=document.body;}
    }
    var script =document.createElement("script");
    script.src=jsfile;
    script.onload = script.onreadystatechange = function(){
        if( ! this.readyState     //这是FF的判断语句，因为ff下没有readyState这人值，IE的readyState肯定有值
              || this.readyState=='loaded' || this.readyState=='complete'   // 这是IE的判断语句
        ){
              cb();
        }
    }
    try{
        target.appendChild(script);
    }catch(e){}
    
},
loadcss:function(cssfile,cb){
    this.load(cssfile).then(function(d){
        var css =document.createElement("style");
        css.textContent=d;
        document.body.appendChild(css);
        cb();
    });
},
load:function(file,async=true){return sm.ajax.async(async).url(file).post();},
smfcheck:function(d){
    var me=this;
    me.clearstat();
    try{
        var jd=JSON.parse(d);
    }catch(e){
        me.error(2,"Response Data is not JSON Format!");
        return false;
    }
    if(typeof jd.stat=="undefined"||typeof jd.data=="undefined"){
        me.error(3,"Response Data is not sm Format!!")
        return false;
    }
    if(jd.stat.code!==0){
        me.error(jd.stat.code,jd.stat.info);
        return false;
    }
    return true;
},
});
God.coms("view").extendproto({//对话框
find:function(dataspace){
    var val=sm.view.data;
    var exp = dataspace.split('.');
    exp.forEach(function(k, i) {
        if(i<exp.length-1){
            (typeof val[k]=='undefined') && ( val[k]={});
            val = val[k];
        } else {
            (typeof val[k]=='undefined') && ( val[k]={});
            val=val[k];
        }
    });
    val._dataspace=dataspace;
    val.__proto__=this.method;
    val.method={};//谁也不继承，全部自己使用
    return val;
},
new:function(dataspace){
    var val=sm.view.data;
    var exp = dataspace.split('.');
    exp.forEach(function(k, i) {
        if(i<exp.length-1){
            (typeof val[k]=='undefined') && ( val[k]={});
            val = val[k];
        } else {
            if(typeof val[k]=='undefined') {
                val[k]={};
                val._dataspace=dataspace;
                val.__proto__=this.method;
                val.method={};//谁也不继承，全部自己使用
            };
            val=val[k];
        }
    });
    
    return val;
},//创建一个新的view实例
eventhandeler:function(e,dataspace){
    var me=this;
    var dwtree=me.domwatchingtree;
    var defaultevent="click";
    for (var k in dwtree){
        var cb=dwtree[k];
        var selector=k.split("@")[0];
        selector=selector.replace(/^id\:(.*)$/,function(t,v){return "[dom-id='"+v+"']";});
        var match=false;
        selector.replace(/^text\:(.*)$/,function(t,v){e.target.textContent==v && (match=true);});
        try{
            e.target.matches(selector)&&(match=true);
        } catch(e){
            
        }
        
        var curevent=k.substr(selector.length+1);
        if(curevent==""){curevent=defaultevent} else {defaultevent=curevent;}
        if(match&&("@"+curevent+"@").indexOf("@"+e.type+"@")>-1){
            //console.log(e.target.textContent+e.type+dataspace);
            cb.apply(me,[e,dataspace]);
        }
    }
    
    return this;    
},
method:{
    data:function(mapobj){
        var me=this;
        var dataspace=me._dataspace;
        $$.foreach(mapobj,function(k,v){
            sm.view.setvar(k,v,dataspace);
        });
        return this;
    },
    method:function(mapobj){
        var me=this;
        $$.foreach(mapobj,function(k,v){
            me[k]=v;
        });
        return this;
    },
    alias:function(newalias){window[newalias]=this;return this;},
    watchdom:function(mapobj,stopbuble=false){
        var me=this;
        //获取顶层节点
        var dataspace=me._dataspace;
        if(dataspace=="common"){
            var selector="body";
        }else {
            var selector="[dataspace='"+dataspace+"']";
        }
        var rootnode=document.querySelector(selector);
        if(!rootnode){return this;}
        if(!me.hasOwnProperty("domwatchingtree")){me.domwatchingtree={};}
        $$.merge.apply(me.domwatchingtree,[mapobj]);
        //给顶层节点增加事件处理函数，将其指向eventhandeler
        (typeof window.domevent_listener[dataspace]=='undefined')&&(window.domevent_listener[dataspace]={});
        var defaultevent="click";
        Object.keys(mapobj).forEach(function(k){
            var selector=k.split("@")[0];
            var curevent=k.substr(selector.length+1);
            if(curevent==""){curevent=defaultevent;} else {defaultevent=curevent;}
            curevent.split("@").forEach(function(ce){
                var realevent=ce.split(".")[0];
                //1,确保函数代理中心能响应该事件
                if(typeof window.domevent_listener[dataspace][realevent]=='undefined'){
                    window.domevent_listener[dataspace][realevent]=true;
                    rootnode.addEventListener(realevent,function(e){
                        sm.view.eventhandeler.apply(me,[e,dataspace]);
                    });
                }
            });   
        });
        return this;
    },
    watchdata:function(mapobj){
        var me=this;
        var dataspace=me._dataspace;
        Object.keys(mapobj).forEach(function(k){
            sm.view.getvar(k,dataspace);
            sm.view.varfunsadd(k,mapobj[k],dataspace);
        });
        sm.view.watchdata(sm.view.data,dataspace);
        return this;
    },
},//这里的函数都需要有this指针，会把当前实例需要的函数再次封装在这里
layout:{
    get:function(){
        var curlayout=document.querySelector("[layout]");
        return curlayout;
    },
    load:function(views,cb=function(){}){
        var curlayout=document.querySelector("[layout]");
        if(!curlayout){
            var nonamel=document.createElement("div");
            nonamel.setAttribute("layout","noname");
            nonamel.setAttribute("container","*");
            document.body.appendChild(nonamel);
            curlayout=nonamel;
        } 
        if(!curlayout.getAttribute("container")&&!curlayout.querySelector("[container]")){
            var container=document.createElement("div");
            container.setAttribute("container","*");
            curlayout.appendChild(container);
        }
        views.forEach(function(view){
            var viewname=view.split("@")[0];
            var filler=view.substr(viewname.length+1);
            if(filler==""){filler="*"}
            if(curlayout.getAttribute("container")==filler){
                sm.ajax.loadhtml(viewname,curlayout,function(){sm.view.init();sm.view.doonloadinit();cb.apply(sm.view,[viewname])},true);
            } else {
                var selector="[container='"+filler+"']";
                var target=curlayout.querySelector(selector);
                if(target){
                    sm.ajax.loadhtml(viewname,target,function(){sm.view.init();sm.view.doonloadinit();cb.apply(sm.view,[viewname]);},true);
                }
            }
        });
        return this;
    },
    clear:function(witch=""){
        var me=this;
        var curlayout=me.get();
        if(curlayout){
           if(curlayout.getAttribute("container")==witch||(curlayout.getAttribute("container")&&(witch==""))){curlayout.innerHTML="";}
           var cts=curlayout.querySelectorAll("[container]");
           var num=cts.length;
           for(var i=0;i<num;i++){
               if(cts[i]&&(cts[i].getAttribute("container")==witch||witch=="")){cts[i].innerHTML="";}
           }
        }
        return this;
    },
},
makeui:function(lname="",views=[],cb=function(){}){
    if(lname==""){lname="noname";}
    //先判断当前是否有layout，以及当前的layout是否是lname
    var curlayout=document.querySelector("[layout]");
    if(curlayout){curlayout=curlayout.getAttribute("layout");} 
    if(curlayout!==lname){
      sm.ajax.loadhtml("./view/layout/"+lname+".layout.html","body",function(){sm.view.init();sm.view.doonloadinit();sm.view.layout.load(views,cb);},true);  
    }  else {
        sm.view.layout.load(views,cb);
    }
    return sm.view.layout;
},
comget:function (com,dataspace="",deepinit=0){
    (dataspace=="")&&(dataspace="common");
    var $el = com.nodeType == 1 ? com : document.querySelector(com);
    this.elget($el,1,1,dataspace,deepinit);
    return this;
},//对某个组件实行全局get
comset:function (com,dataspace="",deepinit=0){
    (dataspace=="")&&(dataspace="common");
    var $el = com.nodeType == 1 ? com : document.querySelector(com);
    this.elset($el,1,1,dataspace,deepinit);
    return this;
},//对某个组件实行全局set
init:function (com="body",deepinit=1){
    
    //首先检查当前元素是不是组件，不是的话就拒绝初始化
    var $el = com.nodeType == 1 ? com : document.querySelector(com);
    if(!this.checkiscom($el)){return this;}
    //如果是组件的话，先确定当前组件的数据空间在哪里
    var dataspace=$el.getAttribute("dataspace");
    dataspace||(dataspace="common");
    //console.log("开始初始化一个组件："+dataspace);
    this.comset($el,dataspace,deepinit);
    this.comget($el,dataspace,deepinit);
    //this.watchdata(window.data);
    this.watchdata(sm.view.data,dataspace);
    return this;
},//View组件初始化，搜索全部的View组件并逐一进行一遍Get，Set然后对变量进行watch
//下面函数虽是View类，但不是给用户用的，因此不可见
groupelget:function(el,autoupdate,dataspace="",gselector="",gby="value",gas="",gon="input",gdeep=1){
    me=this;
    //获取数组的格式：getgroup:xxxx=变量,附加选项：group-selector,group-id,group-by,group-as,group-deepwatch,group-on
    //顺序：1，如果有group-selector直接用，没有的话，通过xxx或者groupid组装一个
    //2, 如果有group-by group-as group-deepwatch ,group-on则直接获取，没有的话，按照当前规则组装一下注意input类型和非input类型不一样
    //3, 开始执行groupelget -- 对应的还有groupelset
    var gselector=el.getAttribute("group-selector");
    if(!gselector){
        var gname="";
        var nodeAttrs = el.attributes;
        var attrName="";
        [].slice.call(nodeAttrs).forEach(function(attr) {
            /^getgroup\:/.test(attr.name)&&(attrName=attr.name);
        });
        //console.log("enter groupelget,attrname="+attrName);
        /^getgroup\:([_a-zA-Z\.]*)\:by/.test(attrName) && (gname=RegExp.$1);
        if(gname==""){
            gname=el.getAttribute("group-id");
            if(!gname){
                if(el.matches("input")&&el.getAttribute("name")){
                    gname=el.getAttribute("name");
                    gselector="input[name='"+gname+"']";
                } else {
                    gname="nonamegroup";
                }
            }
        }
        if(!gselector){
            gselector="[group-id='"+gname+"']";
        }
        el.setAttribute("group-selector",gselector);
    }//组装selector
    el.getAttribute("group-by")&&(gby=el.getAttribute("group-by"));
    el.getAttribute("group-on")&&(gon=el.getAttribute("group-by"));
    el.getAttribute("group-deepwatch")&&(gdeep=el.getAttribute("group-deepwatch"));
    el.getAttribute("group-as")&&(gas=el.getAttribute("group-as"));
    //console.log(gselector+gby+gon+gdeep+gas);
    //(1)首先看root节点是否要关联documentroot
    autoupdate&&(me.watchdom(el,dataspace,gon));//当发生gon中规定的事件时触发el的一次数据更新
    //遍历所有的数组
    var nodes=document.querySelectorAll(gselector);
    var rsvalue=[];
    nodes.forEach(function(node){
        var mgby=gby;
        var mgas=gas;
        var mgon=gon;
        var mgdeep=gdeep;
        node.getAttribute("group-by")&&(mgby=node.getAttribute("group-by"));
        node.getAttribute("group-on")&&(mgon=node.getAttribute("group-by"));
        node.getAttribute("group-deepwatch")&&(mgdeep=node.getAttribute("group-deepwatch"));
        node.getAttribute("group-as")&&(mgas=node.getAttribute("group-as"));
        var item=me.getattrvalue(node,mgby);
        if(mgas==""){
            rsvalue.push(item);
        } else {
            revalue[mgas]=item;
        }
        //console.log("找到一个数据源："+gselector+mgby+mgon+mgdeep+mgas);
        autoupdate&&(node!==el)&&(mgdeep)&&me.watchdom(node,dataspace,mgon,el);
    });
    return rsvalue;
},//通过给定的参数，获取一组元素的值，并组装成array或者obj
checkiscom:function(com){
    var $el = com.nodeType == 1 ? com : document.querySelector(com);
    if ($el==document.querySelector("body")){return true;}
    var nodeAttrs = $el.attributes;
    var iscom=false;
    [].slice.call(nodeAttrs).forEach(function(attr) {
        var attrName = attr.name;
        var regisget = /^com\:/;
        if (regisget.test(attrName)) {iscom=true;}
    });
    return iscom;
},
checkisfor:function(com){
    //console.log("检查是否是for:");
    if(com.nodeType !== 1){return false;}
    var nodeAttrs = com.attributes;
    var i=nodeAttrs.length;
    while(i-->0&&!/^for\:/.test(nodeAttrs[i].name)){}
    //console.log(nodeAttrs.length+":"+i);
    return nodeAttrs.length&&(i>-1);
},
checkislocked:function(com){
    //console.log("检查是否锁定");
    return (com.nodeType==1)&&com.getAttribute("view-locked");
},
elget:function (el,deep=0,autoupdate=1,dataspace="",deepinit=0){
    (dataspace=="")&&(dataspace="common");
    me=this;
    if(me.checkislocked(el)){return this;}
    //先判断当前节点是否是可操作的节点
    if(el.nodeType !== 1){
        return this;
    }
    //如果当前节点是一个com，那么就对当前数据空间添加对该节点的关注
    if(this.checkiscom(el)){
        var relateddataspaces=el.getAttribute("relateddataspaces");
        if(relateddataspaces){
            if(relateddataspaces.indexOf(dataspace+",")<0){
                //console.log("再次添加关注该DOM的命名空间:"+relateddataspaces+dataspace+",");
                el.setAttribute("relateddataspaces",relateddataspaces+dataspace+",");
            }
        } else {
            //console.log("首次添加关注该DOM的命名空间:"+dataspace);
            el.setAttribute("relateddataspaces",dataspace+",");
        }
        
    }
    //console.log("elget:"+el.innerHTML);
    
    //解析属性并将其指定的值赋值到变量
    var nodeAttrs = el.attributes;
    [].slice.call(nodeAttrs).forEach(function(attr) {
        var attrName = attr.name;
        var regisget = /(^|\:)get\:/;
        var regisgroup=/^getgroup\:/;
        var varname = attr.value;
        if (regisget.test(attrName)) {
            attrName=attrName.replace(/^(get\:)|(set\:)/,"").replace(/^(get\:)|(set\:)/,"");
            var realattr=attrName.split("=")[0];
            
            //这里要判断一下varname是不是多个！
            //这里要判断一下realattr是不是多个！如果varname是表达式，那么不予执行
            if(/^\s*[_\.a-zA-Z0-9\,]*$/.test(varname)){
                var varnames=varname.split(',');
                var pureattr=realattr.split('@')[0].split('-')[0];//获取属性值到变量时只允许一对多
                //console.log(realattr+"-elget:"+varname+"-dataspace:"+dataspace+"-value:"+me.getattrvalue(el,realattr));
                varnames.forEach(function(varname){
                    me.setvar(varname,me.getattrvalue(el,pureattr),dataspace);
                });
                var getevents=realattr.substr(realattr.split('@')[0].length+1);
                //判断是否绑定自动更新
                getevents||(getevents="input");
                getevents.split("@").forEach(function(ename){
                    autoupdate&&(me.watchdom(el,dataspace,ename));
                });
            } 
        } //如果符合get:的话的处理方式：结束
        else if(regisgroup.test(attrName)){
            //开始获取
            //console.log("识别到了一个group变量需要提取："+attrName);
            me.setvar(varname,me.groupelget(el,autoupdate,dataspace),dataspace);
        }//如果符合getlist:的话的处理方式：结束
    });
    //Get模式中不会操作其文本子节点，因为文本子节点一般只是用来set的
    //检查是否需要递归子节点
    if(deep){
        childNodes = el.childNodes,
        [].slice.call(childNodes).forEach(function(node) {
            if((node.nodeType == 1)&&me.checkiscom(node)){
                me.elget(node,0,1,dataspace);//如果子组件是一个com，就获取这个节点的信息后不深入递归
                if(deepinit){
                    me.init(node,deepinit);//如果需要对子组件进行递归初始化就进行递归初始化
                }
            } else {
                me.elget(node,deep,autoupdate,dataspace,deepinit);
            }
            
        });
    }
    return this;
},//对node进行解析看有哪些属性与变量关联
forelset:function(el,deep,autoupdate=1,dataspace="",deepinit=0){
    me=this;
    //首先解析for循环的各种参数
    var forstr=el.getAttribute("for:");
    var i="i",k="k", v="v",data="nonamelist";
    /^\s*\((.*)\,(.*)\,(.*)\)\s*in (.*)\s*$/.test(forstr)&&(i=RegExp.$1,k=RegExp.$2,v=RegExp.$3,data=RegExp.$4);
    i=i.replace(/\s/g,""),k=k.replace(/\s/g,""),v=v.replace(/\s/g,""),data=data.replace(/\s/g,"");
    //在数据空间创建这几个变量，并且只把data的
    [i,k,v,data].forEach(function(varname){me.getvar(varname,dataspace)});
    autoupdate&&(me.varfunsadd(data,el,dataspace));
    var items=me.getvar(data,dataspace);
    $$.isempty(items)&&(items=[]);
    if(!$$.isarray(items)){items=[items];me.setvar(data,dataspace,items);}
    var forid=el.getAttribute("for-id");
    if(!forid){forid=Math.random();el.setAttribute("for-id",forid);}
    //先确保el的数量和数据是对齐的。
    var nodes=document.querySelectorAll("[for-id='"+forid+"']");
    var nodenum=nodes.length,itemnum=items.length;
    while(nodenum!==itemnum&&!(itemnum==0&&nodenum==1)){
        if(nodenum>itemnum){
            //删除最后一个节点
            nodes[nodenum-1].parentNode.removeChild(nodes[nodenum-1]);
        } else {
            //在最后一个节点后面再加一个节点
            var newEl=el.cloneNode(true);
            nodes[nodenum-1].parentNode.lastChild ==nodes[nodenum-1]?
            (nodes[nodenum-1].parentNode.appendChild(newEl)):
            (nodes[nodenum-1].parentNode.insertBefore(newEl,nodes[nodenum-1].nextSibling));
        }
        nodes=document.querySelectorAll("[for-id='"+forid+"']");
        nodenum=nodes.length,itemnum=items.length;
    }
    var index=0;
    if(itemnum<1){
        me.setvar(v,"",dataspace);
        me.setvar(i,0,dataspace);
        me.setvar(k,0,dataspace);
        me.elset(el,deep=1,autoupdate=true,dataspace,deepinit,[i,k,v,data],false);
    }
    for(let item in items){
        me.setvar(v,items[item],dataspace);
        me.setvar(i,index++,dataspace);
        me.setvar(k,item,dataspace);
        nodes[index-1].setAttribute("view-locked","");
        me.elset(nodes[index-1],deep=1,autoupdate=nodes[index-1]==el?true:false,dataspace,deepinit,[i,k,v,data],false);
        nodes[index-1]!==el&&(nodes[index-1].setAttribute("view-locked",1));
    }
},
elset:function (el,deep=0,autoupdate=1,dataspace="",deepinit=0,noupdatelist=[],bcheckfor=true){
    (dataspace=="")&&(dataspace="common");
    me=this;
    if(me.checkislocked(el)){console.log("找到了一个锁定的el"+el);return this;}
    //先判断当前节点是否是可操作的节点
    if(el.nodeType == 1){
        if(bcheckfor&&me.checkisfor(el)){
            //console.log("找到了一个for元素:"+el);
            me.forelset(el,deep,autoupdate,dataspace,deepinit);
        } else {
            //解析属性并将其指定的值赋值到变量
            var nodeAttrs = el.attributes;
            [].slice.call(nodeAttrs).forEach(function(attr) {
                var attrName = attr.name;
                var regisset = /(^|\:)set\:/;
                if (regisset.test(attrName)) {
                    var varname = attr.value;//1，简单变量；2，字符串模版；3，表达式
                    attrName=attrName.replace(/^(get\:)|(set\:)/,"").replace(/^(get\:)|(set\:)/,"");
                    var realattr=attrName.split("=")[0].split("@")[0];//attr可能有多个，由-分开，下面请注意
                    if(/^\s*[_\.a-zA-Z0-9\,]*$/.test(varname)){//简单变量或变量列表，只有第一个变量绑定，理论上不允许多个变量同时给同一个元素赋值
                        varname=varname.split(",")[0];//从变量到属性设置时，只允许一个对多个
                        var realattrs=realattr.split("-");
                        realattrs.forEach(function(realattr){
                            me.setattrvalue(el,realattr,me.getvar(varname,dataspace));
                        });
                        //console.log(realattr+"-elset:"+varname+"-dataspace:"+dataspace+"-value:"+me.getvar(varname,dataspace));
                        //判断是否要给当前变量增加跟随变量更新后的自动更新
                        autoupdate&&(noupdatelist.indexOf(varname)<0)&&(me.varfunsadd(varname,el,dataspace));
                    } //如果是要set一个简单变量的话
                    else {
                        if(/^\(.*\)$/.test(varname)){varname="{{"+varname+"}}";}//给显式表达式加括号，统一格式
                        varname=varname.replace(/\{\{\s*([_\.a-zA-Z0-9]*|[_\.a-zA-Z0-9]+\(.*\))\s*\}\}/g,function(t,v){return "{{$"+v+"}}";});//给单变量/函数加$统一格式，标准要求是函数一定加@
                        var varvalue=varname.replace(/\{\{\s*(.*?)\s*\}\}/g,function(t,exp){
                            autoupdate&&exp.replace(/(^|[^\\])\s*\$([_a-zA-Z][_\.a-zA-Z0-9]*)/g,function(t,v0,v){
                                (noupdatelist.indexOf(v)<0)&&(me.varfunsadd(v,el,dataspace));//
                            });//给变量添加粉丝
                            return me.getexp(exp,dataspace);//完成表达式计算并完成替换
                        });//给所有表达式中的变量添加粉丝
                        me.setattrvalue(el,realattr,varvalue);//将表达式的值写入属性中
                    } //如果是要set一个表达式的话

                }//获取到set：关键词
            });//逐个分析属性，查找set：关键字
            //set模式中还要操作其文本子节点，因为文本子节点一般只是用来set的
            //检查你是不是改了一个com节点，如果是，则触发全部关联的getter读取一下
            if(me.checkiscom(el)){
                var relateddataspaces=el.getAttribute("relateddataspaces");
                if(relateddataspaces){
                    //console.log("开始遍历关联的数据空间:"+relateddataspaces);
                    relateddataspaces.split(",").forEach(function(curdataspace){
                        //console.log(curdataspace);
                        if(curdataspace!==""){
                            //console.log("设定了一个com的属性，触发关联数据空间的更新："+curdataspace);
                            me.elget(el,0,0,curdataspace);//组件初始化是在get中实现的
                        }
                    });
                }
            }
            //检查是否需要递归子节点
            if(deep){
                childNodes = el.childNodes,
                [].slice.call(childNodes).forEach(function(node) {
                    if((node.nodeType==1)&&me.checkiscom(node)){
                        me.elset(node,0,1,dataspace,false,noupdatelist,false);//如果子节点是组件，就只执行一次，不递归
                    } else  {
                        (node.tagName!=="SCRIPT"&&node.tagName!=="STYLE")&&me.elset(node,1,autoupdate,dataspace,deepinit,noupdatelist,true);//如果子节点不是组件，不是script和style就递归
                    }
                });        
            }  
        }
    } else if (el.nodeType==3) {
        //先不实现吧
        if(el.parentNode&&el.parentNode.getAttribute('origintext')){
            var origintext=el.parentNode.getAttribute('origintext');
            if(origintext==""){
                return this;
            }
        } else {
            var origintext=el.textContent;
            if(/\{\{\s*(.*?)\s*\}\}/.test(origintext)){
                el.parentNode.setAttribute('origintext',origintext);
            } else {
                el.parentNode.setAttribute('origintext',"");
            }
        }//把原始文本内容保存到属性中
        var textstr=origintext;
        /*
        textstr=origintext.replace(varpreg,function(t,varname){
            autoupdate&&(me.varfunsadd(varname,el,dataspace));//添加粉丝，先后关系不大吧？
            return me.getvar(varname,dataspace);
        });*/
        textstr=textstr.replace(/\{\{\s*([_\.a-zA-Z0-9]*|[_\.a-zA-Z0-9]+\(.*\))\s*\}\}/g,function(t,v){return "{{$"+v+"}}";});//校准格式给单变量/函数加$统一格式，标准要求是函数一定加@
        textstr=textstr.replace(/\{\{\s*(.*?)\s*\}\}/g,function(t,exp){
            autoupdate&&exp.replace(/(^|[^\\])\s*\$([_a-zA-Z][_\.a-zA-Z0-9]*)/g,function(t,v0,v){
                (noupdatelist.indexOf(v)<0)&&(me.varfunsadd(v,el,dataspace));
            });//将表达式中的变量添加粉丝
            return me.getexp(exp,dataspace);//计算表达式的值并替换原字符串
        });//（1）给所有表达式中的变量添加粉丝（2）计算表达式值及完成替换
        el.textContent=textstr;//结果赋值到元素的文本内容中
        
    } else {

    }
    return this;
},//对node进行解析看有哪些属性与变量关联
getattrvalue:function (el,attr){
    if(!el){return "";}
    switch(attr){
        case 'value':
            return el.value;
            break;
        case 'display':
            //console.log("查询状态呢:"+el.style.display);
            if(el.style.display=='none'){return 0;}else{return 1;}//这里的值你无法实时获取，因为它没有input事件啊！
            break;
        case 'removewhen':
            //无意义
            break;
        case '':
            break;
        default:
            return el.getAttribute(attr);
    }
    return el.getAttribute(attr);
},//对识别出来的关联属性进行取值操作
setattrvalue:function (el,attr,value){
    if(!el) {return;}
    switch(attr){
        case 'value':
            el.value=value;
            break;
        case 'display':
            if(value){el.style.display='block';}else{el.style.display='none';}
            break;
        case 'removewhen':
            //console.log("why");
            if(value){el&&el.parentNode&&el.parentNode.removeChild(el);}else{}//这玩意不可逆啊！
            break;
        default:
            el.setAttribute(attr,value);
    }
},//对识别出来的关联属性进行赋值操作
getexp:function(expstr,dataspace=""){
    var rsvalue="Wrong expression string:"+expstr;

        //给变量添加this指针
        var tidyexp=expstr.replace(/(^|[^\\])\s*\$([_\.a-zA-Z0-9]*)/g,function(t,v0,v){return v0+"this."+v;});
        //给函数添加this指针
        tidyexp=tidyexp.replace(/(^|[^\\])@/g,function(t,v){return v+"this.";});
        //组装eval字符串
        //var evalstr="var rsvalue='',try {rsvalue= (function(){ return "+tidyexp+";}).apply(sm.view.data."+dataspace+");} catch(ex){};if($$.isobj(rsvalue)){return JSON.stringify(rsvalue);}else{return rsvalue;}";
        var funcstr="("+tidyexp+")";
        var evalstr="(function(){ var rs="+funcstr+";if($$.isobj(rs)){return JSON.stringify(rs);}else{return rs;}}).apply(sm.view.data."+dataspace+");";
        console.log(evalstr);              
        try{
            rsvalue=eval(evalstr);
        } catch (ex) {
        }
    return rsvalue;
},
getvar:function (varname,dataspace=""){
    (dataspace=="")&&(dataspace="common");
    //如果没有变量，就创建
    //window.data||(window.data={});//这个需要view实例来调用，否则大家共享同一个空间了
    //var val=window.data;
    (arguments.length>1)&&(dataspace!=="")&&(varname=dataspace+"."+varname);
    if(!sm.view.hasOwnProperty('data')){sm.view.data={};}
    var val=sm.view.data;
    var exp = varname.split('.');
    exp.forEach(function(k, i) {
        if(i<exp.length-1){
            (typeof val[k]=='undefined') && ( val[k]={});
            val = val[k];
        } else {
            //对于最后一个，必须不能是对象，因为HTML模版中不允许使用对象
            //alert('here?');
            (typeof val[k]=='undefined') && ( val[k]="");
            val=val[k];
        }
    });
    return val;
},//按照变量地区获取变量值
setvar:function (varname,value,dataspace=""){
    (dataspace=="")&&(dataspace="common");
    //如果没有变量，就创建
    //window.data||(window.data={});
    //var val=window.data;
    (arguments.length>2)&&(dataspace!=="")&&(varname=dataspace+"."+varname);
    if(!sm.view.hasOwnProperty('data')){sm.view.data={};}
    var val=sm.view.data;
    
    var exp = varname.split('.');
    exp.forEach(function(k, i) {
        // 非最后一个key，更新val的值
        if (i < exp.length - 1) {
            (typeof val[k]=='undefined') && ( val[k]={});
            val=val[k];
        } else {
            val[k] = value;
        }
    });
},//按照变量地区找到变量给其赋值

watchdata:function (proxyobj,dataspace="",varname=""){
    (dataspace=="")&&(dataspace="common");
    me=this;
    Object.keys(proxyobj).forEach(function(k){
        if(!proxyobj.hasOwnProperty(k)){
        } else if(Object.prototype.toString.call(proxyobj[k]) === '[object Object]'){
             var realvarname=varname==""?k:varname+'.'+k;
             if(realvarname.substr(0,dataspace.length)==dataspace){//只需要关心自己dataspace中的变量即可
                //console.log("解析："+realvarname);
                me.watchdata(proxyobj[k],dataspace,varname==""?k:varname+'.'+k);
            } else {
                //console.log("不解析："+realvarname);
            }
        } else if(typeof proxyobj[k]=="undefined"){

        } else if (typeof(proxyobj[k]) == "function") {

        } else {
            //找到了一个属性，把他弄为get,set形式
            var realvarname=varname==""?k:varname+'.'+k;
            if(realvarname.substr(0,dataspace.length)==dataspace){//如果当前变量地图不在dataspace下，则不允许修改人家的get，set函数
                if(dataspace!==""){
                    realvarname=realvarname.substr(dataspace.length+1);
                }
                //console.log("设定getset："+realvarname);
                var tstr=proxyobj[k];
                //alert(tstr);
                //console.log("proxy data:"+varname+"."+k+"-dataspace:"+dataspace);
                Object.defineProperty(proxyobj, '_'+k, {
                    value : tstr,
                    writable : true,
                    enumerable : false,//不可枚举
                    configurable : true
                });
                Object.defineProperty(proxyobj, k, {//因为这个变量的变动在初始化的时候要绑定命名空间，只能绑定一个？
                    enumerable : true,//可枚举
                    configurable : true,
                    get:function() {
                        return this['_'+k];
                    },
                    set:function(newVal){
                        if(this['_'+k]==newVal) return;
                        this['_'+k]=newVal;
                        //console.log("检测到变量更改了，执行notify函数:"+realvarname+","+dataspace);
                        //if(Object.prototype.toString.call(newVal) === '[object Object]'){
                            //console.log("new obj setted:"+dataspace+":"+realvarname);
                            //sm.view.watchdata(this['_'+k],dataspace,realvarname);
                        //}
                        me.varfunsnotify&&me.varfunsnotify(realvarname,dataspace);
                    }
                });                
            } else {
                //console.log("不设定getset："+realvarname);
            }

        }
    });
},//对一个对象进行解析自动对其属性转换成getter，setter模式(初始化后自动调用)
watchdom:function(el,dataspace="",ename="input",targetel="") {
    (dataspace=="")&&(dataspace="common");
    (targetel=="")&&(targetel=el);
    me=this;
    var eventlist=el.getAttribute('eventlist');
    //var watchingpreg=/(^|\,)input\.watching(\,|$)/;
    var tag=dataspace+"."+ename+".watching";
    if(eventlist){
        if(eventlist.indexOf(tag)<0){
            el.addEventListener(ename,function(){
                //alert("执行第二个绑定函数"+dataspace);
                //console.log("执行第二个绑定函数"+dataspace);
                //console.log(sm.view.data);
                me.elget(targetel,0,0,dataspace);
            });
            //console.log("居然多次添加拉？"+eventlist+tag);
            el.setAttribute('eventlist',eventlist+','+tag);
        }
    } else {
        el.addEventListener(ename,function(){
            //console.log("执行第一个绑定函数"+dataspace);
                //console.log(sm.view.data);
            me.elget(targetel,0,0,dataspace);
        });
        //console.log("首次添加事件？"+tag);
        el.setAttribute('eventlist',','+tag);
    }
    
},//对一个elment进行关注，添加oninput事件，事件内容就是自动进行elget，这个是在第一次get时自动添加进去的
varfunsnotify:function (fullvarname,dataspace=""){
    //console.log(fullvarname+":changing");
    var me=this;
    (dataspace=="")&&(dataspace="common");
    //alert(fullvarname);
    //alert(dataspace);
    (typeof window.varfuns[fullvarname]=='undefined')&&(window.varfuns[fullvarname]=[]);
    (typeof window.varfuns[fullvarname][dataspace]=='undefined')&&(window.varfuns[fullvarname][dataspace]=[]);
    //console.log("执行变量到DOM回写:"+fullvarname+"-dataspace:"+dataspace);
    //console.log(sm.view.data);
    var i=0;
    window.varfuns[fullvarname][dataspace].forEach(function(el){
        //console.log(dataspace+i++);
        if($$.isfunction(el)){
            el.apply(sm.view.find(dataspace));
        } else {
            me.elset(el,0,0,dataspace);
        }
    });
    //采用冒泡的方式，将父节点逐一进行“变更更新”
    if(fullvarname=="*"){
        return;
    } else if(fullvarname==""){
        return me.varfunsnotify("*",dataspace);
    } else {
        fullvarname=fullvarname.split(".");
        fullvarname.pop();
        fullvarname=fullvarname.join(".");
        return me.varfunsnotify(fullvarname,dataspace);
    }
},//watchdata中的任何一个属性更改，都会触发这里的notify，但并不是每个变量都有粉丝
varfunshave:function (varname,el,dataspace=""){
    (dataspace=="")&&(dataspace="common");
    (arguments.length>2)&&(dataspace!=="")&&(varname=dataspace+"."+varname);
    if(typeof window.varfuns[varname]=='undefined'){
        return false;
    } else {
        if(typeof window.varfuns[varname][dataspace]=='undefined'){
            return false;
        }
        window.varfuns[varname][dataspace].forEach(function(item){
            if(item==el){return true;}
        });
        return false;
    }
},//检测变量是否有该粉丝
varfunsadd:function (varname,el,dataspace=""){
    (dataspace=="")&&(dataspace="common");
    //(arguments.length>2)&&(dataspace!=="")&&(varname=dataspace+"."+varname);
    //console.log("添加粉丝："+dataspace+":"+varname);
    (typeof window.varfuns[varname]=='undefined')&&(window.varfuns[varname]=[]);
    (typeof window.varfuns[varname][dataspace]=='undefined')&&(window.varfuns[varname][dataspace]=[]);
    !this.varfunshave(varname,el)&&window.varfuns[varname][dataspace].push(el);    
},//为变量添加粉丝    
onloadinitlist:[],
onloadinitedlist:[],
onloadinit:function(cb){this.onloadinitlist.push(cb);return this;},
doonloadinit:function(){
    var me=this;
    var num=me.onloadinitlist.length;
    for(var i=0;i<num;i++){
        me.onloadinitlist[i].apply(me);
        me.onloadinitedlist.push(me.onloadinitlist[i]);
    }
    me.onloadinitlist=[];
},
});
God.coms("route").extend({
    watched:false,
    oldhash:"",
    newhash:"",
    watchingtree:{},
    basepath:"./",
}).extendproto({
clear:function(){this.watchingtree={};return this;},
do:function(){
    me=this;
    me.newhash=location.hash;
    me.hashhandler(me.oldhash,me.newhash);
    me.oldhash=me.newhash;
    return this;
},
watch:function(wathcingtree={}){
    var me=this;
    if(!me.watched){
        document.body.onhashchange=function(){
            me.newhash=location.hash;
            me.hashhandler(me.oldhash,me.newhash);
            me.oldhash=me.newhash;
        }
        me.watched=true;
    }
    $$.merge.apply(me.watchingtree,[wathcingtree]);
    return this;
},
hashhandler:function(oldhash,newhash){
    var me=this;
    var watchingtree=me.watchingtree;
    for(var route in watchingtree){
        var watchold=false;
        route=route.replace(/^old:(.*)$/,function(t,v){
            watchold=true;
            return v;
        });
        var hashstr=watchold?oldhash:newhash;
        if(!/^\#/.test(route)){
            var reg=new RegExp(route);
            if(reg.test(hashstr)){
                return watchingtree[route].apply(me,[newhash,oldhash]);
            }
        } else {
            if(route==hashstr){
                return watchingtree[route].apply(me,[newhash,oldhash]);
            }
        }
    }
},
to:function(newhash){location.hash=newhash;return this;},
load:function(routejs,cb=function(){}){this.ajax.loadjs(routejs,cb);return this;},
run:function(wathcingtree={}){
    this.watch(wathcingtree);
    //执行router
    this.do();
    return this;
},
history:function(){return window.history;},
startup:function(routejs){return this.load(routejs,function(){sm.route.run();});},
});
God.coms("data").extendproto({
});
God.coms("user").extend({
    info:{"uid":0,"uname":"请登录","nickname":"请登录","ulevel":0,"token":""},
}).extendproto({
    logout:function(){},
    checkright:function(right){
        sm.user.clearstat();
        if((!sm.user.info.ulevel)||(sm.user.info.ulevel<right)){sm.user.error(1,"您没有权限！");}
        return sm.user;
    },
    getinfo:function(){},
    login:function(){},
});
God.coms("localStorage").extendproto({
    setobj:function(key,value){
        localStorage.setItem(key,JSON.stringify(value));
    },
    getobj:function(key,value){
        if(localStorage.getItem(key)){
            try{
               var rs=localStorage.getItem(key);
               rs=JSON.parse(rs);
            }catch(e){
                return null;
            }
            return rs;
        } 
        return null;
    },
});
God.coms("server").extend({
    host:"http://localhost/",
    port:"",
    adjustdata:function(){},
    urls:{
        login:"user/login.func",
        logout:"user/logout.func",
    },
    url:function(shorturl="#"){
        if(this.urls[shorturl]){
            return this.host+this.port+this.urls[shorturl];
        } else {
            return "#";
        }
    },
});

//以下还没整理
God.coms("datavalidation").extendproto({//目的是定义数据验证相关的函数相关的函数
check:function(datas){
    var checkpass=true;
    this.clearstat();
    var me=this;
    for(var k in datas){
        var v=datas[k];
        //检查是否有检验定义
        if('undefined'===(typeof sm.datavalidation[k])){

        } else {
            var rule=sm.datavalidation[k];
            if((typeof rule)==="function"){
                //函数
                if(!rule.apply(datas)){
                    checkpass=false;
                    me.stat().error++;
                    me.stat().info&&(me.stat().info+=",");
                    me.stat().info+=k;
                }
            } else {
                //正则表达式
                if(!v.match(rule)){
                    //不符合规则
                    checkpass=false;
                    me.stat().error++;
                    me.stat().info&&(me.stat().info+=",");
                    me.stat().info+=k;
                } 
            }
        }
    }
    return checkpass;
},
});
God.coms("dialog").extendproto({//对话框

show:function(title,content,funcmap){
    code_bg='<div id="code_bg" style="position:absolute;left:0px;top:0px;background-color:#000;width:100%;filter:alpha(opacity=60);opacity:0.6;z-Index:100;"></div>'
    code_msg='<div id="code_msg" style="position:absolute;width:100%;height:30px;text-align:center;line-height: 30px;top:0px;left:0px;background-color:#ddd;filter:alpha(opacity=40);opacity:0.4;cursor:pointer;z-Index:101;">'+content+'</div>'
    var nodes=sm.document.create(code_bg+code_msg);
    var n=nodes.length;
    for(var i=0;i<n;i++){document.body.prepend(nodes[i]);}
    document.querySelector("#code_bg").style.height=document.body.clientHeight;
    /*
    document.querySelector("#code_msg").style.height=document.body.clientHeight/2;
    document.querySelector("#code_msg").style.width=document.body.clientWidth/2;
    document.querySelector("#code_msg").style.top=document.body.clientTop+document.body.clientHeight/4;
    document.querySelector("#code_msg").style.left=document.body.clientLeft+document.body.clientWidth/4;
    */
    return this;
},
countshow:function(s,title,content){
	if(s>0) {
		this.close().show(title,content+"("+s+")");
		//alert('sm.dialog.countshow('+(s-1)+',"'+title+'","'+content+'")');
		setTimeout('sm.dialog.countshow('+(s-1)+',"'+title+'","'+content+'")',1000);
	} else {
		this.close();
	}
	return this;
},
close:function(filter){
    try{
        document.querySelector("#code_bg").remove();
        document.querySelector("#code_msg").remove();
    }catch(e){}
    return this;
},

});
}

//-----------------------基础组件定义:-----------------------------------------------

