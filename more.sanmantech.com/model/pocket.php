<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

namespace model;

/**
 * Description of pocket
 *
 * @author Kevin
 */
class pocket {
    public function add($pid,$qty=1) {
        \User::checkright(100)||\Response::returntaskfail("您还未登录，请先登录！！",2,"您还未登录，请先登录！");
        do{
            if(!\Db::simplecall("more.pocketadd", array(\User::uid(),$pid,1))){
                \Response::returntaskfail("存储过程调用失败！",\Db::$error,\Db::$info);
            } 
            $qty--;
        } while ($qty>1);
        \Response::returntaskok(\Db::tabledata());
    }
    public function del($rid) {
        \User::checkright(100)||\Response::returntaskfail("您还未登录，请先登录！！",2,"您还未登录，请先登录！");
        if(!\Db::simplecall("more.pocketdel", array(\User::uid(),$rid))){
            \Response::returntaskfail("存储过程调用失败！",\Db::$error,\Db::$info);
        } else {
            \Response::returntaskok(\Db::tabledata());
        } 
    }
    public function stat() {
        \User::checkright(100)||\Response::returntaskfail("您还未登录，请先登录！！",2,"您还未登录，请先登录！");
        if(!\Db::simplecall("more.pocketstat", array(\User::uid()))){
            \Response::returntaskfail("存储过程调用失败！",\Db::$error,\Db::$info);
        } else {
            \Response::returntaskok(\Db::tabledata());
        } 
    }
    public function plist($filterinfo="",$page=1,$length=6) {
        \User::checkright(100)||\Response::returntaskfail("您还未登录，请先登录！！",2,"您还未登录，请先登录！");
        if(!\Db::simplecall("more.pocketlist", array(\User::uid(),$filterinfo,$page,$length))){
            \Response::returntaskfail("存储过程调用失败！",\Db::$error,\Db::$info);
        } else {
            \Response::returntaskok(\Db::tabledata());
        } 
    }
    public function query($rid) {
        \User::checkright(100)||\Response::returntaskfail("您还未登录，请先登录！！",2,"您还未登录，请先登录！");
        if(!\Db::simplecall("more.pocketquery", array(\User::uid(),$rid))){
            \Response::returntaskfail("存储过程调用失败！",\Db::$error,\Db::$info);
        } else {
            \Response::returntaskok(\Db::tabledata());
        } 
    }
    public function borrow($receiver,$contract,$address,$btime,$rtime) {
        \User::checkright(100)||\Response::returntaskfail("您还未登录，请先登录！！",2,"您还未登录，请先登录！");
        if(!\Db::simplecall("more.pocketborrow", array(\User::uid(),$receiver,$contract,$address,$btime,$rtime))){
            \Response::returntaskfail("存储过程调用失败！",\Db::$error,\Db::$info);
        } else {
            \Response::returntaskok(\Db::tabledata());
        } 
    }
    public function delivered($uid,$rid) {
        \User::checkright(800)||\Response::returntaskfail("您还未登录，请先登录！！",2,"您还未登录，请先登录！");
        if(!\Db::simplecall("more.pocketdelivered", array($uid,$rid))){
            \Response::returntaskfail("存储过程调用失败！",\Db::$error,\Db::$info);
        } else {
            \Response::returntaskok(\Db::tabledata());
        }
    }
    public function preturn($uid,$rid) {
        \User::checkright(800)||\Response::returntaskfail("您还未登录，请先登录！！",2,"您还未登录，请先登录！");
        if(!\Db::simplecall("more.pocketreturn", array($uid,$rid))){
            \Response::returntaskfail("存储过程调用失败！",\Db::$error,\Db::$info);
        } else {
            \Response::returntaskok(\Db::tabledata());
        }
    }
}
