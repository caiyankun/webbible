!window.onerror&&(window.onerror=function(m,u,l){alert ("【JS加载出错】:\r\n【文件】:"+u+"\r\n【行】:"+l+"\r\n【信息】:"+m);});



if(God.coms("toolbar")){
God.toolbar.itemmodels({
    commodel:{
        model:'<div class="toolbar ui-widget-header ui-corner-all"></div>',
    },
    text:{
        model:'<button path="{name}">{name}</button>',
        grammar:{name:"button",primary:"",secondary:"",float:"left"},
        func:function(){
            p=arguments;
            this.each(function(i){
                icons={};
                if(p[i].primary!==""){
                    icons.primary=p[i].primary;
                }
                if(p[i].secondary!==""){
                    icons.secondary=p[i].secondary;
                }
                //alert(JSON.stringify({icons:icons}));
                icons&&($(this).button({icons:icons}));
            });
            if(p[0].float==="right"){
                return this.wrapAll("<div></div>").parent().css("float","right");
            } else {
                return this.wrapAll("<div></div>").parent().css("display","inline-block");
            }
            
        },
        delaycall:function(){
            this.buttonset().after('<span class="ui-button-icon-space"> </span>');
            //this.buttonset();
        },
    },
    icon:{
        model:'<button path="{icon}">{icon}</button>',
        grammar:{icon:"图标",float:"left"},
        func:function(){
            p=arguments;
            this.each(function(i){
                $(this).button({text:false,icons:{primary:p[i].icon}});
            });
            if(p[0].float==="right"){
                return this.wrapAll("<div></div>").parent().css("float","right");
            } else {
                return this.wrapAll("<div></div>").parent().css("display","inline-block");
            }
        },
        delaycall:function(){
            this.buttonset().after('<span class="ui-button-icon-space"> </span>');
            //this.buttonset();
        },
    },
    combutton:{
        model:'<button>{name}</button>',
        grammar:{name:"按钮",primary:"",secondary:"",float:"left"},
        func:function(){
            p=arguments;
            this.each(function(i){
                icons={};
                if(p[i].primary!==""){
                    icons.primary=p[i].primary;
                }
                if(p[i].secondary!==""){
                    icons.secondary=p[i].secondary;
                }
                //alert(JSON.stringify({icons:icons}));
                icons&&($(this).button({icons:icons}));
            });
            
            trso=$(this).add($("<button>Hide</button>").button({text:false,icons:{secondary:"ui-icon-triangle-1-s"}})).wrapAll("<div></div>").parent();
            if(p[0].float==="right"){
                return trso.css("float","right");
            } else {
                return trso.css("display","inline-block");
            }
        },
        delaycall:function(){
            this.buttonset().after('<span class="ui-button-icon-space"> </span>');
            //this.buttonset();
        },
    },
    mixed:{
        model:'<button>{text}</button>',
        grammar:{text:"混合",lefticon:"",righticon:"",type:"text",float:"left"},
        func:function(){
            p=arguments;
            this.each(function(i){
                _setup={
                    text:p[i].type=="icononly"?false:true,
                    icons:{
                        primary:p[i].lefticon,
                        secondary:p[i].righticon,
                    }
                };
                $(this).button(_setup);
            });
            if(p[0].float==="right"){
                return this.wrapAll("<div></div>").parent().css("float","right");
            } else {
                return this.wrapAll("<div></div>").parent().css("display","inline-block");
            }
        },
        delaycall:function(){
            this.buttonset().after('<span class="ui-button-icon-space"> </span>');
            //this.buttonset();
        },
    },
    radio:{
        model:'<input type="radio" id="{id}"><label for="{id}">{info}</label>',
        grammar:{info:"切换",name:"radio",dis:"0",id:"rndid",float:"left"},
        func:function(p){
            this.filter("input").attr("name",p.name);
           if(p.dis!=="0"){this.filter("input").button();}
           if(p[0].float==="right"){
                return this.wrapAll("<div></div>").parent().css("float","right");
            } else {
                return this.wrapAll("<div></div>").parent().css("display","inline-block");
            }
        },
        delaycall:function(){
            this.buttonset().after('<span class="ui-button-icon-space"> </span>');
            //this.buttonset();
        },
    },
    checkbox:{
        model:'<input type="checkbox" id="{id}"><label for={id}>{info}</label>',
        grammar:{info:"切换",dis:"0",id:"rndid",float:"left"},
        func:function(p){
            if(p.dis!=="0"){this.filter("input").button();}
            if(p[0].float==="right"){
                return this.wrapAll("<div></div>").parent().css("float","right");
            } else {
                return this.wrapAll("<div></div>").parent().css("display","inline-block");
            }
        },
        delaycall:function(){
            this.buttonset().after('<span class="ui-button-icon-space"> </span>');
        },
    },
});
    
}


