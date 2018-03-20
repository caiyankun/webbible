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
    public static $userinfo=null;
    public static $errorcode=0;
    public static $errorinfo="";
    private static $token=[];
    private static $key="";
    public static function create($userinfo,$expiretime=60*60*24*3) {
        self::$key= Config::get('key','token','www.sanmantech.com');
        $timestamp=time();
        self::$token=array(
            "iss" => "www.sanmantech.com",
            "aud" => "moreclosetapp",
            "iat" => $timestamp,
            "exp"=>$timestamp+$expiretime,
            "userinfo"=>$userinfo,
        );
        return JWT::encode(self::$token, self::$key);
    }
    public static function check($jwt) {
        self::$key= Config::get('key','token','www.sanmantech.com');
        try {
            self::$token=JWT::decode($jwt, self::$key);
        } catch (Exception $e) {
            self::$errorcode=$e->getCode();
            self::$errorinfo=$e->getMessage();
            return false;
        }
        self::$userinfo=self::$token->userinfo;
        return true;
    }
}
