<?php
use Firebase\JWT\JWT;
/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of Token
 *
 * @author Kevin
 */
class Token {
    //put your code here
    public static $userinfo=["uid"=>0,"uname"=>"请登录","nickname"=>"请登录","role"=>0];
    public static $errorcode=0;
    public static $errorinfo="";
    private static $token=[];
    private static $key="";
    public static function create($dataload,$expiretime=60*60*24*3,$exkey="") {
        self::$key= Config::get('key','token','www.sanmantech.com');
        self::$key= self::$key.$exkey;
        $timestamp=time();
        self::$token=array(
            "iss" => "www.sanmantech.com",
            "aud" => "moreclosetapp",
            "iat" => $timestamp,
            "exp"=>$timestamp+$expiretime,
            "dataload"=>$dataload,
        );
        return JWT::encode(self::$token, self::$key);
    }
    public static function check($jwt,$exkey="") {
        self::$key= Config::get('key','token','www.sanmantech.com');
        self::$key= self::$key.$exkey;
        try {
            self::$token=JWT::decode($jwt, self::$key);
        } catch (Exception $e) {
            self::$errorcode=$e->getCode();
            self::$errorinfo=$e->getMessage();
            return false;
        }
        self::$userinfo= Config::get($cfgname, $domain, $valueifnotexist);
        if(is_object(self::$token->dataload)&&isset(self::$token->dataload->uid)){
            self::$userinfo=self::$token->dataload;
        }
        return true;
    }
}