if(God.coms("tabs")){
    God.tabs.itemmodels({
        commodel:{
            model:"<div class='tabs' container='tabbody'><ul container='tabtitle'></ul></div>",
            delaycall:function(){
                this.tabs();
                //alert(this.attr("id"));
                //this.closest("div.tabs");
                sm.tabs.tocontain(this).eventmap("mouseenter.init","li[filler]","filler",{
                    tabtitle:function(e){
                        //alert(sm.tabs.jqnewitems("tmp_close").outerhtml());
                        //alert($(e).outerhtml());
                        //alert(this.selector);
                        $(e).append(sm.tabs.jqnewitems("tmp_close"));
                    },
                }).eventmap("mouseleave.init","li[filler]","filler",{
                    tabtitle:function(){
                        //alert("why");
                        this.jq().find(".ui-icon-close").remove();
                    },
                });
                return this;
            },
        },
        tmp_close:{model:"<span style='position:absolute;z-index:101;right:0px;' onclick='sm.tabs.closeme(this);' class='ui-icon ui-icon-close' role='presentation'>关闭</span>"},
        defaulttab:{
            model:"<li path ='{label}' filler='tabtitle'><a href='#{id}'>{label}</a> <span class='ui-icon ui-icon-close' role='presentation'>关闭</span></li><div filler='tabbody' container='tabbodycontent' id='{id}'>{id}{bodycontent}</div>",
            model:"<li path ='{label}' filler='tabtitle'><a href='#{id}'>{label}</a></li><div filler='tabbody' container='tabbodycontent' id='{id}'>{id}{bodycontent}</div>",
            grammar:{label:"标签",bodycontent:"页面内容",id:"rndid"},
            func:function(p){
                //alert(this.outerhtml());
                //alert(this.outerhtml());
                return this;
            },
        },
    });
    God.tabs.refresh=function(){
        this.toid().jq().tabs('refresh');
    };
    God.tabs.closeme=function(e){
        curtabs=sm.tabs.tocontain(e);
        title=$(e).closest("li[filler]");
        bodyid=title.children("a").attr('href');
        //alert();
        $(bodyid).remove();
        title.remove();
        if(""===curtabs.curtab()){
            curtabs.showlasttab();
        }
        //
        //alert($(e).outerhtml());
    };
    God.tabs.showlasttab=function(){
        this.jq().find("li[filler] a:last").click();
        return this;
    };
    God.tabs.showtabbypath=function(path){
        this.jq().find("li[path='"+path+"'] a").click();
        return this;
    };
    God.tabs.showtabbysn=function(sn){
        this.jq().find("li[filler] a:eq("+sn+")").click();
        return this;
    };
    God.tabs.curtab=function(){
        curtext="";
        me=this;
        this.jq().find("div[filler='tabbody']:visible").safedo(function(){
            curtext=me.jq().find("a[href='#"+this.attr("id")+"']").closest("li").attr("path");
            //alert(curtext);
        });
        return curtext;
    };
    God.tabs.jqcurbody=function(){
        return this.jq().find("div[filler='tabbody']:visible");
    };
    God.tabs.jqcurtitle=function(){
        curtitle=$("#_empty_jq");
        me=this;
        this.jq().find("div[filler='tabbody']:visible").safedo(function(){
            curtitle=me.jq().find("a[href='#"+this.attr("id")+"']").closest("li");
            //alert(curtext);
        });
        return curtitle;
    };
    God.tabs.changecurtabname=function(newname){
        this.jqcurtitle().safedo(function(){
            this.attr("path",newname);
            this.children("a").innertext(newname);
        });
        return this;
    };
    God.tabs.addtab=function(tabname,body){
        !arguments[0]&&(tabname=$$.rndid("tab"));
        this.additems("defaulttab",tabname);
        this.jq().tabs("refresh");
        this.showlasttab();
        if(!arguments[1]){
           body="";
        }
         this.jqcurbody().html(body);
        return this;
    };
}

