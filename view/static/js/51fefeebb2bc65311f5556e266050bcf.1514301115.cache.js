/*! JSON v3.3.2 | http://bestiejs.github.io/json3 | Copyright 2012-2014, Kit Cambridge | http://kit.mit-license.org */
(function(){function N(p,r){function q(a){if(q[a]!==w)return q[a];var c;if("bug-string-char-index"==a)c="a"!="a"[0];else if("json"==a)c=q("json-stringify")&&q("json-parse");else{var e;if("json-stringify"==a){c=r.stringify;var b="function"==typeof c&&s;if(b){(e=function(){return 1}).toJSON=e;try{b="0"===c(0)&&"0"===c(new t)&&'""'==c(new A)&&c(u)===w&&c(w)===w&&c()===w&&"1"===c(e)&&"[1]"==c([e])&&"[null]"==c([w])&&"null"==c(null)&&"[null,null,null]"==c([w,u,null])&&'{"a":[1,true,false,null,"\\u0000\\b\\n\\f\\r\\t"]}'==
c({a:[e,!0,!1,null,"\x00\b\n\f\r\t"]})&&"1"===c(null,e)&&"[\n 1,\n 2\n]"==c([1,2],null,1)&&'"-271821-04-20T00:00:00.000Z"'==c(new C(-864E13))&&'"+275760-09-13T00:00:00.000Z"'==c(new C(864E13))&&'"-000001-01-01T00:00:00.000Z"'==c(new C(-621987552E5))&&'"1969-12-31T23:59:59.999Z"'==c(new C(-1))}catch(f){b=!1}}c=b}if("json-parse"==a){c=r.parse;if("function"==typeof c)try{if(0===c("0")&&!c(!1)){e=c('{"a":[1,true,false,null,"\\u0000\\b\\n\\f\\r\\t"]}');var n=5==e.a.length&&1===e.a[0];if(n){try{n=!c('"\t"')}catch(d){}if(n)try{n=
1!==c("01")}catch(g){}if(n)try{n=1!==c("1.")}catch(m){}}}}catch(X){n=!1}c=n}}return q[a]=!!c}p||(p=k.Object());r||(r=k.Object());var t=p.Number||k.Number,A=p.String||k.String,H=p.Object||k.Object,C=p.Date||k.Date,G=p.SyntaxError||k.SyntaxError,K=p.TypeError||k.TypeError,L=p.Math||k.Math,I=p.JSON||k.JSON;"object"==typeof I&&I&&(r.stringify=I.stringify,r.parse=I.parse);var H=H.prototype,u=H.toString,v,B,w,s=new C(-0xc782b5b800cec);try{s=-109252==s.getUTCFullYear()&&0===s.getUTCMonth()&&1===s.getUTCDate()&&
10==s.getUTCHours()&&37==s.getUTCMinutes()&&6==s.getUTCSeconds()&&708==s.getUTCMilliseconds()}catch(Q){}if(!q("json")){var D=q("bug-string-char-index");if(!s)var x=L.floor,M=[0,31,59,90,120,151,181,212,243,273,304,334],E=function(a,c){return M[c]+365*(a-1970)+x((a-1969+(c=+(1<c)))/4)-x((a-1901+c)/100)+x((a-1601+c)/400)};(v=H.hasOwnProperty)||(v=function(a){var c={},e;(c.__proto__=null,c.__proto__={toString:1},c).toString!=u?v=function(a){var c=this.__proto__;a=a in(this.__proto__=null,this);this.__proto__=
c;return a}:(e=c.constructor,v=function(a){var c=(this.constructor||e).prototype;return a in this&&!(a in c&&this[a]===c[a])});c=null;return v.call(this,a)});B=function(a,c){var e=0,b,f,n;(b=function(){this.valueOf=0}).prototype.valueOf=0;f=new b;for(n in f)v.call(f,n)&&e++;b=f=null;e?B=2==e?function(a,c){var e={},b="[object Function]"==u.call(a),f;for(f in a)b&&"prototype"==f||v.call(e,f)||!(e[f]=1)||!v.call(a,f)||c(f)}:function(a,c){var e="[object Function]"==u.call(a),b,f;for(b in a)e&&"prototype"==
b||!v.call(a,b)||(f="constructor"===b)||c(b);(f||v.call(a,b="constructor"))&&c(b)}:(f="valueOf toString toLocaleString propertyIsEnumerable isPrototypeOf hasOwnProperty constructor".split(" "),B=function(a,c){var e="[object Function]"==u.call(a),b,h=!e&&"function"!=typeof a.constructor&&F[typeof a.hasOwnProperty]&&a.hasOwnProperty||v;for(b in a)e&&"prototype"==b||!h.call(a,b)||c(b);for(e=f.length;b=f[--e];h.call(a,b)&&c(b));});return B(a,c)};if(!q("json-stringify")){var U={92:"\\\\",34:'\\"',8:"\\b",
12:"\\f",10:"\\n",13:"\\r",9:"\\t"},y=function(a,c){return("000000"+(c||0)).slice(-a)},R=function(a){for(var c='"',b=0,h=a.length,f=!D||10<h,n=f&&(D?a.split(""):a);b<h;b++){var d=a.charCodeAt(b);switch(d){case 8:case 9:case 10:case 12:case 13:case 34:case 92:c+=U[d];break;default:if(32>d){c+="\\u00"+y(2,d.toString(16));break}c+=f?n[b]:a.charAt(b)}}return c+'"'},O=function(a,c,b,h,f,n,d){var g,m,k,l,p,r,s,t,q;try{g=c[a]}catch(z){}if("object"==typeof g&&g)if(m=u.call(g),"[object Date]"!=m||v.call(g,
"toJSON"))"function"==typeof g.toJSON&&("[object Number]"!=m&&"[object String]"!=m&&"[object Array]"!=m||v.call(g,"toJSON"))&&(g=g.toJSON(a));else if(g>-1/0&&g<1/0){if(E){l=x(g/864E5);for(m=x(l/365.2425)+1970-1;E(m+1,0)<=l;m++);for(k=x((l-E(m,0))/30.42);E(m,k+1)<=l;k++);l=1+l-E(m,k);p=(g%864E5+864E5)%864E5;r=x(p/36E5)%24;s=x(p/6E4)%60;t=x(p/1E3)%60;p%=1E3}else m=g.getUTCFullYear(),k=g.getUTCMonth(),l=g.getUTCDate(),r=g.getUTCHours(),s=g.getUTCMinutes(),t=g.getUTCSeconds(),p=g.getUTCMilliseconds();
g=(0>=m||1E4<=m?(0>m?"-":"+")+y(6,0>m?-m:m):y(4,m))+"-"+y(2,k+1)+"-"+y(2,l)+"T"+y(2,r)+":"+y(2,s)+":"+y(2,t)+"."+y(3,p)+"Z"}else g=null;b&&(g=b.call(c,a,g));if(null===g)return"null";m=u.call(g);if("[object Boolean]"==m)return""+g;if("[object Number]"==m)return g>-1/0&&g<1/0?""+g:"null";if("[object String]"==m)return R(""+g);if("object"==typeof g){for(a=d.length;a--;)if(d[a]===g)throw K();d.push(g);q=[];c=n;n+=f;if("[object Array]"==m){k=0;for(a=g.length;k<a;k++)m=O(k,g,b,h,f,n,d),q.push(m===w?"null":
m);a=q.length?f?"[\n"+n+q.join(",\n"+n)+"\n"+c+"]":"["+q.join(",")+"]":"[]"}else B(h||g,function(a){var c=O(a,g,b,h,f,n,d);c!==w&&q.push(R(a)+":"+(f?" ":"")+c)}),a=q.length?f?"{\n"+n+q.join(",\n"+n)+"\n"+c+"}":"{"+q.join(",")+"}":"{}";d.pop();return a}};r.stringify=function(a,c,b){var h,f,n,d;if(F[typeof c]&&c)if("[object Function]"==(d=u.call(c)))f=c;else if("[object Array]"==d){n={};for(var g=0,k=c.length,l;g<k;l=c[g++],(d=u.call(l),"[object String]"==d||"[object Number]"==d)&&(n[l]=1));}if(b)if("[object Number]"==
(d=u.call(b))){if(0<(b-=b%1))for(h="",10<b&&(b=10);h.length<b;h+=" ");}else"[object String]"==d&&(h=10>=b.length?b:b.slice(0,10));return O("",(l={},l[""]=a,l),f,n,h,"",[])}}if(!q("json-parse")){var V=A.fromCharCode,W={92:"\\",34:'"',47:"/",98:"\b",116:"\t",110:"\n",102:"\f",114:"\r"},b,J,l=function(){b=J=null;throw G();},z=function(){for(var a=J,c=a.length,e,h,f,k,d;b<c;)switch(d=a.charCodeAt(b),d){case 9:case 10:case 13:case 32:b++;break;case 123:case 125:case 91:case 93:case 58:case 44:return e=
D?a.charAt(b):a[b],b++,e;case 34:e="@";for(b++;b<c;)if(d=a.charCodeAt(b),32>d)l();else if(92==d)switch(d=a.charCodeAt(++b),d){case 92:case 34:case 47:case 98:case 116:case 110:case 102:case 114:e+=W[d];b++;break;case 117:h=++b;for(f=b+4;b<f;b++)d=a.charCodeAt(b),48<=d&&57>=d||97<=d&&102>=d||65<=d&&70>=d||l();e+=V("0x"+a.slice(h,b));break;default:l()}else{if(34==d)break;d=a.charCodeAt(b);for(h=b;32<=d&&92!=d&&34!=d;)d=a.charCodeAt(++b);e+=a.slice(h,b)}if(34==a.charCodeAt(b))return b++,e;l();default:h=
b;45==d&&(k=!0,d=a.charCodeAt(++b));if(48<=d&&57>=d){for(48==d&&(d=a.charCodeAt(b+1),48<=d&&57>=d)&&l();b<c&&(d=a.charCodeAt(b),48<=d&&57>=d);b++);if(46==a.charCodeAt(b)){for(f=++b;f<c&&(d=a.charCodeAt(f),48<=d&&57>=d);f++);f==b&&l();b=f}d=a.charCodeAt(b);if(101==d||69==d){d=a.charCodeAt(++b);43!=d&&45!=d||b++;for(f=b;f<c&&(d=a.charCodeAt(f),48<=d&&57>=d);f++);f==b&&l();b=f}return+a.slice(h,b)}k&&l();if("true"==a.slice(b,b+4))return b+=4,!0;if("false"==a.slice(b,b+5))return b+=5,!1;if("null"==a.slice(b,
b+4))return b+=4,null;l()}return"$"},P=function(a){var c,b;"$"==a&&l();if("string"==typeof a){if("@"==(D?a.charAt(0):a[0]))return a.slice(1);if("["==a){for(c=[];;b||(b=!0)){a=z();if("]"==a)break;b&&(","==a?(a=z(),"]"==a&&l()):l());","==a&&l();c.push(P(a))}return c}if("{"==a){for(c={};;b||(b=!0)){a=z();if("}"==a)break;b&&(","==a?(a=z(),"}"==a&&l()):l());","!=a&&"string"==typeof a&&"@"==(D?a.charAt(0):a[0])&&":"==z()||l();c[a.slice(1)]=P(z())}return c}l()}return a},T=function(a,b,e){e=S(a,b,e);e===
w?delete a[b]:a[b]=e},S=function(a,b,e){var h=a[b],f;if("object"==typeof h&&h)if("[object Array]"==u.call(h))for(f=h.length;f--;)T(h,f,e);else B(h,function(a){T(h,a,e)});return e.call(a,b,h)};r.parse=function(a,c){var e,h;b=0;J=""+a;e=P(z());"$"!=z()&&l();b=J=null;return c&&"[object Function]"==u.call(c)?S((h={},h[""]=e,h),"",c):e}}}r.runInContext=N;return r}var K=typeof define==="function"&&define.amd,F={"function":!0,object:!0},G=F[typeof exports]&&exports&&!exports.nodeType&&exports,k=F[typeof window]&&
window||this,t=G&&F[typeof module]&&module&&!module.nodeType&&"object"==typeof global&&global;!t||t.global!==t&&t.window!==t&&t.self!==t||(k=t);if(G&&!K)N(k,G);else{var L=k.JSON,Q=k.JSON3,M=!1,A=N(k,k.JSON3={noConflict:function(){M||(M=!0,k.JSON=L,k.JSON3=Q,L=Q=null);return A}});k.JSON={parse:A.parse,stringify:A.stringify}}K&&define(function(){return A})}).call(this);
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
}
//简单的配置信息存取机制
God.setup=function (os){$$.merge.apply(this._setup,[os]);return this;};
God._setup={};
//基本的执行状态控制机制-开始
//作用：1，错误检查调试协助；2，日志记录；3，链式操作的执行成败分支
if(true) {
God._info="";
God._error=0;
God._data=null;
God._log=[];
God.clearstat=function(){
    this._error=0;
    this._data=null;
    this._info="";
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
        } else if(varvalue=="html"){
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
}
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

God.func.hasmaxim=function(){return (typeof (maxim)!='undefined') && $$.isobj(maxim);}
God.func.merge=function(o){for (x in o) {this[x]=o[x];} return this;}
God.func.safemerge=function(o){for (x in o) {this.hasOwnProperty(x)&&(this[x]=o[x]);} return this;}
God.func.isarray=function(obj){return obj&& typeof obj==='object' && Array === obj.constructor;}
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
},
innertext:function(txt){//这个函数的目的是在设置节点下面的文本时而不删除子节点
        if(!arguments[0]){
            return this.text();
        } else {
            if(this.children().length){
                this.html(this.children().wrapAll("<div></div>").parent().html()+txt);
            } else {
                return this.text(txt);
            }
        }
        return this;
},
showme:function(){
	rs="Total length:"+this.length+"\r\n";
	
	this.each(function(i,k){
		rs=rs+"\r\n"+i+":\r\n"+$(this).outerhtml();
	});
	alert(rs);
	return this;
},
safedo:function(f){//当集合不为空的时候才执行
    paras=[];
    $.each(arguments,function(i,v){
        if(i>0){paras.push(v)}
    });
    if(this.length){
        f.apply(this,paras);
    }
    return this;
},
naming:function(id){//这个函数的作用是给当前集合按顺序打上一个id标签
	i=0;
	this.each(function(){
		$(this).attr("id",i>0?(id+"_"+i):id);
		i=i+1;
	});
        return this;
},
additems:function(type,items){//这个函数的目的是想把关键字中container和filler匹配的上的才append进来，不匹配的自动忽略
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
},
addto:function(selector,type){//和additems相同，调用者不同
    $(selector).additems(type,[this]);
    return this;
},
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
    
