<?php
// +----------------------------------------------------------------------
// | SentCMS [ WE CAN DO IT JUST THINK IT ]
// +----------------------------------------------------------------------
// | Copyright (c) 2013 http://www.tensent.cn All rights reserved.
// +----------------------------------------------------------------------
// | Author: molong <molong@tensent.cn> <http://www.tensent.cn>
// +----------------------------------------------------------------------

namespace app\api\controller;
class User{
	/**
	 * 用户登录
	 * @author zhb
	 */
	public function login($mobile, $password){
		$mobile = trim($mobile);
		$password = trim($password);
		if(empty($mobile)) return error('请填写手机号');
		if(empty($password)) return error('密码不能为空');
		$data = model('User')->login($mobile,$password);
		if($data == -1){
			return error('用户被禁用');
		}
		if($data == false){
			return error('用户名或密码错误');
		}
		return back($data,'登录成功',1);
	}
	public function auth_login(){
		$token = input('param.token');
		$uid = getUid(trim($token));
		if(!$uid){
			return back([],'请登录',-1);
		}
		return back($uid,'登录过',1);
	}
	
	/**
	 * 用户资料修改
	 * @author zhb
	 */
	public function updateUser(){
		$token = input('param.token');
		$uid = getUid(trim($token));
		if(!$uid){
			return back([],'请登录',-1);
		}
		if(input('param.nickname') != ''){
			$data['nickname'] = input('param.nickname');
		}
		if(input('param.realname') != ''){
			$data['realname'] = input('param.realname');
		}
		if(input('param.sex') != ''){
			$data['sex'] = input('param.sex');
		}
		if(input('param.organization') != ''){
			$data['organization'] = input('param.organization');
		}
		if(input('param.worker') != ''){
			$data['worker'] = input('param.worker');
		}
		if(input('param.weibo') != ''){
			$data['weibo'] = input('param.weibo');
		}
		if(input('param.PMIID') != ''){
			$data['PMIID'] = input('param.PMIID');
		}
		if(input('param.weixin') != ''){
			$data['weixin'] = input('param.weixin');
		}
		if(input('param.qq') != ''){
			$data['qq'] = input('param.qq');
		}
		if(input('param.email') != ''){
			$data['email'] = input('param.email');
		}
		if(input('param.area') != ''){
			$data['area'] = input('param.area');
		}
		
		$result = model('User')->updateUser($uid, $data);
		if(!$result){
			return error('修改失败');
		}
		$data = model('User')->getUser($uid);
		return back($data,'修改成功',1);
	}
	
	/**
	 * 获取用户资料
	 * @author zhb
	 */
	public function getUser($token){
		$uid = getUid(trim($token));
		if(!$uid){
			return back([],'请登录',-1);
		}
		$data = model('User')->getUser($uid);
		return back($data,'获取数据成功',1);
	}
	
	
	/**
	 * 钱包收支明细
	 */
	public function myWallet(){
		$token = input('param.token');
		$type = input('param.type');
		$uid = getUid(trim($token));
		if(!$uid){
			return back([],'请登录',-1);
		}
		$page = input('param.page',1);
		$map = [
				'uid' => $uid,
				'type' => $type
		];
		$order = [
				'create_time desc'
		];
		$data = db('accounting')->where($map)->order($order)->field('title,money,create_time')->limit(10)->page($page)->select();
		if(empty($data)){
			return error('没有更多数据');
		}
		foreach ($data as &$v){
			$v['create_time'] = dt_format($v['create_time']);
		}
		return back($data,'获取数据成功',1);
	}
	/**
	 * 提现记录明细
	 */
	public function drawlist(){
		$token = input('param.token');
		$uid = getUid(trim($token));
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
		$data = db('draw')->where($map)->order($order)->field('money,create_time,status')->limit(10)->page($page)->select();
		if(empty($data)){
			return error('没有更多数据');
		}
		foreach ($data as &$v){
			$v['create_time'] = dt_format($v['create_time']);
			$v['status'] = $v['status']=='0'?'审核中':'提现成功';
		}
		return back($data,'获取数据成功',1);
	}
	/**
	 * 绑定会员明细
	 */
	public function user_mylist(){
		$token = input('param.token');
		$uid = getUid(trim($token));
		if(!$uid){
			return back([],'请登录',-1);
		}
		$page = input('param.page',1);
		$seller_id = db('seller')->where('uid',$uid)->value('id');
		$map = [
				'seller_id' => $seller_id
		];
		$order = [
				'reg_time desc'
		];
		$data = db('member')->where($map)->order($order)->field('uid,reg_time')->limit(10)->page($page)->select();
		if(empty($data)){
			return error('没有更多数据');
		}
		foreach ($data as &$v){
			$v['reg_time'] = dt_format($v['reg_time']);
		}
		return back($data,'获取数据成功',1);
	}
	/**
	 * 资讯中心
	 */
	public function newslist(){
		$page = input('param.page',1);
		$map = [
				'status' => 0
		];
		$order = [
				'create_time desc'
		];
		$data = db('document')->where($map)->order($order)->field('id,title,create_time')->limit(10)->page($page)->select();
		if(empty($data)){
			return error('没有更多数据');
		}
		foreach ($data as &$v){
			$v['create_time'] = time_format($v['create_time']);
			$v['nickname'] = '哎吆我去';
		}
		return back($data,'获取数据成功',1);
	}
	/**
	 * 资讯中心
	 */
	public function newsdetail(){
		$id = input('param.id');
		$map = [
				'id' => $id
		];
		$data = db('document')->where($map)->field('title,view,create_time')->find();
		db('document')->where($map)->setInc('view');
		if(empty($data)){
			return error('文章不存在');
		}
		$data['create_time'] = time_format($data['create_time']);
		$data['nickname'] = '哎吆我去';
		$data['content'] = db('document_article')->where('doc_id',$id)->value('content');
		return back($data,'获取数据成功',1);
	}
	public function draw(){
		$token = input('param.token');
		$money = input('param.money');
		$uid = getUid(trim($token));
		if(!$uid){
			return back([],'请登录',-1);
		}
		$okmoney = db('member')->where('uid',$uid)->value('score');
		if($money>$okmoney){
			return error('您的账户中没有足够的余额可以提现！');
		}
		$data = [
			'uid' => $uid,
			 'create_time' => time(),
			 'money' => $money,
			 'stauts' => 0
		];
		$draw = db('draw')->insertGetId($data);
		if($draw){
			db('member')->where('uid',$uid)->setDec('score',$money);
			return back($draw,'提现申请成功',1);
		}else{
			return error('提现申请失败');
		}
	}

}
