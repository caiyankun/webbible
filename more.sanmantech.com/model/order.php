<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

namespace model;

/**
 * Description of order
 *
 * @author Kevin
 */
class order {
    public function create($receiver,$contact,$address) {
        /*生成一个oid*/
        \User::checkright(100)||\Response::returntaskfail("您还未登录，请先登录！！",2,"您还未登录，请先登录！");
        $oid=\User::uid()."|". time();
        
        /*调用存储过程*/
        if(!\Db::simplecall("more.ordercreate", array(\User::uid(),$oid,$receiver,$contact,$address))){
            \Response::returntaskfail("存储过程调用失败！",\Db::$error,\Db::$info);
        } else {
            \Response::returntaskok(\Db::cubedata());
        }         
    }
    public function info($oid) {
        \User::checkright(100)||\Response::returntaskfail("您还未登录，请先登录！！",2,"您还未登录，请先登录！");
        /*调用存储过程*/
        if(!\Db::simplecall("more.orderquery", array(\User::uid(),$oid))){
            \Response::returntaskfail("存储过程调用失败！",\Db::$error,\Db::$info);
        } else {
            \Response::returntaskok(\Db::cubedata());
        } 
    }
    public function pay($oid) {
        \User::checkright(800)||\Response::returntaskfail("您还未登录，请先登录！！",2,"您还未登录，请先登录！");
        /*调用存储过程*/
        if(!\Db::simplecall("more.orderpay", array(\User::uid(),$oid))){
            \Response::returntaskfail("存储过程调用失败！",\Db::$error,\Db::$info);
        } else {
            \Response::returntaskok(\Db::cubedata());
        } 
    }
    public function delivered($oid) {
        \User::checkright(800)||\Response::returntaskfail("您还未登录，请先登录！！",2,"您还未登录，请先登录！");
        /*调用存储过程*/
        if(!\Db::simplecall("more.orderdelivered", array(\User::uid(),$oid))){
            \Response::returntaskfail("存储过程调用失败！",\Db::$error,\Db::$info);
        } else {
            \Response::returntaskok(\Db::cubedata());
        } 
    }
    public function stat() {
        \User::checkright(100)||\Response::returntaskfail("您还未登录，请先登录！！",2,"您还未登录，请先登录！");
        /*调用存储过程*/
        if(!\Db::simplecall("more.orderstat", array(\User::uid()))){
            \Response::returntaskfail("存储过程调用失败！",\Db::$error,\Db::$info);
        } else {
            \Response::returntaskok(\Db::cubedata());
        } 
    }
    public function flist($filterinfo="") {
        \User::checkright(100)||\Response::returntaskfail("您还未登录，请先登录！！",2,"您还未登录，请先登录！");
        /*调用存储过程*/
        if(!\Db::simplecall("more.orderlist", array(\User::uid(),$filterinfo))){
            \Response::returntaskfail("存储过程调用失败！",\Db::$error,\Db::$info);
        } else {
            \Response::returntaskok(\Db::cubedata());
        } 
    }
    public function upd($oid,$receiver,$contact,$address) {
        \User::checkright(100)||\Response::returntaskfail("您还未登录，请先登录！！",2,"您还未登录，请先登录！");
        /*调用存储过程*/
        if(!\Db::simplecall("more.orderupd", array(\User::uid(),$oid,$receiver,$contact,$address))){
            \Response::returntaskfail("存储过程调用失败！",\Db::$error,\Db::$info);
        } else {
            \Response::returntaskok(\Db::cubedata());
        } 
    }
    public function deliveredcancelapply($oid,$reason) {
        \User::checkright(100)||\Response::returntaskfail("您还未登录，请先登录！！",2,"您还未登录，请先登录！");
        /*调用存储过程*/
        if(!\Db::simplecall("more.orderdeliveredcancelapply", array(\User::uid(),$oid,$reason))){
            \Response::returntaskfail("存储过程调用失败！",\Db::$error,\Db::$info);
        } else {
            \Response::returntaskok(\Db::cubedata());
        } 
    }
    public function deliveredcancel($uid,$oid) {
        \User::checkright(800)||\Response::returntaskfail("您还未登录，请先登录！！",2,"您还未登录，请先登录！");
        /*调用存储过程*/
        if(!\Db::simplecall("more.orderdeliveredcancel", array($uid,$oid))){
            \Response::returntaskfail("存储过程调用失败！",\Db::$error,\Db::$info);
        } else {
            \Response::returntaskok(\Db::cubedata());
        } 
    }
    public function payedcancelapply($oid,$reason) {
        \User::checkright(100)||\Response::returntaskfail("您还未登录，请先登录！！",2,"您还未登录，请先登录！");
        /*调用存储过程*/
        if(!\Db::simplecall("more.orderpayedcancelapply", array(\User::uid(),$oid,$reason))){
            \Response::returntaskfail("存储过程调用失败！",\Db::$error,\Db::$info);
        } else {
            \Response::returntaskok(\Db::cubedata());
        } 
    }
    public function payedcancel($uid,$oid) {
        \User::checkright(800)||\Response::returntaskfail("您还未登录，请先登录！！",2,"您还未登录，请先登录！");
        /*调用存储过程*/
        if(!\Db::simplecall("more.orderpayedcancel", array($uid,$oid))){
            \Response::returntaskfail("存储过程调用失败！",\Db::$error,\Db::$info);
        } else {
            \Response::returntaskok(\Db::cubedata());
        } 
    }
    public function cancel($oid,$reason) {
        /*调用存储过程*/
        \User::checkright(100)||\Response::returntaskfail("您还未登录，请先登录！！",2,"您还未登录，请先登录！");
        if(!\Db::simplecall("more.ordercancel", array(\User::uid(),$oid,$reason))){
            \Response::returntaskfail("存储过程调用失败！",\Db::$error,\Db::$info);
        } else {
            \Response::returntaskok(\Db::cubedata());
        } 
    }
}
