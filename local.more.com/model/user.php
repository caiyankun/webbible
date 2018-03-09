<?php
namespace model;

class user
{
    public function login($uname,$upass,$vericode,$keeplogin=false,$role="user") {
        if(!captcha::staticcheck($vericode)){\Response::returntaskfail("验证码不正确！",1,"验证码不正确！");}
        if(!\Db::simplecall("user.login",array($uname,md5($upass)))){
            \Response::returntaskfail("存储过程执行失败！",\Db::$error,\Db::$info);
        } 
        \User::$curuser=array_combine (array('uid','uname','role','option'),\Db::arraydata());
        if(\User::$curuser['role']<\Config::get($role, "userrole",101)){
            //$this->logout();
            \User::$curuser=null;
            \Response::returntaskfail("用户身份不符！",4,"您没有".$role."的身份！");
        }
    	\Session::set("_user", \User::$curuser);
        \Cookie::savesession($keeplogin?60*60*24*14:-3600);
        \Response::returntaskok(self::info());
    }
    public function register($uname,$upass,$vericode,$role="user") {
        if(!captcha::staticcheck($vericode)){\Response::returntaskfail("验证码不正确！",1,"验证码不正确！");}
        $ulevel= \Config::get($role, "userrole", 101);
        if(!\Db::simplecall("user.register_special",array($uname,md5($upass),$ulevel))){
            \Response::returntaskfail("存储过程调用失败！",\Db::$error,\Db::$info);
        } 
        \Response::returntaskok("注册成功！");
    }
    public function changepass($uname,$uoldpass,$unewpass,$vericode) {
        if(!captcha::staticcheck($vericode)){\Response::returntaskfail("验证码不正确！",1,"验证码不正确！");}
        \User::checkright(101)||\Response::returntaskfail("您还未登录！",2,"您还未登录！");
        if(!\Db::simplecall("user.changepass",array(\User::uid(),$uname,md5($uoldpass),md5($unewpass)))){
            \Response::returntaskfail("存储过程调用失败！",\Db::$error,\Db::$info);
        } 
        \Response::returntaskok(self::info());    
    }
    public function logout() {
        \Session::delete("_user");
        \Response::returntaskok("退出登录成功！");
    }
    public function changerole($uid,$uname,$newrole) {
        \User::checkright(801)||\Response::returntaskfail("您不是管理员，不可以修改用户角色！",2,"您不是管理员，不可以修改用户角色！");
        $newulevel= \Config::get($newrole, "userrole", $newrole);
        if(!\Db::simplecall("user.changeulevel",array(\User::uid(),$uname,$newulevel))){
            \Response::returntaskfail("存储过程调用失败！",\Db::$error,\Db::$info);
        } 
        \Response::returntaskok(self::info());          
    }
    public function showme() {
        \Response::returntaskok(self::info());
    }
    public static function info() {
        return \Session::get("_user");
    }
}