God.ajax.url=function (newurl){this._setup.url=newurl;return this;}
God.ajax.async=function (asyncv){this._setup.async=asyncv;return this;}
God.ajax.callback_success=function (data,stat,xhr){
    try {
       rsobj=JSON.parse(data);
    } catch(err) {
       this.logsuccess(data,stat);
       sm.datasource.extend(rsobj);
       return this;
    }
    if($$.isobj(rsobj)&&(typeof rsobj.error!=="undefined")&&(rsobj.error>0)){
        this.logerror(rsobj.error,rsobj.info);
        return this;
    } else {
        this.logsuccess(rsobj,stat);
        sm.datasource.extend(rsobj);
    }
    return this;
}
God.ajax.callback_error=function (xhr,stat,oerror){
    alert(xhr.status);
    if(xhr.status==200 && xhr.readyState==4){
    	return sm.ajax.callback_success(xhr.responseText,stat,xhr);
    } else {
    	this.logerror(1,xhr.readyState+":"+stat+"Ajax 调用失败！");
    }
    
    return this;
}
God.ajax._completecallbackfunc=[];
God.ajax.callback_complete=function (xhr,stat){
	async=sm.ajax._setup.async;
	if(!async){return this;}
	this._ajaxing=false;
	if(!this._silence){
		sm.dialog.close("div.auto.dialog:visible");
		
	} 
	this._silence=false;
	while (this._completecallbackfunc.length){
		this._completecallbackfunc.shift()();
	}
    //alert(xhr.readyState);

    return this;
}
God.ajax.ajaxing=function(){
	if(!this._setup.async){
		this._ajaxing=false;
	} 
	return this._ajaxing;
}
God.ajax._ajaxing=false;
God.ajax._silence=false;
God.ajax.silence=function(){this._silence=true;return this;};
God.ajax.callback_beforeSend=function (xhr){
	async=sm.ajax._setup.async;
	if(!async){return this;}
	this._ajaxing=true;
	if(this._silence){return this;}
	async=async?"异步":"同步";
	sm.dialog.show("Ajaxing","正在["+async+"]请求数据，请稍等....",{});
    //alert(xhr.readyState);

    return this;
}
God.ajax.post=function(data){
    this._setup.data=data;
    this._setup.type="POST";
    $.ajax(this._setup);
    return this;
}

