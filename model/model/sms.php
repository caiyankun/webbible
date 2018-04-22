<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

namespace model;

/**
 * Description of sms
 *
 * @author Kevin
 */
class sms {
    public $errcode=0;
    public $errorinfo="";
    public function getcode($mobile){
        $code=rand(100000,999999);
        $exptime=3;
        if(!\Db::simplecall("user.createsmspass",array($mobile,$code,$exptime))){
            \Response::returntaskfail("存储过程执行失败！",\Db::$error,\Db::$info);
        }
        if(!$this->sendcodebyjuhe($mobile,$code)){
            \Response::returntaskfail("短信平台接口调用失败！", $this->errcode, $this->errorinfo);
        }
        \Response::returntaskok("已经发送成功！");  
    }
    public function checkcode($mobile,$code,$usage="login",$role="user"){
        if(!\Db::simplecall("user.checksmspass",array($mobile,$code))){
            \Response::returntaskfail("存储过程执行失败！",\Db::$error,\Db::$info);
        }
        if($usage=="login"){
            \User::$curuser=array_combine (array('uid','uname','ulevel','option'),\Db::arraydata());
            if(\User::$curuser['ulevel']<\Config::get($role, "userrole",101)){
                //$this->logout();
                \User::$curuser=null;
                \Response::returntaskfail("用户身份不符！",4,"您没有".$role."的身份！");
            }
            \Session::set("_user", \User::$curuser);
            $rsarray=\User::info();
            $rsarray["token"]= \Token::create(\User::info());
            \Response::returntaskok($rsarray); 
        }
        
        \Response::returntaskok("验证码正确！");
        
    }

    public function sendcodebyjuhe($mobile,$code){
        //header('content-type:textml;charset=utf-8');
	$sendUrl = 'http://v.juhe.cn/sms/send'; //短信接口的URL
	$smsConf = array(
            //'key'   => 'c010d81a966156a149bce6d105a49bb0', //您申请的APPKEY
            'key'   => '125ae61485a5372def20a1405599ed52',
            'mobile'    => $mobile, //接受短信的用户手机号码
            //'tpl_id'    => '73228', //您申请的短信模板ID，根据实际情况修改
            'tpl_id'    => '37129', //您申请的短信模板ID，根据实际情况修改
            'tpl_value' =>'#code#='.$code //您设置的模板变量，根据实际情况修改
	);
	$content = \Curl::request($sendUrl,$smsConf,1); //请求发送短信
        //echo ($content);
        if($content){
            $result = json_decode($content,true);
            $error_code = $result['error_code'];
            if($error_code == 0){
                    //状态为0，说明短信发送成功
                    //dump("短信发送成功,短信ID：".$result['result']['sid']);
                
                    return 1;
            }else{
                    //状态非0，说明失败
                    //$msg = $result['reason'];
                    //echo "短信发送失败(".$error_code.")：".$msg;
                    $this->errcode=$error_code;
                    $this->errorinfo=$result['reason'];
                    return 0;
            }
	}else{
		//返回内容异常，以下可根据业务逻辑自行修改
		//dump("请求发送短信失败");
                $this->errcode=1;
                $this->errorinfo="短信平台接口调用返回空！";
		return 0;
	}
    }
    
    public function sendcodebyyunpian($mobile,$code){
        
        $sendUrl = 'http://sms.yunpian.com/v2/sms/single_send.json'; //短信接口的URL
	$smsConf = array(
            //'key'   => 'c010d81a966156a149bce6d105a49bb0', //您申请的APPKEY
            'apikey'   => 'de146cc5474276c7d49dc04daa6ff1fb',
            'mobile'    => $mobile, //接受短信的用户手机号码
            //'tpl_id'    => '73228', //您申请的短信模板ID，根据实际情况修改
            //'tpl_id'    => '2268902', //您申请的短信模板ID，根据实际情况修改
            'text' =>'【More Closet】Your sms Code is:'.$code //您设置的模板变量，根据实际情况修改
	);
        

        
	$content = \Curl::request($sendUrl,$smsConf,1); //请求发送短信
        echo ($content);
        if($content){
            $result = json_decode($content,true);
            $error_code = $result['error_code'];
            if($error_code == 0){
                    //状态为0，说明短信发送成功
                    //dump("短信发送成功,短信ID：".$result['result']['sid']);
                
                    return 1;
            }else{
                    //状态非0，说明失败
                    //$msg = $result['reason'];
                    //echo "短信发送失败(".$error_code.")：".$msg;
                    $this->errcode=$error_code;
                    $this->errorinfo=$result['reason'];
                    return 0;
            }
	}else{
		//返回内容异常，以下可根据业务逻辑自行修改
		//dump("请求发送短信失败");
                $this->errcode=1;
                $this->errorinfo="短信平台接口调用返回空！";
		return 0;
	}
    }
}
