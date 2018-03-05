if (typeof God==='undefined') {God={};};
if (typeof sm==='undefined') {function sm(c){return this;};sm.__proto__=God;};
God.avmenue={__proto__:sm,whoami:'God.avmenue'};
sm.avmenue={__proto__:God.avmenue};
sm.com.register('avmenue',God.avmenue);

//组件设计
God.avmenue.selector='div.avmenue';
God.avmenue.defaultselector='div.avmenue';
God.avmenue._curnode='a:last';
God.avmenue._hassubdiv=true;
God.avmenue.init=function(){
    $(document).on('click.sminit',"div.avmenue a",function(){God.avmenue.clicknode(this);});
    return this;
};
God.avmenue.hassubdiv=function(){this._hassubdiv=true;return this;};
God.avmenue.nosubdiv=function(){this._hassubdiv=false;return this;};
God.avmenue.clicknode=function(node){
    var bs=$(node).hasClass('showsub');
    God.avmenue.jq().find('a.select').removeClass('select');
    God.avmenue.jq().find('a.pass').removeClass('pass');
    God.avmenue.jq().find('a.showsub').removeClass('showsub');
    if(bs) {$(node).removeClass('showsub');} else {$(node).addClass('showsub');}
    $(node).addClass('select');
    $(node).closest('div.subdiv').prev('a').addClass('pass');
    $(node).closest('div.subdiv').prev('a').addClass('showsub');
    return this;
};
God.avmenue.jqsubdiv=function(){return sm.jqdiv().addClass('subdiv');};
God.avmenue.clear=function(){this.jq().html("");return this;};
God.avmenue.jqmenueitem=function(itemarr){
    var jqt=this.jqa();
    jqt.addClass('l'+itemarr.level);
    jqt.html(itemarr.text);
    jqt.attr(itemarr);
    return jqt;
};
God.avmenue.foritem=function(s){
    this._curnode=this.jq().find('a:contains("'+s+'")').map(function(){
        if($(this).text()===s) return this;
    });
    return this;
};
God.avmenue.forattr=function(attrname,attrvalue){
    this._curnode=this.jq().find('a['+attrname+'="'+attrvalue+'"]');
    return this;
};
God.avmenue.jqmenueitems=function(menues,level,path){
    level=arguments[1]?level:1;
    path=arguments[2]?path:'';
    var laststring='';
    (typeof menues ==='string')&& (menues=[menues]);
    var jqt=this.jqsubdiv();
    $.each(menues,function(i,v){
        if(typeof v ==='string'){
            laststring=v;
            jqt.append(sm.avmenue.jqmenueitem({
                'level':level,
                'text':v,
                'path':path+'/'+laststring
            }));
        } else {
            if(sm.avmenue._hassubdiv){
                jqt.append(sm.avmenue.jqmenueitems(v,level+1,path+'/'+laststring));
            }  else {
                jqt.append(sm.avmenue.jqmenueitems(v,level+1,path+'/'+laststring).html());
            }
        }
    });
    return jqt;
};
God.avmenue.addmenues=function(menues){
    if(this._hassubdiv){
        this.jq().append(this.jqmenueitems(menues));
    }  else {
        this.jq().append(this.jqmenueitems(menues).html());
    }
    return this;
};
God.avmenue.count=function(){
    return this.jq().find('a').length;
};
God.avmenue.jqcurnode=function(){
    return $(this._curnode);
};
God.avmenue.additems=function(itemsarr,node){
    var jqt=this.jqdiv();
    $.each(itemsarr,function(k,v){
        jqt.append(sm.avmenue.jqmenueitem(v));
    });

    if(this.count()<1) {
        this.jq().html(jqt.html());
    } else {
        node=arguments[1]?node:this._curnode;
        if(typeof node==='string'){node=this.jq().find(node);}
        $(node).after(jqt.html());
    }    
    return this;
};

