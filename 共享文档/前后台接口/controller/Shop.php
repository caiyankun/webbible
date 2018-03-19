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
 * 圈子控制器
 * @author zhb
 */
class Shop{
	/**
	 * 验证token
	 * @author sxm
	 */
	public function authToken(){
		$token = input('param.token');
		$uid = getUid($token);
		if(!$uid){
			return back([],'已失效',0);
		}else{
			return back([],'有效',1);
		}
	}
	/**
	 * 获取大类别分类
	 * @author sxm
	 * field过滤字段
	 */
	public function getTestType(){
		$data = db('test_type')->order('sort asc')->field('id,title,name,sort')->select();
		return back($data,'获取数据成功',1);
	}
	/**
	 * 获取小类别分类
	 * @author sxm
	 * field过滤字段
	 */
	public function getTestTypeSmall(){
		$baseurl = url('/','',false,true);
		$baseurl = rtrim($baseurl,'/');
		$type_id = input('param.type_id');
		$data = db('test_type_small')->where(['type_id'=>$type_id])->order('sort')->field('id,title,name,type_id,icon')->select();
		foreach($data as &$v){
			if(empty($v['icon'])){
				$v['icon'] = $baseurl . '/public/images/small_type_icon.png';
			}else{
				$v['icon'] = img($v['icon']);
			}
		}
		return back($data,'获取数据成功',1);
	}
	/**
	 * 获取试卷列表
	 * @author sxm
	 * field过滤字段
	 */
	public function getTestList(){
		$type_small_id = input('param.type_small_id');
		$token = input('param.token');
		$uid = getUid($token);
		$data = db()->query('SELECT list.*,ifNULL(log.answer_status,0) as answer_status,log.test_count,log.test_percent,log.creat_time,ifNULL(log.last_index,0) as last_index,ifNULL(log.user_answer,0) as user_answer,ifNULL(log.err_count,0) as err_count,ifNULL(log.rest_time,list.time_limit) as rest_time FROM '.config('database.prefix').'test_list as list left JOIN (SELECT * FROM '.config('database.prefix').'user_test_log WHERE uid = '.intval($uid).')  as log ON list.id = log.test_id WHERE list.type_small_id = '.$type_small_id.'  ORDER BY id asc');
		if(empty($data)){
			return back($data,'此分类下没有试卷',1);
		}
		foreach($data as &$v){
			$res = db('order_test')->where(['uid'=>$uid,'test_id'=>$v['id']])->find();
			if($res){
				$v['is_buy'] = 1;
			}else{
				$v['is_buy'] = 0;
			}
		}
		return back($data,'获取数据成功',1);
	}
	/**
	 * 获取试卷列表
	 * @author sxm
	 * field过滤字段
	 */
	public function getTest(){
		$test_id = input('param.test_id');
		$token = input('param.token');
		$uid = getUid($token);
//		$data = db('test_shop')->where(['test_id'=>$test_id])->select();
		$data = db()->query('SELECT list.*,ifNULL(log.is_fav,0) as is_fav FROM (SELECT * FROM '.config('database.prefix').'test_shop WHERE test_id = '.$test_id.') as list left JOIN (SELECT * FROM '.config('database.prefix').'user_test_fav_log WHERE uid = '.intval($uid).')  as log ON list.id = log.test_shop_id ORDER BY no asc');
		if(empty($data)){
			return back($data,'此试卷下面没有试题',1);
		}
		$daan = [];
		foreach($data as $v){
			array_push($daan,$v['result']);
		}
		$arr['list']=$data;
		$arr['daan']=$daan;
		return back($arr,'获取数据成功',1);
	}
	public function putAnswer(){
		$answer = input('param.answer');
		$token = input('param.token');
		$time = input('param.time');
		$test_id = input('param.test_id');//test_id 试卷id
		$type = input('param.type');//type=1用户点击提交了，type=0用户还没点击提交
		$test_type_small_id = input('param.type_id');//test_id 试卷id
		$type_id = db('test_type_small')->where(['id'=>$test_type_small_id])->value('type_id');
		$answer = explode(',',$answer);
		$uid = getUid($token);
		if(!$uid){
			return back([],'请登录',-1);
		}
		//找到这个用户以前有没有这个试卷的答题记录，有的话删除掉
		db('user_test_log')->where(['test_id'=>$test_id,'uid'=>$uid])->delete();
		//找到这个用户以前有没有这个试卷的错题记录，有的话删除掉
		db('user_test_err_log')->where(['test_id'=>$test_id,'uid'=>$uid])->delete();
		//设定一个条件，去题库中查找问题的答案
		$map = [
			'test_id'=>$test_id
		];
		$test_shop = db('test_shop')->where($map)->order('no asc')->field('id,result,answer_count,true_count')->select();
		$test_percent = 0;
		$true_percent = 0;
		$test_length = count($test_shop);
		$true_percent_ = 100/$test_length;//可能需要取小数点后2位
		$err_test_shop_id = [];
		$last_index = 0;//最后一道试题的下标
		//循环开始 将试题循环一遍（其实答案也循环了1遍），查看所有试题的答案。
		foreach($test_shop as $key=>&$value){
//			如果答案非空，答题完成数+1？？这里要测试一下 答案是0的时候是否计算
			if(!empty($answer[$key])){
				//答题完成数+了1
				$test_percent ++;
			}
			$value['id'] = intval($value['id']);
//			如果答案正确
			if($value['result']==$answer[$key]){
				//正确率加一道试题的
				$true_percent = $true_percent + $true_percent_;
				//统计本站此试题的正确率 如果用户已经点击提交的话
				//答对次数/答题总数=正确率  正确率不计算，前端计算，舍弃公式了就
				if($type == 1){
					$value['answer_count'] = intval($value['answer_count']) + 1;
					$value['true_count'] = intval($value['true_count']) + 1;
					db('test_shop')->where(['id'=>$value['id']])->update(['answer_count'=>$value['answer_count'],'true_count'=>$value['true_count']]);
				}
				//将此题的下标赋值给字段$last_index，最后一次循环即为最后一个下标
				$last_index = $key;
			}else{
				array_push($err_test_shop_id,$value['id']);
//				 if($answer[$key]!='0'&& $type == 0){
//				 	array_push($err_test_shop_id,$value['id']);
//				 }else if($type == 1){
//				 	array_push($err_test_shop_id,$value['id']);
//				 }
				//统计本站此试题的答题次数
				if($type == 1){
					$value['answer_count'] = intval($value['answer_count']) + 1;
					db('test_shop')->where(['id'=>$value['id']])->update(['answer_count'=>$value['answer_count']]);
				}
				//将此题的下标赋值给字段$last_index，最后一次循环即为最后一个下标
				 if($answer[$key]!='0'){
				 	$last_index = $key;
				 }
			}
		}
		unset($value);//重置索引下标
		$last_index +=1;
		$answer = implode(',',$answer);
		$err_count = count($err_test_shop_id);
		$err_test_shop_id = implode(',',$err_test_shop_id);
		//循环完毕
		//如果答题进度等于试卷总数并且是已提交状态，则本试卷已经完成
		if($test_percent == $test_length && $type == 1){
				$answer_status = 3;//已完成
		}else if($test_percent == 0){
			$answer_status = 0;//未开始
		}else if($test_percent > 0 && $type == 0){
			$answer_status = 2;//做题中
		}else if($test_percent < $test_length && $type == 1){
			$answer_status = 1;//已经提交
		}
		$data = ['uid'=>$uid,'test_id'=>$test_id,'test_type_small_id'=>$test_type_small_id,'test_percent'=>$test_percent,'test_count'=>$test_length,'answer_status'=>$answer_status,'user_answer'=>$answer,'true_percent'=>$true_percent,'err_count'=>$err_count,'test_type_id'=>$type_id,'rest_time'=>$time,'last_index'=>$last_index,'creat_time'=>time()];
		//将答题记录插入数据库
		db('user_test_log')->insert($data);
		$err_data = ['uid'=>$uid,'test_id'=>$test_id,'answer_status'=>$answer_status,'test_type_small_id'=>$test_type_small_id,'test_percent'=>$test_percent,'test_count'=>$test_length,'err_count'=>$err_count,'test_shop_id'=>$err_test_shop_id,'creat_time'=>time()];
		//将错题记录插入数据库
		if($answer_status==1||$answer_status==3){
			if(!empty($err_test_shop_id)){
				db('user_test_err_log')->insert($err_data);
			}
		}
		return back([],'提交成功',1);
	}
	public function delAnswer(){
		//需要解决的一个问题就是怎么让答案通过字符串的形式传递进入表中
		$token = input('param.token');
		$test_id = input('param.test_id');//test_id 试卷id
		$uid = getUid($token);
		if(!$uid){
			return back([],'请登录',-1);
		}
		//找到这个用户以前有没有这个试卷的答题记录，有的话删除掉
		db('user_test_log')->where(['test_id'=>$test_id,'uid'=>$uid])->delete();
		//找到这个用户以前有没有这个试卷的错题记录，有的话删除掉
		db('user_test_err_log')->where(['test_id'=>$test_id,'uid'=>$uid])->delete();
		return back([],'删除成功',1);
	}
	/**
	 * 获取答题本记录
	 * @author sxm
	 */
	public function getTestNote(){
		$token = input('param.token');
		$uid = getUid($token);
		if(!$uid){
			return back([],'请登录',-1);
		}
		$type_id = input('param.type_id');
		$result = db('user_test_log')->where(['uid'=>$uid,'test_type_small_id'=>$type_id])->order('creat_time desc')->select();
		foreach($result as &$v){
			$title = db('test_list')->where('id',$v['test_id'])->find();
			$v['title']=$title['name'];
			$v['user_answer']=explode(',',$v['user_answer']);
		}
		if(empty($result)){
			return back([],'用户没有答题记录',0);
		}
		return back($result,'获取成功',1);
	}
	/**
	 * 获取错题本记录
	 * @author sxm
	 */
	public function getErrNote(){
		$token = input('param.token');
		$uid = getUid($token);
		if(!$uid){
			return back([],'请登录',-1);
		}
		$type_id = input('param.type_id');
		$result = db('user_test_err_log')->where(['uid'=>$uid,'test_type_small_id'=>$type_id])->select();
		//还需要找到用户的答题记录，把答错的个数跟答题状态，以及总数，打错的个数。分别入库或者获取
		foreach($result as &$v){
			$title = db('test_list')->where('id',$v['test_id'])->find();
			$v['title']=$title['name'];
			$v['test_shop_id']=explode(',',$v['test_shop_id']);
		}
		if(empty($result)){
			return back([],'用户没有错题记录',0);
		}
		return back($result,'获取成功',1);
	}
	/**
	 * 获取错题本详细
	 * @author sxm
	 */
	public function getErrNoteDetail(){
		$token = input('param.token');
		$uid = getUid($token);
		if(!$uid){
			return back([],'请登录',-1);
		}
		$err_id = input('param.err_id');
		$test_id = input('param.test_id');
		$result = db('user_test_err_log')->where(['uid'=>$uid,'id'=>$err_id])->value('test_shop_id');
		$result = explode(',',$result);
		$data = [];
		//还需要找到用户的答题记录，把答错的个数跟答题状态，以及总数，打错的个数。分别入库或者获取
		foreach($result as &$v){
			$data_ = db('test_shop')->where('id',$v)->find();
			$fav = db('user_test_fav_log')->where(['uid'=>$uid,'test_shop_id'=>$v])->find();
			if($fav){
				$data_['is_fav'] = 1;
			}else{
				$data_['is_fav'] = 0;
			}
			array_push($data,$data_);
		}
		if(empty($data)){
			return back([],'用户没有错题记录',0);
		}
		return back($data,'获取成功',1);
	}
	/**
	 * 删除错题本某条记录
	 * @author sxm
	 */
	public function delErrNote(){
		$token = input('param.token');
		$uid = getUid($token);
		if(!$uid){
			return back([],'请登录',-1);
		}
		$id = input('param.test_shop_id');//试题id
		$test_id = input('param.test_id');//试卷id
		//找到这条错题记录
		$result = db('user_test_err_log')->where(['test_id'=>$test_id,'uid'=>$uid])->find();
		//得到错题数目
		$err_count = $result['err_count'];
		//得到错题的题库并转成数组
		$results = explode(',',$result['test_shop_id']);
//		循环数组
		foreach($results as $key=>$value){
			if($value == $id){
				unset($results[$key]);
			}
		}
		//得到新的错题库数组
		if(count($results)==0){
			$data = db('user_test_err_log')->where(['test_id'=>$test_id,'uid'=>$uid])->delete();
		}else{
			$test_shop_id = implode(',',$results);
			$err_count = $err_count - 1 ;
			$data = db('user_test_err_log')->where(['test_id'=>$test_id,'uid'=>$uid])->update(['test_shop_id'=>$test_shop_id,'err_count'=>$err_count]);
		}
		if(!$data){
			return error('删除失败');
		}
		return success('删除成功');
	}
	/**
	 * 收藏点赞某试题
	 * @author sxm
	 */
	public function addFavNote(){
		$token = input('param.token');
		$uid = getUid($token);
		if(!$uid){
			return back([],'请登录',-1);
		}
		$type = input('param.type');
		if(empty($type)){
			return back([],'请填写操作类型，zan为点赞，fav为收藏',0);
		}
		$id =  input('param.id');
		if(empty($id)){
			return back([],'请填写试题id',0);
		}
		$test_id =  input('param.test_id');
		if(empty($test_id)){
			return back([],'请填写试卷id',0);
		}
		$test_small_id = db('test_list')->where('id',$test_id)->value('type_small_id');
//		$test_small_id =  input('param.type_id');
//		if(empty($test_small_id)){
//			return back([],'请填写小类id',0);
//		}
		if($type=='zan'){
			$result = db('user_test_fav_log')->where(['test_shop_id'=>$id,'uid'=>$uid])->find();
			if(empty($result)){
				$data = ['uid'=>$uid,'test_id'=>$test_id,'test_shop_id'=>$id,'test_type_small_id'=>$test_small_id,'is_zan'=>1,'creat_time'=>time()];
				//将点赞记录插入数据库
				$result = db('user_test_fav_log')->insert($data);
				return success('点赞成功');
			}else if($result['is_zan']==0){
				//将点赞记录插入数据库
				$result = db('user_test_fav_log')->where(['test_shop_id'=>$id,'uid'=>$uid])->update(['is_zan'=>'1']);
				return success('点赞成功');
			}else if($result['is_zan']==1&$result['is_fav']==1){
				$result = db('user_test_fav_log')->where(['test_shop_id'=>$id,'uid'=>$uid])->update(['is_zan'=>'0']);
				return success('取消点赞成功');
			}else if($result['is_zan']==1&$result['is_fav']==0){
				$result = db('user_test_fav_log')->where(['test_shop_id'=>$id,'uid'=>$uid])->delete();
				return success('取消点赞成功');
			}
		}
		if($type=='fav'){
			$result = db('user_test_fav_log')->where(['test_shop_id'=>$id,'uid'=>$uid])->find();
			if(empty($result)){
				$data = ['uid'=>$uid,'test_id'=>$test_id,'test_shop_id'=>$id,'test_type_small_id'=>$test_small_id,'is_fav'=>1,'creat_time'=>time()];
				//将点赞记录插入数据库
				$result = db('user_test_fav_log')->insert($data);
				return success('收藏成功');
			}else if($result['is_fav']==0){
				//将点赞记录插入数据库
				$result = db('user_test_fav_log')->where(['test_shop_id'=>$id,'uid'=>$uid])->update(['is_fav'=>'1']);
				return success('收藏成功');
			}else if($result['is_zan']==1&$result['is_fav']==1){
				$result = db('user_test_fav_log')->where(['test_shop_id'=>$id,'uid'=>$uid])->update(['is_fav'=>'0']);
				return success('取消收藏成功');
			}else if($result['is_zan']==0&$result['is_fav']==1){
				$result = db('user_test_fav_log')->where(['test_shop_id'=>$id,'uid'=>$uid])->delete();
				return success('取消收藏成功');
			}
		}
		if(!$result){
			return error('操作失败');
		}
	}
	/**
	 * 获取收藏本列表
	 * @author sxm
	 */
	public function getFavList(){
		$token = input('param.token');
		$uid = getUid($token);
		$type_id = input('param.type_id');
		if(!$uid){
			return back([],'请登录',-1);
		}
		$result = db()->query('SELECT list.*,fav.test_id FROM '.config('database.prefix').'test_list as list INNER JOIN (SELECT * FROM '.config('database.prefix').'user_test_fav_log WHERE uid = '.intval($uid).' and is_fav = 1 and test_type_small_id = '.$type_id.')  as fav ON list.id = fav.test_id');
		$results = [];
        foreach ($result as $key => $value) {
            $results[$value['test_id']][] = $value;
        }
        $ret = [];
        //这里把简直转成了数字的，方便同意处理
        foreach ($results as $key => $value) {
            array_push($ret, $value);
        }
		if(empty($ret)){
			return back([],'用户没有试题',0);
		}
		return back($ret,'获取成功',1);
	}
	
