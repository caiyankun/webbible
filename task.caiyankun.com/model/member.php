<?php
/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 2018/3/13
 * Time: 20:04
 */

namespace model;


class member
{
    /**
     * 查询会员信息
     */
    public function query(){
        \User::checkright(100)||\Response::returntaskfail("您还未登录，请先登录！！",2,"您还未登录，请先登录！");
        if(!\Db::simplecall("more.memberquery", array(\User::uid()))){
            \Response::returntaskfail("存储过程调用失败！",\Db::$error,\Db::$info);
        }else{
            \Response::returntaskok(\Db::cubedatawithtitle());
        }
    }

    /**
     * 充值
     * @param $value
     */
    public function reload($value){
        \User::checkright(100)||\Response::returntaskfail("您还未登录，请先登录！！",2,"您还未登录，请先登录！");
        if(!\Db::simplecall("more.memberreload", array(\User::uid(),$value))){
            \Response::returntaskfail("存储过程调用失败！",\Db::$error,\Db::$info);
        }else{
            \Response::returntaskok(\Db::cubedatawithtitle());
        }
    }

    public function deposit($value){
        if(\User::checkright(100)||\Response::returntaskfail("您还未登录，请先登录！！",2,"您还未登录，请先登录！")){
            if(!\Db::simplecall("more.memberdeposit", array(\User::uid(),$value))){
                \Response::returntaskfail("存储过程调用失败！",\Db::$error,\Db::$info);
            }else{
                \Response::returntaskok(\Db::cubedatawithtitle());
            }
        }
        if(\User::checkright(800)||\Response::returntaskfail("您还未登录，请先登录！！",2,"您还未登录，请先登录！"))
            if(!\Db::simplecall("more.memberdeposit", array(\User::uid(),$value))){
                \Response::returntaskfail("存储过程调用失败！",\Db::$error,\Db::$info);
            }else{
                \Response::returntaskok(\Db::cubedatawithtitle());
            }
    }

    public function update($newtype,$timetype="包月"){
        \User::checkright(100)||\Response::returntaskfail("您还未登录，请先登录！！",2,"您还未登录，请先登录！");
        $membertypes=array(
            '普通会员',
            '银卡会员',
            '金卡会员',
            '铂金卡会员'
        );
        $membertypecode= array_combine ($membertypes, array(
            0,
            1,
            2,
            3
        ));
        $timetypes=array(
            '包月',
            '包季',
            '包年'
        );
        $memberuntil= array_combine ($timetypes,array(
            date("Y-m-d",strtotime('+1 months')),
            date("Y-m-d",strtotime('+3 months')),
            date("Y-m-d",strtotime('+12 months'))
        ));
        $memberquota= array_combine ($membertypes,array(
            0,
            3,
            6,
            9
        ));
        if(!in_array($newtype, $membertypes)){
            \Response::returntaskfail("业务执行失败！",2,"不合法的会员类型：".$newtype);
        }
        if(!in_array($timetype, $timetypes)){
            \Response::returntaskfail("业务执行失败！",2,"不合法的会员时长类型：".$newtype);
        }
        //echo date("Y-m-d",strtotime('+3 months'));
        //var_dump(array(\User::uid(),1,$memberuntil[$timetype],$memberquota[$newtype]));
        //exit(0);
        if(!\Db::simplecall("more.membercreate", array(\User::uid(),$membertypecode[$newtype],$memberuntil[$timetype],$memberquota[$newtype]))){
            \Response::returntaskfail("存储过程调用失败！",\Db::$error,\Db::$info);
        }else{
            \Response::returntaskok(\Db::cubedatawithtitle());
        }
    }
}