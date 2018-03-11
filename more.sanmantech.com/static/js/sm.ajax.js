//ajax组件设计--开始

//这是为什么呢

God.ajax={__proto__:sm,whoami:'God.ajax'};
sm.ajax={__proto__:God.ajax,whoami:'sm.ajax'};
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
    alert(stat);
    this.logerror(xhr.readyState,stat);
    return this;
}
God.ajax.post=function(data){
    this._setup.data=data;
    this._setup.type="POST";
    $.ajax(this._setup);
    return this;
}
God.ajax.get=function(data){
    this._setup.data=data;
    this._setup.type="GET";
    $.ajax(this._setup);
    return this;
}
God.ajax._setup={type:'POST',url:'',async:false,success:sm.ajax.callback_success,error:sm.ajax.callback_error ,data:{},context:sm.ajax};
//ajax组件设计--结束