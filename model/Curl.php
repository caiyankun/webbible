<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of Curl
 *
 * @author Kevin
 */
class Curl {
    public static function request($url,$params=false,$ispost=0){
	try{
            $httpInfo = array();
            $ch = curl_init();
            //curl_setopt( $ch, CURLOPT_HTTP_VERSION , CURL_HTTP_VERSION_1_1 );
            //curl_setopt( $ch, CURLOPT_USERAGENT , 'Mozilla/5.0 (Windows NT 5.1) AppleWebKit/537.22 (KHTML, like Gecko) Chrome/25.0.1364.172 Safari/537.22' );
            //curl_setopt( $ch, CURLOPT_CONNECTTIMEOUT , 30 );
            //curl_setopt( $ch, CURLOPT_TIMEOUT , 30);
            //curl_setopt( $ch, CURLOPT_RETURNTRANSFER , true );
            if( $ispost )
            {
                    curl_setopt( $ch , CURLOPT_POST , true );
                    curl_setopt( $ch , CURLOPT_POSTFIELDS , $params );
                    curl_setopt( $ch , CURLOPT_URL , $url );
            }
            else
            {
                    if($params){
                            curl_setopt( $ch , CURLOPT_URL , $url.'?'.$params );
                    }else{
                            curl_setopt( $ch , CURLOPT_URL , $url);
                    }
            }
            $response = curl_exec( $ch );

            $httpCode = curl_getinfo( $ch , CURLINFO_HTTP_CODE );
            $httpInfo = array_merge( $httpInfo , curl_getinfo( $ch ) );
            curl_close( $ch );
            return $response;
        }catch(\Exception $e){
            echo "异常发生！";
            return false;
        }
    }
}
