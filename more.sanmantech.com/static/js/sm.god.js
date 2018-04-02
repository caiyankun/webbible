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
God.extend=function(newobj){$$.merge.apply(this,[newobj]);return this;};//简化组件成员添加-对象方式
God.extendproto=function(newobj){$$.merge.apply(this.__proto__,[newobj]);return this;};//简化组件成员添加-对象方式
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
        if(this._error!==0){
            e.apply(this,[this._stat.error,this._stat.info]);
        }
    } else {
        this._stat.error=e;this._stat.info=i;
    }
    return this;
};
God.taskfail=function(cb){return this.error.apply(this,arguments);}
God.success=function(cb){
    if($$.isfunction(e)){
        if(this._error==0){
            cb.apply(this);
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
}
//组件的公共方法：设置，显示自己，程序执行错误状态，回调

}

//----------------God.js Core 结束：sm及原型定义，链式操作--------------------


//-----------------------------全局函数定义:数据类型判断，数据合并处理等--------------

if (true){

if(true) {
God.func={};
God.func.isempty=function(varname){return !varname;}
God.func.isnull=function(varname){return  (!varname&& typeof(varname)!="undefined" && varname!=0);}
God.func.isobj=function(varname){return Object.prototype.toString.call(varname) === '[object Object]'; }
God.func.isarray=function(varname){return Object.prototype.toString.call(varname) === '[object Array]'; }
God.func.isna=function(varname){return isNaN(varname);}
God.func.isundefined=function(varname){return typeof(varname) == "undefined";}
God.func.isdefined=function(varname){return !(typeof(varname) == "undefined");}
God.func.isfunction=function(varname){return (typeof(varname) == "function");}
God.func.maxim=function(varname,valifna){
	if($$.hasmaxim()&&(typeof(maxim[varname])!='undefined')) {
		return maxim[varname];
	} else {
		return valifna;
	}
}
God.func.hasmaxim=function(){return (typeof (maxim)!='undefined') && $$.isobj(maxim);}//是否存在maxim
God.func.merge=function(o){for (x in o) {this[x]=o[x];} return this;},//把给定的对象的全部属性融合到自身中
God.func.safemerge=function(o){for (x in o) {this.hasOwnProperty(x)&&(this[x]=o[x]);} return this;}//把给定的对象中与自身相交的属性值更新到自身中
//God.func.isarray=function(obj){return obj&& typeof obj==='object' && Array === obj.constructor;}
God.func.rndid=function(prix){prix=arguments[0]?(arguments[0]+"_"):"";return prix+parseInt(1000000*Math.random());}
window.$$=God.$$=God.func;//方便对全局函数的引用
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

}

//-----------------------------全局函数定义:数据类型判断，数据合并处理等---------------

//-----------------------基础组件定义:-----------------------------------------------

if(true){
window.varfuns=[];//{varstr:[{node:node,attr:attr,updatecb:updatecb},{node:node,attr:attr,updatecb:updatecb}]}
window.data={};
    
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
async:function(b){this.setup({async:b});return this;},
post:function(data,url,async){
    arguments.length>2&&(this.async(async));
    arguments.length>1&&(this.url(url));
    arguments.length>0&&(this.data(data));
    
    return this.type("POST").doxhr();
},
doxhr:function(paraobj){
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
                    return resolve(xhr.responseText);
                } else {
                    me.error(1,xhr.status);
                    return reject(xhr.status);
                }
            }
        };
        xhr.open(me.setup().type,me.setup().url,me.setup().async);    //建立连接，参数一：发送方式，二：请求地址，三：是否异步，true为异步
        xhr.setRequestHeader('Content-type','application/x-www-form-urlencoded');    //可有可无
        xhr.send(data); 
    });
    return promise;
},

});
God.coms("view").extendproto({//对话框


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
init:function (com,deepinit=1){
    
    //首先检查当前元素是不是组件，不是的话就拒绝初始化
    var $el = com.nodeType == 1 ? com : document.querySelector(com);
    if(!this.checkiscom($el)){return this;}
    //如果是组件的话，先确定当前组件的数据空间在哪里
    var dataspace=$el.getAttribute("com:dataspace");
    dataspace||(dataspace="common");
    //console.log("开始初始化一个组件："+dataspace);
    this.comset($el,dataspace,deepinit);
    this.comget($el,dataspace,deepinit);
    //this.watchdata(window.data);
    this.watchdata(sm.view.data,dataspace);
    return this;
},//View组件初始化，搜索全部的View组件并逐一进行一遍Get，Set然后对变量进行watch
checkiscom:function(com){
    var $el = com.nodeType == 1 ? com : document.querySelector(com);
    var nodeAttrs = $el.attributes;
    var iscom=false;
    [].slice.call(nodeAttrs).forEach(function(attr) {
        var attrName = attr.name;
        var regisget = /^com\:/;
        if (regisget.test(attrName)) {iscom=true;}
    });
    return iscom;
},
elget:function (el,deep=0,autoupdate=1,dataspace="",deepinit=0){
    (dataspace=="")&&(dataspace="common");
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
    me=this;
    //解析属性并将其指定的值赋值到变量
    var nodeAttrs = el.attributes;
    [].slice.call(nodeAttrs).forEach(function(attr) {
        var attrName = attr.name;
        var regisget = /(^|\:)get\:/;
        if (regisget.test(attrName)) {
            var varname = attr.value;
            
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
            
        }
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
elset:function (el,deep=0,autoupdate=1,dataspace="",deepinit=0){
    (dataspace=="")&&(dataspace="common");
    //先判断当前节点是否是可操作的节点
    me=this;
    if(el.nodeType == 1){
        //解析属性并将其指定的值赋值到变量
        var nodeAttrs = el.attributes;
        [].slice.call(nodeAttrs).forEach(function(attr) {
            var attrName = attr.name;
            var regisset = /(^|\:)set\:/;
            if (regisset.test(attrName)) {
                //找到了一个关联属性，开始执行set动作
                //这里判断是否有多绑定的现象
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
                    autoupdate&&(me.varfunsadd(varname,el,dataspace));
                } else {
                    if(/^\(.*\)$/.test(varname)){//如果是显式表达式的话，进行一次转换，与模版替换一样统一进行处理
                        varname="{{"+varname+"}}";
                    }
                    var varvalue=varname.replace(/\{\{(.*?)\}\}/g,function(t,exp){
                        //如果是隐式单变量或者单函数，加上this指针
                        if(/(^[_\.a-zA-Z0-9]*$|^[_\.a-zA-Z0-9]+\(.*\)$)/.test(exp)){
                            exp="$"+exp;
                        }
                        //替换变量，并且添加变量的关联
                        var tidyexp=exp.replace(/(^|[^\\])\s*\$([_\.a-zA-Z0-9]*)/g,function(t,v0,v){
                            //找到一个变量
                            autoupdate&&(me.varfunsadd(v,el,dataspace));
                            return v0+"this."+v;
                        });
                        //替换函数
                        tidyexp=tidyexp.replace(/(^|[^\\])@/g,function(t,v){return v+"this.";});
                        
                        var evalstr="(function(){ return "+tidyexp+";}).apply(sm.view.data."+dataspace+")";
                        console.log(evalstr);
                        var rsvalue="";
                            try{
                                rsvalue=eval(evalstr);
                            } catch (ex) {

                            }
                        
                        return rsvalue;
                    });
                    me.setattrvalue(el,realattr,varvalue);
                } 
                
            }
        });
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
                        me.elget(el,0,0,curdataspace);
                    }
                });
            }
        }
        //检查是否需要递归子节点
        if(deep){
            childNodes = el.childNodes,
            [].slice.call(childNodes).forEach(function(node) {
                if((node.nodeType==1)&&me.checkiscom(node)){
                    me.elset(node,0,1,dataspace);//如果子节点是组件，就只执行一次，不递归
                } else  {
                    me.elset(node,1,autoupdate,dataspace,deepinit);//如果子节点不是组件，就递归
                }
            });        
        }  
    } else if (el.nodeType==3) {
        //先不实现吧
        if(el.parentNode&&el.parentNode.getAttribute('origintext')){
            var origintext=el.parentNode.getAttribute('origintext');
        } else {
            var origintext=el.textContent;
            el.parentNode.setAttribute('origintext',origintext);
        }
        var varpreg=/\{\{(.*?)\}\}/g;//如果有多个怎么办？
        textstr=origintext;
        /*
        textstr=origintext.replace(varpreg,function(t,varname){
            autoupdate&&(me.varfunsadd(varname,el,dataspace));//添加粉丝，先后关系不大吧？
            return me.getvar(varname,dataspace);
        });*/
        
                    textstr=origintext.replace(/\{\{(.*?)\}\}/g,function(t,exp){
                        //如果是隐式单变量或者单函数，加上this指针
                        if(/(^[_\.a-zA-Z0-9]*$|^[_\.a-zA-Z0-9]+\(.*\)$)/.test(exp)){
                            exp="$"+exp;
                        }
                        //替换变量，并且添加变量的关联
                        console.log("--------------------why---------------");
                        var tidyexp=exp.replace(/(^|[^\\])\s*\$([_\.a-zA-Z0-9]*)/g,function(t,v0,v){
                            //找到一个变量
                            console.log("------------正则匹配了--------------");
                            autoupdate&&(me.varfunsadd(v,el,dataspace));
                            return v0+"this."+v;
                        });
                        console.log(tidyexp);
                        console.log("------------结束--------------");
                        //替换函数
                        tidyexp=tidyexp.replace(/(^|[^\\])@/g,function(t,v){return v+"this.";});
                        
                        var evalstr="(function(){ return "+tidyexp+";}).apply(sm.view.data."+dataspace+")";
                        console.log(evalstr);
                        return eval(evalstr);
                    });
       
        
        
        el.textContent=textstr;
        
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
getexp:function(exp,dataspace=""){
    
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
                        //console.log("enter set of "+k+"-old-"+this['_'+k]+'-new-'+newVal);
                        if(this['_'+k]==newVal) return;
                        this['_'+k]=newVal;
                        //alert(varmap==""?k:varmap+'.'+k);
                        //console.log("enter set of "+k);
                        //在通知notify的时候
                        
                        
                        //console.log("检测到变量更改了，执行notify函数:"+realvarname+","+dataspace);
                        me.varfunsnotify&&me.varfunsnotify(realvarname,dataspace);
                    }
                });                
            } else {
                //console.log("不设定getset："+realvarname);
            }

        }
    });
},//对一个对象进行解析自动对其属性转换成getter，setter模式(初始化后自动调用)
watchdom:function(el,dataspace="",ename="input") {
    (dataspace=="")&&(dataspace="common");
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
                me.elget(el,0,0,dataspace);
            });
            //console.log("居然多次添加拉？"+eventlist+tag);
            el.setAttribute('eventlist',eventlist+','+tag);
        }
    } else {
        el.addEventListener(ename,function(){
            //console.log("执行第一个绑定函数"+dataspace);
                //console.log(sm.view.data);
            me.elget(el,0,0,dataspace);
        });
        //console.log("首次添加事件？"+tag);
        el.setAttribute('eventlist',','+tag);
    }
    
},//对一个elment进行关注，添加oninput事件，事件内容就是自动进行elget，这个是在第一次get时自动添加进去的
varfunsnotify:function (fullvarname,dataspace=""){
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
        me.elset(el,0,0,dataspace);
    });
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
    //alert("添加粉丝："+varname);
    (typeof window.varfuns[varname]=='undefined')&&(window.varfuns[varname]=[]);
    (typeof window.varfuns[varname][dataspace]=='undefined')&&(window.varfuns[varname][dataspace]=[]);
    !this.varfunshave(varname,el)&&window.varfuns[varname][dataspace].push(el);    
},//为变量添加粉丝    
    
    
    
    
        
});


