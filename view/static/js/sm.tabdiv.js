if (typeof God==='undefined') {God={};};
if (typeof sm==='undefined') {function sm(c){return this;};sm.__proto__=God;};
God.tabdiv={__proto__:sm,whoami:'God.tabdiv'};
sm.tabdiv={__proto__:God.tabdiv,whoami:'sm.tabdiv'};
sm.com.register('tabdiv',God.tabdiv);


God.tabdiv.selector='div.tabdiv';
God.tabdiv.defaultselector='div.tabdiv';
God.tabdiv._tabmodel="<a class='tabs'  ></a>";
God.tabdiv._tabcontentmodel="<div class='bodys'  style='display:none'></div>";


God.tabdiv.hideall=function(){
    $(this.selector).find("div.tabshead>a").removeClass("tabs curtab").addClass("tabs");
    $(this.selector).find("div.tabsbody>div.bodys").css("display","none");
    return this;
};
God.tabdiv.clear=function(){
    this.jq().find('div.tabshead>a').remove();
    this.jq().find('div.tabsbody').html('');
    return this;
};
God.tabdiv.tabid=function (p){var ta=$(p).eq(0).attr("id");ta=ta.replace(/^tab_/,"");ta=ta.replace(/^body_/,"");return ta;};////
God.tabdiv.curid=function(){var ta=this.jq().find("div.tabshead>a.curtab").eq(0).attr("id");ta=ta.replace(/^tab_/,"");return ta;};
God.tabdiv.cursn=function(){return this.jq().find("div.tabshead>a.curtab").index();};
God.tabdiv.jqcurname=function(){return this.jq().find("div.tabshead>a.curtab");};
God.tabdiv.jqcurcnt=function(){return this.jq().find("div.tabsbody>div.bodys:visible");};
God.tabdiv.getlastsn=function(){return $(this.selector).find("div.tabshead>a").length;};

God.tabdiv.showtabbyid=function(mid){
    this.hideall();
    $(this.selector).find("#tab_"+mid).removeClass("tabs curtab").addClass("curtab");
    $(this.selector).find("#body_"+mid).css("display","");
    return this;
};
God.tabdiv.showtab=function(node){return this.showtabbyid(this.tabid(node));};
God.tabdiv.showtabs=function(s){
    this.hideall();
    $(this.selector).find("div.tabshead>a"+s).removeClass("curtab tabs").addClass("curtab");
    $(this.selector).find("div.tabsbody>div.bodys"+s).css("display","");
    return this;
};
God.tabdiv.showtabbysn=function(sn){if(this.getlastsn()>=sn){this.hideall();return this.showtabs(":eq("+sn+")");}};
God.tabdiv.showlasttab=function(){return this.showtabs(":last");};
God.tabdiv.showfirsttab=function(){return this.showtabs(":first");};

God.tabdiv.deltabbyid=function(mid){$(this.selector).find("#tab_"+mid).remove();$(this.selector).find("#body_"+mid).remove();return this;};
God.tabdiv.deltab=function(p){this.deltabbyid(this.tabid(p));};
God.tabdiv.deltabs=function(s){
    $(this.selector).find("div.tabshead>a"+s).remove();
    $(this.selector).find("div.tabsbody>div.bodys"+s).remove();
    return this;
};
God.tabdiv.deltabbysn=function(sn){return this.deltabs(":eq("+sn+")");};
God.tabdiv.delfirsttab=function(){return this.deltabs(":first");};
God.tabdiv.dellasttab=function(){return this.deltabs(":last");};
God.tabdiv.delcurtab=function(){this.deltabbyid(this.curid());return this;};

God.tabdiv.addtab=function(tabcontent,tabname,aftersn,showthis){
    tabcontent=arguments[0]?arguments[0]:"";
    tabname=arguments[1]?arguments[1]:"新标签";
    aftersn=arguments[2]?":eq("+arguments[2]+")":":last";
    showthis=arguments[3]?arguments[3]:true;
    var rndid=God.rndid();
    var tjqtab=$(this._tabmodel).attr('id','tab_'+rndid).html(tabname);
    var tjqcontent=$(this._tabcontentmodel).attr('id','body_'+rndid).html(tabcontent);
    if(this.jq().find('div.tabshead>a').length>0){
        $(this.selector).find("div.tabshead>a"+aftersn).after(tjqtab);
        $(this.selector).find("div.tabsbody>div.bodys"+aftersn).after(tjqcontent);
    } else {
        $(this.selector).find("div.tabshead").prepend(tjqtab);
        $(this.selector).find("div.tabsbody").prepend(tjqcontent);
    }
    if(showthis){this.hideall();this.showtabbyid(rndid);}
    return this;
};

God.tabdiv.init=function(){
    $(document).on('click.sminit',"div.tabdiv div.tabshead>a",function(){God.tabdiv.showtab(this)});
    return this;
};
