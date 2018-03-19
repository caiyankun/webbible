<?php
// +----------------------------------------------------------------------
// | SentCMS [ WE CAN DO IT JUST THINK IT ]
// +----------------------------------------------------------------------
// | Copyright (c) 2013 http://www.tensent.cn All rights reserved.
// +----------------------------------------------------------------------
// | Author: molong <molong@tensent.cn> <http://www.tensent.cn>
// +----------------------------------------------------------------------

namespace app\api\controller;
use \think\Log;
/**
 * BeeCloud的回调webhook
 * @author zhb 
 */
class Webhook{

	/**
	 * webhook回调函数
	 * @author zhb
	 */
	public function callback(){
		$config = config('beecloud');
		Log::write($config);
		$appId = $config['APP_ID'];
		$appSecret = $config['APP_SECRET'];
		$jsonStr = file_get_contents("php://input");
		$msg = json_decode($jsonStr);
		Log::write($msg->transaction_id.'->webhook中appId='.$appId);
		Log::write($msg->transaction_id.'->webhook中appSecret='.$appSecret);
		// webhook字段文档: https://beecloud.cn/doc/?index=webhook
		//第一步:验证签名
		$sign = md5($appId . $appSecret . $msg->timestamp);
		if ($sign != $msg->sign) {
			// 签名不正确
			Log::write($msg->transaction_id.'->webhook签名不正确');
			exit();
		}
		//第二步:过滤重复的Webhook
		//客户需要根据订单号进行判重，忽略已经处理过的订单号对应的Webhook
		$transaction_id = $msg->transaction_id;
		$order = db('order')->where('order_num',$transaction_id)->find();
		if(!empty($order) && $order['pay_status'] != 0){
			Log::write($msg->transaction_id.'->webhook订单已处理');
		  	exit();
		}
		//
		//第三步:验证订单金额与购买的产品实际金额是否一致
		//也就是验证调用Webhook返回的transaction_fee订单金额是否与客户服务端内部的数据库查询得到对应的产品的金额是否相同
		if(intval($order['money'] * 100) != $msg->transaction_fee){
			Log::write($msg->transaction_id.'->webhook订单金额不正确');
		  	exit();
		}
		//第四步:处理业务逻辑和返回
		/*
		 * 推送支付的结果
		 */
		if($msg->transaction_type == "PAY") {
			//付款信息
			//支付状态是否变为支付成功,true代表成功
			$status = $msg->trade_success;
			if($status != true){
				Log::write($msg->transaction_id.'->网关订单支付失败');
				exit();
			}
			//message_detail 参考文档
			//channel_type 微信/支付宝/银联/快钱/京东/百度/易宝/PAYPAL/BC
			switch ($msg->channel_type) {
				case "WX":
					$result = $this->doDeal($msg,$order);
					if($result == false){
						Log::write($msg->transaction_id.'->webhook订单支付成功，业务处理失败');
						exit();
					}
					message($order['uid'],2,'订单号为'.$order['order_num'].','.$order['title'].'购买成功');
					break;
				case "ALI":
					$result = $this->doDeal($msg,$order);
					if($result == false){
						Log::write($msg->transaction_id.'->webhook订单支付成功，业务处理失败');
						exit();
					}
					message($order['uid'],2,'订单号为'.$order['order_num'].','.$order['title'].'购买成功');
					break;
			}
		} else if ($msg->transaction_type == "REFUND") { //退款的结果
			
		}
		Log::write($msg->transaction_id.'->webhook订单支付成功，业务处理成功');
		//处理消息成功,不需要持续通知此消息返回success
		echo 'success';
	}
	
	/**
	 * 回调后务处理
	 */
	public function doDeal($msg,$order){
//		db()->startTrans();
		try{
			$message_detail = $msg->message_detail;
			$channel_type = $msg->channel_type;
			if($channel_type == 'ALI'){
				//更新order表,trade_no,pay_time,pay_status,pay_type
				$data1 = [
						'trade_no' => $message_detail->trade_no,
						'pay_time' => time(),
						'pay_status' => 1,
						'pay_type' => $msg->sub_channel_type
				];
			}
			if($channel_type == 'WX'){
				//更新order表,trade_no,pay_time,pay_status,pay_type
				$data1 = [
						'trade_no' => $message_detail->transaction_id,
						'pay_time' => time(),
						'pay_status' => 1,
						'pay_type' => $msg->sub_channel_type
				];
			}
			
			$result1 = db('order')->where('order_num',$order['order_num'])->update($data1);
//			成功以后去购买记录里面添加信息
			$order = db('order')->where('order_num',$order['order_num'])->find();
//			1、视频课程2、面授课程3、试题4、活动
			if($order['order_type']==1){
//				strtotime(”+1 day”)
				$valid_time = db('lessons')->where('id',$order['lesson_id'])->find();
				$data = [
						'uid' => $order['uid'],
						'create_time' => time(),
						'uid' => $order['uid'],
						'lesson_id' => $order['lesson_id'],
						'valid_time' => strtotime('+'.$valid_time['valid_time'].' day'),
						'order_num' => $order['order_num']
				];
				db('order_lesson')->insert($data);
			}
			if($order['order_type']==2){
				$data = [
						'uid' => $order['uid'],
						'create_time' => time(),
						'uid' => $order['uid'],
						'plc_id' => $order['plc_id'],
						'order_num' => $order['order_num']
				];
				db('order_plc')->insert($data);
			}
			if($order['order_type']==3){
				$data = [
						'uid' => $order['uid'],
						'create_time' => time(),
						'uid' => $order['uid'],
						'test_id' => $order['test_id'],
						'order_num' => $order['order_num']
				];
				db('order_test')->insert($data);
			}
			if($order['order_type']==4){
				db('enroll')->where(['uid'=>$order['uid'],'paty_id'=>$order['paty_id']])->update(['pay_status'=>1]);
			}
			if(!$result1){
//				db()->rollback();
				Log::write($msg->transaction_id.'->webhook业务处理，更新order表失败');
				return false;
			}
		}catch(\Exception $e){
//			db()->rollback();
			Log::write($msg->transaction_id.'->webhook业务处理，异常发生');
			return false;
		}
	}
}
