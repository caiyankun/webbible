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
        $oid=\User::uid()."|". time();
        
        /*调用存储过程*/
        if(!\Db::simplecall("more.ordercreate", array(\User::uid(),$oid,$receiver,$contact,$address))){
            \Response::returntaskfail("存储过程调用失败！",\Db::$error,\Db::$info);
        } else {
            \Response::returntaskok(\Db::cubedata());
        }         
    }
    public function info($oid) {
        /*调用存储过程*/
        if(!\Db::simplecall("more.orderquery", array(0,1521761283))){
            \Response::returntaskfail("存储过程调用失败！",\Db::$error,\Db::$info);
        } else {
            \Response::returntaskok(\Db::cubedata());
        } 
    }
    public function pay($oid) {
        /*调用存储过程*/
        if(!\Db::simplecall("more.orderpay", array(\User::uid(),$oid))){
            \Response::returntaskfail("存储过程调用失败！",\Db::$error,\Db::$info);
        } else {
            \Response::returntaskok(\Db::cubedata());
        } 
    }
    public function delivered($oid) {
        /*调用存储过程*/
        if(!\Db::simplecall("more.orderdelivered", array(\User::uid(),$oid))){
            \Response::returntaskfail("存储过程调用失败！",\Db::$error,\Db::$info);
        } else {
            \Response::returntaskok(\Db::cubedata());
        } 
    }
    public function stat() {
        /*调用存储过程*/
        if(!\Db::simplecall("more.orderstat", array(\User::uid()))){
            \Response::returntaskfail("存储过程调用失败！",\Db::$error,\Db::$info);
        } else {
            \Response::returntaskok(\Db::cubedata());
        } 
    }
    public function all($filterinfo="") {
        /*调用存储过程*/
        if(!\Db::simplecall("more.orderlist", array(\User::uid(),$filterinfo))){
            \Response::returntaskfail("存储过程调用失败！",\Db::$error,\Db::$info);
        } else {
            \Response::returntaskok(\Db::cubedata());
        } 
    }
    public function upd($oid,$receiver,$contact,$address) {
        /*调用存储过程*/
        if(!\Db::simplecall("more.orderupd", array(\User::uid(),$oid,$receiver,$contact,$address))){
            \Response::returntaskfail("存储过程调用失败！",\Db::$error,\Db::$info);
        } else {
            \Response::returntaskok(\Db::cubedata());
        } 
    }
    public function deliveredcancelapply($oid,$reason) {
        /*调用存储过程*/
        if(!\Db::simplecall("more.orderdeliveredcancelapply", array(\User::uid(),$oid,$reason))){
            \Response::returntaskfail("存储过程调用失败！",\Db::$error,\Db::$info);
        } else {
            \Response::returntaskok(\Db::cubedata());
        } 
    }
    public function deliveredcancel($uid,$oid) {
        /*调用存储过程*/
        if(!\Db::simplecall("more.orderdeliveredcancel", array($uid,$oid))){
            \Response::returntaskfail("存储过程调用失败！",\Db::$error,\Db::$info);
        } else {
            \Response::returntaskok(\Db::cubedata());
        } 
    }
    public function payedcancelapply($oid,$reason) {
        /*调用存储过程*/
        if(!\Db::simplecall("more.orderpayedcancelapply", array(\User::uid(),$oid,$reason))){
            \Response::returntaskfail("存储过程调用失败！",\Db::$error,\Db::$info);
        } else {
            \Response::returntaskok(\Db::cubedata());
        } 
    }
    public function payedcancel($uid,$oid) {
        /*调用存储过程*/
        if(!\Db::simplecall("more.orderpayedcancel", array($uid,$oid))){
            \Response::returntaskfail("存储过程调用失败！",\Db::$error,\Db::$info);
        } else {
            \Response::returntaskok(\Db::cubedata());
        } 
    }
    public function cancel($oid) {
        /*调用存储过程*/
        if(!\Db::simplecall("more.ordercancel", array($uid,$oid))){
            \Response::returntaskfail("存储过程调用失败！",\Db::$error,\Db::$info);
        } else {
            \Response::returntaskok(\Db::cubedata());
        } 
    }
}
