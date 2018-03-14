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
            \Response::returntaskok(\Db::arraydata());
        }
    }

    /**
     * 充值
     * @param $value
     */
    public function reload($value){
        \User::checkright(100)||\Response::returntaskfail("您还未登录，请先登录！！",2,"您还未登录，请先登录！");
        if(!\Db::simplecall("more.memberdereload", array(\User::uid(),$value))){
            \Response::returntaskfail("存储过程调用失败！",\Db::$error,\Db::$info);
        }else{
            \Response::returntaskok(\Db::arraydata());
        }
    }

    public function deposit($value){
        if(\User::checkright(100)||\Response::returntaskfail("您还未登录，请先登录！！",2,"您还未登录，请先登录！")){
            if(!\Db::simplecall("more.memberdeposit", array(\User::uid(),$value))){
                \Response::returntaskfail("存储过程调用失败！",\Db::$error,\Db::$info);
            }else{
                \Response::returntaskok(\Db::arraydata());
            }
        }
        if(\User::checkright(800)||\Response::returntaskfail("您还未登录，请先登录！！",2,"您还未登录，请先登录！"))
            if(!\Db::simplecall("more.memberdeposit", array(\User::uid(),$value))){
                \Response::returntaskfail("存储过程调用失败！",\Db::$error,\Db::$info);
            }else{
                \Response::returntaskok('退押金成功！');
            }
    }

    public function update($membertype){
        \User::checkright(100)||\Response::returntaskfail("您还未登录，请先登录！！",2,"您还未登录，请先登录！");
        if(!\Db::simplecall("more.membercreate", array(\User::uid(),$membertype))){
            \Response::returntaskfail("存储过程调用失败！",\Db::$error,\Db::$info);
        }else{
            \Response::returntaskok(\Db::arraydata());
        }
    }
}