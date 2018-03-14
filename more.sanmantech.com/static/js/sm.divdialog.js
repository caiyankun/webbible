if (typeof God==='undefined') {God={};};
if (typeof sm==='undefined') {function sm(c){return this;};sm.__proto__=God;};
God.divdialog={__proto__:sm,whoami:'God.divdialog'};
sm.divdialog={__proto__:God.divdialog,whoami:'sm.divdialog'};
sm.com.register('divdialog',God.divdialog);
God.divdialog.selector='#_dialog';
God.divdialog.defaultselector='#_dialog';
God.divdialog._mask='_bodymask';
God.divdialog._dialog='_dialog';
God.divdialog._toolbar="<div class='toolbar close'>X</div>";
God.divdialog.jqmask=function(){//protected
    var ts='#'+God.divdialog._mask;
    if($(ts).length<1){$("body").prepend(sm.jqdiv().attr('id',God.divdialog._mask).addClass('divdialog mask'));}
    return $(ts);
};
God.divdialog.jqdialog=function(){//protected
    var ts='#'+God.divdialog._dialog;
    if($(ts).length<1){$("body").prepend(sm.jqdiv().attr('id',God.divdialog._dialog).addClass('divdialog content'));}
    return $(ts);
};
God.divdialog.jqdialogwithtollbar=function(){//protected
    if(this.jqdialog().find("div.toolbar.close").length<1){this.jqdialog().prepend(this.jqtoolbar());}
    return this.jqdialog();
};
God.divdialog.jqtoolbar=function(){
    return $(this._toolbar);
};
God.divdialog.maskon=function(){
    this.jqmask().width(PageWidth()).height(PageHeight()).show();
    return this;
};
God.divdialog.maskoff=function(){
    this.jqmask().hide();
    return this;
};
God.divdialog.updpos=function(){
    var oc=this.jqdialog();
    var ow=oc.outerWidth();
    var oh=oc.outerHeight();
    var ww=$(window).width();
    var wh=$(window).height();
    var l=(ww-ow)/2>0?(ww-ow)/2:0;
    var t=(wh-oh)/2>0?(wh-oh)/2:0;
    oc.css("left",$(document).scrollLeft()+l+"px");
    oc.css("top",$(document).scrollTop()+t+"px");
    return oc;
};
God.divdialog.output=function (content){
    arguments[0]&&this.jqdialog().html(content).prepend(this.toolbar());
    return this;
};
God.divdialog.display=function(hcontent,minwidth,minheight){return this.show(hcontent,minwidth,minheight,1);};
God.divdialog.show=function(hcontent,minwidth,minheight,bmask){
    hcontent=arguments[0]?arguments[0]:false;
    minwidth=arguments[1]?arguments[1]:400;
    minheight=arguments[2]?arguments[2]:300;
    bmask=arguments[3]?false:true;

    if(bmask){this.maskon();}
    var oc=this.jqdialogwithtollbar();
    oc.css("min-width",minwidth+"px").css("min-height",minheight+"px");
    if(hcontent!==false){oc.html(hcontent).prepend(this.jqtoolbar());}
    God.divdialog.updpos().show();
    oc.on("click.hidedialog","div.toolbar.close",function(){sm.divdialog.hide();});
    $(window).on("scroll.divdialog",function(){sm.divdialog.updpos();});
    $(window).on("resize.divdialog",function(){sm.divdialog.updpos();});
    return this;
};
God.divdialog.hide=function(){
   this.jqdialog().hide().off("click.hidedialog","div.toolbar.close");
    this.maskoff(); 
    $(window).off("scroll.divdialog");
    $(window).off("resize.divdialog");
    return this;
};
//获取页面高度
function PageHeight(){
    return $(document).height()<window.screen.height?window.screen.height:$(document).height();
}
//获取页面宽度     
 function PageWidth(){
    return $(document).width()<window.screen.width?window.screen.width:$(document).width();
} 
//===========================================================