God.coms("datasource").extendproto({//存储所有该页面用于交换的数据
extend:function(newobj){
	if(!$$.isobj(newobj)) {return this;}
	if((typeof newobj.title)!=="undefined"){document.title=newobj.title}
	$$.merge.apply(this,[newobj]);return this;
},
mergemaxim:function(){
    if(typeof jsonmaxim!=="undefined"){
        var omaxim={}
        try{
            omaxim=JSON.parse(jsonmaxim);
        } catch(e) {
            omaxim={}
        }
        this.extend(omaxim);
    }
    return this;
},

});
God.coms("datavalidation").extendproto({//目的是定义数据验证相关的函数相关的函数
success:function(){
	
},
fail:function(dename){
	sm.dialog.countshow(3,'validation fail!',"Data validation fail!"+dename);
},
checkhtmlvars:function(filter){
	return this.check($$.htmlvars(filter)); 
},
check:function(datas){
	checkpass=true;
        var me=this;
	$.each(datas,function(k,v){
		//alert("checking:"+k);
		//检查是否有检验定义
		if('undefined'===(typeof sm.datavalidation[k])){
			
		} else {
			rule=sm.datavalidation[k];
			if((typeof rule)==="function"){
				//函数
				if(!rule.apply(me)){
					checkpass=false;
					sm.datavalidation.fail(k);
				}
			} else {
				//正则表达式
				if(!v.match(rule)){
					//不符合规则
					checkpass=false;
					sm.datavalidation.fail(k);
				} 
			}
		}
	});
	if(checkpass){
		sm.datavalidation.success();
	}
	return checkpass;

},
});
God.coms("dataexchange").extendproto({
callback:{
	success:function(){},
	error:function(){},
	taskok:function(){},
	taskfail:function(){},
},
define:function(dename,defnation){
    God.dataexchange[dename]=function(paras,url){
            !arguments[0]&&(paras={});
            !arguments[1]&&(url="#");
            if(defnation.hasOwnProperty("subdata")){
                $$.merge.apply(paras,[$$.htmlvars(defnation.subdata)]);
            }
            //在这里执行数据的检查！通过参数输入的方式不检验
            if(!sm.datavalidation.check.apply(paras,[paras])){return this;}
            
            //上面是组装了参数,下面组装URL
            !arguments[1]&&(defnation.hasOwnProperty("url"))&&(url=defnation.url);
            //更新回调函数
            tcb=this.callback;
            $$.safemerge.apply(tcb,[defnation]);
            //开始执行代码！
            //alert(JSON.stringify(paras));
            sm.ajax.url(url).post(paras).success(tcb.success).error(tcb.error).taskok(tcb.taskok).taskfail(tcb.taskfail);
            return this;
    }
    return this;
},
    
});

