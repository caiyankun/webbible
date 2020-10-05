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
    
    
    task:function(category,name,activedate="",deactivedate=""){
        ///////

        var tstr=Calendar.curdate10();

        //锟斤拷
        var bid=Calendar.random8();
        ///////
        this.id=bid+tstr;
        this.category=category;
        this.name=name;
        this.createdate=tstr;
        this.activedate=(activedate==="")?this.createdate:activedate;
        this.deactivedate=deactivedate;
        this,completedate="";
        this.info="";
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
    },
    tasklog:function(id,guide,logs){
        this.id=id;
        this.guide=guide;
        this.logs=logs;
    },
    
    newtask:function(category,name,activedate="",deactivedate="",guide=""){
        var nt=new this.task(category,name,activedate,deactivedate);
        this.tasklist.push(nt);
        //if(guide==="reuseguide"){return nt;}
        var ntl=new this.tasklog(nt.id,guide,this.curdate10()+":鍒涘缓浠诲姟");
        this.taskloglist.push(ntl);
        return nt;
    },
    newtaskplant:function(category,name,rule="",activedate="",guide=""){
        var ntp=new this.taskplant(category,name,rule,activedate);
        this.taskplantlist.push(ntp);
        var ntpl=new this.tasklog(ntp.id,guide,this.curdate10()+":鍒涘缓浠诲姟鏍�");
        this.taskloglist.push(ntpl);
        return ntp;
    },
    fruiting:function(){
        for (var k in this.taskplantlist){
            this.fruitingbytp(this.taskplantlist[k]);
        }
    },
    fruitingbytp:function(tp){
        //sdate=new Date(tp.activedate);
        var rules=tp.rule;
        var cdate=new Date();
        var sdate=new Date("2020/10/01");
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
        //锟斤拷匹锟斤拷锟斤拷锟斤拷锟斤拷锟�
        console.log(matcheddate);
        for (var k in matcheddate){
            var tt=this.newtask(tp.category,adjusttitle[k],matcheddate[k],'');
            tt.id=tp.id+matcheddate[k];
        }
    },
    updatetaskplantname:function(tpname,paras){
        var rstitle=tpname;
        for(var k in paras) {
            rstitle=rstitle.replace("{$"+k+"}",paras[k]);
        }
        return rstitle;
    },
    updatelog:function(tid,guide,log){
        var alreadyhave=false;
        for (var k in this.taskloglist){
            if(this.taskloglist[k]===tid){
                this.taskloglist[k].guide=guide;
                this.taskloglist[k].log=this.taskloglist[k].log+log;
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


