if (typeof God==='undefined') {God={};};
if (typeof sm==='undefined') {function sm(c){return this;};sm.__proto__=God;};
God.tree={__proto__:sm,whoami:'God.tree'};
sm.tree={__proto__:God.tree};
sm.com.register('tree',God.tree);


//组件设计
God.tree.selector='div.tree';
God.tree.defaultselector='div.tree';
God.tree._curnode='li:first';
God.tree.init=function(){
    $(document).on('click','ul.tree a.close', God.tree.evtopenfolder).
    on('click','ul.tree a.open',God.tree.evtclosefolder).
    on('click','ul.tree li>a.item',God.tree.evtselect);
    return this;
};
God.tree.foritem=function(s){
    this._curnode=this.jq().find('a:contains("'+s+'")').map(function(){
        if($(this).text()===s) return this;
    }).closest('li');
    return this;
};
God.tree.show=function(){
  alert(JSON.stringify({
      'this':this,
      'God.tree.selector':God.tree.selector,
      'God.tree.defaultselector':God.tree.defaultselector,
      'God.tree._curnode':God.tree._curnode,
      'this.selector':this.selector,
      'sm.tree.selector':sm.tree.selector
  }));
  return this;
};
God.tree.forpath=function(s){
    this._curnode=this.jq().find('a[path="'+s+'"]').closest('li');
    return this;
};
God.tree.forattr=function(attrname,attrvalue){
    this._curnode=this.jq().find('a['+attrname+'="'+attrvalue+'"]');
    return this;
};
God.tree.evtopenfolder=function(){
    God.tree.openfolder(this);
};
God.tree.evtclosefolder=function(){
    God.tree.closefolder(this);
};
God.tree.removefiles=function(node){
    var basepath=$(node).closest('li').children('a:last').attr('path');
    $(node).closest('li').nextAll().find('a[path^="'+basepath+'"]').closest('li').remove();
    return this;
};
God.tree.addfiles=function(filearr,node){
    node=arguments[1]?node:this._curnode;
    var tjq=sm.jqdiv();
    node=$(node).eq(0);
    var basepath=$(node).children('a:last').attr('path');
    var maxl=$(node).children('a').length;
    var prefix=$(node).children('a').clone().map(function(i,v){
        if(i<maxl-3) {
            return this;
        } else if(i===maxl-3){
            if($(this).hasClass('bottom') || $(this).hasClass('project')) {
                return $(this).removeClass().addClass('icon')[0];
            } else {
                return $(this).removeClass().addClass('icon pass')[0];
            }
        }
    });
    prefix.add(sm.jqa().addClass('icon pass'));
    $.each(filearr.folders,function(i,v){
        tjq.append(God.tree.jqnewitem(v,'folder',{'path':basepath+v+'/','type':'folder'},prefix.clone().add(sm.jqa().addClass('icon close'))));
    });
    $.each(filearr.files,function(i,v){
        tjq.append(God.tree.jqnewitem(v,'file',{'path':basepath+v,'type':'file'},prefix.clone().add(sm.jqa().addClass('icon none'))));
    });
    tjq.children('li:last').children('a:last').prev().prev().addClass('bottom');
    $(node).after(tjq.html());
    return this;
};
God.tree.openfolder=function(node){
  // alert($(node).closest('li').html());
    var basepath=$(node).closest('li').children('a:last').attr('path');
    $(node).closest('li').children('a.close').removeClass('close').addClass('open');
    $(node).closest('li').nextAll().find('a[path^="'+basepath+'"]').closest('li').map(function(){
        var curpath=$(this).children('a:last').attr('path');
        curpath=curpath.replace(/\/$/,'');
        if(curpath.match(/\//g).length===basepath.match(/\//g).length){
            $(this).show().children('a.open').closest('li').map(function(){
                God.tree.openfolder(this);
            });
        }
    });
};
God.tree.closefolder=function(node){
   // alert($(node).closest('li').html());
    var basepath=$(node).closest('li').children('a:last').attr('path');
    $(node).closest('li').children('a.open').removeClass('open').addClass('close');
    $(node).closest('li').nextAll().find('a[path^="'+basepath+'"]').closest('li').hide();
};
God.tree.jqnewitem=function(txt,type,extraprop,prefix){
    txt=arguments[0]?txt:'';
    type=arguments[1]?type:'file';
    extraprop=arguments[2]?extraprop:{};
    prefix=arguments[3]?prefix:'';
    return sm.jqli().append(sm.jqa().addClass('item').html(txt).attr(extraprop)).prepend(sm.jqa().addClass('icon').addClass(type)).prepend(prefix);
};
God.tree.clear=function(){
    this.jq().children('ul.tree').html('');
    return this;
};
God.tree.addproject=function(name,path){
    this.jq().children('ul.tree').append(God.tree.jqnewitem(name,'project',{'type':'project','path':path},sm.jqa().addClass('icon project close')));
    return this;
};
God.tree.evtselect=function(){
    $(this).closest('ul.tree').find('li>a.item').removeClass('selected');
    $(this).addClass('selected');
};