God.ajax.success=function(func){
	if(this.ajaxing()){
		this._completecallbackfunc.push(function(){return sm.ajax.success(func);});
	} else {
		God.success.apply(this,arguments);
	}
	return this;
}
God.ajax.error=function(func){
	if(this.ajaxing()){
		this._completecallbackfunc.push(function(){return sm.ajax.error(func);});
	} else {
		God.error.apply(this,arguments);
	}
	return this;
}
God.ajax.get=function(data){
    this._setup.data=data;
    this._setup.type="GET";
    $.ajax(this._setup);
    return this;
}
God.ajax._setup={type:'POST',url:'',async:true,success:sm.ajax.callback_success,beforeSend:God.ajax.callback_beforeSend,complete:God.ajax.callback_complete,error:sm.ajax.callback_error ,data:{},context:sm.ajax};    
    
}
God.coms("datasource").extendproto({//存储所有该页面用于交换的数据
    
});
God.coms("dataexchange").extendproto({
define:function(dename,defnation){
    God.dataexchange[dename]=function(paras,url){
            !arguments[0]&&(paras={});
            !arguments[1]&&(url="#");
            if(defnation.hasOwnProperty("subdata")){
                    $$.merge.apply(paras,[$$.htmlvars(defnation.subdata)]);
            }
            //上面是组装了参数,下面组装URL
            !arguments[1]&&(defnation.hasOwnProperty("url"))&&(url=defnation.url);
            //开始执行代码！
            sm.ajax.url(url).post(paras).success(function(){
                    if(defnation.hasOwnProperty("success")){
                            defnation.success();
                    }

            }).error(function(){
                    if(defnation.hasOwnProperty("fail")){
                            defnation.fail();
                    }

            });


            return this;
    }
    return this;
},
    
});
God.coms("page").extendproto({//目的是定义页面跳转，页面信息，用户界面刷新等一系列操作

});
God.coms("event").extendproto({//目的是定义事件相关的函数

});

God.coms("dialog").extendproto({//对话框

show:function(title,content,funcmap){
    code_bg='<div id="code_bg" style="position:absolute;left:0px;top:0px;background-color:#000;width:100%;filter:alpha(opacity=60);opacity:0.6;z-Index:100;"></div>'
    code_msg='<div id="code_msg" style="position:absolute;width:100%;height:30px;text-align:center;line-height: 30px;top:0px;left:0px;background-color:#ddd;filter:alpha(opacity=40);opacity:0.4;cursor:pointer;z-Index:101;">'+content+'</div>'
    $("body").prepend(code_bg);
    $("body").prepend(code_msg);
    $("#code_bg").height(document.body.clientHeight);
},
close:function(filter){
    $("#code_bg").remove();
    $("#code_msg").remove();
},

});


