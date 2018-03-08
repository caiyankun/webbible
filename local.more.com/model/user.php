<?php
namespace model;

class user
{
    public function login($uname,$upass) {
        if(!\Db::simplecall("user.login",array($uname,md5($upass)))){
            \Response::returntaskfail(null,\Db::$error, \Db::$info);
        } else {
            \Response::returntaskok(\Db::tabledata());
        }
    }
    public function register($uname,$upass) {
        if(!\Db::simplecall("user.register",array($uname,md5($upass)))){
            \Response::returntaskfail(null,\Db::$error, \Db::$info);
        } else {
            \Response::returntaskok(\Db::tabledata());
        }
    }
}