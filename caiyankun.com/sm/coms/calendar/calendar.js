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
                nm=(om+value)%12+1;
                if(nm===0){nm=12};
                if(nm<0){nm=12+nm;}
                
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
        return false;
    },
    haspretask:function(t){
        for(var i in Calendar.tasklist){
            if(Calendar.tasklist[i].id.match(new RegExp("^"+t.id+"pre")) && Calendar.tasklist[i].deactivedate>Calendar.curdate10()){return true;}
        }
        return false;
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
    Lunar:function(objDate){
        if(!objDate){objDate=new Date();}
        if(typeof objDate==="string"){objDate=new Date(objDate);}
        var ol=[];
        ol.lunarInfo=[0x4bd8,0x4ae0,0xa570,0x54d5,0xd260,0xd950,0x5554,0x56af,0x9ad0,0x55d2,
        0x4ae0,0xa5b6,0xa4d0,0xd250,0xd255,0xb54f,0xd6a0,0xada2,0x95b0,0x4977,
        0x497f,0xa4b0,0xb4b5,0x6a50,0x6d40,0xab54,0x2b6f,0x9570,0x52f2,0x4970,
        0x6566,0xd4a0,0xea50,0x6a95,0x5adf,0x2b60,0x86e3,0x92ef,0xc8d7,0xc95f,
        0xd4a0,0xd8a6,0xb55f,0x56a0,0xa5b4,0x25df,0x92d0,0xd2b2,0xa950,0xb557,
        0x6ca0,0xb550,0x5355,0x4daf,0xa5b0,0x4573,0x52bf,0xa9a8,0xe950,0x6aa0,
        0xaea6,0xab50,0x4b60,0xaae4,0xa570,0x5260,0xf263,0xd950,0x5b57,0x56a0,
        0x96d0,0x4dd5,0x4ad0,0xa4d0,0xd4d4,0xd250,0xd558,0xb540,0xb6a0,0x95a6,
        0x95bf,0x49b0,0xa974,0xa4b0,0xb27a,0x6a50,0x6d40,0xaf46,0xab60,0x9570,
        0x4af5,0x4970,0x64b0,0x74a3,0xea50,0x6b58,0x5ac0,0xab60,0x96d5,0x92e0,
        0xc960,0xd954,0xd4a0,0xda50,0x7552,0x56a0,0xabb7,0x25d0,0x92d0,0xcab5,
        0xa950,0xb4a0,0xbaa4,0xad50,0x55d9,0x4ba0,0xa5b0,0x5176,0x52bf,0xa930,
        0x7954,0x6aa0,0xad50,0x5b52,0x4b60,0xa6e6,0xa4e0,0xd260,0xea65,0xd530,
        0x5aa0,0x76a3,0x96d0,0x4afb,0x4ad0,0xa4d0,0xd0b6,0xd25f,0xd520,0xdd45,
        0xb5a0,0x56d0,0x55b2,0x49b0,0xa577,0xa4b0,0xaa50,0xb255,0x6d2f,0xada0,
        0x4b63,0x937f,0x49f8,0x4970,0x64b0,0x68a6,0xea5f,0x6b20,0xa6c4,0xaaef,
        0x92e0,0xd2e3,0xc960,0xd557,0xd4a0,0xda50,0x5d55,0x56a0,0xa6d0,0x55d4,
        0x52d0,0xa9b8,0xa950,0xb4a0,0xb6a6,0xad50,0x55a0,0xaba4,0xa5b0,0x52b0,
        0xb273,0x6930,0x7337,0x6aa0,0xad50,0x4b55,0x4b6f,0xa570,0x54e4,0xd260,
        0xe968,0xd520,0xdaa0,0x6aa6,0x56df,0x4ae0,0xa9d4,0xa4d0,0xd150,0xf252,
        0xd520];
        ol.leapMonth=function(y){
            var lm = ol.lunarInfo[y-1900] & 0xf;
            return(lm==0xf?0:lm);
        }
        ol.monthDays=function(y,m){
            return( (ol.lunarInfo[y-1900] & (0x10000>>m))? 30: 29 );
        }
        ol.leapDays=function(y){
            if(ol.leapMonth(y)) return( (ol.lunarInfo[y-1899]&0xf)==0xf? 30: 29);
            else return(0);
        }
        ol.lYearDays=function(y){
            var i, sum = 348;
            for(i=0x8000; i>0x8; i>>=1) sum += (ol.lunarInfo[y-1900] & i)? 1: 0;
            return(sum+ol.leapDays(y));
        }

       var i, leap=0, temp=0;
       var offset   = (Date.UTC(objDate.getFullYear(),objDate.getMonth(),objDate.getDate()) - Date.UTC(1900,0,31))/86400000;
       for(i=1900; i<2100 && offset>0; i++) { temp=ol.lYearDays(i); offset-=temp; }
       if(offset<0) { offset+=temp; i--; }
       ol.year = i;
       leap = ol.leapMonth(i); //闰哪个月
       ol.isLeap = false;
       for(i=1; i<13 && offset>0; i++) {
          //闰月
          if(leap>0 && i==(leap+1) && ol.isLeap==false)
             { --i; ol.isLeap = true; temp = ol.leapDays(ol.year); }
          else
             { temp = ol.monthDays(ol.year, i); }
          //解除闰月
          if(ol.isLeap==true && i==(leap+1)) ol.isLeap = false;
          offset -= temp;
       }
       if(offset==0 && leap>0 && i==leap+1)
          if(ol.isLeap)
             { ol.isLeap = false; }
          else
             { ol.isLeap = true; --i; }
       if(offset<0){ offset += temp; --i; }
       ol.month = i;
       ol.day = offset + 1;
       var rs=ol.year+"/";
       if(ol.month>9){rs=rs+ol.month;} else {rs=rs+"0"+ol.month;}
       if(ol.day>9){rs=rs+"/"+ol.day;} else {rs=rs+"/0"+ol.day;}
       return {date10:rs,year:ol.year,month:ol.month,day:ol.day};
    }
};

 
