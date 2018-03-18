<?php
// +----------------------------------------------------------------------
// | SentCMS [ WE CAN DO IT JUST THINK IT ]
// +----------------------------------------------------------------------
// | Copyright (c) 2013 http://www.tensent.cn All rights reserved.
// +----------------------------------------------------------------------
// | Author: molong <molong@tensent.cn> <http://www.tensent.cn>
// +----------------------------------------------------------------------

/**
 * 自定义返回函数
 */
function back($data = [], $msg = '', $status = 1){
	return ['data'=>$data,'msg'=>$msg,'status'=>$status];
}
function duiBaBack($bizId = '', $msg = '', $status = 'ok',$credits = 1){
	return ['bizId'=>$bizId,'errorMessage'=>$msg,'status'=>$status,'credits'=>$credits];
}

/**
 * 成功返回函数
 */
function success($msg = ''){
	return ['data'=>[],'msg'=>$msg,'status'=>1];
}

/**
 * 失败返回函数
 */
function error($msg = ''){
	return ['data'=>[],'msg'=>$msg,'status'=>0];
}

/**
 * 手机号验证
 */
function is_mobile($mobile){
	if(empty($mobile)){
		return false;
	}
	return preg_match('/^1[345789]\d{9}$/', $mobile) ? true : false;
}

/**
 * 邮箱验证
 */
function is_email($email){
	if(empty($email)){
		return false;
	}
	return preg_match('/^([0-9A-Za-z\\-_\\.]+)@([0-9a-z]+\\.[a-z]{2,3}(\\.[a-z]{2})?)$/i',$email) ? true : false;
}

/**
 * 身份证号验证
 */
function is_idcard($idCard){
	if(empty($idCard)){
		return false;
	}
	return preg_match('/^(\d{15}$|^\d{18}$|^\d{17}(\d|X|x))$/', $idCard) ? true : false;
}

/**
 * 密码验证
 */ 
function is_password($password){
	if(empty($password)){
		return false;
	}
	//return preg_match('/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,20}$/', $password) ? true : false;
	return preg_match('/^\S{6,32}$/', $password) ? true : false;
	
}

/**
 * 系统加密方法
 * @param string $data 要加密的字符串
 * @param string $key  加密密钥
 * @param int $expire  过期时间 单位 秒
 */
function think_encrypt($data, $key = '', $expire = 0) {
	$key  = md5(empty($key) ? 'ThinkPHP' : $key);
	$data = base64_encode($data);
	$x    = 0;
	$len  = strlen($data);
	$l    = strlen($key);
	$char = '';

	for ($i = 0; $i < $len; $i++) {
		if ($x == $l) $x = 0;
		$char .= substr($key, $x, 1);
		$x++;
	}

	$str = sprintf('%010d', $expire ? $expire + time():0);

	for ($i = 0; $i < $len; $i++) {
		$str .= chr(ord(substr($data, $i, 1)) + (ord(substr($char, $i, 1)))%256);
	}
	return str_replace(array('+','/','='),array('-','_',''),base64_encode($str));
}

/**
 * 系统解密方法
 * @param  string $data 要解密的字符串 （必须是think_encrypt方法加密的字符串）
 * @param  string $key  加密密钥
 */
function think_decrypt($data, $key = ''){
	$key    = md5(empty($key) ? 'ThinkPHP' : $key);
	$data   = str_replace(array('-','_'),array('+','/'),$data);
	$mod4   = strlen($data) % 4;
	if ($mod4) {
		$data .= substr('====', $mod4);
	}
	$data   = base64_decode($data);
	$expire = substr($data,0,10);
	$data   = substr($data,10);

	if($expire > 0 && $expire < time()) {
		return '';
	}
	$x      = 0;
	$len    = strlen($data);
	$l      = strlen($key);
	$char   = $str = '';

	for ($i = 0; $i < $len; $i++) {
		if ($x == $l) $x = 0;
		$char .= substr($key, $x, 1);
		$x++;
	}

	for ($i = 0; $i < $len; $i++) {
		if (ord(substr($data, $i, 1))<ord(substr($char, $i, 1))) {
			$str .= chr((ord(substr($data, $i, 1)) + 256) - ord(substr($char, $i, 1)));
		}else{
			$str .= chr(ord(substr($data, $i, 1)) - ord(substr($char, $i, 1)));
		}
	}
	return base64_decode($str);
}

