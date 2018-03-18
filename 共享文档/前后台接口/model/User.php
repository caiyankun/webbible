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
* 用户模型
*/
class User{

	
	/**
	 * 修改用户令牌token
	 */
	public function updateToken($uid,$rand,$token){
		$result = db('member')->where('uid',$uid)->update(['rand'=>$rand,'token'=>$token]);
		if($result >= 0){
			return $result;
		}
		return false;
	}
	
	/**
	 * 获取用户信息
	 */
	public function getUser($uid){
		$data = db('member')->where('uid',$uid)->field('uid,username,mobile,score,token')->find();
		$seller = db('seller')->where('uid',$uid)->find();
		//商家名称
		$data['nickname'] = $seller['name'];
		//绑定会员总数
		$count = db('member')->where('seller_id',$seller['id'])->count();
		if($count){
			$data['usercount'] = $count;
		}else{
			$data['usercount'] = 0;
		}
		//本周绑定会员总数
		$count_t = db('member')->where('seller_id',$seller['id'])->whereTime('reg_time', 'week')->count(); 
		if($count_t){
			$data['usercount_t'] = $count_t;
		}else{
			$data['usercount_t'] = 0;
		}
		//客服电话
		$data['tel'] = config('service_tel');
		//总收款
		$data['allmoney'] = $seller['total_money'];
		//本月收款
		$data['money_m'] = db('accounting')->where('uid',$uid)->whereTime('create_time', 'month')->sum('money');
		//本周收款
		$money_t = db('accounting')->where('uid',$uid)->whereTime('create_time', 'week')->sum('money');
		if($money_t){
			$data['money_t'] = $money_t;
		}else{
			$data['money_t'] = '0.00';
		}
		return $data;
	}
	
	/**
	 * 用户登录
	 */
	public function login($mobile, $password){
		$data = db('member')->where('mobile',$mobile)->find();
		if(empty($data)){
			return false;
		}
		if($data['status'] == 0){
			return -1;
		}
		if($data['password'] != md5($password.$data['salt'])){
			return false;
		}
		$rand = rand_string(6);
		$token = init_token($data['uid'],$rand);//生成token
        $result = $this->updateToken($data['uid'],$rand,$token);
        if($result){
        	return $this->getUser($data['uid']);
        }
	}

    protected function is_weixin(){
        if ( strpos($_SERVER['HTTP_USER_AGENT'], 'MicroMessenger') !== false ) {
            return true;
        }
        return false;
    }
	
	/**
	 * 修改登录密码
	 */
	public function updatePwd($mobile, $password){
		$salt = rand_string(6);
		$password = md5($password . $salt);
		$result = db('member')->where('mobile',$mobile)->update(['password'=>$password,'salt'=>$salt]);
		if($result >= 0){
			return true;
		}
		return false;
	}
	
	/**
	 * 修改用户头像
	 */
	public function updateAvatar($uid, $picture_id){
		$result = db('member')->where('uid',$uid)->update(['avatar'=>$picture_id]);
		if($result >= 0){
			return true;
		}
		return false;
	}
	
	/**
	 * 修改用户信息
	 * @author zhb
	 */
	public function updateUser($uid, $data = []){
		$result = db('member')->where('uid',$uid)->update($data);
//		查看用户资料是否完善
		$res = db('member')->where('uid',$uid)->find();
		if($res['is_wanshanle']=='0'){
//			if($res['nickname']!=$res['username']&&$res['qq']&&$res['weixin']&&$res['email']&&$res['PMIID']&&$res['area']&&$res['realname']&&$res['organization']&&$res['worker']&&$res['avatar']){
			if($res['qq']&&$res['weixin']&&$res['email']&&$res['area']&&$res['realname']&&$res['organization']&&$res['worker']&&$res['avatar']){
				do_score_add($uid,5,'完善用户资料');//积分操作
				db('member')->where('uid',$uid)->update(['is_wanshanle'=>1]);
			}
		}
		if($result >= 0){
			return true;
		}
		return false;
	}
	
	/**
	 * 获取我的购买权限
	 * @author zhb
	 * $type 1课程库课程，2网络视频课程
	 */
	public function getMyBuy($uid,$lessons_id,$type){
		if($uid == 0){
			return 0;
		}
		if($type == 1){//课程库课程
			$map['uid'] = $uid;
			$map['lessons_id'] = $lessons_id;
			$map['status'] = 1;
		}
		if($type == 2){//网络视频课程
			$map['uid'] = $uid;
			$map['innetlessons_id'] = $lessons_id;
			$map['status'] = 1;
		}
		//检查单课程
		$order_goods = db('order_goods')->where($map)->find();
		if(!empty($order_goods)){
			return 1;//课程购买了
		}
		if($type == 1){//课程库
			$order_vip = db('vipuser')->where(['uid'=>$uid,'type'=>0])->find();
			if(!empty($order_vip) && $order_vip['end_time'] > time()){
				return 1;
			}
			$lessonstype = db('lessons')->where('id',$lessons_id)->field('type')->find();
			$order_vip1 = db('vipuser')->where(['uid'=>$uid,'type'=>$lessonstype['type']])->find();
			if(!empty($order_vip1) && $order_vip1['end_time'] > time()){
				return 1;
			}
			return 0;
		}
		if($type == 2){//网络视频课程
			$innet = db('innetlessons')->where('id',$lessons_id)->field('innet')->find();
			$order_vip = db('order_vip')->where(['uid'=>$uid,'type'=>2,'innet_id'=>$innet['innet'],'status'=>1])->find();
			if(empty($order_vip)){
				return 0;
			}else{
				return 1;
			}
		}
	}
}