if(God.coms("form")){
God.form.itemmodels({
    commodel:{
        model:'<div class="form" style="margin-top:20px"><fieldset align="center" style=""><legend align="left">表单</legend><table container="input" align="center"></table><div class="validtip"></div><hr><div container="button" class="buttonset"><button path="提交">提交</button><button path="重置">重置</button></div></fieldset></div>',
        delaycall:function(){
            $(this).find("div.buttonset").buttonset();
        },
    },
    textinput:{
        model:'<tr filler="input" path="{id}"><td>{label}</td><td><input class="autopost" id="{id}" type="text"></input></td></tr>',
        grammar:{id:"rndid",label:"文本"},
    },
    password:{
        model:'<tr filler="input" path="{id}"><td>{label}</td><td><input class="autopost" id="{id}" type="password"></input></td></tr>',
        grammar:{id:"rndid",label:"密码"},
    },
    vericode:{
        model:'<tr filler="input" path="{id}"><td>{label}</td><td><input class="autopost" id="{id}" type="text" style="width:60px"></input><img style="vertical-align: bottom;" src="/captcha/entry.func" class="vericode" alt="captcha" onclick="this.src=this.src+\'?\' + Math.random();" /></td></tr>',
        grammar:{id:"rndid",label:"验证码"},
    },
    checkbox:{
        model:'<tr filler="input" path="{id}"><td>{label}</td><td><div class="buttonset"><input type="checkbox" class="autopost" id="{id}"><label for="{id}">{label2}</label></input></div></td></tr>',
        grammar:{id:"rndid",label:"选择",label2:"是/否"},
    },
    
    
});
God.form.title=function(t){
    this.jq().find("legend").html(t);
    return this;
};
God.form.tipinfo=function(info){
    this.jq().find("div.validtip").html(sm.models.jqnewitems("highlight",info));
    return this;
};
God.form.refreshvericode=function(){
    this.jq().find(".vericode").click();
    return this;
};
God.form.clear=function(){
	var me=this;
	this.jq().find('.autopost').each(function(){
	        if($(this).attr("type")=="checkbox"){
	            //$(this).is(':checked');
	        } else {
	            $(this).val("");
	        }
        });
};
God.form._by="id";
God.form.by=function(attr){this._by=attr;return this;};
God.form.ajaxpost=function(url,extradata){
	postdata={};
	var me=this;
	by=this._by;
	this.jq().find('.autopost').each(function(){
	        if($(this).attr("type")=="checkbox"){
	           postdata[$(this).attr(by)]= $(this).is(':checked');
	        } else {
	            postdata[$(this).attr(by)]=$(this).val();
	        }
        });
        arguments[1]&&$.each(extradata,function(k,v){
           postdata[k]=v;
        });
        //alert(JSON.stringify(postdata));
        //alert(JSON.stringify(this._datarules));
        //alert(this.whoami);
        //alert(this._error);
        var me=this;
        
        this.clearstat().validdata(postdata).success(function(){
            mee=sm.ajax.url(url).clearstat().post(postdata);
            return this;
        }).error(function(){
            mee=sm.ajax.clearstat().logerror(me._error,me._info);
            return this;
        });  
	return mee;
}
God.form.buttons=function(buttons){
    jqbtns=$("#blank_jq");
    me=this;
    
    $.each(buttons,function(k,v){
        jqbtns=jqbtns.add($("<button></button>").attr("path",k).html(k).click(v));
    });
    this.jq().find("div[container='button']").empty().append(jqbtns);
    return this;
};

}