/**
 * 生成token令牌
 */
function init_token($uid,$rand){
	$expire = 30*24*3600;//token过期时间
	$token = think_encrypt(md5($uid.$rand), '', $expire);
	return $token;
}

/**
 * 验证token令牌
 */
function getUid($token){
	$str = think_decrypt($token);
	if(empty($str)){
		return false;
	}
	$result = db('member')->where('token',$token)->find();
	if(md5($result['uid'] . $result['rand']) != $str){
		return false;
	}
	return $result['uid'];
}

/**
 * 检索手机号是否存在
 */
function get_mobile($mobile){
	$result = db('member')->where('mobile',$mobile)->value('uid');
	return $result;
}

/**
 * 验证验证码
 */
function auth_code($mobile, $auth_code){
	$result = model('AuthCode')->getAuthCode($mobile);
	array_filter($result);
	if(empty($result)){
		return false;
	}
	$array = [];
	foreach($result as $k=>$val){
		array_push($array, $val['auth_code']);
		
	}
	if(!in_array($auth_code, $array)){
		return false;
	}
	return true;
}

/**
 * 发送手机验证码
 */
function send_auth_code($mobile = '',$auth_code = ''){
	header('content-type:textml;charset=utf-8');

	$sendUrl = 'http://v.juhe.cn/sms/send'; //短信接口的URL

	$smsConf = array(
			'key'   => '125ae61485a5372def20a1405599ed52', //您申请的APPKEY
			'mobile'    => $mobile, //接受短信的用户手机号码
			'tpl_id'    => '37129', //您申请的短信模板ID，根据实际情况修改
			'tpl_value' =>'#code#='.$auth_code //您设置的模板变量，根据实际情况修改
	);

	$content = juhecurl($sendUrl,$smsConf,1); //请求发送短信
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
			return 0;
		}
	}else{
		//返回内容异常，以下可根据业务逻辑自行修改
		//dump("请求发送短信失败");
		return 0;
	}
}

/**
 * 发送验证码请求接口返回内容 
 */
function juhecurl($url,$params=false,$ispost=0){
	try{
		$httpInfo = array();
		$ch = curl_init();
	
		curl_setopt( $ch, CURLOPT_HTTP_VERSION , CURL_HTTP_VERSION_1_1 );
		curl_setopt( $ch, CURLOPT_USERAGENT , 'Mozilla/5.0 (Windows NT 5.1) AppleWebKit/537.22 (KHTML, like Gecko) Chrome/25.0.1364.172 Safari/537.22' );
		curl_setopt( $ch, CURLOPT_CONNECTTIMEOUT , 30 );
		curl_setopt( $ch, CURLOPT_TIMEOUT , 30);
		curl_setopt( $ch, CURLOPT_RETURNTRANSFER , true );
		if( $ispost )
		{
			curl_setopt( $ch , CURLOPT_POST , true );
			curl_setopt( $ch , CURLOPT_POSTFIELDS , $params );
			curl_setopt( $ch , CURLOPT_URL , $url );
		}
		else
		{
			if($params){
				curl_setopt( $ch , CURLOPT_URL , $url.'?'.$params );
			}else{
				curl_setopt( $ch , CURLOPT_URL , $url);
			}
		}
		$response = curl_exec( $ch );
	
		$httpCode = curl_getinfo( $ch , CURLINFO_HTTP_CODE );
		$httpInfo = array_merge( $httpInfo , curl_getinfo( $ch ) );
		curl_close( $ch );
		return $response;
	}catch(\Exception $e){
		return false;
	}
}

						

