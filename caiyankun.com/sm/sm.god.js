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
//已经加载过的组件不会重复加载，已经加载了哪些组件是存放在sm.coms.loadedlist数组中！
God.coms.loadedlist=[];
God.coms.require=function(plugins=[]){
    var me=this;
    //预处理参数
    !$$.isarray(plugins)&&(plugins=[plugins]);
    var newplugins=[];
    plugins.forEach(function(v){
        let fullpath="sm/coms/sm."+v+".html";
        if(me.loadedlist.indexOf(fullpath)<0){
            newplugins.push(fullpath);
            me.loadedlist.push(fullpath);
        }
    });
    newplugins.length&&(sm.loading.init(newplugins.length));
    return sm.ajax.loadhtml(newplugins,"head");
};//动态加载一系列组件
//warehouse有两个作用，如果remote是false，就是简单的判断下给定的com是否已在warehouse中。
//如果remoe为true则使用异步回调的方式进行后续动作
God.coms.warehouse=function(com="",remote=false){
    var me= this;
    var wel=document.head.querySelector("#coms-warehouse");
    if(!wel){
        wel=document.createElement("div");
        wel.setAttribute("id","coms-warehouse");
        document.head.appendChild(wel);
    }
    if(com==""){
        return wel;//简单的获取warehouse的element
    } else {
        wel=wel.querySelector('[view-com-tpl="'+com+'"]');
        if(!remote) {return wel;}//简单的判断本地有没有这个组件
        var promise=new Promise(function(resolve,reject){
            if(wel){
                return resolve(wel);
            } else {
                return me.deliver(com).then(function(d){
                    return resolve(d);
                },function(i){
                    return reject(i);
                });
            }
        });
        return promise;
    }
};
God.coms.deliver=function(com){
    var promise=new Promise(function(resolve,reject){
        sm.coms.require(com).then(function(){
            var tel=sm.coms.warehouse(com);
            if(tel){
                return resolve(tel);
            } else {
                return reject("No view com defined!");
            }
        },function(i){
            return reject(i);
        });
    });
    return promise;
};//实际执行将一个com组件从远程运到warehouse，执行他之前
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
God.pooldivel=function(){
    if(document.body.querySelector("body>#sm_pool")){
        return document.body.querySelector("body>#sm_pool");
    } else {
        document.body.querySelector("#sm_pool")&&document.body.querySelector("#sm_pool").remove();
        var tn=document.createElement('div');
        tn.style.display="none";
        tn.innerHTML='<div style="position:absolute;display:none!important;" id="sm_pool"></div>';
        document.body.appendChild(tn.firstChild);
        tn.remove();
        return document.body.querySelector("body>#sm_pool");
    }
        
}
God.newel=function(htmlcode){
    var tn=document.createElement('div');
    tn.style.display="none";
    tn.innerHTML=htmlcode;
    var rsnode=tn.firstChild;
    if(rsnode){
        sm.pooldivel().appendChild(rsnode);
    }
    tn.remove();
    return rsnode;
}
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
};//当前
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
if (!Array.prototype.forEach) {
	Array.prototype.forEach = function(callback, thisArg) {
		var T, k;
		if (this == null) {
			throw new TypeError(" this is null or not defined");
		}
		var O = Object(this);
		var len = O.length >>> 0; // Hack to convert O.length to a UInt32
		if ({}.toString.call(callback) != "[object Function]") {
			throw new TypeError(callback + " is not a function");
		}
		if (thisArg) {
			T = thisArg;
		}
		k = 0;
		while (k < len) {
			var kValue;
			if (k in O) {
				kValue = O[k];
				callback.call(T, kValue, k, O);
			}
			k++;
		}
	};
}//让IE拥有js数组的forEach功能
(function () {
    var ie = !!(window.attachEvent && !window.opera);
    var wk = /webkit\/(\d+)/i.test(navigator.userAgent) && (RegExp.$1 < 525);
    var fn = [];
    var run = function () { for (var i = 0; i < fn.length; i++) fn[i](); };
    var d = document;
    //console.log("load document.ready");
    d.ready = function (f) {
        //console.log("enter document.ready");
        if(/^(loaded|complete)$/.test(d.readyState)){
            //console.log("判断已经加载完了，直接运行之！");
            run();
            return f();
        }
        if (!ie && !wk && d.addEventListener){
            //console.log("判断还没加载完，添加一个监听！");
            d.addEventListener('DOMContentLoaded', function(){console.log("enter domcontentloaded handeller:"+d.readyState);f();}, false);
            return d.addEventListener('readystatechange', function(){if(/^(loaded|complete)$/.test(d.readyState)){f();}}, false);
        }
        if (fn.push(f) > 1) return;
       //console.log("设置轮询检查reasyState状态");
        if (ie)(function () {
            try { d.documentElement.doScroll('left'); run(); }
            catch (err) { setTimeout(arguments.callee, 0); }
        })();
        else if (wk) var t = setInterval(function () {
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
matchedparentel:function(el,selector){
    if(el&&el.matches&&el.matches("body *")){
        while (!el.matches("body")){
            if(el.matches(selector)){
                return el;
            } else {
                el=el.parentElement;
            }
        }
        if(el.matches(selector)){return el;}
        return false;
    } 
    return false;
},
isempty:function(varname){return !varname;},//判断参数是否为空
isnull:function(varname){return  (!varname&& typeof(varname)!="undefined" && varname!=0);},//判断参数是否为null
isobj:function(varname){return Object.prototype.toString.call(varname) === '[object Object]'; },//判断参数是否为对象
isarray:function(varname){return Object.prototype.toString.call(varname) === '[object Array]'; },//判断参数是否为数组
isna:function(varname){return isNaN(varname);},//判断参数是否为NA
isundefined:function(varname){return typeof(varname) == "undefined";},//判断参数是否为 undefined
isdefined:function(varname){return !(typeof(varname) == "undefined");},//判断参数是否为defined
isfunction:function(varname){return (typeof(varname) == "function");},// 判断参数是否为函数
groupvalue:function(selector,which=""){
        var rsgroup=[];
        var items=document.querySelectorAll(selector);
        items.forEach(function(item){
            console.log(item.value);
            var gstr=item.getAttribute("group");
            var gby=gstr.split(" as ")[0];
            var gas=((gstr==gby)?"":gstr.split(" as ").pop());
            console.log(gstr+"--"+gby+"--"+gas);
            if(gas==""){
                rsgroup.push(sm.view.getattrvalue(item,gby));
            } else if(/\[(.*)\]/.test(gas)) {
                var t=RegExp.$1;
                (typeof rsgroup[t]=="undefined")&&(rsgroup[t]=[]);
                rsgroup[t].push(sm.view.getattrvalue(item,gby));
            } else if(/([^\.]*)\.([^\.]*)/.test(gas)) {
                var t=RegExp.$1;
                var tt=RegExp.$2;
                console.log(t+"--"+tt);
                (typeof rsgroup[t]=="undefined")&&(rsgroup[t]={});
                rsgroup[t][tt]=sm.view.getattrvalue(item,gby);
                console.log("值:"+sm.view.getattrvalue(item,gby));
            }
        });
        if(which=="") {return rsgroup;}
        else {return rsgroup[which];}
},
toobj:function(arr,objdef){
    //如果传进来的是一个数组，那么遍历数组把每个元素按照顺序赋值到objdef
    //如果传进来的是一个对象，那么便利对象属性，那么把这个对象属性合并到objdef
    if($$.isobj(arr)){
        var rso= $$.merge.apply({},objdef);
        $$.merge.apply(rso,[arr]);
        return rso;
    }
    !$$.isarray(arr)&&(arr=[arr]);
    var rso=$$.merge.apply({},[objdef]);
    var i=0;
    for(prop in rso){
        if(i <arr.length){
            rso[prop]=arr[i];
        }
        i++;
    }
    return rso;
},//数组：遍历数组把每个元素按照顺序赋值到objdef；对象：遍历对象属性，那么把这个对象属性合并到objdef
transpose:function(arr){

    return arr[0].map(function(v,i){
        return arr.map(function(vv){
            return vv[i];
        });
    });

},//把一个二维数组转置
formobj:function(karr,varr){
    !$$.isarray(varr)&&(varr=[varr]);
    if(varr.length<1) return {};
    if($$.isarray(varr[0])){
        var rs=[];
        for (var i=0;i<varr.length;i++){
            rs.push($$.formobj(karr,varr[i]));
        }
    } else {
        var rs={};
        for (var i=0;i<karr.length;i++){
            rs[karr[i]]=i>(varr.length-1)?varr[0]:varr[i];
        }
    }
    return rs;
},//把两个数组组合成一个obj
objvalues:function(obj){
    var rs=[];
    for(var i in obj){
        if($$.isarray(obj)){
            rs.push($$.objvalues(obj[i]));
        } else {
            rs.push(obj[i]);
        }
    }
    return rs;
},//把对象中的属性值组合成一个数组
toobjarr:function(arr,objdef){
    //如果传进来的是一个数组，那么遍历数组把每个元素转换成一个objdef
    //如果传进来的是一个对象，那么便利对象属性，把每个属性转换成一个objdef其中的name=key，value=value，text=key
    var rso=[];
    if($$.isobj(arr)){
        for (var k in arr){
            rso.push($$.toobj({name:k,value:arr[k],text:k},objdef));
        }
        return rso;
    }
    !$$.isarray(arr)&&(arr=[arr]);
    arr.forEach(function(item){
        rso.push($$.toobj(item,objdef));
    });
    return rso;
},//没看懂！！
merge:function(o){for (x in o) {this[x]=o[x];} return this;},//把给定的对象的全部属性融合到自身中
safemerge:function(o){for (x in o) {this.hasOwnProperty(x)&&(this[x]=o[x]);} return this;},//把给定的对象中与自身相交的属性值更新到自身中
rndid:function(prix){prix=arguments[0]?(arguments[0]+"_"):"";return prix+parseInt(1000000*Math.random());},//产生一个随机数，其前缀时prix
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
},//遍历一个对象，数组，cb的两个参数分别时key，value，或者index，value
getElementLeft:function (element){
    var actualLeft = element.offsetLeft;
    var current = element.offsetParent;

    while (current !== null){
        actualLeft += current.offsetLeft;
        current = current.offsetParent;
    }
    return actualLeft;
},//获取一个元素的左边定位
getElementTop:function (element){
    var actualTop = element.offsetTop;
    var current = element.offsetParent;
    while (current !== null){
        actualTop += current.offsetTop;
        current = current.offsetParent;
    }
    return actualTop;
    },//获取一个元素的上部定位
random:function(length){return Math.floor((Math.random()+1)*10**(length-1)).toString();},
codequot:function(str){
    var rs=str.replace(/\"/g,"#quot;");
    rs=rs.replace(/\'/g,"#quot;");
    return rs;
},
decodequot:function(str){
    return str.replace(/#quot;/g,'"');
},
dbaddstr:function(row){
    var rs="";
    for(var k in row){
        if(row[k]!=""){
            if(rs==""){
                rs=k+"=\""+row[k]+"\"";
            } else {
                rs=rs+","+k+"=\""+row[k]+"\"";
            }
        }
    }
    return rs;
},//把一个对象组装成一个字符串，用于mysql添加：key1=value1，key2=value2
dbupdstr:function(ori,newo){
    var rs="";
    for(var k in ori){
        if(ori[k]!==newo[k]){
            if(rs==""){
                rs=k+"=\""+newo[k]+"\"";
            } else {
                rs=rs+","+k+"=\""+newo[k]+"\"";
            }
        }
    }
    return rs;
},//对比两个对象，只把值不相同的部分组装成一个字符串，用于mysql更新：key1=value1，key2=value2
setOpacity:function(ele, opacity) {
    if (ele.style.opacity != undefined) {
        ///兼容FF和GG和新版本IE
        ele.style.opacity = opacity / 100;

    } else {
        ///兼容老版本ie
        ele.style.filter = "alpha(opacity=" + opacity + ")";
    }
},//设置某个元素的透明度
fadein:function(ele,interval=30) {
    if (ele) {
        ele.style.display="block";
        var v = 0;
        timer = setInterval(function() {
            if (v <= 100) {
                v += 10;
                $$.setOpacity(ele, v);
            } else {
                clearInterval(timer);
            }
        }, interval);
    }
},//设置某个元素动态显示
fadeout:function(ele,interval=30) {
    if (ele) {
        ele.style.display="block";
        var v = 100;
        timer = setInterval(function() {
            if (v >=0) {
                v -= 10;
                $$.setOpacity(ele, v);
            } else {
                clearInterval(timer);
            }
        }, interval);
    }
},//设置某个元素动态隐藏
addclass:function(el,cls){
    var tc=$$.removeclass(el,cls).getAttribute("class");
    return el.setAttribute("class",tc+" "+cls.trim());
},
removeclass:function(el,cls){
    var tc=el.getAttribute("class");
    tc=" "+tc.trim()+" ";
    tc=tc.replace(" "+cls.trim()+" ","").trim();
    el.setAttribute("class",tc);
    return el;
},
});
window.$$=God.$$=God.func;//方便对全局函数的引用，位置不能改

God.coms("ajax").extend({
    _setup:{
        data:{},
        type:"POST",
        async:true,
        url:"#",
    },   
}).extendproto({
type:function(newtype){this.setup({type:newtype});return this;},//设置POST的Type：POST，GET
data:function(newdata){this.setup({data:newdata});return this;},//设置POST的数据
url:function(newurl){this.setup({url:newurl});return this;},//设置POST的网址
smurl:function(su,ex=""){return this.url(sm.server.url(su)+ex);},//输入名字，设置为sm.server.url中存储的url
async:function(b){this.setup({async:b});return this;},//设置是否为异步
post:function(data,url,async){
    arguments.length>2&&(this.async(async));
    arguments.length>1&&(this.url(url));
    arguments.length>0&&(this.data(data));
    return this.type("POST").clearstat().doxhr();
},//这个POST的返回值是原原本本的返回值
smpost:function(data,url,async){
    arguments.length>2&&(this.async(async));
    arguments.length>1&&(this.url(url));
    arguments.length>0&&(this.data(data));
    return this.type("POST").clearstat().doxhr({},true);
},//这个POST的返回值是对返回的值按照交互的规则进行解析，直接解析出有用的数据！
callproc:function(procname,paras=[]){
    //console.log(JSON.stringify(paras));
    return this.smpost({procname:procname,paras:JSON.stringify(paras)});
},//这个POST的返回值是对返回的值按照交互的规则进行解析，直接解析出有用的数据！
multicallproc:function(procname,paras=[[]],count=0){
    var me=this;
    if(paras.length===0){
            return new Promise(function(resolve,reject){return resolve("Perfect:"+count+"个循环执行了！");});
    } else {
        var realparas=paras.shift();
        return new Promise(function(resolve,reject){
           sm.ajax.url("db/callproc.func").callproc(procname,realparas).then(function(d){
               me.multicallproc(procname,paras,++count).then(function(d){
                   return resolve(d);
               },function(d){
                   return reject(d);
               })
           },function(d){
               return reject(d);
           })
        });
    }
},//这个POST的返回值是对返回的值按照交互的规则进行解析，直接解析出有用的数据！
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
            //console.log(xhr.readyState);
            if(xhr.readyState == 4){    //4表示解析完毕
                //console.log(xhr);
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
        //console.log(me.setup());
      
        xhr.send(me.formatdata(data)); 
        me.setup().data={};
    });
    return promise;
},//实际的交互函数
formatdata:function(obj){
    sm.server.adjustdata.apply(obj);
    if(!obj) {return null;}
    if(typeof obj!=="object"){return obj;}
    var rs="";
    for(var k in obj){
        if(rs!==""){rs=rs+"&";}
        rs=rs+k+"="+encodeURIComponent(obj[k]);
    }
    if(rs==""){
        return null;
    }
    return rs;
},//将一个给定的对象，组装成一个GET字符串 key1=value1&key2=value2
adjusturl:function(d,htmlpath){
    var nd=document.createElement("div");
    nd.innerHTML=d;
    var fullpath=htmlpath.split("/");
    fullpath.pop();
    var path=fullpath.join("/")+"/";
    var srcs=nd.querySelectorAll("[src]");
    for(var i=0;i<srcs.length;i++){
        var el=srcs[i];
        var src=el.getAttribute("src");
        if(!/^\//.test(src)){
            src=path+src;
            el.setAttribute("src",src);
        }
    }
    var srcs=nd.querySelectorAll("link[href]");
    for(var i=0;i<srcs.length;i++){
        var el=srcs[i];
        var src=el.getAttribute("href");
        if(!/^\//.test(src)){
            src=path+src;
            el.setAttribute("href",src);
        }
    }
    return nd.innerHTML;
},//把给定的一段HTML代码中所有含有src，进行遍历，把相对路径的src前面添加一段HTMLpath
loadhtml:function(htmlfiles,target="body",cleartarget=false,remote=true){
    if(target.nodeType!==1){
        target=document.querySelector(target);
        if(!target){return new Promise(function(resolve,reject){return reject("Target not valid!");});}
    }
    var me=this;
    if(!$$.isarray(htmlfiles)){htmlfiles=[htmlfiles];}
    if(htmlfiles.length==0){
        return new Promise(function(resolve,reject){return resolve("blank");}); //一层套一层，这是最后一轮的时候直接回复
    } else if(htmlfiles.length==1){//最后一个加载的文件
        const htmlfile=htmlfiles[0];
        if(remote){
            const promise = new Promise(function(resolve, reject) {
                me.load(htmlfile).then(function(d){
                    me.loadhtml(me.adjusturl(d,htmlfile),target,cleartarget,false).then(function(){
                    //me.loadhtml(d,target,cleartarget,false).then(function(){
                        return resolve(d);
                    },function(i){
                        return reject(i);
                    });
                });
            });
            return promise;
        }else {
            const promise = new Promise(function(resolve, reject) {
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
                    if(target==document.head){ //对元素一个一个的遍历，如果目标是Head的话，就只挑选Com模板，其他的都删掉忽略
                        if(["STYLE","LINK","META"].indexOf(cnodes[0].nodeName)>-1){
                            target.appendChild(cnodes[0]);
                        }else{
                            if(cnodes[0].nodeType==1 && cnodes[0].matches("[view-com-tpl]")){
                                let tcom=cnodes[0].getAttribute("view-com-tpl");
                                if(!sm.coms.warehouse(tcom)){ //如果仓库里面没有，就加在仓库里面，但是好像
                                    sm.coms.warehouse().appendChild(cnodes[0]);//append以后会把节点从原来的地方删掉
                                } else {
                                    cnodes[0].remove();
                                }
                            } else {
                                cnodes[0].remove();
                            }
                        }
                    }else{
                        target.appendChild(cnodes[0]);//对元素一个一个的遍历，如果目标不是Head的话，就都当成普通的代码全部导入
                    }
                }
                if(sl>0){ //上面是把非JS的内容玻璃出来了，但是JS部分由于是异步的，需要一个一个来，递归，把JS一个一个的累加到后面的。
                    var script=newscripts[0];
                    bash.getElementsByTagName('script').item(0).remove();
                    if(script.src){
                        me.loadjs(script.src,target).then(function(d){
                            me.loadhtml(bash.innerHTML,target,false,false).then(function(d){return resolve(d);},function(i){return reject(i);});
                        });
                    } else {
                        target.appendChild(script);
                        me.loadhtml(bash.innerHTML,target,false,false).then(function(d){return resolve(d);},function(i){return reject(i);});
                    }
                } else {
                    return resolve(htmlfile);
                }  
            });
            return promise;
        } 
    } else {
        const htmlfile=htmlfiles.shift();
        const promise = new Promise(function(resolve, reject) {
            me.loadhtml(htmlfile,target,cleartarget,remote).then(function(){
                sm.loading.next(htmlfile);
                me.loadhtml(htmlfiles,target,false,remote).then(function(d){
                    sm.loading.finish();
                    return resolve(d);
                },function(i){
                    return reject(i);
                });
            },function(i){
                return reject(i);
            });
        });
        return promise;
    }
},//动态加载一个HTML文件
loadjs:function(jsfiles,target="head"){
    var me=this;
    if(target.nodeType!==1){
        target=document.querySelector(target);
        if(!target){target=document.head;}
    }
    !$$.isarray(jsfiles)&&(jsfiles=[jsfiles]);
    if(jsfiles.length==0){
        return new Promise(function(resolve, reject){return resolve();});
    }else if(jsfiles.length==1){
        const jsfile=jsfiles[0];
        const promise = new Promise(function(resolve, reject) {
        var script =document.createElement("script");
            script.src=jsfile;
            script.onload = script.onreadystatechange = function(){
                if( ! this.readyState     //这是FF的判断语句，因为ff下没有readyState这人值，IE的readyState肯定有值
                      || this.readyState=='loaded' || this.readyState=='complete'   // 这是IE的判断语句
                ){
                      return resolve(jsfile);
                }
            }
            try{
                target.appendChild(script);
            }catch(e){}
        });
        return promise;
    }else{
        const jsfile=jsfiles[0];
        jsfiles.shift();
        const promise = new Promise(function(resolve, reject) {
        var script =document.createElement("script");
            script.src=jsfile;
            script.onload = script.onreadystatechange = function(){
                if( ! this.readyState     //这是FF的判断语句，因为ff下没有readyState这人值，IE的readyState肯定有值
                      || this.readyState=='loaded' || this.readyState=='complete'   // 这是IE的判断语句
                ){
                    me.loadjs(jsfiles,target).then(function(d){
                        return resolve(d);
                    },function(i){
                        return reject(i);
                    });
                }
            }
            try{
                target.appendChild(script);
            }catch(e){}
        });
        return promise;
    }  
},//动态加载一个JS文件
loadcss:function(cssfiles){
    var me=this;
    !$$.isarray(cssfiles)&&(cssfiles=[cssfiles]);
    if(cssfiles.length==0){
            return new Promise(function(resolve, reject){return resolve();});
    }else if(cssfiles.length==1){
        const cssfile=cssfiles[0];
        const promise = new Promise(function(resolve, reject) {
            me.load(cssfile).then(function(d){
                var css =document.createElement("style");
                css.textContent=d;
                document.head.appendChild(css);
                return resolve(d);
            },function(i){
                return reject(i);
            });
        });
        return promise;
    } else {
        const cssfile=cssfiles[0];
        cssfiles.shift();
        const promise = new Promise(function(resolve, reject) {
            me.load(cssfile).then(function(d){
                var css =document.createElement("style");
                css.textContent=d;
                document.head.appendChild(css);
               me.loadcss(cssfiles).then(function(d){
                   return resolve(d);
               },function(i){
                   return reject(i);
               });
            },function(i){
                return reject(i);
            });
        });
        return promise;
    }
},//动态加载一个css文件
load:function(file,async=true){return sm.ajax.async(async).url(file).post();},//执行一个POST请求，把返回的内容作为参数传递给回调函数
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
},//检查一段返回值是否为sm format，返回值为布尔值
});
God.coms("view").extendproto({//对话框
find:function(dataspace){
    //console.log("find");
    if(typeof dataspace!=="string"){alert("1");}
    return this.new(dataspace);
},//new的别名，增强可读性
new:function(dataspace){
    //console.log("new:"+dataspace);
    var val=sm.view.data;
    var exp = dataspace.split('.');
    for(var i=0;i<exp.length-1;i++){
        var v=exp[i];
        (typeof val[v]=="undefined")&&(val[v]={});
        val=val[v];
    }
    (typeof val[exp[i]]=="undefined")&&(val[exp[i]]={});
    //console.log("11111");
    val[exp[i]]._dataspace=dataspace;
    val[exp[i]].__proto__=sm.view.method;
    //console.log(val[exp[i]]);
    //console.log(sm.view.data.common);
    if(dataspace=="common"){
        val[exp[i]].alias("$common");
    } else {
        let tidyspace=dataspace.replace(/^common\./,"$");
        val[exp[i]].alias(tidyspace);
        val[exp[i]]._iscom=true;
    }
    
    return val[exp[i]];
},//创建一个新的view实例，或者返回既有的view实例
fillcomto:function(comname,target,dataspace,independent=false){
    var promise=new Promise(function(resolve,reject){
        sm.coms.warehouse(comname,true).then(function(com){
            if(independent){
                target.innerHTML="<div com:='"+comname+"' dataspace='"+dataspace+"' oncominit='true'>"+com.innerHTML+"</div>";
                //sm.view.dooncominit(comname,dataspace);
                sm.view.init().then(function(){
                    if(typeof dataspace!=="string"){alert("fillcomto");}
                    return resolve(sm.view.find(dataspace));
                },function(){
                    return reject("初始化失败！");
                });
            } else {
                target.innerHTML=com.innerHTML;
                //sm.view.dooncominit(comname,dataspace);
                return resolve(com);
            }
            
        },function(i){return reject(i);});
    });
    return promise;
},//把某一个组件动态加载到一个目标节点中
method:{//下面是界面组件的通用方法
    find:function(subdataspace){
        var me=this;
        var ms=me._dataspace;
        var fs=ms+"."+subdataspace;
        return sm.view.find(fs);
    },//在当前变量空间下查找子空间变量
    locatel:function(selector){
        return this._el.querySelector(selector);
    },//在当前组件范围内查找符合selector的元素
    data:function(mapobj){
        var me=this;
        var dataspace=me._dataspace;
        $$.foreach(mapobj,function(k,v){
            if(typeof dataspace!=="string"){alert("method.data");}
            sm.view.setvar(k,v,dataspace);
        });
        return me;
    },//给当前的组件添加新的成员变量
    method:function(mapobj){
        var me=this;
        $$.foreach(mapobj,function(k,v){
            me[k]=v;
        });
        return this;
    },//给当前的组件添加新的方法
    alias:function(newalias){
        //console.log("进入组件自己的Alias");
        var ns=newalias.split(".");
        var k=window;
        for (var i=0;i<ns.length-1;i++){
            var v=ns[i];
            (typeof k[v]=="undefined")&&(k[v]={});
            k=k[v];
        }
        k[ns[i]]=this;
        return this;
    },//给当前的组件创建一个新的别名
    watchdom:function(mapobj,stopbuble=false){
        var me=this;
        //获取顶层节点
        var dataspace=me._dataspace;
        var rootnode=me._el;
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
                }
                //2,如果根节点删除又重新建了，确保listen的是根节点是最新的，并且不能重复添加
                var eventlist=rootnode.getAttribute('eventlist');
                var tag=dataspace+"."+realevent+".watching";
                if(!eventlist||eventlist.indexOf(tag)<0){
                    rootnode.addEventListener(realevent,function(e){
                        sm.view.eventhandeler.apply(me,[e,dataspace]);
                    });
                    rootnode.setAttribute('eventlist',eventlist+','+tag);
                } 
            });   
        });
        return this;
    },//在com的顶层节点创建事件监听，并记录在DOM中
    watchdata:function(mapobj){
        var me=this;
        var dataspace=me._dataspace;
        Object.keys(mapobj).forEach(function(k){
            sm.view.getvar(k,dataspace);
            sm.view.varfunsadd(k,mapobj[k],dataspace);
        });
        sm.view.watchdata(dataspace);
        return this;
    },//这个不需要用户使用
    group:function(which=""){
        this._group=[];
        var me=this;
        var items=this._el.querySelectorAll("[group]");
        items.forEach(function(item){
            var gstr=item.getAttribute("group");
            var gby=gstr.split(" as ")[0];
            var gas=((gstr==gby)?"":gstr.split(" as ").pop());
            if(gas==""){
                me._group.push(sm.view.getattrvalue(item,gby));
            } else if(/\[(.*)\]/.test(gas)) {
                var t=RegExp.$1;
                (typeof me._group[t]=="undefined")&&(me._group[t]=[]);
                me._group[t].push(sm.view.getattrvalue(item,gby));
            } else if(/([^\.]*)\.([^\.]*)/.test(gas)) {
                var t=RegExp.$1;
                var tt=RegExp.$2;
                (typeof me._group[t]=="undefined")&&(me._group[t]={});
                me._group[t][tt]=sm.view.getattrvalue(item,gby);
                window.aaa=item;
                //console.log(tt+"--"+gby);
                //console.log(item);
            }
        });
        if(which=="") {return this._group;}
        else {return this._group[which];}
    },//返回该组件内的数组
    addclass:function(classes,target=false){
        !target&&(target=this._el);
        if(target){
            var oc=target.getAttribute("class");
            if(oc){
                oc=" "+oc+" ";
                classes=classes.split(" ");
                classes.forEach(function(cla){
                    if(cla){
                        if(oc.indexOf(" "+cla+" ")<0){
                            oc=oc+cla+" ";
                        }
                    }
                });
                oc=oc.substr(1,oc.length-2);
                target.setAttribute("class",oc);
            } else {
                target.setAttribute("class",classes);
            }
        }
        return this;
    },//确保某个DOM节点有某个类
    removeclass:function(classes,target=false){
        !target&&(target=this._el);
        if(target){
            var oc=target.getAttribute("class");
            if(oc){
                oc=" "+oc+" ";
                classes=classes.split(" ");
                classes.forEach(function(cla){
                    if(cla){
                        if(oc.indexOf(" "+cla+" ")>=0){
                            oc=oc.replace(" "+cla+" "," ");
                        }
                    }
                });
                oc=oc.substr(1,oc.length-2);
                target.setAttribute("class",oc);
            }
        }
        return this;
    },//确保某个DOM节点没有某个类
    toggleclass:function(classes,target=false){
        !target&&(target=this._el);
        if(target){
            var oc=target.getAttribute("class");
            if(oc){
                oc=" "+oc+" ";
                classes=classes.split(" ");
                classes.forEach(function(cla){
                    if(cla){
                        if(oc.indexOf(" "+cla+" ")>=0){
                            oc=oc.replace(" "+cla+" "," ");
                        } else {
                            oc=oc+cla+" ";
                        }
                    }
                });
                oc=oc.substr(1,oc.length-2);
                target.setAttribute("class",oc);
            } else {
                target.setAttribute("class",classes);
            }
        }
        return this;
    },//切换某个DOM节点的某个类
    hasclass:function(classes,target=false){
        !target&&(target=this._el);
        var rs=false;
        if(target){
            var oc=target.getAttribute("class");
            if(oc){
                oc=" "+oc+" ";
                classes=classes.split(" ");
                classes.forEach(function(cla){
                    if(cla){
                        if(oc.indexOf(" "+cla+" ")>=0){
                            rs=true;
                        } else {
                            rs=false;
                        }
                    }
                });
            }
        }
        return rs;
    },//检测某个DOM节点是否有某个类
    
},//这里的函数都需要有this指针，会把当前实例需要的函数再次封装在这里
layout:{
    get:function(){
        var curlayout=document.querySelector("[layout]");
        return curlayout;
    },//返回当前的Layout元素
    load:function(views){
        var curlayout=document.body.querySelector("[layout]");
        if(!curlayout){
            var nonamel=document.createElement("div");
            nonamel.setAttribute("layout","noname");
            nonamel.setAttribute("container","*");
            document.appendChild(nonamel);
            curlayout=nonamel;
        } 
        if(!curlayout.getAttribute("container")&&!curlayout.querySelector("[container]")){
            var container=document.createElement("div");
            container.setAttribute("container","*");
            curlayout.appendChild(container);
        }
        if(views.length<1){return new Promise(function(resolve,reject){return resolve("blank");});}
        var view=views.shift();
        const promise=new Promise(function(resolve,reject){
                var viewname=view.split("@")[0];
                var filler=view.substr(viewname.length+1);
                if(filler==""){filler="*"}
                if(curlayout.getAttribute("container")==filler){
                    if(!curlayout.getAttribute("loaded")||!(curlayout.getAttribute("loaded")==viewname)){
                        sm.ajax.loadhtml(viewname,curlayout,true).then(function(){
                            curlayout.setAttribute("loaded",viewname);
                            sm.view.init().then(function(){
                                sm.view.doonloadinit();
                                sm.view.layout.load(views).then(function(){
                                    return resolve();
                                },function(){
                                    return reject();
                                });
                            },function(){
                                return reject("初始化失败！");
                            });
                        },function(i){
                            return reject(i);
                        });
                    }  else {
                        sm.view.layout.load(views).then(function(){
                            return resolve();
                        },function(){
                            return reject();
                        });
                    }
                } else {
                    var selector="[container='"+filler+"']";
                    var target=curlayout.querySelector(selector);
                    if(target){
                        if(!target.getAttribute("loaded")||!(target.getAttribute("loaded")==viewname)){
                            sm.ajax.loadhtml(viewname,target,true).then(function(){
                                target.setAttribute("loaded",viewname);
                                sm.view.init().then(function(){
                                    sm.view.doonloadinit();
                                    sm.view.layout.load(views).then(function(){
                                        return resolve();
                                    },function(){
                                        return reject();
                                    });
                                },function(){
                                    return reject("初始化失败！");
                                });
                            },function(i){
                                return reject(i);
                            });
                        }  else {
                            sm.view.layout.load(views).then(function(){
                                return resolve();
                            },function(){
                                return reject();
                            });
                        }
                    } else {
                        return reject.apply(sm.view,[viewname]);
                    }
                }
        });
        return promise;
    },//把一系列parts加载到当前的布局中，格式如下["toolbar@header","footbar@footer",page@page]
    clear:function(witch=""){
        var me=this;
        var curlayout=me.get();
        if(curlayout){
           if(curlayout.getAttribute("container")==witch||(curlayout.getAttribute("container")&&(witch==""))){curlayout.innerHTML="";curlayout.setAttribute("loaded","");}
           var cts=curlayout.querySelectorAll("[container]");
           var num=cts.length;
           for(var i=0;i<num;i++){
               if(cts[i]&&(cts[i].getAttribute("container")==witch||witch=="")){cts[i].innerHTML="";cts[i].setAttribute("loaded","");}
           }
        }
        return this;
    },//清空layout中的所有容器中的内容
},
makeui:function(lname="",views=[]){
    const promise=new Promise(function(resolve,reject){
       if(lname==""){lname="noname";}
        //先判断当前是否有layout，以及当前的layout是否是lname
        var curlayout=document.body.querySelector("[layout]");
        if(curlayout){curlayout=curlayout.getAttribute("layout");} 
        if(curlayout!==lname){
            sm.ajax.loadhtml("./view/layout/"+lname+".layout.html",sm.document.body(),true).then(function(){
                sm.view.init().then(function(){
                    sm.view.doonloadinit();
                    sm.view.layout.load(views).then(function(d){return resolve(d);},function(i){return reject(i);});
                },function(){
                    return reject(i);
                });
            },function(i){return reject(i);});  
        }  else {
            sm.view.layout.load(views).then(function(d){return resolve(d);},function(i){return reject(i);});
        } 
    });
    return promise;
},//将给定的部件按照布局组装起来
init:function (com="body",deepinit=1,pdataspace=""){
    var me=this;
    //首先检查当前元素是不是组件，不是的话就拒绝初始化
    var $el = com.nodeType == 1 ? com : document.querySelector(com);
    if(!this.checkiscom($el)){return this;}
    //如果是组件的话，先确定当前组件的数据空间在哪里
    var dataspace=$el.getAttribute("dataspace");
    dataspace||(dataspace="common");
    (typeof dataspace!=="string")&&(dataspace="common");
    var ods=dataspace;
    (pdataspace!=="")&&(dataspace=pdataspace+"."+dataspace);
    //console.log("root begin of Init:"+dataspace);
    //console.log(sm.view.data.common);
    var comname=$el.getAttribute("com:");
    var needinit=$el.getAttribute("oncominit");
    //console.log($el.outerHTML);
    //console.log("-----看看这个前面！！");
    //首先确保该组件下没有尚未实例化的组件引用，没有的话开始进行初始化
    var promise=new Promise(function(resolve,reject){
        me.comrefinit($el,dataspace).then(function(d){
            //console.log("开始初始化一个组件："+dataspace);
            var view=sm.view.new(dataspace);
            view._el=$el;
            //console.log("init el"+$el);
            //console.log($el);
            //console.log(comname);
            //console.log(needinit);
            if(comname&&needinit){
            //if(comname){
                //console.log("满足初始化条件");
                sm.view.dooncominit(comname,view,$el,ods,pdataspace);
                //console.log("初始化完了啊");
                //$el.removeAttribute("oncominit");
            }
            me.comset($el,dataspace,deepinit);
            me.comget($el,dataspace,deepinit);
            me.watchdata(dataspace);
            return resolve("初始化成功！");
        },function(i){
            return reject("初始化失败："+i);
        });
    });
    return promise;
},//View组件初始化，逐一进行一遍Get，Set然后对变量进行watch

