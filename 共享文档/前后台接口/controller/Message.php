<?php
// +----------------------------------------------------------------------
// | SentCMS [ WE CAN DO IT JUST THINK IT ]
// +----------------------------------------------------------------------
// | Copyright (c) 2013 http://www.tensent.cn All rights reserved.
// +----------------------------------------------------------------------
// | Author: molong <molong@tensent.cn> <http://www.tensent.cn>
// +----------------------------------------------------------------------

namespace app\api\controller;

/**
 * 消息控制器
 * @author zhb
 */
class Message{

	/**
	 * 添加消息
	 * @author zhb
	 */
	public function add(){
		$token = input('param.token');
		$uid = getUid($token);
		if(!$uid){
			return back([],'请登录',-1);
		}
		$type = input('param.type');
		$content = input('param.content');
		$data = [
				'type' => $type,
				'content' => $content,
				'create_time' => time(),
				'uid' => $uid,
		];
		$result = model('Message')->add($data);
		if($result == false){
			return error('添加失败');
		}
		return success('添加成功');
	}
	
	/**
	 * 获取消息
	 * @author zhb
	 */
	public function getMessage(){
		$token = input('param.token');
		$uid = getUid($token);
		if(!$uid){
			return back([],'请登录',-1);
		}
		$page = input('param.page',1);
		$map = [
				'uid' => $uid
		];
		$order = [
				'create_time desc'
		];
		$data = model('Message')->getMessage($map,$order,$page);
		if($data == false){
			return error('没有更多数据');
		}
		return back($data,'获取数据成功',1);
	}
	
	/**
	 * 标记消息为已读
	 * @author zhb
	 */
	public function readMessage(){
		$token = input('param.token');
		$uid = getUid($token);
		if(!$uid){
			return back([],'请登录',-1);
		}
		$data = [
				'is_read' => 1
		];
		$result = db('message')->where(['uid'=>$uid])->update($data);
		if(!$result){
			return error('操作失败');
		}
		return success('操作成功');
	}
	/**
	 * 获取系统消息列表
	 * @author zhb
	 */
	public function getSystemMessage(){
		$token = input('param.token');
		$uid = getUid($token);
		if(!$uid){
			return back([],'请登录',-1);
		}
		$page = input('param.page',1);
		$group_id = db('auth_group_access')->where('uid',$uid)->value('group_id');
		if(empty($group_id)){
			$group_id = 1;
		}
		$map = 'uid = 0 AND group_id = 0';
		$order = [
				'id desc'
		];
		$data = db('system_message_data')->where('uid',$uid)->whereOr($map)->whereOr('group_id',$group_id)->order($order)->limit(config('default_view_num'))->page($page)->select();
		dump($data);
		exit;
		if(empty($data)){
			return error('没有更多数据');
		}
		//dump($data);exit;
		$resData = [];
		foreach ($data as $key => $v){
			//假设没有删除过消息
			$isDel = false;
			//如果uid不为0，代表是给该用户发的消息。是否已读可以通过这条数据的状态来查看
			if($v['uid']!='0'){
				$v['is_read'] = $v['status'];
			}
			//去消息表里面查询消息的类型跟标题
			$system_message = db('system_message')->where('id',$v['message_id'])->find();
			$v['title'] = $system_message['title'];
			$v['type'] = $system_message['type']=='0'?'系统消息':'通知消息';
			$v['content'] = $system_message['content'];
			$v['create_time'] = $system_message['create_time'];
//			if($system_message['type'] == 2 || $system_message['type'] == 3){
//				$v['avatar'] = avatar1($v['from_uid']);
//				$v['nickname'] = nickname($v['from_uid']);
//			}else{
//				$v['avatar'] = '';
//				$v['nickname'] = '';
//			}
			//如果uid为0，那么是发的群体消息，群组或者系统消息。
			if($v['uid'] == 0){
				//查询消息状态表，获得消息的状态
				$msg_status = db('system_message_status')->where(['message_id'=>$v['message_id'],'uid'=>$uid])->find();
				//如果写入过消息状态表 status=0的时候未已经删除 1的时候表示已读
				if(!empty($msg_status)){
					if($msg_status['status'] == 0){
//						unset($data[$key]);
						$isDel = true;
					}else{
						$v['is_read'] = 1;
					}
				}else{
					//如果没写入过消息状态表，那么就是未读消息
					$v['is_read'] = 0;
				}
			}
			//如果没删除，则写入最终消息
			if(!$isDel){
//				$resData[]=$v;
				array_push($resData,$v);
			}
		}
		return back($resData,'获取数据成功',1);
	}
	
	/**
	 * 系统消息标记为已读
	 * @author zhb
	 */
	public function readSystemMessage(){
		$token = input('param.token');
		$id = input('param.id');
		$uid = getUid($token);
		if(!$uid){
			return back([],'请登录',-1);
		}
		$msg_data = db('system_message_data')->where('id',$id)->find();
		if($msg_data['uid']=='0'){
			$results = db('system_message_status')->where(['message_id'=>$msg_data['message_id'],'uid'=>$uid])->find();
			if(empty($results)){
						$data = [
								'message_id' => $msg_data['message_id'],
								'uid' => $uid,
								'status' => 1
						];
						$result = db('system_message_status')->insert($data);
					}else{
						//db('system_message_status')->where(['message_id'=>$v['message_id'],'uid'=>$uid])->update(['status'=>1]);
					}
		}else{
			$result = db('system_message_data')->where('id',$id)->update(['status'=>1]);
		}
		if($result >= 0){
			return success('操作成功');
		}else{
			return error('操作失败');
		}
	}
	
	/**
	 * 系统消息清空
	 * @author zhb
	 */
	public function delSystemMessage(){
		$token = input('param.token');
		$id = input('param.id');
		$uid = getUid($token);
		if(!$uid){
			return back([],'请登录',-1);
		}
		$msg_data = db('system_message_data')->where('id',$id)->find();
		if($msg_data['uid']=='0'){
			$results = db('system_message_status')->where(['message_id'=>$msg_data['message_id'],'uid'=>$uid])->find();
			if(empty($results)){
						$data = [
								'message_id' => $msg_data['message_id'],
								'uid' => $uid,
								'status' => 0
						];
						$result = db('system_message_status')->insert($data);
					}else{
						$result = db('system_message_status')->where(['message_id'=>$msg_data['message_id'],'uid'=>$uid])->update(['status'=>0]);
					}
		}else{
			$result = db('system_message_data')->where('id',$id)->delete();
//			$result = db('system_message')->where('id',$msg_data['message_id'])->delete();
		}
		if($result >= 0){
			return success('操作成功');
		}else{
			return error('操作失败');
		}
	}
	
	/**
	 * 删除消息
	 * @author zhb
	 */
	public function delMessage(){
		$id = input('param.id');
		$result = db('message')->where(['id'=>$id])->delete();
		if(!$result){
			return error('操作失败');
		}
		return success('删除成功');
	}
}