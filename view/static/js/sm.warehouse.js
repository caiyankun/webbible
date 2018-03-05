//warehouse组件--开始
God.warehouse={__proto__:sm,whoami:'God.warehouse'};
sm.warehouse={__proto__:God.warehouse,whoami:'sm.warehouse'};
God.warehouse._warehouse='_warehouse';
God.warehouse._errors=[];
God.jqwarehouse=function(){
    if($('#'+God.warehouse._warehouse).length<1){$("body").prepend("<div id='"+God.warehouse._warehouse+"'  style='display:none'></div>");}
    return $('#'+God.warehouse._warehouse);
};
God.warehouse.clear=function(){God.jqwarehouse().html('');return this;};
God.warehouse.clearerror=function(){God.warehouse._errors=[];return this;};
God.warehouse.clearitem=function(partname){
    God.warehouse.check(partname) && God.warehouse.jqpart(partname).remove();
    return this;
};
God.warehouse.error=function(f){
    if(God.warehouse._errors.length>0) {
        return arguments[0]?f.call(this):true;
    } else {
        return arguments[0]?this:false;
    }
    
};
God.warehouse.show=function(){
    alert(God.jqwarehouse().children('div').map(function(){
        return $(this).attr('id');
    }).get().join(','));
    alert(JSON.stringify(God.warehouse._errors));
    return this;
};

God.warehouse.jqpart=function(partname,contentiffail,forcereload){
    arguments[2]&&God.warehouse.clearitem(partname);
    if(!God.warehouse.check(partname)) { 
        God.warehouse.clearerror().jqwarehouse().append(God.warehouse.jqorder(partname,contentiffail));
    }
    return $("div#_warehouse_"+partname.replace(/\./g,'_'));
};
God.warehouse.jqorder=function(partname,contentiffail){
    contentiffail=arguments[1]?contentiffail:'';
    var ojq=$('<div></div>').attr('id','_warehouse_'+partname.replace(/\./g,'_'));
    sm.ajax.post(sm.factoryurl()+'order',{'partname':partname}).checkresult().taskdone(function(rs){
        /////alert($(rs));
        ojq.html(rs);
    }).taskfail(function(info){
        God.warehouse._errors.push(partname+'error:'+info);
        ojq.append(contentiffail);
    });
    return ojq;
};
God.warehouse.check=function(partname){//protected
    return ($('div#_warehouse_'+partname.replace(/\./g,'_')).length>0)?true:false;
};
God.warehouse.forcast=function(partname){
    var partnames = typeof partname === "string" ? [partname] : partname; 
    God.warehouse.clearerror();
    $.each(partnames,function(i,partname){
        if(!God.warehouse.check(partname)) { 
            var ojq=$('<div></div>').attr('id','_warehouse_'+partname.replace(/\./g,'_'));
            sm.ajax.post(sm.factoryurl()+'order',{'partname':partname}).checkresult().taskdone(function(rs){
                ojq.html(rs);
                God.warehouse.jqwarehouse().append(ojq);
            }).taskfail(function(info){
                God.warehouse._errors.push(partname+'error:'+info);
            });
        }
    });
    return this;
};

//warehouse组件--结束