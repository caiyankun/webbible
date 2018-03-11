//Form组件--开始
God.form={__proto__:sm,whoami:'God.form'};
sm.form={__proto__:God.form,whoami:'sm.form'};
God.form.selector='div.form';
God.form.defaultselector='div.form';

God.form.clear=function(){
	this.jq().find('.auto.post').each(function(){
	        if($(this).hasClass('checkbox')){
	        } else {
	            $(this).val('');
	        }
        });
}
God.form.ajaxpost=function(url,extradata){
	postdata={};
	var me=this;
	this.jq().find('.auto.post').each(function(){
	        if($(this).hasClass('checkbox')){
	           postdata[$(this).attr('id')]= $(this).is(':checked');
	        } else {
	            postdata[$(this).attr('id')]=$(this).val();
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
            me=sm.ajax.url(url).post(postdata);
        });
        //alert(this._error);
	    //postdata['keeplogin']?postdata['keeplogin']=60*60*24*14:postdata['keeplogin']=0;
	    
	return me;
}

God.form._itemmodels={
    "text":"<ul class='formitem'><li>{tip}</li><li><input type ='text' class='auto post smmain' /></li></ul>",
    "password":"<ul class='formitem'><li>{tip}</li><li><input type ='password'  class='auto post smmain' /></li></ul>",
    "vericode":"<ul class='formitem'><li>{tip}</li><li><input type='text' class='half auto post smmain'/><img src='/captcha.html' id='vericodeimg' alt='captcha' onclick=\"this.src=this.src+'?' + Math.random();\" /></li></ul>",
    "checkbox":"<ul class='formitem'> <li></li> <li style='text-align: left;'><input title='{tip}' id='remember' value='1' type='checkbox' class='auto post checkbox'> <label for='remember' title=''>{tip}</label> </li></ul>"
};



//Form组件--结束