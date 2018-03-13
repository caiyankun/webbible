!window.onerror&&(window.onerror=function(m,u,l){alert ('【JS加载出错】:\r\n【文件】:'+u+"\r\n【行】:"+l+"\r\n【信息】:"+m);});

//God.js Core 开始
if (true){
if (typeof God==='undefined') {God={};}//定义分开是为了方便弱化对js文件的加载顺序的要求
if (typeof sm==='undefined') { //减少内存消耗以及区隔不同组件的自定义值的关联
    sm=function(comname){
        if(arguments[0]){
            return God.coms(comname);
        } else {
            return sm;
        }
    };
    sm.__proto__=God;
    sm.whoami='sm';
}
God.whoami='God';
God.sm=sm;//完善链式操作-自身
God.$=jQuery;//完善链式操作-自身与Jquery
God.run=function(func){func.apply(this);return this;};//完善链式操作-自身与普通函数代码

//组件机制
if(true) {
God.coms=function(comname){//简化组件的定义
    if (sm.hasOwnProperty(comname)){return sm[comname];}
    God[comname]={__proto__:sm,whoami:'God.'+comname};
    sm[comname]={__proto__:God[comname],whoami:'sm.'+comname};
    God[comname].selector='div.'+comname;
    God[comname].defaultselector='div.'+comname;
   return sm[comname];
};
God.define=function(func){func.apply(this);return this;};//简化组件成员添加 - 函数方式
God.extend=function(newobj){$$.merge.apply(this,[newobj]);return this;};//简化组件成员添加-对象方式
God.extendproto=function(newobj){$$.merge.apply(this.__proto__,[newobj]);return this;};//简化组件成员添加-对象方式
God.defaultselector=document;//似乎无意义
God.selector=document;//似乎无意义
God.alias=function(newname){window[newname]=this;return this;};//为组件生成别名，简化组件的调用方式
__autoinit__={};
__autoinited__={};
God.autoinit=function(funcname,func){
    __autoinit__[funcname]=func;
    if(arguments.length>0){return this;}
    for (f in __autoinit__){
        if(typeof __autoinit__[f]=="function"){
            //alert("找到一个函数：\n\r"+__autoinit__[f]);
            if(__autoinited__.hasOwnProperty(f)){
                
            } else {
                __autoinit__[f]();
                __autoinited__[f]=__autoinit__[f];
            }
        }
    }
    __autoinit__={};
    return this;
};

}
//简单的配置信息存取机制
God.setup=function (os){$$.merge.apply(this._setup,[os]);return this;};
God._setup={};
//基本的执行状态控制机制-开始
//作用：1，错误检查调试协助；2，日志记录；3，链式操作的执行成败分支
if(true) {
God._info="";
God._error=0;
God._taskok=false;
God._taskresult="";
God._taskstat={};
God._data=null;
God._log=[];
God.clearstat=function(){
    this._error=0;
    this._data=null;
    this._info="";
    this._taskok=false;
    this._taskresult="";
    this._taskstat={code:0,info:"未初始化！"};
    return this;
}
God._datarules={};
God.datarules=function(rules){
	if(arguments[0]){
		this._datarules=rules;
	} 
	return this;
}
God.validdata=function(data,rules){
	!this.hasOwnProperty('_datarules')&&(this._datarules={});
	!arguments[0]&&(data=this._data);
	!arguments[1]&&(rules=this._datarules);
	var me=this;
	$.each(data,function(k,v){
		if(typeof rules[k]!=="undefined"){
			if($$.isfunction(rules[k])){
				if(!rules[k].apply(me,[v,data])){
					me.logerror(1,k+"不符合验证规则！");
				}
			} else {
				if(!v.match(rules[k])){
					me.logerror(1,k+"不符合验证规则！");
				}
			}
		}
	});
	return this;
}
God.error=function (func,args){
        if(this._error>0) {
            return func.apply(this,[this._error,this._info,args]);
        }
    return this;
}
God.logerror=function(errcode,info){
	(!this.hasOwnProperty("_error"))&&(this._error=0);
        (!this.hasOwnProperty("_info"))&&(this._info="");
        this._error=this._error+errcode;
        this._info=this._info+info;
        this.log("Error Occur:code-"+errcode+";info-"+info);
        return this;
}

God.success=function (func,args){
        if(this._error==0) {
            return func.apply(this,[this._data,this._info,args]);
        }
     return this;    
}
God.logsuccess=function(rsdata,info){
	(!this.hasOwnProperty("_error"))&&(this._error=0);
        (!this.hasOwnProperty("_info"))&&(this._info="");
        (!this.hasOwnProperty("_data"))&&(this._data=null);
        this._error=0;
        this._info=info;
        this._data=rsdata;
        this.log("success:info-"+info);
        return this;
}
God.logtaskok=function(trs,tstat){
    this._taskok=true;
    this._taskresult=trs;
    this._taskstat=tstat;
    return this;
}
God.logtaskfail=function(trs,tstat){
    this._taskok=false;
    this._taskresult=trs;
    this._taskstat=tstat;    
    return this;
}
God.taskok=function (func,args){
    if(this._taskok) {
        return func.apply(this,[this._taskresult,this._taskstat,args]);
    }
     return this;    
}
God.taskfail=function (func,args){
    if(!this._taskok) {
        return func.apply(this,[this._taskresult,this._taskstat,args]);
    }
     return this;    
}
God.log=function(logtxt){  //日志不能清除
    (!this.hasOwnProperty("_log"))&&(this._log=[]);
    this._log.push(this.whoami+':'+logtxt);
    return this;
}
God.debug=function(c){
    c=arguments[0]?c:'<br>';
    //$('html').html("调试信息:");
    $('html').html(this._log.join(c));
    return this;
}
God.showme=function(){
    alert(this.whoami);
    alert(this.selector);
}
God.show=function(){
    alert(this.whoami);
    alert(this.jq().outerhtml());
    return this;
}
God.selfcheck=function(){
    this.log('Start selfcheck:');
    this.log('sm.god.js已经加载!');
    //检查是否加载了jquery和JSON2
    if(typeof jQuery !=='undefined') {this.log('jQuery已经加载!');} else {this.log('jQuery没有加载xxxxxxxxx!');}
    if(typeof JSON !=='undefined') {this.log('JSON已经加载!');} else {this.log('JSON没有加载xxxxxxxxx!');}
    //检查God加载了哪些组件
    for (x in God){
    	if(Object.prototype.toString.call(God[x])=='[object Object]') {
        	this.log(Object.prototype.toString.call(God[x])+":"+x);
        }
    }
    return this;
}
}
//全局函数定义
if(true) {
God.func={};
__delaycalls__=[];
God.func.delaycall=function(func){
    funcname=$$.rndid("delaycall");
    if(typeof __delaycalls__==="undefined"){__delaycalls__=[];}
    __delaycalls__[funcname]=func;
    //alert(funcname);
    //alert(func);
    //alert(__delaycalls__[funcname]);
    
    $(this).attr("delaycall",funcname);
    return this;
};
God.func.dodelaycall=function(){
    $('[delaycall]').each(function(){
        funcname=$(this).attr('delaycall');
        $(this).removeAttr('delaycall');
        me=$(this);
        //alert(funcname);
        //alert(JSON.stringify(__delaycalls__));
        if(__delaycalls__&&__delaycalls__[funcname]){
            __delaycalls__[funcname].apply(me,arguments);
        }
    });
    return this;
};
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
God.func._htmlvar_getvalue=function(oj,varvalue,valueifnoexist){
    var rsvalue=valueifnoexist;
    $(oj).each(function(){
        if(varvalue.match(/^\=/)) {
            rsvalue=varvalue.replace(/^\=/,"");
        } else if(varvalue=="text"){
            rsvalue=$(this).text();
        }  else if(varvalue=="value"){
            rsvalue=$(this).val();
        }  else if(varvalue=="html"){
            rsvalue=$(this).html();
        } else if(varvalue=="checked"){
            rsvalue=$(this).is(":checked");
        } else {
            rsvalue=$(this).prop(varvalue);
            if(typeof rsvalue=="undefined"){rsvalue=$(this).attr(varvalue);}
            if(typeof rsvalue=="undefined" || $$.isempty(rsvalue)){
                rsvalue=valueifnoexist;
            } else {
                rsvalue=rsvalue;
            }

        } 
        
    })
    return rsvalue;
},//获取HTML变量值
God.func.jqhtmlvar=function(varname){
    return $("[varname='"+varname+"']");
},//选定指定varname的元素
God.func.htmlvar=function(varname,valueifnoexist){
        var returnarr=false;
        var rsvalue=valueifnoexist;
        var rsarr=[];
    $("[varname='"+varname+"']").each(function(){
        varvalue=$(this).attr("varvalue");
        varrefto=$(this).attr("varrefto");
        if(typeof varrefto=="undefined" || $$.isempty(varrefto) || varrefto=="[]"){
            rsvalue=God.func._htmlvar_getvalue(this,varvalue,null);
        } else {
            //如果varrefto不为空的话，优先使用varrefto
            if(varrefto.match(/^\[.*\]$/)) {
                returnarr=true;
                varrefto=varrefto.replace(/^\[/,'');
                varrefto=varrefto.replace(/\]$/,'');
            } 
            $(varrefto).each(function(){
                rsarr.push(God.func._htmlvar_getvalue(this,varvalue,null));
            });
            rsvalue=returnarr?rsarr:(rsarr.length<1?null:rsarr.shift());
        }
    });
    return rsvalue;
},//获取HTML变量
God.func.autominheighttowindow=function(selector){
	!arguments[0]&&(selector=".automin-heighttowindow:last");
    if($(selector).length<1){return this;}
    /*
    var s = ""; 
    s += " 网页可见区域宽："+ document.body.clientWidth; 
    s += " 网页可见区域高："+ document.body.clientHeight; 
    s += " 网页可见区域宽："+ document.body.offsetWidth + " (包括边线和滚动条的宽)"; 
    s += " 网页可见区域高："+ document.body.offsetHeight + " (包括边线的宽)"; 
    s += " 网页正文全文宽："+ document.body.scrollWidth; 
    s += " 网页正文全文高："+ document.body.scrollHeight; 
    s += " 网页被卷去的高(ff)："+ document.body.scrollTop; 
    s += " 网页被卷去的高(ie)："+ document.documentElement.scrollTop; 
    s += " 网页被卷去的左："+ document.body.scrollLeft; 
    s += " 网页正文部分上："+ window.screenTop; 
    s += " 网页正文部分左："+ window.screenLeft; 
    s += " 屏幕分辨率的高："+ window.screen.height; 
    s += " 屏幕分辨率的宽："+ window.screen.width; 
    s += " 屏幕可用工作区高度："+ window.screen.availHeight; 
    s += " 屏幕可用工作区宽度："+ window.screen.availWidth; 
    s += " 你的屏幕设置是 "+ window.screen.colorDepth +" 位彩色"; 
    s += " 你的屏幕设置 "+ window.screen.deviceXDPI +" 像素/英寸"; 
    */
    //获取浏览器窗口高度(1)
    var winHeight=0;
    if (window.innerHeight)
        winHeight = window.innerHeight;
    else if ((document.body) && (document.body.clientHeight))
        winHeight = document.body.clientHeight;
    //通过深入Document内部对body进行检测，获取浏览器窗口高度
    if (document.documentElement && document.documentElement.clientHeight)
        winHeight = document.documentElement.clientHeight;
    //获取网页正文全高（2）
    //ch=document.body.scrollHeight
    ch=document.body.offsetHeight;
    //alert(winHeight);
    //alert(ch);

    //设置所有含有".automin-heighttowindow"的元素设置min-height来撑满到窗口高度
    var adjust=0;
    var jqlast=$(".automin-heightlast");
    if(jqlast.length>0){
    	adjust=jqlast.offset().top+jqlast.height();
    }
    //alert(winHeight);
    //alert(adjust);
    $(selector).css("min-height",$(selector).height()+winHeight-adjust-20);
    return this;
}
God.func.htmlvars=function(filter){
	!arguments[0]&&(filter="");
	rsobj={};
	$(filter+"[varname]").each(function(){
		varname=$(this).attr("varname");
		rsobj[varname]=God.func.htmlvar(varname);
	});
	return rsobj;
}

God.func.hasmaxim=function(){return (typeof (maxim)!='undefined') && $$.isobj(maxim);}//是否存在maxim
God.func.merge=function(o){for (x in o) {this[x]=o[x];} return this;},//把给定的对象的全部属性融合到自身中
God.func.safemerge=function(o){for (x in o) {this.hasOwnProperty(x)&&(this[x]=o[x]);} return this;}//把给定的对象中与自身相交的属性值更新到自身中
//God.func.isarray=function(obj){return obj&& typeof obj==='object' && Array === obj.constructor;}
God.func.rndid=function(prix){prix=arguments[0]?(arguments[0]+"_"):"";return prix+parseInt(1000000*Math.random());}
God.func.checkurl=function(ou){
  var bp=$$.maxim('htmlrootpath','/');
  var tp=arguments[0]?ou:'/';
  return tp.replace(/^\//,bp);
};
God.func.adjusthtmlurl=function(){
    $("[src]").each(function(){
        var oldurl=$(this).attr('src');
        $(this).attr('src',$$.checkurl(oldurl));
    });
    $("[href]").each(function(){
        var oldurl=$(this).attr('href');
        $(this).attr('href',$$.checkurl(oldurl));
    });
    return this;    
};
God.func.copyobj=function(obj){
    //浅拷贝
    //var rs={};
    //for (x in obj) {rs[x]=obj[x];} 
  
    //$.extend( [deep ], target, object1 [, objectN ] )
    return $.extend(true,{},obj);
};
$$=God.func;//方便对全局函数的引用
}

}
//God.js Core 结束



//扩充Jquery-开始
if(true){

jQuery.fn.extend({//扩充Jquery开始
sm:sm,//完善与sm的链式操作
outerhtml:function(){
    if(this.length){
        return this.eq(0).prop("outerHTML");   
    }
    return "";
},//获取当前节点的outerhtml
innertext:function(txt){
        if(!arguments[0]){
        	var ta=$(this).clone();
        	ta.children().remove();
        	return ta.text();
        } else {
            if(this.children().length){
                this.html(this.children().wrapAll("<div></div>").parent().html()+txt);
            } else {
                return this.text(txt);
            }
        }
        return this;
},//这个函数的目的是在设置节点下面的文本时而不删除子节点
showme:function(){
	rs="Total length:"+this.length+"\r\n";
	
	this.each(function(i,k){
		rs=rs+"\r\n"+i+":\r\n"+$(this).outerhtml();
	});
	alert(rs);
	return this;
},//打印出当前集合中的outerhtml
safedo:function(f){
    paras=[];
    $.each(arguments,function(i,v){
        if(i>0){paras.push(v)}
    });
    if(this.length){
        f.apply(this,paras);
    }
    return this;
},//当集合不为空的时候才执行
naming:function(id){
	i=0;
	this.each(function(){
		$(this).attr("id",i>0?(id+"_"+i):id);
		i=i+1;
	});
        return this;
},//这个函数的作用是给当前集合按顺序打上一个id标签
additems:function(type,items){
        if($$.isarray(type)){
            items=type;
            type="append";
        }
        me=this;
        $.each(items,function(i,k){
            hascontainer=false;//这里的$(k)是要添加的东西
            $(k).filter("[filler]").each(function(i,v){
                container=$(this).attr("filler");
                rs=me.filter("[container='"+container+"']")[type]($(this));
                rs.length&&(hascontainer=true);
                rs=me.find("[container='"+container+"']")[type]($(this));
                rs.length&&(hascontainer=true);
            });
            if(!hascontainer){
            	me=me[type]($(k));
            }
        });
    return this;
},//这个函数的目的是想把关键字中container和filler匹配的上的才append进来，不匹配的自动忽略
addto:function(selector,type){
    $(selector).additems(type,[this]);
    return this;
},//和additems相同，调用者不同
//定义鼠标右键方法，接收一个函数参数   
rightclick:function(fn){  
    //调用这个方法后将禁止系统的右键菜单   
    $(this).bind('contextmenu',function(e){  
        return false;  
    });   
    //为这个对象绑定鼠标释放事件   
    $(this).mouseup(function(e){  
        //如果按下的是右键，则执行函数   
        if(3 == e.which){  
            fn(e);  
        }  
    });   
    return this;
},
stopcontextmenu:function(fn){  
    //禁用整个文档的邮件菜单  
    document.oncontextmenu = function() {
        return false;
    } 
    return this;
},

});//扩充Jquery结束

}
//扩充Jquery-结束


//数据交换组件
if(God.coms("ajax")){

 
God.ajax._ajaxing=false;
God.ajax._silence=false;
God.ajax._usercallbackfunc={success:[],error:[],complete:[],taskok:[],taskfail:[]};
God.ajax.ajaxing=function(){
	if(!this._setup.async){
		this._ajaxing=false;
	} 
	return this._ajaxing;
}
God.ajax.silence=function(){this._silence=true;return this;};
God.ajax.url=function (newurl){this._setup.url=newurl;return this;}
God.ajax.async=function (asyncv){this._setup.async=asyncv;return this;}

God.ajax.clearusercallback=function(){this._usercallbackfunc={success:[],error:[],complete:[],taskok:[],taskfail:[]};return this;}
God.ajax.addusercallback=function(type,cb){this._usercallbackfunc[type]=cb;return this;}
God.ajax.callback_beforeSend=function (xhr){
	//alert("进入到before");
    if(this._silence){return this;}
    async=this._setup.async?"异步":"同步";
    sm.dialog.show("Ajaxing","正在["+async+"]请求数据，请稍等....",{});
    //alert(xhr.readyState);
    //alert("结束before");
    return this;
}
God.ajax.callback_success=function (data,stat,xhr){
	//alert("执行成功了吗？");
    sm.datasource.extend({lastrawresponse:data});
    //alert("执行成功了");
    //alert(this._usercallbackfunc["success"].length);
    //alert(this._usercallbackfunc["success"][0]);
    while (this._usercallbackfunc["success"].length){
        this._usercallbackfunc["success"].shift()(data,stat,xhr);//执行
    }
    this.logsuccess(data,stat);
    try {
       rsobj=JSON.parse(data);
    } catch(err) {
       //如果返回的值不是有效的JSON格式，视为Ajax Success，但是属于TaskFail
        this.logtaskfail(data,{code:-2,info:"返回非JSON格式"});
        while (this._usercallbackfunc["taskfail"].length){
            this._usercallbackfunc["taskfail"].shift()(data,{code:-2,info:"返回非JSON格式"});//执行
        }
       return this;
    }
    //只要返回的是对象，就直接加到datasource中
    sm.datasource.extend(rsobj._taskresult);
    if($$.isobj(rsobj)&&(typeof rsobj._taskstat!=="undefined")&&(rsobj._taskstat.code!==0)){
        this.logtaskfail(($$.isobj(rsobj._taskresult)||$$.isarray(rsobj._taskresult))?JSON.stringify(rsobj._taskresult):rsobj._taskresult,rsobj._taskstat);
        //交互成功，但是服务器端判定执行任务不成功！交互成功的前提是包含_taskstat和result两个属性，并且_taskstat中含有code和info两个属性，result必须是数组
        while (this._usercallbackfunc["taskfail"].length){
            this._usercallbackfunc["taskfail"].shift()(($$.isobj(rsobj._taskresult)||$$.isarray(rsobj._taskresult))?JSON.stringify(rsobj._taskresult):rsobj._taskresult,rsobj._taskstat);//执行
        }
        return this;
    } else {
        if(!$$.isobj(rsobj)&&(typeof rsobj._taskstat=="undefined")){
            //交互成功，但是返回的格式不符合百步规则
            this.logtaskfail(data,{code:-3,info:"返回的JSON不符合百步规则！"});
            while (this._usercallbackfunc["taskfail"].length){
                this._usercallbackfunc["taskfail"].shift()(data,{code:-3,info:"返回的JSON不符合百步规则！"});//执行
            }
            return this;
        }
        //严格成功！如果结果是对象，就再更新到datasource中
        this.logtaskok(rsobj._taskresult,rsobj._taskstat);
        $$.isobj(rsobj._taskresult)&&sm.datasource.extend(rsobj._taskresult);
        while (this._usercallbackfunc["taskok"].length){
            this._usercallbackfunc["taskok"].shift()(rsobj._taskresult,rsobj._taskstat);//执行
        }
    }
    return this;
}
God.ajax.callback_error=function (xhr,stat,oerror){
//alert("进入到error");
    //alert(xhr.status);
    if(xhr.status==200 && xhr.readyState==4){
    	return sm.ajax.callback_success(xhr.responseText,stat,xhr);
    } else {
    	this.logerror(1,xhr.readyState+":"+stat+"Ajax 调用失败！");
        this.logtaskfail(xhr.readyState+":"+stat+"Ajax 调用失败！",{code:-1,info:"Ajax执行失败！"});
    }
    while (this._usercallbackfunc["error"].length){
        this._usercallbackfunc["error"].shift()(xhr,stat,oerror);//执行
    }
    while (this._usercallbackfunc["taskfail"].length){
        this._usercallbackfunc["taskfail"].shift()(xhr.readyState+":"+stat+"Ajax 调用失败！",{code:-1,info:"Ajax执行失败！"});//执行
    }
    return this;
}
God.ajax._popshow=false;
God.ajax.popshow=function(){this._popshow=true;return this;};
God.ajax.callback_complete=function (xhr,stat){
//alert("进入到complete");
    async=sm.ajax._setup.async;
    this._ajaxing=false;
    if(!this._silence){
        sm.dialog.close("div.auto.dialog:visible");
    } 
    //复位silence标志位
    this._silence=false;
    while (this._usercallbackfunc["complete"].length){
        this._usercallbackfunc["complete"].shift()(xhr,stat);//执行
    }
    //alert(xhr.readyState);
    //清空所有的回调函数，执行的顺序是success，error，complete？
    this.clearusercallback();
    return this;
}


God.ajax.post=function(data){
    
    this._setup.data=data;
    this._setup.type="POST";

    if(this._setup.async){this._ajaxing=true;} else {this._ajaxing=false;}
    //alert(JSON.stringify(this._setup));
    //清空一下Log状态
    this.clearstat();
    //this._setup.beforeSend=function(){alert("检测是否执行了回调函数");};
    //this._setup.success=sm.ajax.callback_success;
    //this._setup.error=sm.ajax.callback_error;
    if(this._popshow){
    	this._popshow=false;
    	alert(JSON.stringify(this._setup.data));
    }
    $.ajax(this._setup);
//alert("提交了啊！为什么没有反映？");
//alert(JSON.stringify(this._setup));
    return this;
}
God.ajax.get=function(data){
    this._setup.data=data;
    this._setup.type="GET";
    if(this._setup.async){this._setup.async=true;}
    //清空一下Log状态
    this.clearstat();
    $.ajax(this._setup);
    return this;
}

God.ajax.success=function(func){
    //如果是异步的Ajax，并且还没执行完，那么就暂存起来等调用完成再执行
    if(this.ajaxing()){
    	//alert("这就对了啦！");
            this._usercallbackfunc["success"].push(func);
    } else {
    		//alert("没有在过程中，直接执行！");
            God.success.apply(this,arguments);
    }
    return this;
}
God.ajax.error=function(func){
    if(this.ajaxing()){
            this._usercallbackfunc["error"].push(func);
    } else {
            God.error.apply(this,arguments);
    }
    return this;
}
God.ajax.complete=function(func){
    //如果是异步的Ajax，并且还没执行完，那么就暂存起来等调用完成再执行
    if(this.ajaxing()){
            this._usercallbackfunc["complete"].push(func);
    } else {
            God.success.apply(this,arguments);
    }
    return this;
}
God.ajax.taskok=function(func){
    if(this.ajaxing()){
            this._usercallbackfunc["taskok"].push(func);
    } else {
            God.taskok.apply(this,arguments);
    }
    return this;   
}
God.ajax.taskfail=function(func){
    if(this.ajaxing()){
        this._usercallbackfunc["taskfail"].push(func);
    } else {
        God.taskfail.apply(this,arguments);
    }
    return this;   
}
God.ajax._setup={type:'POST',url:'',async:true,success:sm.ajax.callback_success,beforeSend:sm.ajax.callback_beforeSend,complete:sm.ajax.callback_complete,error:sm.ajax.callback_error,data:{},context:sm.ajax};   
   
}
God.coms("datasource").extendproto({//存储所有该页面用于交换的数据
extend:function(newobj){
	if((typeof newobj)=="undefined") {return this;}
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
God.coms("page").extendproto({//目的是定义页面跳转，页面信息，用户界面刷新等一系列操作
reload:function(newurl){
    if(arguments[0]) {
        window.location.href=newurl;
    } else {
    	location.reload();
    }
    return this;
},
ram:{},
open:function(newurl){
    window.open(newurl);
    return this;
},
href:function(){
    return window.location.href;
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

