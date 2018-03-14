//sm的事件代理--开始
God.eventagent={__proto__:sm,whoami:'God.eventagent'};
sm.eventagent={__proto__:God.eventagent,whoami:'sm.eventagent'};
God.eventagent.defaultby='txt';
God.eventagent.lists=[];
God.eventagent.initflag=';';
God.eventagent.on=function(event,childSelector,dataorfunc){
    var ts=';'+event+childSelector+';';
    if(God.eventagent.initflag.indexOf(ts)>0){} else {
        God.eventagent.initflag=God.eventagent.initflag+ts;
        $.isFunction(dataorfunc)?$(document).on(event+'.eventagnet',childSelector,dataorfunc):$(document).on(event+'.eventagnet',childSelector,dataorfunc,God.eventagent.do);
    }
    return this;
};
God.eventagent.off=function(event,childSelector,dataorfunc,func,map){
    $(document).off(event+'.eventagnet',childSelector,dataorfunc,func,map);
    return this;
};
God.eventagent.by=function(m){God.eventagent.defaultby=m;return this;};
God.eventagent.addhref=function(lists,target){
    target=arguments[1]?target:'_self';
    $.each(lists,function(k,v){
        //alert(k+v);
        God.eventagent.lists.push({'by':God.eventagent.defaultby,'type':'href','cretia':k,'href':v,'target':target});
    });
    return this;
};
God.eventagent.del=function(cretia,type,by){
    var newarr=[];
    type=arguments[1]?type:false;
    by=arguments[2]?by:false;
    $.each(God.eventagent.lists,function(i,v){
        if(v.cretia===cretia&&(!type||type===v.type)&&(!by||by===v.by)){
        //if(v.cretia===cretia&&!arguments[1]){
            alert('找到一个匹配');
        } else {
            newarr.push(v);
        }
    });
    God.eventagent.lists=newarr;
    return this;
};
God.eventagent.showlists=function(){alert (JSON.stringify(God.eventagent.lists)); return this;};
God.eventagent.addfunc=function(lists){
    $.each(lists,function(k,v){
        //alert(k+v);
        God.eventagent.lists.push({'by':God.eventagent.defaultby,'type':'func','cretia':k,'func':v});
    });
    return this;
};
God.eventagent.do=function (){
    var mtext=$(this).text();
    var mval=$(this).val();
    var mhtml=$(this).html();
    var mclass=$(this).attr('class');
    var mtagname=this.tagName;
    var ags=arguments;
    var tthis=this;
    $.each(God.eventagent.lists,function(i,v){
        if(v.by==='selector'){
            if($(tthis).is(v.cretia)) {
                if(v.type==='href'){
                    if(v.target==='_self'){location.href=God.maxim.url(v.href);}else{window.open(God.maxim.url(v.href));}
                } else if(v.type==='func'){
                    v.func.call(tthis,ags);
                }
            }
        } else {
            if(v.by==='val') { var cv=mval; } else {var cv=mtext;}
            if(cv===v.cretia){
                if(v.type==='href'){
                    if(v.target==='_self'){location.href=God.maxim.url(v.href);}else{window.open(God.maxim.url(v.href));}
                } else if(v.type==='func'){
                    v.func.call(tthis,ags);
                }
            }
        }
    });
    //alert('txt:'+mtext+'\r\nval:'+mval+'\r\nhtml:'+mhtml+'\r\nclass:'+mclass+'\r\ntagname:'+mtagname);
};
God.eventon=function(en,s){
    return sm.eventagent.on(en,this.selector+" "+s);
};
//sm的事件代理--结束