//compbar组件设计--开始
God.compbar={__proto__:sm,whoami:'God.compbar'};//全局Compbar
sm.compbar={__proto__:God.compbar,whoami:'sm.compbar'};
God.compbar.selector='div.compbar';
God.compbar.defaultselector='div.compbar';
God.compbar.clear=function(){
    this.jq().find('ul.topmenue li:not([noclear])').remove();
    return this;
};

//中间过程，目的是按要求生成相关的HTML代码-开始
if(true){
God.compbar.jqsubul=function(){return $('<ul class="dynamic submenue"></ul>');};
God.compbar.jqli=function(){return $('<li class="dynamic"></li>');};
God.compbar.jqa=function(){return $('<a class="dynamic"></a>');};
}
//中间过程，目的是按要求生成相关的HTML代码-结束

God.compbar._para={"path":null,"txt":null,"icon":null,"right":null,"id":null,};
God.compbar.item=function(content){
    if(!content){
        return "";
    }
    var op=this.para(content);
    //alert(JSON.stringify(op));
        //return this.jqsubul().append(this.jqli().append(this.jqa().html(name).attr('path','menue/'+name)));
        //return '<ul class="dynamic"><li class="dynamic"><a>'+name+'</a></li></ul>';
    var aclass="";
    (op.icon)&&(aclass=aclass+" button "+op.icon);
    (!op.txt)&&(op.icon)&&(aclass=aclass+" icon ");
    var liclass="";
    (op.right)&&(liclass="right");
    var txt="";
    (op.txt)&&(txt=op.txt);
    (!op.icon)&&(!op.txt)&&(txt=op.path);
    //return this.jqli().addClass(liclass).append(this.jqa().addClass(aclass).html(txt).attr('path',op.path));
    aa=this.jqli().addClass(liclass).append(this.jqa().addClass(aclass).html(txt).attr('path',op.path));
    //alert(aa.html());
    return aa;

        //return '<li class="dynamic"><a>'+name+'</a></li>';
};

God.compbar.jqitems=function(list){
    (typeof list==='string')&&(list=[list]); 
    var jqt=$();
    var me=this;
    $.each(list,function(i,v){
        var jqtt=me.jq().find('a[path="'+v+'"]');
        if(jqtt.length<1){
            
        } else if(jqt===null){
            jqt=jqtt;
        } else {
            jqt=jqt.add(jqtt);
        }
    });
    return jqt;
};
God.compbar.delitems=function(contents){
    contents&&(typeof contents=="string")&&(contents=[contents]);
    this.jqitems(contents).remove();
    return this;
}
God.compbar.additems=function(parentmenue,contents){
    (typeof contents === "string")&&(contents=[contents]);
    var me=this;
    if(parentmenue){
        //add to child menue
        var jqt=this.jqitems(parentmenue);
        if (jqt.length){
            jqt=jqt.parent("li");
        } else {
        	alert(0);
            this.additems(null,parentmenue);
            jqt=this.jqitems(parentmenue).parent("li");
        }
        if(jqt.children('ul.submenue').length){
            jqt=jqt.children('ul.submenue');
        } else {
            jqt=jqt.append('<ul class="submenue dynamic"></ul>').children('ul.submenue');
        }
        
        arguments[1]&&$.each(contents,function(i,v){
        
            jqt.append(me.item(v));
        });
    } else {
        // add to top menue
        var jqt=$('#compbar>ul.topmenue>li:last');
        arguments[1]&&$.each(contents,function(i,v){
            jqt.after(me.item(v));
        });
    }
    return this;
}

//compbar组件设计--结束