//下面函数虽是View类，但不是给用户用的，因此不可见
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
comrefinit:function(el=document.body,pds=""){
    var me=this;
    var comref=el.querySelector("[view-com]");
    if(!comref||comref.length<1) return new Promise(function(resolve,reject){return resolve("blank");});
    var comname=comref.getAttribute("view-com");
    var dataspace=comref.getAttribute("dataspace");
    if(!dataspace) dataspace=comname;
    //var fds=dataspace;
    //if(!pds) fds=pds+"."+fds;
    comref.setAttribute("com:",comname);
    comref.setAttribute("dataspace",dataspace);
    comref.setAttribute("oncominit",true);
    comref.removeAttribute("view-com");
    var promise=new Promise(function(resolve,reject){
        me.fillcomto(comname,comref,dataspace).then(function(d){
            //sm.view.find(dataspace);
            sm.view.init(comref,1,pds).then(function(d){
                me.comrefinit(el,pds).then(function(d){
                    return resolve(d);
                },function(i){
                    return reject(i);
                });
            });
        },function(i){
            return reject(i);
        });
    });
    return promise;
},//把某个组件HTML代码进行初始化，当有View-com：时就表明没初始化
eventhandeler:function(e,dataspace){
    var maxi=e.path.indexOf(e.currentTarget)
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
            var i=0;
            var matchedel=e.target;
            while(i<=maxi){
                e.path[i].matches(selector)&&(match=true,matchedel=e.path[i]);
                i++;
            }
        } catch(e){
            
        }
        
        var curevent=k.substr(selector.length+1);
        if(curevent==""){curevent=defaultevent} else {defaultevent=curevent;}
        if(match&&("@"+curevent+"@").indexOf("@"+e.type+"@")>-1){
            //console.log(e.target.textContent+e.type+dataspace);
            cb.apply(sm.view.find(dataspace),[e,matchedel,dataspace]);
        }
    }
    
    return this;    
},
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
    }//如果没有selector，就组装一个selector，通过type，name等
    el.getAttribute("group-by")&&(gby=el.getAttribute("group-by"));
    el.getAttribute("group-on")&&(gon=el.getAttribute("group-on"));
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
        node.getAttribute("group-on")&&(mgon=node.getAttribute("group-on"));
        node.getAttribute("group-deepwatch")&&(mgdeep=node.getAttribute("group-deepwatch"));
        node.getAttribute("group-as")&&(mgas=node.getAttribute("group-as"));
        var item=me.getattrvalue(node,mgby);
        if(mgas==""){
            rsvalue.push(item);
        } else {
            rsvalue[mgas]=item;
        }
        //console.log("找到一个数据源："+gselector+mgby+mgon+mgdeep+mgas);
        autoupdate&&(node!==el)&&(mgdeep)&&me.watchdom(node,dataspace,mgon,el);
    });
    return rsvalue;
},//通过给定的参数，获取一组元素的值，并组装成array或者obj；
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
    //console.log("检查是否锁定");锁定是什么意思
    return (com.nodeType==1)&&com.getAttribute("view-locked");
},
checkiscomref:function(el){
    if(el.nodeType!==1) return false;
    if(el.matches("[view-com]")) return true;
    return false;
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
                    if(typeof dataspace!=="string"){alert("elget");}
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
            if(typeof dataspace!=="string"){alert("elget2");}
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
                    //console.log("初始化组件-------："+dataspace);
                    me.init(node,deepinit,dataspace);//如果需要对子组件进行递归初始化就进行递归初始化
                }
            } else {
                me.elget(node,deep,autoupdate,dataspace,deepinit);//遍历所有的元素
            }
            
        });
    }
    return this;
},//对node进行解析看有哪些属性与变量关联
forelset:function(el,deep,autoupdate=1,dataspace="",deepinit=0){
    me=this;
    if(!el.parentNode)return;
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
    if(typeof dataspace!=="string"){alert("forelset");}
    if(!$$.isarray(items)){items=[items];me.setvar(data,dataspace,items);}
    var forid=el.getAttribute("for-id");
    if(!forid){forid=Math.random();el.setAttribute("for-id",forid);}
    //先确保el的数量和数据是对齐的。
    var nodes=document.querySelectorAll("[for-id='"+forid+"']");
    
    var nodenum=nodes.length,itemnum=items.length;
    if(nodenum<1)return;//说明这个元素可能已经被删除了
    while(nodenum>0&&nodenum!==itemnum&&!(itemnum==0&&nodenum==1)){
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
    if(itemnum<1){ //如果数据是空的时候，
        me.setvar(v,"",dataspace);
        me.setvar(i,0,dataspace);
        me.setvar(k,0,dataspace);
        me.elset(el,1,autoupdate=true,dataspace,deepinit,[i,k,v,data],false);
    }
    for(let item in items){
        me.setvar(v,items[item],dataspace);
        me.setvar(i,index++,dataspace);
        me.setvar(k,item,dataspace);
        nodes[index-1].setAttribute("view-locked","");
        me.elset(nodes[index-1],1,autoupdate=nodes[index-1]==el?true:false,dataspace,true,[i,k,v,data],false);//当发现set一个for的时候，就进行forsel
        nodes[index-1]!==el&&(nodes[index-1].setAttribute("view-locked",1));
    }
},
elset:function (el,deep=0,autoupdate=1,dataspace="",deepinit=0,noupdatelist=[],bcheckfor=true){
    (dataspace=="")&&(dataspace="common");
    me=this;
    if(me.checkislocked(el)){return this;}
    //先判断当前节点是否是可操作的节点
    if(el.nodeType == 1){
        if(bcheckfor&&me.checkisfor(el)){
            //console.log("找到了一个for元素:"+el);
            me.forelset(el,1,autoupdate,dataspace,deepinit);
        } else {
            //解析属性并将其指定的值赋值到属性
            var nodeAttrs = el.attributes;
            [].slice.call(nodeAttrs).forEach(function(attr) {
                var attrName = attr.name;
                var regisset = /(^|\:)set\:/;
                if (regisset.test(attrName)) {
                    var varname = attr.value;//1，简单变量，变量列表；2，字符串模版；3，表达式
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
                    } //如果是要set一个简单变量的话
                    else {
                        if(/^\(.*\)$/.test(varname)){varname="{{"+varname+"}}";}//给显式表达式加括号，统一格式
                        varname=varname.replace(/\{\{\s*([_\.a-zA-Z0-9]*|[_\.a-zA-Z0-9]+\(.*\))\s*\}\}/g,function(t,v){return "{{$"+v+"}}";});//给单变量/函数加$统一格式，标准要求是函数一定加@
                        var varvalue=varname.replace(/\{\{\s*(.*?)\s*\}\}/g,function(t,exp){
                            autoupdate&&exp.replace(/(^|[^\\])\s*\$([_a-zA-Z][_\.a-zA-Z0-9]*)/g,function(t,v0,v){
                                //if(noupdatelist.indexOf(v)<0){
                                   me.varfunsadd(v,el,dataspace); 
                                   me.getvar(v,dataspace);
                                //}
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
                //if(noupdatelist.indexOf(v)<0&&!/^\_/.test(v)){
                   me.varfunsadd(v,el,dataspace); 
                   me.getvar(v,dataspace);
                //}
            });//将表达式中的变量添加粉丝
            return me.getexp(exp,dataspace);//计算表达式的值并替换原字符串
        });//（1）给所有表达式中的变量添加粉丝（2）计算表达式值及完成替换
        el.textContent=textstr;//结果赋值到元素的文本内容中
        
    } else if (el.nodeType==8){
        //return this;
        var ct=el.textContent;
        if(/^sm\:/.test(ct)){
            var t=document.createElement("div");
            t.innerHTML=ct.replace(/^sm\:/,"");
            var tt=t.firstElementChild;
            var varname=tt.getAttribute("set:exist");
            
            if(/^\(.*\)$/.test(varname)){varname="{{"+varname+"}}";}//给显式表达式加括号，统一格式
            varname=varname.replace(/\{\{\s*([_\.a-zA-Z0-9]*|[_\.a-zA-Z0-9]+\(.*\))\s*\}\}/g,function(t,v){return "{{$"+v+"}}";});//给单变量/函数加$统一格式，标准要求是函数一定加@
            var varvalue=varname.replace(/\{\{\s*(.*?)\s*\}\}/g,function(t,exp){
                return me.getexp(exp,dataspace);//完成表达式计算并完成替换
            });//给所有表达式中的变量添加粉丝
            if(!varvalue||varvalue=="0"||varvalue=="undefined"||varvalue==""){
                
            } else {
                el.before(t.firstElementChild);
                el&&el.parentNode&&el.parentNode.removeChild(el);//问题在于这里创建的新节点并没有执行elset，要执行一下
                me.elset(tt,1,1,dataspace);
            }
        }
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
            //console.log(el);
            if(el.style.display=='none'){return 0;}else{return 1;}//这里的值你无法实时获取，因为它没有input事件啊！
            break;
        case 'removewhen':
            //无意义
            break;
        case 'text':
            return el.innerText;
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
        case 'text':
            el.innerText=value;
            break;
        case 'hide':
            //console.log("enter display:"+value);
            //console.log(el);
            if(!value||value=="0"||value=="undefined"||value==""){
                el.style.display='';
            }else{
                el.style.display='none';
            }
            //console.log(el.style.display);
            break;
        case 'display':
            //console.log("enter display:"+value);
            //console.log(el);
            if(!value||value=="0"||value=="undefined"||value==""){
                el.style.display='none';
            }else{
                el.style.display='';
            }
            //console.log(el.style.display);
            break;
        case 'exist':
            //break;
            if(!value||value=="0"||value=="undefined"||value==""){
                var t=document.createComment("sm:"+el.outerHTML);
                el.before(t);
                el&&el.parentNode&&el.parentNode.removeChild(el);//这玩意不可逆啊！
            }
            break;
        case 'addclass':
            //console.log("why");
            if(el&&value){
                let curclass=el.getAttribute("class");
                (!curclass)&&(curclass="");
                var acs=value.split("!")[0];
                var rcs=value.substr(acs.length+1);
                acs&&acs.split(",").forEach(function(c){
                    (curclass.split(" ").indexOf(c)<0)&&(curclass=curclass+" "+c);
                });
                curclass=" "+curclass+" ";
                rcs&&rcs.split(",").forEach(function(c){
                    curclass=curclass.replace(" "+c+" "," ");
                });
                curclass=curclass.replace(/^\s+|\s+$/gm,'');
                el.setAttribute("class",curclass);
            }
            break;
        case 'class':
            //console.log("why");
            if(el&&value){
                el.setAttribute("class",value);
            }
            break;
        case 'addattr':
            if(el&&value){
                var acs=value.split("!")[0];
                var rcs=value.substr(acs.length+1);
                acs&&acs.split(",").forEach(function(c){
                    var an=c.split("=")[0];
                    var av=c.substr(an.length+1);
                    an&&(el.setAttribute(an,av));
                });
                rcs&&rcs.split(",").forEach(function(c){
                    el.removeAttribute(c);
                });
            }
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
        //console.log(evalstr);              
        try{
            rsvalue=eval(evalstr);
            //console.log(rsvalue+"-----:"+evalstr);   
        } catch (ex) {
            //console.log("Error-----:"+evalstr);      
        }
    return rsvalue;
},
getvar:function (varname,dataspace=""){
    (dataspace=="")&&(dataspace="common");
    //如果没有变量，就创建
    //window.data||(window.data={});//这个需要view实例来调用，否则大家共享同一个空间了
    //var val=window.data;
    if(typeof dataspace!=="string"){alert("getvar");}
    var val=sm.view.find(dataspace);
    var exp = varname.split('.');
    for(var i=0;i<exp.length-1;i++){
        (typeof val[exp[i]]=='undefined')&&(val[exp[i]]={});
        val=val[exp[i]];
    }
    (typeof val[exp[i]]=='undefined')&&(val[exp[i]]="");
    return val[exp[i]];
},//按照变量地区获取变量值
setvar:function (varname,value,dataspace=""){
    (dataspace=="")&&(dataspace="common");
    if(typeof dataspace!=="string"){alert("setvar");}
    var val=sm.view.find(dataspace);
    var exp = varname.split('.');
    for(var i=0;i<exp.length-1;i++){
        (typeof val[exp[i]]=='undefined')&&(val[exp[i]]={});
        val=val[exp[i]];
    }
    val[exp[i]]=value;
    return value;
},//按照变量地区找到变量给其赋值

watchdata:function (dataspace="",varname=""){
    (dataspace=="")&&(dataspace="common");
    var me=this;
    //console.log("enter watching data:"+dataspace+","+varname);
    if(varname==""){
        if(typeof dataspace!=="string"){alert("watchdata");}
        var proxyobj=sm.view.find(dataspace);
    } else {
        var proxyobj=sm.view.getvar(varname,dataspace);
    }
    
    //console.log(proxyobj);
    Object.keys(proxyobj).forEach(function(k){
        if(!proxyobj.hasOwnProperty(k)){
        } else if(Object.prototype.toString.call(proxyobj[k]) === '[object Object]'){
            if(!proxyobj[k].hasOwnProperty("_com")&&!/^(\$|\_)/.test(k)){
                var realvarname=varname==""?k:varname+'.'+k;
                me.watchdata(dataspace,varname==""?k:varname+'.'+k);
            }
        } else if(typeof proxyobj[k]=="undefined"){

        } else if (typeof(proxyobj[k]) == "function") {

        } else {
            //找到了一个属性，把他弄为get,set形式，开头为_和&的永远不关注
            if(!/^(\$|\_)/.test(k)){
               var realvarname=varname==""?k:varname+'.'+k;
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
                       // console.log("检测到变量更改了，执行notify函数:"+realvarname+","+dataspace);
                        //if(Object.prototype.toString.call(newVal) === '[object Object]'){
                            //console.log("new obj setted:"+dataspace+":"+realvarname);
                            //sm.view.watchdata(this['_'+k],dataspace,realvarname);
                        //}
                        me.varfunsnotify&&me.varfunsnotify(realvarname,dataspace);
                    }
                });                
            }
        }
    });
},//对一个对象进行解析自动对其属性转换成getter，setter模式(初始化后自动调用)
watchdom:function(el,dataspace="",ename="input",targetel="") {
    (dataspace=="")&&(dataspace="common");
    (targetel=="")&&(targetel=el);
    var me=this;
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
            if(typeof dataspace!=="string"){alert("varfunsnotify");}
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
    (!/^common/.test(dataspace))&&(dataspace="common."+dataspace);
    //(arguments.length>2)&&(dataspace!=="")&&(varname=dataspace+"."+varname);
    if(typeof window.varfuns[varname]=='undefined'){
        return false;
    } else {
        if(typeof window.varfuns[varname][dataspace]=='undefined'){
            return false;
        }
        var matched=false;
        window.varfuns[varname][dataspace].forEach(function(item){
            if(item==el){matched= true;}
        });
        return matched;
    }
},//检测变量是否有该粉丝
varfunsadd:function (varname,el,dataspace=""){
    if(/^\_/.test(varname)){return ;}
    (dataspace=="")&&(dataspace="common");
    //(arguments.length>2)&&(dataspace!=="")&&(varname=dataspace+"."+varname);
    //console.log("添加粉丝："+dataspace+":"+varname);
    (typeof window.varfuns[varname]=='undefined')&&(window.varfuns[varname]=[]);
    (typeof window.varfuns[varname][dataspace]=='undefined')&&(window.varfuns[varname][dataspace]=[]);
    //console.log("添加变量监控函数："+varname+","+dataspace);
    !this.varfunshave(varname,el,dataspace)&&window.varfuns[varname][dataspace].push(el);    
},//为变量添加粉丝    
oncominitlist:{},
oncominitedlist:[],
aftercominitlist:[],
onloadinitlist:[],
onloadinitedlist:[],
oncominit:function(com,initcb=function(){}){this.oncominitlist[com]=initcb;},
dooncominit:function(com,view,el,ds,pds){
    //console.log("dooncominit");
    var me=this;
    if(this.oncominitlist.hasOwnProperty(com)){
        var cb=this.oncominitlist[com];
        
        if($$.isfunction(cb)){
            cb.apply(view,[el]);
            var fa=com+">"+ds+"@"+pds;
            //console.log(fa);
            if(typeof me.aftercominitlist[fa]=="undefined"){me.aftercominitlist[fa]=[];}
            me.aftercominitlist[fa].forEach(function(acb){
                acb.apply(view,[el]);
            });
        }
    }
    return this;
},
aftercominit:function(com,cb=function(){}){
    var cn=com.split(">")[0];
    var ds=com.substr(cn.length+1);
    (!ds)&&(ds=cn);
    var pds=(/\@/.test(com)?com.split("@").pop():"");
    (ds!=="common"&&pds=="")&&(pds="common");
    var fa=cn+">"+ds+"@"+pds;
    if(typeof this.aftercominitlist[fa]=="undefined"){this.aftercominitlist[fa]=[];}
    this.aftercominitlist[fa].push(cb);
},
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
        window.onhashchange=function(){
            console.log("11111111111111111");
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
    console.log("Enter Hash Handeller!");
    console.log(oldhash);
    console.log(newhash);
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
load:function(routejs){return this.ajax.loadjs(routejs,"head");},
run:function(wathcingtree={}){
    this.watch(wathcingtree);
    //执行router
    this.do();
    return this;
},
history:function(){return window.history;},
startup:function(routejs){return this.load(routejs).then(function(){sm.route.run();});},
});
God.coms("data").extendproto({
    smdata:function(d){
        this.setup({d:d});
        return this;
    },
    tabledata:function(eq=0){
        return this.setup().d[eq];
    },
    cubedata:function(){
        return this.setup().d;
    },
    arraydata:function(eq=0){
        return this.setup().d[eq][0];
    },
    objarray:function(){
        var vs=this.tabledata();
        var ks=this.def();
        var rs=[];
        for(var i in vs){
            var item={};
            for (var k in ks){
                item[ks[k]]=vs[i][k];
            }
            rs.push(item);
        }
        return rs;
    },//这个只适合只有一组表格返回的情况，作用是将一个不含表头的二维表转化为一个对象数组
    vardata:function(eq=0){
        return this.setup().d[eq][0][0];
    },
    def:function(eq=1){
        return this.arraydata(eq);
    },
});//方便对远程数据库返回的数据进行不同维度的访问
God.coms("user").extend({
    info:{"uid":0,"uname":"请登录","nickname":"请登录","ulevel":0,"token":""},
}).extendproto({
    logout:function(){},
    checkright:function(right){
        sm.user.clearstat();
        if((!sm.user.info.ulevel)||(sm.user.info.ulevel<right)){sm.user.error(1,"您没有权限！");}
        return sm.user;
    },
    islogin:function(level=100){
        return new Promise(function(resolve,reject){
            sm.ajax.url("user/getcurrentuser.func").smpost().then(function(d){
                if(d.ulevel && d.ulevel>=level){
                    return resolve("权限足够！");
                } else {
                    return reject("权限不足！");
                }
            },function(d){
                return reject("程序执行出错！");
            });
        });
    },
    getinfo:function(){},
    login:function(){},
});//方便记录修改用户信息
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
});//预先记录一些ajax交互时常用的链接，方便后续修改
God.coms("db").extend({
    _setup:{
        url:"db/proc.func/",
        db:"more",
        tb:"user",
    },
}).extendproto({
    url:function(u){this.setup({url:u});return this;},
    db:function(d){this.setup({db:d});return this;},
    tb:function(t){this.setup({tb:t});return this;},
    list:function(paras={}){
        var furl=this.setup().url+this.setup().db+"."+this.setup().tb+"_list";
        console.log(furl);
        return sm.ajax.url(furl).smpost(paras);
    },
    add:function(paras={}){
        var furl=this.setup().url+this.setup().db+"."+this.setup().tb+"_add";
        console.log(furl);
        return sm.ajax.url(furl).smpost(paras);
    },
    update:function(paras={}){
        var furl=this.setup().url+this.setup().db+"."+this.setup().tb+"_update";
        console.log(furl);
        return sm.ajax.url(furl).smpost(paras);
    },
    detail:function(paras={}){
        var furl=this.setup().url+this.setup().db+"."+this.setup().tb+"_detail";
        console.log(furl);
        return sm.ajax.url(furl).smpost(paras);
    },
    stat:function(paras={}){
        var furl=this.setup().url+this.setup().db+"."+this.setup().tb+"_stat";
        console.log(furl);
        return sm.ajax.url(furl).smpost(paras);
    },
    delete:function(paras={}){
        var furl=this.setup().url+this.setup().db+"."+this.setup().tb+"_delete";
        console.log(furl);
        return sm.ajax.url(furl).smpost(paras);
    },
    set:function(key,value){
        var furl=this.setup().url+this.setup().db+"."+this.setup().tb+"_set";
        console.log(furl);
        return sm.ajax.url(furl).smpost({key:key,value:value});
    },
    toparastr:function(obj,modelobj=""){
        var rs="";
        if(modelobj===""){
            modelobj=obj;
        } else {
            $$.safemerge.apply(modelobj,[obj]);
        }
        Object.keys(modelobj).forEach(function(k){
            if(rs===""){
                rs=k+'="'+modelobj[k]+'"'
            } else {
                rs=rs+","+k+'="'+modelobj[k]+'"';
            }
        });
        return rs;
    },
    get:function(key){
        var furl=this.setup().url+this.setup().db+"."+this.setup().tb+"_get";
        console.log(furl);
        return sm.ajax.url(furl).smpost({key:key});
    },
});//方便对远程数据库的一些常用操作
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
    return this;
},
define:function(defs){
    for(var x in defs){
        this[x]=defs[x];
    }
    return this;
},
});//方便对页面数据校验的定义和检查
God.coms("dialog").extendproto({//对话框
modaldivel:function(){
    if(document.body.querySelector("body>#sm_modal")){
        return document.body.querySelector("body>#sm_modal");
    } else {
        document.body.querySelector("#sm_modal")&&document.body.querySelector("#sm_modal").remove();
        var tn=sm.newel('<div id="sm_modal" class="modal" style="position:absolute;display:none;z-index:1000;"><div class="titlepart"><div class="title"></div><div class="xclosebutton"></div></div><div class="bodypart"></div><div class="buttonpart"></div></div>');
        document.body.appendChild(tn);
        return tn;
    }
},
msg:function(str,title="",buttons=""){
    if(document.body.querySelector("#sm_modal_msg")){
        var msgel= document.body.querySelector("#sm_modal_msg");
    } else {
        var msgel= sm.newel('<div id="sm_modal_msg"></div>');
    }
    msgel.innerHTML=str;
    return sm.dialog.show("#sm_modal_msg",title,buttons);
},
show:function(contentselector="",title="",buttons="",stylestr="",classstr="",showwhat=""){
    /*
    code_bg='<div id="code_bg" style="position:absolute;left:0px;top:0px;background-color:#000;width:100%;filter:alpha(opacity=60);opacity:0.6;z-Index:100;"></div>'
    code_msg='<div id="code_msg" style="position:absolute;width:100%;height:30px;text-align:center;line-height: 30px;top:0px;left:0px;background-color:#ddd;filter:alpha(opacity=40);opacity:0.4;cursor:pointer;z-Index:101;">'+content+'</div>'
    sm.document.create(code_bg+code_msg);
    document.querySelector("#code_bg").style.height=document.clientHeight;
    return this;*/
        var tmn=sm.dialog.modaldivel().querySelector(".bodypart");
        if(tmn.hasChildNodes()&&tmn.firstElementChild){
            sm.pooldivel().appendChild(tmn.firstElementChild);
        }
        tmn.innerHTML="";
        var tn=document.querySelector(contentselector);
        if(tn){
            tmn.appendChild(tn);
            tn.style.display="block";
            tn.style.position="relative";//确保能把内容撑大
        }
        var tm=sm.dialog.modaldivel();
        tm.setAttribute("style","position:absolute;display:none;z-index:1000;");
        //tm.style.top=0;
        //tm.style.left=0;
        tm.setAttribute("style",tm.getAttribute("style")+stylestr);
        if(classstr){
            var tc=tm.getAttribute("class");
            if(tc){
                tc=" "+tc.trim()+" ";
                tc=tc.replace(classstr ,"");
                tc=tc.trim()+" "+classstr;
            } else {tc=classstr;}
            tm.setAttribute("class",tc);
        }
        tm.setAttribute("showwhat",showwhat);
        var tn=tm.querySelector("#sm_modal>.titlepart>.title");
        tn.innerText=title;
        
        var bn=tm.querySelector("#sm_modal>.buttonpart");
        bn.innerHTML="";
        
        if(buttons!==""){
            buttons=buttons.split(",");
            for (var i in buttons){
                var tbtn=buttons[i];
                if(tbtn.split(".").length<2){
                    var btncl=tbtn;
                } else {
                    btncl=tbtn.split(".")[1];
                }
                bn.appendChild(sm.newel('<button class="'+btncl+'">'+tbtn.split(".")[0]+'</button>'));
            }
        }
        tm.style.display="block";
        var top=(document.documentElement.scrollTop + (document.documentElement.clientHeight - tm.offsetHeight)/2) + "px";
        var left=(document.documentElement.scrollLeft + (document.documentElement.clientWidth - tm.offsetWidth)/2) + "px";
       console.log(document.documentElement.scrollTop);
       console.log(document.documentElement.clientHeight);
       console.log(tm.offsetHeight);
        tm.style.top=top;
       tm.style.left=left;
        
        //添加右上角的关闭事件
        if(!tm.hasAttribute("inited")){
            $common.watchdom({
                "#sm_modal>.titlepart>.xclosebutton@click":function(){
                    sm.dialog.close();
                }
            });
            tm.setAttribute("inited","true");
        }
        
        return this;
},
countshow:function(s,content,title=""){
	if(s>0) {
		this.close().show(content+"("+s+")",title);
		//alert('sm.dialog.countshow('+(s-1)+',"'+title+'","'+content+'")');
		setTimeout('sm.dialog.countshow('+(s-1)+',"'+content+'","'+title+'")',1000);
	} else {
		this.close();
	}
	return this;
},
close:function(){
    /*
    try{
        document.querySelector("#code_bg").remove();
        document.querySelector("#code_msg").remove();
    }catch(e){}
    return this;*/
    sm.dialog.modaldivel().style.display="none";
    return this;
},
watch:function(btnevent){
    var sl="#sm_modal .buttonpart ";//限定watch中的选择器只能是.buttonpart 中的元素
    var nbtnevent={};
    Object.keys(btnevent).forEach(function(k){
        if(k.split(".").length<2){nbtnevent[sl+"."+k]=btnevent[k];}
        else{nbtnevent[sl+k]=btnevent[k];}
    });
    $common.watchdom(nbtnevent);//委托给body事件机制去处理，前提必须是已经初始化Sm.view.init
},
});//方便在页面顶部显示信息
God.coms("upload").extend({
    _setup:{
        autostart:true,
        onloadcb:function(){},
        onfailcb:function(){},
    },
}).extendproto({//对话框
selectfile:function(){
    if(!document.body.querySelector("#uploadfile")){
        sm.document.create('<input type="file" id="uploadfile" name="files" multiple="multiple" style="display:none"/>');
        document.body.querySelector("#uploadfile").addEventListener("change",function(){
            sm.upload.onqued(document.body.querySelector("#uploadfile").files);
        });
    }
    document.body.querySelector("#uploadfile").click();
    return sm.upload;
},
onqued:function(files){
    if(this._setup.autostart){return this.do();}
},
autostart:function(auto=true){this.setup({autostart:auto});return this;},
onload:function(cb){this.setup({onloadcb:cb});return this;},
onfail:function(cb){this.setup({onfailcb:cb});return this;},
url:function(newurl){this.setup({url:newurl});return this;},
smurl:function(su,ex=""){return this.url(sm.server.url(su)+ex);},
do:function(url="",fname="file"){
    url=(url==""?this._setup.url:url);
    var me=this;
    var files = document.body.querySelector("#uploadfile").files;
    var promise=new Promise(function(resolve,reject){
        if(files.length<1){me._setup.onfailcb("没有要上传的问件!");return reject("没有要上传的问件!");}
        var form = new FormData(); // FormData 对象
        for (var i=0;i<files.length;i++){
           form.append(fname+(i==0?"":i), files[i]); // 文件对象 
        };
        var xhr = new XMLHttpRequest();  // XMLHttpRequest 对象
        xhr.open("post", url, true); //post方式，url为服务器请求地址，true 该参数规定请求是否异步处理。
        //xhr.onload = uploadComplete; //请求完成
        //xhr.onerror =  uploadFailed; //请求失败
        //xhr.upload.onprogress = progressFunction;//【上传进度调用方法实现】
        //xhr.upload.onloadstart = function(){//上传开始执行方法
        //    ot = new Date().getTime();   //设置上传开始时间
        //    oloaded = 0;//设置上传开始时，以上传的文件大小为0
        //};
        xhr.onload = function(oEvent) {
            if (xhr.status == 200) {
                me._setup.onloadcb(xhr.responseText);
                return resolve(xhr.responseText);
            } else {
                me._setup.onfailcb(xhr.status);
                return reject(xhr.status);
            }
          };
        xhr.send(form); //开始上传，发送form数据
    });
    return promise;
},

});//方便进行上传操作
God.coms("event").extendproto({
    once:function(en,el,cb){
        var handler=function(e){
            cb(e);
            el.removeEventListener(en,handler);
        };
        el.addEventListener(en,handler);
    },
});
God.coms("loading").extend({
    total:0,
    current:0,
}).extendproto({
    logo:function(url=false){
        var logo=document.body.querySelector(".startup>div.logo");
        url&&logo&&(logo.style.backgroundImage="url("+url+")");
        logo&&(logo.style.display="block");
        return this;
    },
    progress:function(v){
        var pv=document.body.querySelector(".startup>div.progress>.value");
        var p=document.body.querySelector(".startup>div.progress");
        p&&(p.style.display="block");
        pv&&(pv.style.width=v%101+"%");
        return this;
    },
    text:function(p){
        var t=document.body.querySelector(".startup>a.loading");
        t&&(t.textContent=p);
        return this;
    },
    init:function(t,ft){
        this.total=t;
        this.current=0;
        this.text(ft);
        return this;
    },
    next:function(t){
        this.current++;
        this.total&&(this.current>this.total)&&(this.finish(t));
        this.total&&(this.progress(this.current*100/this.total));
        this.text(t);
        return this;
    },
    finish:function(t=false){
        this.progress(100);
        !t&&(t="Finishing...");
        this.text(t);
        this.total=0;
        return this;
    },
});
God.coms("document").extendproto({//目的是定义页面跳转，页面信息，用户界面刷新等一系列操作
ready:function(){document.ready.apply(this,arguments);return this;},//请注意This指针无法传递到函数内部
reload:function(newurl){
    if(arguments[0]) {
        window.location.href=newurl;
    } else {
    	location.reload();
    }
    return this;
},//重新加载当前页面
open:function(newurl){
    window.open(newurl);
    return this;
},//打开一个新页面
href:function(){
    return window.location.href;
},
title:function(newtitle=""){document.title=newtitle==""?document.title:newtitle;return this;},//更改标题
create:function(str){
    var t=document.createElement("div");
    t.innerHTML=str;
    var rs=[];
    var nodes=t.childNodes;
    var n=nodes.length;
    for (var i=0;i<n;i++){rs.push(nodes[i]);}
    var n=rs.length;
    for(var i=0;i<n;i++){document.body.prepend(rs[i]);}
    return rs;
},
body:function(){
    var t=document.querySelector("body>div.body");
    if(t){
        return t;
    } else {
        var tt=document.createElement("div");
        tt.setAttribute("class","body");
        document.body.appendChild(tt);
        return sm.document.body();
    }
},
});
God.coms("menu").extendproto({
    stopdefault:function(e) {
        if (e && e.preventDefault) {//如果是FF下执行这个
           e.preventDefault();
       }else{
           window.event.returnValue = false;//其它浏览器下执行这个
       }
       return false;
    } ,//阻止系统自带的右键菜单弹出
    menudivel:function(){
        if(document.body.querySelector("body>#sm_menu")){
            return document.body.querySelector("body>#sm_menu");
        } else {
            document.body.querySelector("#sm_menu")&&document.body.querySelector("#sm_menu").remove();
            var tn=document.createElement('div');
            tn.style.display="none";
            tn.innerHTML='<div style="position:absolute;display:none;" id="sm_menu"></div>';
            document.body.appendChild(tn.firstChild);
            tn.remove();
            return document.body.querySelector("body>#sm_menu");
        }
    },
    rmenudivel:function(){
        if(!document.body.querySelector("#sm_rmenu")){
            return sm.newel('<div class="dropdown-menu"  id="sm_rmenu" style="display:block;top:0px;left:0px;"></div>');
        } else {
            return document.body.querySelector("#sm_rmenu");
        }
    },
    lmenudivel:function(){
        if(!document.body.querySelector("#sm_lmenu")){
            return sm.newel('<div class="dropdown-menu"  id="sm_lmenu" style="display:block;top:0px;left:0px;"></div>');
        } else {
            return document.body.querySelector("#sm_lmenu");
        }
    },
    makelmenu:function(str){
        var rm=sm.menu.lmenudivel();
        rm.innerHTML="";
        var items=str.split(",");
        for (var k in items){
            if(items[k]==="hr"){
                rm.appendChild(sm.newel('<a class="dropdown-item hr" ></a>'));
            } else {
                rm.appendChild(sm.newel('<a class="dropdown-item" >'+items[k]+'</a>'));
            }
        }
    },
    makermenu:function(str){
        var rm=sm.menu.rmenudivel();
        rm.innerHTML="";
        var items=str.split(",");
        for (var k in items){
            if(items[k]==="hr"){
                rm.appendChild(sm.newel('<a class="dropdown-item hr" ></a>'));
            } else {
                rm.appendChild(sm.newel('<a class="dropdown-item" >'+items[k]+'</a>'));
            }
        }
    },
    show:function(menuid,top=0,left=0,stylestr="",classstr="",showwhat="rmenu"){
        if(sm.menu.menudivel().hasChildNodes()){
            sm.pooldivel().appendChild(sm.menu.menudivel().firstChild);
        }
        var tn=document.querySelector(menuid);
        if(tn){
            sm.menu.menudivel().appendChild(tn);
        }
        var tm=sm.menu.menudivel();
        tm.setAttribute("style","position:absolute;display:none;z-index:1000;");
        tm.style.top=top;
        tm.style.left=left;
        tm.setAttribute("style",tm.getAttribute("style")+stylestr);
        if(classstr){
            var tc=tm.getAttribute("class");
            if(tc){
                tc=" "+tc.trim()+" ";
                tc=tc.replace(classstr ,"");
                tc=tc.trim()+" "+classstr;
            } else {tc=classstr;}
            tm.setAttribute("class",tc);
        }
        tm.setAttribute("showwhat",showwhat);
        tm.style.display="block";
    },
    hide:function(){
        sm.menu.menudivel().style.display="none";
        while (document.body.querySelector("[showingmenuismine]"))
        {
            var tn=document.body.querySelector("[showingmenuismine]");
            tn.removeAttribute("showingmenuismine");
        }
    },
    initrmenu:function(){
        sm.menu.initeventmap();
        sm.document.ready(function(){
            console.log('右键事件已经拦截！');
            document.body.addEventListener("contextmenu",function(ev){
                var el  = ev.srcElement || ev.target;
                if(el.matches("[rmenuref]")||el.matches("[rmenu]")||el.matches("[rmenuref] *")||el.matches("[rmenu] *")){
                    sm.menu.stopdefault(ev);//阻止鼠标的默认事件
                    var ev = ev || event;
                    var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
                    var left = ev.clientX + "px";
                    //当滑动滚动条时也能准确获取菜单位置
                    var top = ev.clientY + scrollTop + "px";
                    
                    
                    var tgt="#sm_error_nocontextmenu";
                    var menuel=$$.matchedparentel(el,"[rmenuref]")||$$.matchedparentel(el,"[rmenu]");
                    
                    if(menuel.hasAttribute("rmenuref")&&document.body.querySelector(menuel.getAttribute("rmenuref"))){
                        tgt=menuel.getAttribute("rmenuref");
                    } else {
                        var items=menuel.getAttribute("rmenu")||"";
                        sm.menu.makermenu(items);
                        tgt="#sm_rmenu";
                    }
                    el.setAttribute("showingmenuismine","rmenu");
                    sm.menu.show(tgt,top,left,"","","rmenu");
                    return false;
                }
            });
            document.body.addEventListener("click",function(ev){
                var tm=sm.menu.menudivel();
                if((tm.style.display!=="none")&&(tm.getAttribute("showwhat")==="rmenu")){
                        sm.menu.hide();
                } 
            });
        });
    },
    initlmenu:function(){
        sm.menu.initeventmap();
        sm.document.ready(function(){
            console.log('右键单击事件已经拦截！');
            document.body.addEventListener("click",function(ev){
                var tm=sm.menu.menudivel();
                if((tm.style.display!=="none")&&(tm.getAttribute("showwhat")==="lmenu")){
                        sm.menu.hide();
                } else {
                    //判断是否要显示左键菜单
                    var el  = ev.srcElement || ev.target;
                    if(el.hasAttribute("lmenuref")||el.hasAttribute("lmenu")){
                        var ev = ev || event;
                        var scrollTop = el.scrollTop+el.scrollHeight;
                        var left = $$.getElementLeft(el) + "px";
                        //当滑动滚动条时也能准确获取菜单位置
                        var top = $$.getElementTop(el)+el.scrollHeight;
                        el.setAttribute("showingmenuismine","lmenu");
                            
                        var tgt="#sm_error_nocontextmenu";
                        if(el.hasAttribute("lmenuref")&&document.body.querySelector(el.getAttribute("lmenuref"))){
                            tgt=el.getAttribute("lmenuref");
                        } else {
                            var items=el.getAttribute("lmenu")||"";
                            sm.menu.makelmenu(items);
                            tgt="#sm_lmenu";
                        }
                        el.setAttribute("showingmenuismine","lmenu");
                        sm.menu.show(tgt,top,left,"","","lmenu");
                        return false;
                    }
                }
            });
        });
    },
    initeventmap:function(){
        if(!$$.isdefined(sm.menu.eventmap)){
            sm.menu.eventmap={};
            document.body.addEventListener("click",function(ev){
                var el  = ev.srcElement || ev.target;
                if(el.matches("body>#sm_menu a")){
                    var ownerel=document.body.querySelector("[showingmenuismine]");
                    Object.keys(sm.menu.eventmap).forEach(function(k){
                        var ak=k.split("/")[0];
                        if(ak===""){ak="*";}
                        ownerel.matches(ak+" *") && (ownerel=$$.matchedparentel(ownerel ,ak));
                        if(ownerel.matches(ak)){
                            var cb=sm.menu.eventmap[k];
                            cb(ownerel,el,el.textContent);
                        }
                    });
                    //console.log(ownerel);
                    //console.log(el.textContent);
                }
            });
        }
    },
    addclickevent:function(eventmap){
      if(!$$.isdefined(sm.menu.eventmap)){sm.menu.eventmap={};}
      $$.merge.apply(sm.menu.eventmap,[eventmap]);
    },
});
God.coms("tabs").extendproto({
    to:function(tgt){
       if(typeof tgt==="string"){tgt=document.body.querySelector(tgt);}
       sm.tabs._curel=$$.matchedparentel(tgt,"div.tabs");
       this.makesureinited();
       return this;
    },
    el:function(){
        if(!sm.tabs._curel) {sm.tabs._curel= document.body.querySelector("div.tabs");}
        this.makesureinited();
        return sm.tabs._curel;
    },
    titlesel:function(){return this.el().querySelector("div.tabs>div.tabs_titles")},
    bodysel:function(){return this.el().querySelector("div.tabs>div.tabs_bodys")},
    activetitleel:function(){return this.el().querySelector("div.tabs>div.tabs_titles>div.tabs_title.active");},
    activebodyel:function(){return this.el().querySelector("div.tabs>div.tabs_bodys>div.tabs_body.active");},
    activetab:function(id){
        this.deactiveall();
        $$.addclass(this.titlesel().querySelector('[tabid="'+id+'"]'),"active");
        $$.addclass(this.bodysel().querySelector('[tabid="'+id+'"]'),"active");
        return this;
    },
    addtab:function(title,body){
        var id=$$.random(10);
        var tel=sm.newel('<div class="tabs_title"><button>'+title+'</button></div>');
        var bel=sm.newel('<div class="tabs_body"></div>');
        body&&bel.appendChild(body);
        tel.setAttribute("tabid",id);
        bel.setAttribute("tabid",id);
        this.titlesel().appendChild(tel);
        this.bodysel().appendChild(bel);
        this.activetab(id);
        return this;
    },
    deletetab:function(id){
        this.titlesel().querySelector('[tabid="'+id+'"]').remove();
        this.bodysel().querySelector('[tabid="'+id+'"]').remove();
        return this;
    },
    init:function(){
        var tabs=document.body.querySelectorAll("div.tabs");
        var maxnum=tabs.length;
        for (var i=0;i<maxnum;i++){
            sm.tabs.to(tabs[i]);
        }
        $common.watchdom({
            "div.tabs>div.tabs_titles>div.tabs_title@click":function(e,el,ds){
                sm.tabs.to(el);
                var id=$$.matchedparentel(el,"div.tabs>div.tabs_titles>div.tabs_title").getAttribute("tabid");
                sm.tabs.activetab(id);
            },
        });
    },
    deactiveall:function(){
        var titles=this.titlesel().querySelectorAll("div.tabs_titles>.tabs_title.active");
        var bodys=this.bodysel().querySelectorAll("div.tabs_bodys>.tabs_body.active");
        if(!titles){return this;}
        var totalnum=titles.length;
        for (var i =0;i<totalnum;i++){
            $$.removeclass(titles[i],"active");
            $$.removeclass(bodys[i],"active");
        }
        return this;
    },
    deleteall:function(){
        var titles=this.titlesel().querySelectorAll("div.tabs_titles>.tabs_title");
        var bodys=this.bodysel().querySelectorAll("div.tabs_bodys>.tabs_body");
        if(!titles){return this;}
        var totalnum=titles.length;
        for (var i =0;i<totalnum;i++){
            titles[i].remove();
            bodys[i].remove();
        }
        return this;
    },
    //内部使用
      makesureinited:function(){
        var el=this._curel;
        if(!el){return this;}
        if(el.hasAttribute("inited")){return this;}
        var titles=el.querySelectorAll("div.tabs_titles>.tabs_title");
        var bodys=el.querySelectorAll("div.tabs_bodys>.tabs_body");
        var totalnum=titles.length;
        for (var i =0;i<totalnum;i++){
            var randomid=$$.random(10);
            titles[i].setAttribute("tabid",randomid);
            bodys[i].setAttribute("tabid",randomid);
        }
        el.setAttribute("inited","true")
        return this;
    },
});
}

//-----------------------基础组件定义:-----------------------------------------------

console.log('sm.god.js已经加载完成！');


