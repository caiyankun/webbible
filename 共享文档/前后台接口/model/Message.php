<?php
// +----------------------------------------------------------------------
// | SentCMS [ WE CAN DO IT JUST THINK IT ]
// +----------------------------------------------------------------------
// | Copyright (c) 2013 http://www.tensent.cn All rights reserved.
// +----------------------------------------------------------------------
// | Author: molong <molong@tensent.cn> <http://www.tensent.cn>
// +----------------------------------------------------------------------

namespace app\api\model;

/**
* 消息模型
*/
class Message{

	/**
	 * 添加消息
	 * @author zhb
	 */
	public function add($data = []){
		$result = db('message')->insertGetId($data);
		if(!$result){
			return false;
		}
		return true;
	}
	
	/**
	 * 批量添加消息
	 * @author zhb
	 */
	public function addAll($data = []){
		$result = db('message')->insertAll($data);
		if(!$result){
			return false;
		}
		return true;
	}
	
	/**
	 * 获取消息列表
	 * @author zhb
	 */
	public function getMessage($map = [],$order = [],$page = 1){
		$data = db('message')->where($map)->order($order)->limit(config('default_view_num'))->page($page)->select();
		if(empty($data)){
			return false;
		}
		foreach($data as &$v){
			$v['type'] = db('message_type')->where('id',$v['type'])->value('title');
		}
		return $data;
	}
}