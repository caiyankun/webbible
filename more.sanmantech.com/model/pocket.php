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
        do{
            if(!\Db::simplecall("more.pocketadd", array(\User::uid(),$pid,1))){
                \Response::returntaskfail("存储过程调用失败！",\Db::$error,\Db::$info);
            } else {
                \Response::returntaskok(\Db::tabledata());
            } 
            $qty--;
        } while ($qty>1);
        
    }
    public function del($rid) {
        if(!\Db::simplecall("more.pocketdel", array(\User::uid(),$pid))){
            \Response::returntaskfail("存储过程调用失败！",\Db::$error,\Db::$info);
        } else {
            \Response::returntaskok(\Db::tabledata());
        } 
    }
    public function pocketstat() {
        if(!\Db::simplecall("more.pocketstat", array(\User::uid()))){
            \Response::returntaskfail("存储过程调用失败！",\Db::$error,\Db::$info);
        } else {
            \Response::returntaskok(\Db::tabledata());
        } 
    }
    public function plist($filterinfo="") {
        if(!\Db::simplecall("more.pocketlist", array(\User::uid(),$filterinfo))){
            \Response::returntaskfail("存储过程调用失败！",\Db::$error,\Db::$info);
        } else {
            \Response::returntaskok(\Db::tabledata());
        } 
    }
    public function query($rid) {
        if(!\Db::simplecall("more.pocketquery", array(\User::uid(),$rid))){
            \Response::returntaskfail("存储过程调用失败！",\Db::$error,\Db::$info);
        } else {
            \Response::returntaskok(\Db::tabledata());
        } 
    }
    public function borrow($receiver,$contract,$address,$btime,$rtime) {
        if(!\Db::simplecall("more.pocketborrow", array(\User::uid(),$receiver,$contract,$address,$btime,$rtime))){
            \Response::returntaskfail("存储过程调用失败！",\Db::$error,\Db::$info);
        } else {
            \Response::returntaskok(\Db::tabledata());
        } 
    }
    public function delivered($uid,$rid) {
        if(!\Db::simplecall("more.pocketdelivered", array($uid,$rid))){
            \Response::returntaskfail("存储过程调用失败！",\Db::$error,\Db::$info);
        } else {
            \Response::returntaskok(\Db::tabledata());
        }
    }
    public function preturn($uid,$rid) {
        if(!\Db::simplecall("more.pocketdelivered", array($uid,$rid))){
            \Response::returntaskfail("存储过程调用失败！",\Db::$error,\Db::$info);
        } else {
            \Response::returntaskok(\Db::tabledata());
        }
    }
}
