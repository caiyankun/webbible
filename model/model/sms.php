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
    public function verifymobile($mobile,$country){
        if(empty($mobile)){
            return false;
        }
        if($country=="+86"){
            return preg_match('/^1[345789]\d{9}$/', $mobile) ? true : false;
        } else if($country=="+60"){
            return preg_match('/^\+60[123456789]\d{8}$/', $mobile) ? true : false;
        }
        return false;
    }
    public function getcode($mobile,$country="+86"){
        if(!$this->verifymobile($mobile, $country)){
            \Response::returntaskfail("手机号码不对！",1,"mobile number not correct!");
        }
        $code=rand(100000,999999);
        $exptime=3;
        if(!\Db::simplecall("user.createsmspass",array($mobile,$code,$exptime,$country))){
            \Response::returntaskfail("存储过程执行失败！",\Db::$error,\Db::$info);
        }
        if(!$this->sendcodebyyunpian($mobile,$code)){
            \Response::returntaskfail("短信平台接口调用失败！", $this->errcode, $this->errorinfo);
        }
        \Response::returntaskok("已经发送成功！");  
    }
    public function checkcode($mobile,$code,$country="+86",$usage="login",$role="user"){
        if(!$this->verifymobile($mobile, $country)){
            \Response::returntaskfail("手机号码不对！",1,"mobile number not correct!");
        }
        if(!\Db::simplecall("user.checksmspass",array($mobile,$code))){
            \Response::returntaskfail("存储过程执行失败！",\Db::$error,\Db::$info);
        }
        if($usage=="login"||$usage=="regist"){
            \User::$curuser=array_combine (array('uid','uname','ulevel','option'),\Db::arraydata());
            if(\User::$curuser['ulevel']<\Config::get($role, "userrole",101)){
                \User::$curuser=null;
                \Response::returntaskfail("用户身份不符！",4,"您没有".$role."的身份！");
            }
            \Session::set("_user", \User::$curuser);
            $rsarray=\User::info();
            $rsarray["token"]= \Token::create(\User::info());
            if(is_numeric($rsarray['uname'])){
		$rsarray['uname']= substr_replace($rsarray['uname'], '****', 3, 4);
            }
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

        header("Content-Type:text/html;charset=utf-8");
        $apikey = "de146cc5474276c7d49dc04daa6ff1fb"; //修改为您的apikey(https://www.yunpian.com)登录官网后获取
        $mobile = "$mobile"; //请用自己的手机号代替
        $text="【MoreCloset】Your SMS code is:".$code." Please use within 3 minutes";
        $ch = curl_init();

        /* 设置验证方式 */
        curl_setopt($ch, CURLOPT_HTTPHEADER, array('Accept:text/plain;charset=utf-8',
            'Content-Type:application/x-www-form-urlencoded', 'charset=utf-8'));
        /* 设置返回结果为流 */
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

        /* 设置超时时间*/
        curl_setopt($ch, CURLOPT_TIMEOUT, 10);

        /* 设置通信方式 */
        curl_setopt($ch, CURLOPT_POST, 1);
        curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);

        // 发送短信
        $data=array('text'=>$text,'apikey'=>$apikey,'mobile'=>$mobile);
        $json_data = $this->send($ch,$data);
        return true;
    }
    
function get_user($ch,$apikey){
    curl_setopt ($ch, CURLOPT_URL, 'https://sms.yunpian.com/v2/user/get.json');
    curl_setopt($ch, CURLOPT_POSTFIELDS, http_build_query(array('apikey' => $apikey)));
    $result = curl_exec($ch);
    $error = curl_error($ch);
    $this->checkErr($result,$error);
    return $result;
}
function send($ch,$data){
    curl_setopt ($ch, CURLOPT_URL, 'https://sms.yunpian.com/v2/sms/single_send.json');
    curl_setopt($ch, CURLOPT_POSTFIELDS, http_build_query($data));
    $result = curl_exec($ch);
    $error = curl_error($ch);
    $this->checkErr($result,$error);
    return $result;
}
function tpl_send($ch,$data){
    curl_setopt ($ch, CURLOPT_URL,
        'https://sms.yunpian.com/v2/sms/tpl_single_send.json');
    curl_setopt($ch, CURLOPT_POSTFIELDS, http_build_query($data));
    $result = curl_exec($ch);
    $error = curl_error($ch);
    checkErr($result,$error);
    return $result;
}
function voice_send($ch,$data){
    curl_setopt ($ch, CURLOPT_URL, 'http://voice.yunpian.com/v2/voice/send.json');
    curl_setopt($ch, CURLOPT_POSTFIELDS, http_build_query($data));
    $result = curl_exec($ch);
    $error = curl_error($ch);
    checkErr($result,$error);
    return $result;
}
function notify_send($ch,$data){
    curl_setopt ($ch, CURLOPT_URL, 'https://voice.yunpian.com/v2/voice/tpl_notify.json');
    curl_setopt($ch, CURLOPT_POSTFIELDS, http_build_query($data));
    $result = curl_exec($ch);
    $error = curl_error($ch);
    checkErr($result,$error);
    return $result;
}

function checkErr($result,$error) {
    if($result === false)
    {
        echo 'Curl error: ' . $error;
    }
    else
    {
        //echo '操作完成没有任何错误';
    }
}
    
    
}