	/**
	 * 获取收藏本记录
	 * @author sxm
	 */
	public function getFavNote(){
		$token = input('param.token');
		$test_id = input('param.test_id');//试卷
		$uid = getUid($token);
		if(!$uid){
			return back([],'请登录',-1);
		}
		$result = db('user_test_fav_log')->where(['uid'=>$uid,'test_id'=>$test_id,'is_fav'=>1])->field('test_shop_id')->select();
		$data = [];
		foreach($result as $v){
			$data_ = db('test_shop')->where('id',$v['test_shop_id'])->find();
			array_push($data,$data_);
		}
		if(empty($data)){
			return back([],'用户没有收藏记录',0);
		}
		return back($data,'获取成功',1);
	}
	/**
	 * 获取用户排行榜
	 * @author sxm
	 */
	public function getChartOld(){
		$type_id = input('param.type_id');
//		'select uid ,AVG(true_percent) as pj from sent_user_test_log WHERE test_type_id=1 GROUP BY uid  ORDER BY pj desc'
		$result = db()->query('select uid ,AVG(true_percent) as true_percent from '.config('database.prefix').'user_test_log WHERE test_type_id='.$type_id.' and answer_status=1 or test_type_id='.$type_id.' and answer_status=3  GROUP BY uid  ORDER BY true_percent desc LIMIT 5');
		foreach($result as &$v){
			$v['nickname'] = nickname($v['uid']);
			$v['true_percent'] = number_format($v['true_percent'],2);
			$v['avatar'] = avatar($v['uid']);
		}
		if(empty($result)){
			return back([],'本分类排行榜虚位以待',0);
		}
		return back($result,'获取成功',1);
	}
	public function getChart(){
		$type_id = input('param.type_id');
//		dump(date("w"));
		$time = date("w")==0?'last week':'week';
//		$result = db('user_test_log')->where('test_type_id',$type_id)->where('answer_status','IN','1,3')->whereTime('creat_time','month')->group('uid')->field('uid,test_type_id,creat_time,answer_status,avg(true_percent)')->order('avg(true_percent) desc')->limit(5)->select();
//		$result = db('user_test_log')->where('test_type_id',$type_id)->where('answer_status','IN','1,3')->whereTime('creat_time','last week')->group('uid')->field('uid,test_type_id,creat_time,answer_status,avg(true_percent)')->order('avg(true_percent) desc')->limit(5)->fetchSql(true)->select();
//		dump($result);
//		exit;
		$result = db('user_test_log')->where('test_type_id',$type_id)->where('answer_status','IN','1,3')->whereTime('creat_time',$time)->group('uid')->field('uid,test_type_id,creat_time,answer_status,avg(true_percent)')->order('avg(true_percent) desc')->limit(5)->select();
		foreach($result as &$v){
			$v['nickname'] = nickname($v['uid']);
			$v['true_percent'] = number_format($v['avg(true_percent)'],2);
			$v['avatar'] = avatar($v['uid']);
//			$v['creat_time'] = dtg_format($v['creat_time']);
		}
		if(empty($result)){
			return back([],'本分类排行榜虚位以待',0);
		}
		return back($result,'获取成功',1);
	}
	/**
	 * 获取用户数量
	 * @author sxm
	 */
	public function getUserCount(){
		$result = db('member')->field('uid')->select();
		$data = count($result)+1000;
		if(empty($data)){
			return back([],'暂时没有用户',0);
		}
		return back($data,'获取用户量成功',1);
	}
}