God.coms("event").extendproto({//目的是定义事件相关的函数
__eventprocs__:{},
__eventrules__:{},
__eventagent__:function(eventname,e){
    curitem=this;
    omap=sm.event.__eventrules__[eventname];
    $.each(omap,function(k,v){
        if(k.match(/^text\:/)){
            k=k.replace(/^text\:/,"");
            $(curitem).filter(function(){
                return $(this).text()===k;//看是否当前的元素的text和定义中的函数不同
            }).each(function(){
                v.apply(this,[e]);//调用定义中的函数
                return true;
            });   
        } else {
            $(curitem).filter(k).each(function(){
                v.apply(this,[e]);//如果符合给定的选择规则，调用定义中的函数
                return true;
            }); 
        }
    });
},
map:function(filter,eventname,omap){
    me=this;
    this.__eventprocs__[eventname]=function(event){me.__eventagent__.apply(this,[eventname,event]);};
    this.__eventrules__[eventname]=omap;
    $(document).on(eventname,filter,this.__eventprocs__[eventname]);
    return this;
},
update:function(eventname,omap){
    $$.merge.apply(this.__eventrules__[eventname],omap);
    return this;
},
});
God.coms("dialog").extendproto({//对话框

show:function(title,content,funcmap){
    code_bg='<div id="code_bg" style="position:absolute;left:0px;top:0px;background-color:#000;width:100%;filter:alpha(opacity=60);opacity:0.6;z-Index:100;"></div>'
    code_msg='<div id="code_msg" style="position:absolute;width:100%;height:30px;text-align:center;line-height: 30px;top:0px;left:0px;background-color:#ddd;filter:alpha(opacity=40);opacity:0.4;cursor:pointer;z-Index:101;">'+content+'</div>'
    $("body").prepend(code_bg);
    $("body").prepend(code_msg);
    $("#code_bg").height(document.body.clientHeight);
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
    $("#code_bg").remove();
    $("#code_msg").remove();
    return this;
},

});
God.coms("autocomplete").extendproto({//对话框

substringMatcher:function(strs){
  return function findMatches(q, cb) {
    var matches, substringRegex;

    // an array that will be populated with substring matches
    matches = [];

    // regex used to determine if a string contains the substring `q`
    substrRegex = new RegExp(q, 'i');

    // iterate through the pool of strings and for any string that
    // contains the substring `q`, add it to the `matches` array
    $.each(strs, function(i, str) {
      if (substrRegex.test(str)) {
        matches.push(str);
      }
    });
    cb(matches);
  };
},
datalist:['test','I test','test u'],
init:function(target,datalist,name){
    this.datalist=datalist;
    $(target).typeahead({
      hint: true,
      highlight: true,
      minLength: 1
    },
    {
      name: name,
      source:this.substringMatcher(this.datalist)
    }); 
},

});
God.coms("ui").extendproto({//对话框
make:function(model,data,curlevel,extradata,datafunc){
    !arguments[2]&&(curlevel=0);
    !arguments[3]&&(extradata={});
    
    //首先确定好要操作的对象
    var ojq=$("<div></div>").html(model);
    if(ojq.find("[il="+curlevel+"]").length>0){
        var tojq=$("<div></div>").html(ojq.find("[il="+curlevel+"]").clone());
        
        
    } else {
        var tojq=ojq.clone();
    }
    if($$.isarray(data)){
        var rsstr="";
        var nextlevel=curlevel+1;
        $.each(data,function(i,v){
            extradata["i"+nextlevel]=i;
            rsstr=rsstr+sm.ui.make(model,v,nextlevel,extradata,datafunc);
        });
        alert("第"+curlevel+"层循环结果:"+rsstr);
        var itemsojq=$("<div></div>").html(rsstr);
        var rsojq=tojq.clone();
        tojq.find("[il='"+nextlevel+"']").each(function(){
            //检查是否有cid,cid是干什么用的？功能没实现？？
            if(typeof $(this).prop("cid")=="undefined"){
                rsojq.find("[il='"+nextlevel+"']"+":not([cid])").replaceWith(itemsojq.find("[il='"+nextlevel+"']"+":not([cid])").clone());
                //alert(rsojq.html());
            } else {
                cid=$(this).prop("cid");
                rsojq.find("[il='"+nextlevel+"']"+"[cid='"+cid+"']").replaceWith(itemsojq.find("[il='"+nextlevel+"']"+"[cid='"+cid+"']").clone());
            }
        });
        if(tojq.find("[il='"+nextlevel+"']").length>0){
            return rsojq.html();
        } else {
            return itemsojq.html();
        }
    } else {
        if(!$$.isobj(data)){data={para:data};}
        extradata.il=curlevel;
        $$.merge.apply(data,[extradata]);
        if((typeof datafunc!=="undefined") && $$.isfunction(datafunc)){
            datafunc.apply(data);
        }
        return sm.ui.modelreplace(tojq.html(),data);
    }
},//真实执行模版替换，由多个模版替换动作完成
makeout:function(modelname,data,def,extradata,datafunc){
    modelname=this.warehouse(modelname);
    arguments[2] && (!$$.isfunction(def)) && (data=this.parsepara(data,def));
    arguments[2] && $$.isfunction(def) && (datafunc=def);
    return this.make(modelname,data,0,extradata,datafunc);
},//执行模版替换返回格式为
jqmakeout:function(modelname,data,def,datafunc){
    return $(this.makeout(modelname,data,def,datafunc));
},//执行模版替换，返回格式为jq格式
part:function(partname,valueiffail){
    var rsvalue=arguments[1]?valueiffail:"";
    sm.ajax.async(false).url("/factory/getpart.func/"+partname).post().taskok(function(d){
        rsvalue=d;
    }).taskfail(function(d){
               alert(d);     
    });
    
    return rsvalue;
},
warehouse:function(modelname){
    if($('#_warehouse_').length<1){$("body").prepend("<div id='_warehouse_' style='display:none'></div>");}
    if($("#_warehouse_").children(".biblemodel."+modelname).length>0){
        return $("<div></div>").append($("#_warehouse_").children(".biblemodel."+modelname).clone()).html();
    } else {
        var succ=false;
        var modelcont="";
        sm.ajax.async(false).url("/factory/getmodel.func/"+modelname).post().taskok(function(d){
            succ=true;
            modelcont=d;
        });
        if(succ && !$$.isempty(modelcont)){
            $("#_warehouse_").append(modelcont);
            if($("#_warehouse_").children(".biblemodel."+modelname).length>0){
                return $("<div></div>").append($("#_warehouse_").children(".biblemodel."+modelname).clone()).html();
            }
        }
        return modelname;
    }
},//从仓库中获取模版原型
parsepara:function(paras,def){
    if(!arguments[1]){
        return paras;
    }
    if(!$$.isobj(def)){
        var tobj={};
        tobj[def]="";
        def=tobj;
    }
    if(!$$.isarray(paras)){
        return paras;
    } else if(!$$.isarray(paras[0])) {
        var i=0;
        var rsobj={};
        for (k in def){
            rsobj[k]=(paras.length>i)?paras[i]:def[k];
            i=i+1;
        }
        while(paras.length>i){
            rsobj["para"+i]=paras[i];
            i=i+1
        }
        return rsobj;
    } else {
        var i=0;
        var rsarr=[];
        for (i in paras){
            rsarr.push(sm.ui.parsepara(paras[i],def));
        }
        return rsarr;
    }
},//把数组改为关联数组
modelreplace:function(str,obj){
    try{
	    for (p in obj) {
	        patt=new RegExp("\{"+p+"\}","m");
	        str=str.replace(patt,obj[p]);
	    }
	    return str;
    } catch (ex) {
    	
    }
    return str;
},//模版的简单替换动作

});
}

//-----------------------基础组件定义:-----------------------------------------------