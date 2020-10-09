Calendar={
    tasklist:[],
    taskplantlist:[],
    taskloglist:[],
    timediff:function(time1,time2,bywhat="day"){
        var oy=time1.getFullYear();
        var ny=time2.getFullYear();
        var om=time1.getMonth();
        var nm=time2.getMonth();
        if(bywhat==="month"){
            return (ny-oy)*12+(nm-om);
        } else if (bywhat==="year"){
            return ny-oy;
        } else {
            return (time2.getTime()-time1.getTime())/1000/60/60/24;
        }
    },
    firstdateofmonth:function(time){
        var y=time.getFullYear();
        var m=time.getMonth()+1;
        return new Date(y+"/"+m+"/01");
    },
    timeadd:function(time,value,bywhat="day"){
        var oy=time.getFullYear();
        var om=time.getMonth();
        var od=time.getDate();
        if(bywhat==="month"){
            if(value>0){
                ny=oy+Math.floor((om+value)/12);
                nm=(om+value)%12+1;
            } else {
                ny=oy+Math.floor((om+value)/12);
                nm=12+(om+value)%12+1;
            }
        } else if (bywhat==="year"){
            ny=oy+value;
            nm=om+1;
        } else {
            return new Date(time.getTime()+value*1000*60*60*24);
        }
        return new Date(ny+"/"+nm+"/"+od);
    },
    lastdateofmonth:function(time){
        return this.timeadd(this.timeadd(this.firstdateofmonth(time),1,"month"),-1,"day");
    },
    curdate10:function(datevar){
        var t=new Date();  
        if(datevar){
          t.setTime(datevar);
        } 
        var tm="0"+(t.getMonth()+1);
        var td="0"+t.getDate();
        (tm.length>2)&&(tm=(t.getMonth()+1));
        (td.length>2 )&& (td=t.getDate());
        var tstr=t.getFullYear()+"/"+tm+"/"+td;
        return tstr;
    },
    random8:function(){
        var bid=10000000;
        bid=bid*Math.random()+bid;
        bid=parseInt(bid).toString();
        return bid;
    } ,
    
    
    
    task:function(category,name,activedate="",deactivedate="",id=""){
        ///////
        var tstr=Calendar.curdate10();
        var bid=Calendar.random8();
        if(id===""){
            
            this.id=bid+tstr;
        } else {
            this.id=id;
        }
        this.category=category;
        this.name=name;
        this.createdate=tstr;
        this.activedate=(activedate==="")?this.createdate:activedate;
        (deactivedate==="")&&(deactivedate="2100/01/01");
        this.deactivedate=deactivedate;//这个字段不能为空，规则：给服务器一个日期，返回的是：deactivedate>=该日期；activedate<=该日期的列表
        this.result="";//可选的结果：空(on-going)，complete，giveup，NA
        this.touchdate="";//如果这个日期在当前日期的前一天，属于正常，每早一天说明又多一天没有碰（严重，变红）；如果日期为空或者跟当前时间一样，说明今天处理过了，但还没处理完（持续）；如果日期比今天大，说明推迟处理了（变灰）
    },
    taskplant:function(category,name,rule,activedate){
        ///////
        var tstr=Calendar.curdate10();
        var bid=Calendar.random8();
        ///////
      this.id=bid+tstr;
      this.category=category;
      this.name=name;
      this.createdate=tstr;
      this.activedate=(activedate==="")?this.createdate:activedate;
      this.rule=rule;
      this.fruiteddate="";
    },
    tasklog:function(id,guide,logs){
        this.id=id;
        this.guide=guide;
        this.logs=logs;
    },
    findtask:function(id){
        for(var i in Calendar.tasklist){
            if(Calendar.tasklist[i].id===id){return Calendar.tasklist[i];}
        }
    },
    deletetask:function(id="",startdate=""){
        if(id===""){Calendar.tasklist=[]; return this;}
        var maxnum=Calendar.tasklist.length;
        for(var i=maxnum-1;i>=0;i--){
            if(Calendar.tasklist[i].id.substr(0,18)===id){
                if(startdate===""){
                    Calendar.tasklist.splice(i,1);
                } else {
                    if(Calendar.tasklist[i].activedate>=startdate){
                        Calendar.tasklist.splice(i,1);
                    }
                }
                
            }
        }
    },
    deletetaskplant:function(id="",startdate=""){
        if(id===""){Calendar.taskplantlist=[]; return this;}
        var maxnum=Calendar.taskplantlist.length;
        for(var i=maxnum-1;i>=0;i--){
            if(Calendar.taskplantlist[i].id===id){
                if(startdate===""){
                    Calendar.taskplantlist.splice(i,1);
                } else {
                    if(Calendar.taskplantlist[i].activedate>=startdate){
                        Calendar.taskplantlist.splice(i,1);
                    }
                }
                
            }
        }
    },
    findtaskplant:function(id){
        for(var i in Calendar.taskplantlist){
            if(Calendar.taskplantlist[i].id===id){return Calendar.taskplantlist[i];}
        }
    },
    findlog:function(id){
        id=id.substr(0,18);
        for(var i in Calendar.taskloglist){
            if(Calendar.taskloglist[i].id===id){return Calendar.taskloglist[i];}
        }
    },
    updatetask:function(o){
        for(var i in Calendar.tasklist){
            if(Calendar.tasklist[i].id===o.id){
                var tn=Calendar.tasklist[i];
                $$.safemerge.apply(tn,[o]);
                Calendar.tasklist.splice(i,1,tn);
            }
        }
    },
     updatetaskplant:function(o){
        for(var i in Calendar.taskplantlist){
            if(Calendar.taskplantlist[i].id===o.id){
                //console.log(o);
                //console.log(Calendar.taskplantlist[i]);
                $$.safemerge.apply(Calendar.taskplantlist[i],[o]);
            }
        }
    },
    
    newtask:function(category,name,activedate="",deactivedate="",guide="",id=""){
        var nt=new this.task(category,name,activedate,deactivedate,id);
        this.tasklist.push(nt);
        //if(guide==="reuseguide"){return nt;}
        var ntl=new this.tasklog(nt.id.substr(0,18),guide,this.curdate10()+":创建任务");
        this.taskloglist.push(ntl);
        return nt;
    },
    newtaskplant:function(category,name,rule="",activedate="",guide=""){
        var ntp=new this.taskplant(category,name,rule,activedate);
        this.taskplantlist.push(ntp);
        var ntpl=new this.tasklog(ntp.id.substr(0,18),guide,this.curdate10()+":创建任务树");
        this.taskloglist.push(ntpl);
        return ntp;
    },
    fruiting:function(){
        var rs=[];
        for (var k in this.taskplantlist){
            rs=rs.concat(this.fruitingbytp(this.taskplantlist[k]));
        }
        return rs;
    },
    fruitingbytp:function(tp){
        //sdate=new Date(tp.activedate);
        var fruiteddate=new Date(tp.fruiteddate);
        var rules=tp.rule;
        var cdate=new Date();
        var sdate=new Date();
        
        if(fruiteddate.getFullYear()>=sdate.getFullYear()){return [];}//如果已经执行过了，就不用重复执行了！
        
        var edate=new Date(sdate.getFullYear()+"/12/31");
        var days=(edate-sdate)/1000/60/60/24;
        var haserror=false;
        var matcheddate=[];
        var adjusttitle=[];
        var validdate=false;
        var taskname=tp.name;
        var paras=[];
        for (i=0;i<=days;i++){
            cdate.setTime(sdate.getTime()+i*1000*60*60*24);
            validdate=false;
            haserror=false;
            paras=[];
            try {
            //------
            //console.log(cdate.toString());
            //if(cdate.getDay()==1){validdate=true;}/*每周一*/
            //if(cdate.getDate()==1){validdate=true;}/*每月1号*/
            //if(cdate.getDay()==1 && cdate.getDate()<7){validdate=true;}/*每个月第一个周一*/
            //if(cdate.getDay()==6 && timediff(cdate,lastdateofmonth(cdate))<7){validdate=true;}/*每个月最后一个周六*/
            //paras=[cdate.getMonth()+1,cdate.getDate,cdate.getDay];//把当前的月份，日期，周递传递给标题进行显示
            eval(rules);
            
            //--------
            } catch (e) {
                haserror=true;
            }
            if(!haserror && validdate){
                matcheddate.push(this.curdate10(cdate));
                adjusttitle.push(this.updatetaskplantname(taskname,paras));
            }
        }
        //具体执行新增
        //console.log(matcheddate);
        var rs=[];
        for (var k in matcheddate){
            rs.push(this.newtask(tp.category,adjusttitle[k],matcheddate[k],"","",tp.id+matcheddate[k]));
        }
        return rs;
    },
    updatetaskplantname:function(tpname,paras){
        var rstitle=tpname;
        for(var k in paras) {
            rstitle=rstitle.replace("--"+k+"--",paras[k]);
        }
        return rstitle;
    },
    updatelog:function(tid,guide,log,addon=true){
        tid=tid.substr(0,18);
        var alreadyhave=false;
        for (var k in this.taskloglist){
            if(this.taskloglist[k].id===tid){
                this.taskloglist[k].guide=guide;
                if(addon){
                    this.taskloglist[k].logs=Calendar.curdate10()+":"+log+"\r\n"+ this.taskloglist[k].logs;
                } else {
                    this.taskloglist[k].logs=log;
                }
                
                alreadyhave=true;
            }
        }
        if(!alreadyhave){
            this.taskloglist.push(new this.tasklog(tid,guide,log));
        }
    },
    cleartask:function(tid){
        var maxcount=this.tasklist.length;
        for (var i=maxcount-1;i>=0;i--){
            if(this.tasklist[i].id.substr(0,18)===tid){
                this.tasklist.splice(i,1);
            }
        }
    },
    cleartasklog:function(tid){
        var maxcount=this.taskloglist.length;
        for (var i=maxcount;i>0;i--){
            if(this.taskloglist[i].id.substr(0,18)===tid){
                this.taskloglist.splice(i,1);
            }
        }
    },
};