if(God.coms("ajax")){
    
God.ajax.url=function (newurl){this._setup.url=newurl;return this;}
God.ajax.async=function (asyncv){this._setup.async=asyncv;return this;}
God.ajax.callback_success=function (data,stat,xhr){
    
    try {
       rsobj=JSON.parse(data);
    } catch(err) {
       this.logsuccess(data,stat);
       return this;
    }
    if($$.isobj(rsobj)&&(typeof rsobj.error!=="undefined")&&(rsobj.error>0)){
        this.logerror(rsobj.error,rsobj.info);
        return this;
    } else {
        this.logsuccess(rsobj,stat);
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
		$("div.auto.dialog:visible").dialog("close");
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

if(God.coms("models")){
God.models.itemmodels({
    highlight:{
        model:'<div class="ui-state-highlight ui-corner-all" style="margin-top: 20px; padding: 0 .7em;"><p><span class="ui-icon ui-icon-info" style="float: left; margin-right: .3em;"></span>{info}</p></div>',
        grammar:{info:"注意！"},
    },
    error:{
        model:'<div class="ui-widget"><div class="ui-state-error ui-corner-all" style="padding: 0 .7em;"><p><span class="ui-icon ui-icon-alert" style="float: left; margin-right: .3em;"></span>{info}</p></div></div>',
        grammar:{info:"发生错误！"},
    },
});
    

}

if(God.coms("dialog")){
    
God.dialog._setup={
        show: { effect: "blind", duration: 300 },
        modal:true,
	autoOpen: false,
	width: 400,
	buttons: [
		{
			text: "Ok",
			click: function() {
				$( this ).dialog( "close" );
			}
		},
		{
			text: "Cancel",
			click: function() {
				$( this ).dialog( "close" );
			}
		}
	]
};
God.dialog.itemmodels({
    dialog:{
        model:'<div title="{title}" class="dialog auto"></div>',
        grammar:{info:"请确认!",title:"请确认！"},
    },
});
God.dialog.show=function(title,info,funcmap){
    //组装button语句
    options=$$.copyobj(this._setup);
    //alert(JSON.stringify(options));
    buttons=[];
    me=this;
    if(arguments[2]){
        $.each(funcmap,function(k,v){
            //alert(k);
            buttons.push({
                text:k,
                click:function(){
                    $( this ).dialog( "close" );
                    v.apply(me,[this]);
                },
            });
        });
        options["buttons"]=buttons;
    }
    //alert(JSON.stringify(options));
    this.jqnewitems("dialog",title).append(info).dialog(options).dialog("open");
};





}

if(God.coms("floatmenue")){
God.floatmenue.itemmodels({
    commodel:{
        model:'<div class="floatmenue" ><ul style="position:absolute;display:none;z-index:110" container="menue" class="ui-corner-all"></ul></div>',
        delaycall:function(){
            //this.children("ul").menu();
        },
    },
    menue:{
        model:'<li filler="menue" path="{text}"><div>{text}</div></li>',
        grammar:{text:"rndid"},
    },
});
God.floatmenue.beforeshow=function(){
    return this;
}
God.floatmenue.show=function(position){
    $(this.selector).children("ul").safedo(function(){
        this.show().position(position);
        menue=this;
        $(document).one("click",function(){
            menue.hide();
        });
    });
    return this;
}
God.floatmenue.onclickmenue=function(e,u){
    //alert($(u.item).outerhtml());
    return this;
};
God.floatmenue.showallitems=function(){
    this.jq().find("li:hidden").show();
    return this;
};
God.floatmenue.hideitems=function(list){
    this.showallitems();
    me=this;
    $.each(list,function(i,v){
        me.jq().find("li[path='"+v+"']").hide();
    });
    return this;
}
God.floatmenue.createmenue=function(menues,newid){
    subitems=$("#blank_jqery");
   
    me=this;
    //alert(JSON.stringify(menues));
    $.each(menues,function(k,v){
        if($$.isobj(v)){
            subitems=subitems.add($("<li></li>").attr("path",k).append($("<div></div>").html(k)).append(me.createmenue(v).wrapAll("<ul></ul>").parent()));
        } else {

            subitems=subitems.add(me.jqnewitems("menue",k).click(v));

        }
    });
    if(arguments[1]){
        $("#"+newid).remove();
        jqitems=this.jqcommodel(newid);
        jqitems.children("ul").append(subitems);
        $("body").append(jqitems);
        jqitems.children("ul").menu();
        jqitems.children("ul").on("menuselect",me.onclickmenue);
        return jqitems;
        
    } else {
        return subitems;
    }
}
}


if(God.coms("accordion")){
God.accordion.itemmodels({
    simple:{
        model:'<h3 path="{title}">{title}</h3><div>{info}</div>',
        grammar:{title:"rndid",info:""},
    },
    commodel:{
        model:'<div class="accordion"></div>',
        delaycall:function(){
            this.accordion();
        },
    },
});    
God.accordion.add=function(title,content){
    newitem=this.jqnewitems("simple",title);
    newitem.filter("div").append(content);
    this.jq().append(newitem).accordion("refresh");
    return this;
};
}


if(God.coms("mobilepage")){

God.mobilepage.selector="div[data-role='page']";
God.mobilepage.defaultselector="div[data-role='page']";

God.mobilepage.itemmodels({
    commodel:{
        model:'<div data-role="page" data-theme="b"><div container="header" data-role="header" data-position="fixed"></div><div container="content" data-role="content"></div><div container="footer" data-role="footer" data-position="fixed"></div></div>',
    },
    header:{
        model:'<h1 filler="header">{text}</h1>',
        grammar:{text:"标题"},
    },
    footer:{
        model:'<h1 filler="footer">{text}</h1>',
        grammar:{text:"页脚"},
    },
    content:{
        model:'<p filler="content">{text}</p>',
        grammar:{text:"内容"},
    },
    button:{
        model:'<a href="{link}" data-role="button" {data-icon="search" data-iconpos="left"} class="ui-btn-right">{name}</a>',
        model:'<a href="{link}" data-role="button" {dataicon}>{name}</a>',
        grammar:{name:"按钮",link:"#",dataicon:''},
        func:function(){
            this.filter("[href='#goback']").attr("data-rel","back");
            return this;
        },
    },
    buttonset:{
        model:'<a href="{link}" data-role="button" {dataicon}>{name}</a>',
        grammar:{name:"按钮",link:"#",dataicon:"","data-type":"horizontal"},
        func:function(p){
            this.filter("[href='#goback']").attr("data-rel","back");
            return $('<div data-role="controlgroup" data-type="'+p["data-type"]+'"></div>').append(this);
        },
    },
    navibar:{
        model:'<li><a href="{link}" class="ui-btn-active ui-state-persist">{name}</a></li>',
        model:'<li><a href="{link}" {extra}>{name}</a></li>',
        grammar:{name:"按钮",link:"#",extra:"","data-type":"horizontal"},
        func:function(p){
            this.filter("[href='#goback']").attr("data-rel","back");
            return $('<div data-role="navbar"></div>').append($("<ul></ul>").append(this));
        },
    },
    accordion:{
        model:'',
        model:'<h1>{name}</h1><div>{content}</div>',
        grammar:{name:"按钮",content:"#",collapsed:"false"},
        func:function(p){
            this.filter("[href='#goback']").attr("data-rel","back");
            return $('<div data-role="collapsible" data-collapsed="'+p["collapsed"]+'"></div>').append(this);
        },
    },
    listview:{
        model:'',
        model:'<li><a href="{link}" path="{text}" num="{num}">{text}<span class="ui-li-count">{num}</span></a></li>',
        grammar:{text:"List",num:"0",link:"#"},
        func:function(p){
            return $('<ul data-role="listview" data-inset="true" data-filter="true" data-filter-placeholder="搜索...."></ul>').append(this);
        },
        delaycall:function(){
        	$(this).listview().trigger( "updatelayout");
        },
    },
    precontent:{
        
        model:'<h2 class="current content" path="{id}">{title}</h2><p>{content}</p>',
        model:'<div title="{title}" path="{id}">{content}</div>',
        model:'<pre contenteditable="true" title="{title}" path="{id}">{content}</pre>',
        grammar:{id:"rndid",title:"rndid",content:"#"},
        delaycall:function(){
		//alert(1);
        	$(this).preeditor();
        	//alert($(this).preeditor);
        	//alert(2);
        },

    },
    
    
    
});
God.mobilepage.addheader=function(type,arrays){
	//$(this.selector+" [data-role='header']").showme();
	$(this.selector+" [data-role='header']").additems(type,arrays);
	return this;
};
God.mobilepage.addfooter=function(type,arrays){  
	$(this.selector+" [data-role='footer']").additems(type,arrays);
	return this;
};
God.mobilepage.addcontent=function(type,arrays){  
	$(this.selector+" [data-role='content']").additems(type,arrays);
	return this;
};

    
}

if(God.coms("datasource")){
    
    
}

God.coms("dataexchange").extend({
    define:function(dename,defnation){
    	God.dataexchange[dename]=function(paras,url){
    		!arguments[0]&&(paras={});
    		!arguments[1]&&(url="#");
    		if(defnation.hasOwnProperty("subdata")){
    			$$.merge.apply(paras,[defnation.subdata]);
    		}
    		//上面是组装了参数,下面组装URL
    		!arguments[1]&&(defnation.hasOwnProperty("url"))&&(url=defnation.url);
    		//开始执行代码！
    		sm.ajax.url(url).post(paras).success(function(){
    			if(defnation.hasOwnProperty("success")){
	    			defnation.success();
	    		}
	    		alert("post ok!");
    		}).error(function(){
    			if(defnation.hasOwnProperty("fail")){
	    			defnation.fail();
	    		}
	    		alert("post fail!");
    		
    		});
    		

    		return this;
    	}
    	return this;
    },
    
});
